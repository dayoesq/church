<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Assets\Asset;
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

            $passwordResetToken = Token::generateRandomString(Token::$RANDOM_STRING_LENGTH);
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
        $imageableType = get_class($user);
        if($request->hasFile(Asset::$AVATAR)) {
            try {
                $paths = $this->assetHandler($request, Asset::$AVATAR, Asset::$IMAGE_EXTENSIONS, Asset::$AVATAR);
                foreach ($paths as $path) {
                    $user->image()->updateOrCreate(
                        ['imageable_id' => $user->id,
                            'imageable_type' => $imageableType],
                        ['url' => $path, 'imageable_type' => $imageableType]
                    );
                }
                $this->updateFields($request, $user);
                return $this->noContent();
            } catch (Exception $e) {
                return $this->serverError();
            }
        }
        return $this->serverError();
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
