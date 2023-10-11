<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Strings\Token;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::all();
        return $this->ok(data: $users);
    }

    /**
     * Store a newly created resource in storage.
     * @param UserRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(UserRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $data = $request->validated();
            $email = $data['email'];
            $firstName = $data['first_name'];
            $lastName = $data['last_name'];

            $passwordResetToken = Token::generateRandomNumber(Token::$RANDOM_NUMBER_LENGTH);
            $clientCurrentTime = Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString();
            $tempPassword = Token::generateRandomString(Token::$RANDOM_STRING_LENGTH);

            $resetTokenModel = new PasswordResetToken();
            $resetTokenModel->email = $email;
            $resetTokenModel->token = $passwordResetToken;
            $resetTokenModel->created_at = $clientCurrentTime;
            $resetTokenModel->save();

            $user = new User();
            $user->first_name = $firstName;
            $user->last_name = $lastName;
            $user->email = $email;
            $user->password = Token::hashPassword($tempPassword);
            $user->save();

            DB::commit();
            return $this->created(data: $user);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        return $this->ok(data: $user);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * @throws Exception
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        if($request->hasFile('avatar')) {
            $request->validate(['avatar' => [
                'file', 'mimes:jpeg,png,jpg,svg',
                'max:300', 'dimensions:min_width=200,min_height=200,max_width=400,max_height=400'
            ]]);
            if(! is_null($user->avatar)) Storage::delete($user->avatar);
            $path = $request->file('avatar')->store('avatar');
            $user->avatar = basename($path);
            $this->updateUserFieldsByAdmin($request, $user);
            $user->save();
            return $this->noContent();
        }

        return $this->serverError();
    }

    /**
     * Display a listing of all users with 'active' status.
     * @return JsonResponse
     */
    public function getActiveUsers(): JsonResponse
    {
        $users = User::where('status', 'active')->get();
        return $this->ok(data: $users);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $userPasswordReset = PasswordResetToken::where('email', $user->email)->first();
        if($userPasswordReset) $userPasswordReset->delete();
        $user->delete();
        return $this->ok();
    }
}
