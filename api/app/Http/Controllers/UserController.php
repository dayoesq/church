<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUserRequest;
use App\Http\Requests\UpsertUserRequest;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Assets\Asset;
use App\Utils\Enums\Countries;
use App\Utils\Enums\Gender;
use App\Utils\Enums\Roles;
use App\Utils\Enums\UserStatus;
use App\Utils\Strings\Helper;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

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
        $users = User::all();
        return $this->ok(data: $users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UpsertUserRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(AdminUserRequest $request): JsonResponse
    {

        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $passwordResetToken = Helper::generateRandomNumber(Helper::$DEFAULT_RANDOM_NUMBER);
            $clientCurrentTime = Carbon::createFromTimestampMs($request->client_current_time)->toDateTimeString();
            $tempPassword = Helper::generateRandomString(Helper::$RANDOM_STRING_LENGTH);

            $resetTokenModel = new PasswordResetToken();
            $resetTokenModel->email = $request->input('email');
            $resetTokenModel->token = $passwordResetToken;
            $resetTokenModel->created_at = $clientCurrentTime;
            $resetTokenModel->save();

            $user = new User();
            $user->first_name = $request->input('first_name');
            $user->last_name = $request->input('last_name');
            $user->email = $request->input('email');
            $user->password = Helper::hashPassword($tempPassword);
            $user->save();

            DB::commit();
            return $this->created(data: $user);
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
        return $this->ok(data: $user);
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
        return $success ? $this->ok() : $this->serverError();
    }

    /**
     * Display a listing of all users with 'active' status.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getActiveUsers(): JsonResponse
    {
        $this->authorize('getActiveUsers', auth()->user());
        $users = User::where('status', 'active')->get();
        return $this->ok(data: $users);
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
            if($user->avatar && Storage::disk(Asset::$PHOTO)->exists($user->avatar)) {
                Storage::disk(Asset::$PHOTO)->delete($user->avatar);
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
        $user = auth()->user();
        $validated = $request->validated();
        $this->authorize('updateSelf', $user);
        $user->update($validated);

        if($request->hasFile(Asset::$PHOTO)) {
            if($user->avatar && Storage::disk(Asset::$PHOTO)->exists($user->avatar)) {
                Storage::disk(Asset::$PHOTO)->delete($user->avatar);
            }
            $path = $request->file(Asset::$PHOTO)->store(Asset::$PHOTO);
            $user->avatar = basename($path);
            $user->save();
            return $this->ok();
        }
        return $this->ok();

    }

}
