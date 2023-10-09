<?php

namespace App\Traits;

use App\Utils\Enums\PostStatus;
use App\Utils\Enums\Gender;
use App\Utils\Enums\Roles;
use App\Utils\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

/**
 * @method serverError()
 * @method ok(Model $model)
 */
trait ValidatesFieldsBeforeUpdates
{

    /**
     * Update user resource.
     *
     * @param Request $request
     * @param Model $model
     * @return void
     */
    public function updateFields(Request $request, Model $model): void
    {

        if ($request->filled('first_name')) {
            $request->validate(['first_name' => ['min:2', 'max:40']]);
            $model->first_name = Str::lower($request->input('first_name'));
        }

        if ($request->filled('last_name')) {
            $request->validate(['last_name' => ['min:2', 'max:40']]);
            $model->last_name = Str::lower($request->input('last_name'));
        }

        if ($request->filled('email') && $model->email !== $request->input('email')) {
            $request->validate(['email' => 'email:rfc,dns|unique:users']);
            $model->email = Str::lower($request->input('email'));
        }

        if ($request->enum('gender', Gender::class)) {
            $request->validate(['gender' => new Enum(Gender::class)]);
            $model->gender = $request->input('gender');
        }

        if ($request->filled('position')) {
            $request->validate(['position' => ['max:100', 'min:2']]);
            $model->position = Str::lower($request->input('position'));
        }

        if ($request->filled('postal_code')) {
            $request->validate(['postal_code' => 'max:20']);
            $model->postal_code = Str::upper($request->input('postal_code'));
        }

        if ($request->filled('city')) {
            $request->validate(['city' => 'max:20']);
            $model->city = Str::upper($request->input('city'));
        }

        if ($request->enum('status', Status::class)) {
            $request->validate(['status' => new Enum(Status::class)]);
            $model->status = $request->input('status');
        }

        if ($request->filled('telephone')) {
            $request->validate(['telephone' => 'max:20']);
            $model->telephone = $request->input('telephone');
        }

        if ($request->filled('member_since')) {
            $request->validate(['member_since' => ['date']]);
            $model->member_since = $request->input('member_since');
        }

        if ($request->filled('address_one')) {
            $request->validate(['address_one' => 'max:255']);
            $model->address_one = ucwords(Str::upper($request->input('address_one')));
        }

        if ($request->filled('address_two')) {
            $request->validate(['address_two' => 'max:255']);
            $model->address_two = ucwords(Str::upper($request->input('address_two')));
        }

        if ($request->enum('roles', Roles::class)) {
            $request->validate(['roles' => new Enum(Roles::class)]);
            $model->roles = $request->input('roles');
        }


        if ($request->enum('post_status', PostStatus::class)) {
            $request->validate(['post_status' => new Enum(PostStatus::class)]);
            $model->post_status = $request->input('post_status');
        }

        $model->save();

    }

}
