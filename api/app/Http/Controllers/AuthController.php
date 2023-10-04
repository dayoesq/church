<?php

namespace App\Http\Controllers;

use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Enums\Status;
use App\Utils\Errors\ErrorResponse;
use App\Utils\Strings\Token;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Sign the user in if all goes fine.
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function logIn(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email:rfc,dns'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if(! $user) return $this->forbidden(ErrorResponse::$INVALID_CREDENTIALS);

        if($user->status !== Status::Active->value) return $this->forbidden(ErrorResponse::$FORBIDDEN);

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
            'management' => $user->createToken('management_token', ['management'])->plainTextToken,
            default => $user->createToken('basic_token', ['basic'])->plainTextToken,
        };

        Auth::login($user);
        return response()->json(['data' => $user, 'token' => $token]);
    }

    /**
     * Sign the user out.
     *
     * @return JsonResponse
     */
    public function logOut(): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return $this->ok();
    }

    /**
     * Make a password reset request for the user.
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

            if($user->status === Status::Pending->value || $user->status === Status::Active->value) {
                $token = Token::generateRandomString(Token::$RANDOM_STRING_LENGTH);
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
            return $this->serverError();
        }

        return $this->serverError();
    }

    /**
     * Reset the user's password.
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate(['password' => ['required', 'max:100', 'confirmed',
            Password::min(Token::$PASSWORD_MIN_LENGTH)
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

        $hashedPassword = Token::hashPassword($request->input('password'));
        $user->password = $hashedPassword;

        if($user->status === Status::Pending->value) $user->status = Status::Active->value;
        $user->save();
        $passResetToken->delete();
        return $this->ok();
    }


}
