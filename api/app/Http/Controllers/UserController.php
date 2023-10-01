<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Utils\Strings\Token;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::all();
        return $this->ok($users);
    }

    /**
     * Store a newly created resource in storage.
     * @param UserRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(UserRequest $request): JsonResponse
    {
        $data = $request->validated();
        $passwordResetToken = Token::generateRandomString(Token::$RANDOM_STRING_LENGTH);
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
        ]);
        $clientCurrentTime = Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString();
        $user->password = $passwordResetToken;
        DB::table('password_reset_tokens')
            ->insert(
                ['email' => $data['email'], 'token' => $passwordResetToken, 'created_at' => $clientCurrentTime]
            );

        return $user->save() ? $this->ok() : $this->serverError();
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        return $this->ok($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $this->ok();
    }
}
