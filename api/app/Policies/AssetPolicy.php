<?php

namespace App\Policies;

use App\Models\User;

class AssetPolicy
{
    /**
     * Determine whether the user view the model.
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
     * @return bool
     */
    public function view(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin() || $user->isAuthorizedUser();
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin() || $user->isAuthorizedUser();
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
     *
     * @param User $user
     * @return bool
     */
    public function deleteAssetImage(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

}
