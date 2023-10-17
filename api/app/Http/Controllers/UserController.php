<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\PasswordResetToken;
use App\Models\User;
use App\Utils\Enums\Countries;
use App\Utils\Enums\Gender;
use App\Utils\Enums\Roles;
use App\Utils\Enums\UserStatus;
use App\Utils\Strings\Token;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     * @param StoreUserRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function store(StoreUserRequest $request): JsonResponse
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
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {

        if($request->hasFile('avatar')) {
            $request->validate(['avatar' => [
                'file', 'mimes:jpeg,png,jpg,svg',
                'max:300', 'dimensions:min_width=200,min_height=200,max_width=400,max_height=400'
            ]]);

            if($user->avatar && Storage::disk('avatar')->exists($user->avatar)) {
                Storage::disk('avatar')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars');
            $user->avatar = basename($path);
            $this->updateUserByAdmin($request, $user);
            $user->save();
            return $this->noContent();
        }

        return $this->serverError();
    }

    /**
     * Display a listing of all users with 'active' status.
     *
     * @return JsonResponse
     */
    public function getActiveUsers(): JsonResponse
    {
        $users = User::where('status', 'active')->get();
        return $this->ok(data: $users);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            DB::beginTransaction();
            $passwordResetToken = PasswordResetToken::where('email', $user->email)->first();
            $passwordResetToken?->delete();
            if($user->avatar && Storage::disk('avatar')->exists($user->avatar)) {
                Storage::disk('avatar')->delete($user->avatar);
            }
            $user->delete();
            DB::commit();
            return $this->ok();
        } catch (Exception $e) {
            DB::rollBack();
            return $this->serverError($e->getMessage());
        }
    }

    /**
     * Update user resource.
     *
     * @param Request $request
     * @param User $user
     * @return void
     */
    private function updateUserByAdmin(Request $request, User $user): void
    {

        $this->updateUserFieldsBySelf($request, $user);
        // Fields only admin can update

        if ($request->filled('position')) {
            $request->validate(['position' => ['max:100', 'min:2']]);
            $user->position = Str::lower($request->input('position'));
        }

        if ($request->enum('status', UserStatus::class)) {
            $request->validate(['status' => new Enum(UserStatus::class)]);
            $user->status = $request->input('status');
        }

        if ($request->enum('country', Countries::class)) {
            $request->validate(['country' => new Enum(Countries::class)]);
            $user->country = $request->input('country');
        }

        if ($request->filled('member_since')) {
            $request->validate(['member_since' => ['date']]);
            $user->member_since = $request->input('member_since');
        }

        if ($request->enum('roles', Roles::class)) {
            $request->validate(['roles' => new Enum(Roles::class)]);
            $user->roles = $request->input('roles');
        }

        if ($request->filled('title')) {
            $request->validate(['title' => ['string', 'min:2', 'max:100']]);
            $user->title = $request->input('title');
        }

        if ($request->filled('email') && $user->email !== $request->input('email')) {
            $request->validate(['email' => 'email:rfc,dns|unique:users']);
            $user->email = Str::lower($request->input('email'));
        }


    }

    /**
     * Update user by self.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function updateSelf(Request $request): JsonResponse
    {
        $this->authorize('update-self', User::class);
        $user = auth()->user;
        $this->updateUserFieldsBySelf($request, $user);
        return $user->save() ? $this->noContent() : $this->serverError();

    }


    /**
     * Update user resource.
     *
     * @param Request $request
     * @param Model $user
     * @return void
     */
    private function updateUserFieldsBySelf(Request $request, Model $user): void
    {
        if ($request->filled('first_name')) {
            $request->validate(['first_name' => ['min:2', 'max:40']]);
            $user->first_name = Str::lower($request->input('first_name'));
        }

        if ($request->filled('last_name')) {
            $request->validate(['last_name' => ['min:2', 'max:40']]);
            $user->last_name = Str::lower($request->input('last_name'));
        }

        if ($request->enum('gender', Gender::class)) {
            $request->validate(['gender' => new Enum(Gender::class)]);
            $user->gender = $request->input('gender');
        }

        if ($request->filled('postal_code')) {
            $request->validate(['postal_code' => 'max:20']);
            $user->postal_code = Str::upper($request->input('postal_code'));
        }

        if ($request->filled('city')) {
            $request->validate(['city' => 'max:20']);
            $user->city = Str::upper($request->input('city'));
        }

        if ($request->filled('telephone')) {
            $request->validate(['telephone' => 'max:20']);
            $user->telephone = $request->input('telephone');
        }

        if ($request->filled('address_one')) {
            $request->validate(['address_one' => 'max:255']);
            $user->address_one = ucwords(Str::upper($request->input('address_one')));
        }

        if ($request->filled('address_two')) {
            $request->validate(['address_two' => 'max:255']);
            $user->address_two = ucwords(Str::upper($request->input('address_two')));
        }

    }
}
