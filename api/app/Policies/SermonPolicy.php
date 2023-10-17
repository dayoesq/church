<?php

namespace App\Policies;

use App\Models\Sermon;
use App\Models\User;

class SermonPolicy
{
    /**
     * Determine whether the user can view any models.
     *
     * @return bool
     */
    public function viewAny(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @return bool
     */
    public function view(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Sermon $sermon
     * @return bool
     */
    public function update(User $user, Sermon $sermon): bool
    {
       return $user->isAuthorized() && ($user->isSuper() || $user->isAdmin() || $user->id === $sermon->delivered_by);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Sermon $sermon
     * @return bool
     */
    public function destroy(User $user, Sermon $sermon): bool
    {
        return $user->isAuthorized() && ($user->isSuper() || $user->id === $sermon->delivered_by);
    }

}
