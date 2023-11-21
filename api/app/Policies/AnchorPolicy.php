<?php

namespace App\Policies;

use App\Models\User;

class AnchorPolicy
{
    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can view the model.
     * @param User $user
     * @return bool
     */
    public function view(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can create models.
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
     * @return bool
     */
    public function update(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }


}
