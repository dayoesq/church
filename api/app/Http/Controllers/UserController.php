<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUserRequest;
use App\Http\Requests\UpsertUserRequest;
use App\Http\Resources\Users\UserResource;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Assets\Asset;
use App\Utils\Strings\Helper;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::with('position')->get(['id', 'first_name', 'last_name', 'email', 'status', 'member_since', 'avatar']);
        return $this->ok(data: UserResource::collection($users));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AdminUserRequest $request
     * @return JsonResponse
     */
    public function store(AdminUserRequest $request): JsonResponse
    {

        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $firstName = $validated['first_name'];
            $lastName = $validated['last_name'];
            $email = $validated['email'];
            $passwordResetToken = Helper::generateRandomNumber(Helper::$DEFAULT_RANDOM_NUMBER);
            $clientCurrentTime = Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString();
            $tempPassword = Helper::generateRandomString(Helper::$RANDOM_STRING_LENGTH);
            $hashedPassword = Helper::hashPassword($tempPassword);

            $resetTokenModel = new PasswordResetToken();
            $resetTokenModel->email = $email;
            $resetTokenModel->token = $passwordResetToken;
            $resetTokenModel->created_at = $clientCurrentTime;
            $resetTokenModel->save();

            $user = new User();
            $user->first_name = $firstName;
            $user->last_name = $lastName;
            $user->email = $email;
            $user->password = $hashedPassword;
            $user->save();

            DB::commit();
            return $this->created(data: new UserResource($user));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        $user->load('position');
        return $this->ok(data: new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AdminUserRequest $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(AdminUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();
        $success = $user->update($validated);
        return $success ? $this->ok(data: new UserResource($user)) : $this->serverError();
    }

    /**
     * Display a listing of all users with 'active' status.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getActiveUsers(): JsonResponse
    {
        $this->authorize('getActiveUsers', Auth::user());
        $users = User::where('status', 'active')->get();
        return $this->ok(data: UserResource::collection($users));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(User $user): JsonResponse
    {

        try {
            DB::beginTransaction();
            $passwordResetToken = PasswordResetToken::where('email', $user->email)->first();
            $passwordResetToken?->delete();
            if($user->avatar && Storage::disk(Asset::$IMAGES)->exists($user->avatar)) {
                Storage::disk(Asset::$IMAGES)->delete($user->avatar);
            }
            $user->delete();
            DB::commit();
            return $this->noContent();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return $this->serverError();
        }
    }

    /**
     * Update user by self.
     *
     * @param UpsertUserRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function updateSelf(UpsertUserRequest $request): JsonResponse
    {
        $user = Auth::user();
        $validated = $request->validated();
        $this->authorize('updateSelf', $user);
        $user->update($validated);

        if($request->hasFile('avatar')) {
            if($user->avatar && Storage::disk(Asset::$IMAGES)->exists($user->avatar)) {
                Storage::disk(Asset::$IMAGES)->delete($user->avatar);
            }
            $path = $request->file('avatar')->store(Asset::$IMAGES);
            $user->avatar = basename($path);
            $user->save();
            return $this->ok();
        }
        return $this->ok();

    }

}
