<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MaintenancePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can toggle maintenance mode.
     *
     * @param User $user
     * @return bool
     */
    public function toggleMaintenance(User $user): bool
    {
        return $user->isAuthorizedSuper();
    }
}
