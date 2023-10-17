<?php

namespace App\Policies;

use App\Models\User;
use App\Utils\Enums\UserStatus;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin() || $user->isManagement();
    }

    /**
     * Determine whether the user can view the model.
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function view(User $user, User $model): bool
    {
        return $user->isSuper() || $user->isAdmin() || ($user->id === $model->id && $user->status === UserStatus::Active->value);
    }

    /**
     * Determine whether the user can update the model.
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     * @param User $user
     * @param User $model
     * @return bool
     */
    public function updateSelf(User $user, User $model): bool
    {
        return $user->status === UserStatus::Active->value && $user->id === $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     * @param User $user
     * @return bool
     */
    public function destroy(User $user): bool
    {
        return $user->isSuper();
    }

}
