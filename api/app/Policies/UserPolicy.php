<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin() || $user->isAuthorizedUser();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function view(User $user, User $model): bool
    {
        return $user->isAuthorizedSuperAdmin() || $user->id === $model->id;
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function update(User $user, User $model): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @return bool
     */
    public function updateSelf(User $user): bool
    {
        return $user->isAuthorizedUser() || $user->id === auth()->user()->id;
    }

    /**
     * Determine whether the user can view the list of active users.
     *
     * @param User $user
     * @return bool
     */
    public function getActiveUsers(User $user): bool
    {
        return $user->isAuthorizedUser() || $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @return bool
     */
    public function deleteUserAvatar(User $user): bool
    {
        return $user->id === auth()->user()->id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function delete(User $user, User $model): bool
    {
        return $user->isAuthorizedSuperAdmin() || $model->id === auth()->user()->id;
    }

}
