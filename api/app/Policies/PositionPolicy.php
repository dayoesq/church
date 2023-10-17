<?php

namespace App\Policies;

use App\Models\User;

class PositionPolicy
{
    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @return bool
     */
    public function view(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @return bool
     */
    public function destroy(User $user): bool
    {
        return $user->isSuper() || $user->isAdmin();
    }

}
