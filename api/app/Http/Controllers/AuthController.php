<?php

namespace App\Http\Controllers;

use App\Models\Login;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Enums\UserStatus;
use App\Utils\Errors\ErrorResponse;
use App\Http\Resources\Users\UserResource;
use App\Utils\Strings\Helper;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Sign the user in if all goes fine.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email:rfc,dns'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if(! $user) return $this->forbidden(ErrorResponse::$INVALID_CREDENTIALS);

        if($user->status !== UserStatus::Active->value) return $this->forbidden(ErrorResponse::$FORBIDDEN);

        if (! Hash::check($request->input('password'), $user->password)) {
            throw ValidationException::withMessages([
                'email' => [ErrorResponse::$INVALID_CREDENTIALS],
                'password' => [ErrorResponse::$INVALID_CREDENTIALS],
            ]);
        }

        $userRole = $user->roles;
        $user->tokens()->delete();

        $token = match ($userRole) {
            'super' => $user->createToken('super_token', ['*'])->plainTextToken,
            'admin' => $user->createToken('admin_token', ['admin'])->plainTextToken,
            default => $user->createToken('basic_token', ['basic'])->plainTextToken,
        };

        Auth::login($user);

        $login = Login::firstOrNew(['email' => $user->email]);
        $login->email = $user->email;
        $login->logged_in_at = Carbon::now();
        $login->save();

        return response()->json(['data' => new UserResource($user), 'message' => 'success.', 'token' => $token, 'statusCode' => 200]);
    }

    /**
     * Sign the user out.
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return $this->ok();
    }

    /**
     * Make a password reset request for the user.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function requestPasswordReset(Request $request): JsonResponse
    {
        try {

            DB::beginTransaction();

            $request->validate(['email' => 'required']);
            $user = User::where('email', $request->input('email'))->first();

            if(! $user) return $this->notFound();

            if($user->status === UserStatus::Pending->value || $user->status === UserStatus::Active->value) {
                $token = Helper::generateRandomString(Helper::$RANDOM_STRING_LENGTH);
                $passwordResetToken = new PasswordResetToken();
                $passwordResetToken->email = $user->email;
                $passwordResetToken->token = $token;
                $passwordResetToken->created_at = Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString();
                $passwordResetToken->save();
                $user->save();
                DB::commit();
                return $this->ok();
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }

        return $this->serverError();
    }

    /**
     * Reset the user's password.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate(['password' => ['required', 'max:100', 'confirmed',
            Password::min(Helper::$PASSWORD_MIN_LENGTH)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised()
        ]]);

        $passResetToken = PasswordResetToken::where('token', $request->input('token'))->first();

        if(! $passResetToken) return $this->notFound();

        $user = User::where('email', $passResetToken->email)->first();

        if(! $user) return $this->notFound();

        $tokenExpiration = Carbon::createFromDate($passResetToken->created_at)
            ->addMinutes(config('auth.passwords.users.expire'));

        if($tokenExpiration <= Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString()) {
            return $this->forbidden(ErrorResponse::$EXPIRED_TOKEN);
        }

        $hashedPassword = Helper::hashPassword($request->input('password'));
        $user->password = $hashedPassword;

        if($user->status === UserStatus::Pending->value) $user->status = UserStatus::Active->value;
        $user->save();
        $passResetToken->delete();
        return $this->ok();
    }

    /**
     * Reset the user's password.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function verifyAccount(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $request->validate(['token' => 'required', 'password' => ['required', 'max:100', 'confirmed',
                Password::min(Helper::$PASSWORD_MIN_LENGTH)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
            ]]);

            $verificationToken = PasswordResetToken::where('token', $request->input('token'))->first();

            if(! $verificationToken) return $this->badRequest('Expired or invalid token.');

            $user = User::where('email', $verificationToken->email)->firstOrFail();
            $hashedPassword = Helper::hashPassword($request->input('password'));
            $user->password = $hashedPassword;

            $user->status = UserStatus::Active->value;
            $user->email_verified_at = Carbon::now();

            $user->save();
            $verificationToken->delete();
            DB::commit();
            return $this->ok();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }

    }


}
