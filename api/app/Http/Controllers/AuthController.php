<?php

namespace App\Http\Controllers;

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
    public function signIn(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email:rfc,dns'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if(! $user) return $this->forbidden(ErrorResponse::$INVALID_CREDENTIALS);

        if($user->status !== Status::ACTIVE->value) return $this->forbidden(ErrorResponse::$UNVERIFIED_ACCOUNT);

        if (! Hash::check($request->input('password'), $user->password)) {
            throw ValidationException::withMessages([
                'password' => [ErrorResponse::$INVALID_CREDENTIALS]
            ]);
        }

        $userRole = $user->role;
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
    public function signOut(): JsonResponse
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
    public function makePasswordResetRequest(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required']]);
        $user = User::where('email', $request->input('email'))->first();

        if(! $user) return $this->notFound();

        if($user->status === Status::PENDING->value || $user->status === Status::ACTIVE->value) {
            $token = Token::generateRandomString(Token::$RANDOM_STRING_LENGTH);
            DB::table('password_reset_tokens')
                ->insert([
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString()
                ]);
            $user->save();
            return $this->ok();
        }

        return $this->serverError();
    }

    /**
     * Reset the user's password.
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function resetPassword(Request $request)
    {
        $request->validate(['password' => ['required', 'max:100', 'confirmed',
            Password::min(Token::$PASSWORD_MIN_LENGTH)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised()
        ]]);

        $passResetToken = DB::table('password_reset_tokens')
            ->where('token', $request->input('token'))
            ->first();

        if(! $passResetToken) return $this->notFound();

        $user = User::where('email', $passResetToken->email)->first();

        if(! $user) return $this->notFound();

        $tokenExpiration = Carbon::createFromDate($passResetToken->created_at)
            ->addMinutes(config('auth.passwords.users.expires'));

        if($tokenExpiration <= Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString()) {
            return $this->forbidden(ErrorResponse::$EXPIRED_TOKEN);
        }

        $hashedPassword = Token::hashPassword($request->input('password'));
        $user->password = $hashedPassword;

        if($user->status === Status::PENDING->value) $user->status = Status::ACTIVE->value;
        $user->save();
        return $this->Ok();
    }


}
