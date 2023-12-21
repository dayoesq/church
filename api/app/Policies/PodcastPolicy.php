<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Podcast;

class PodcastPolicy
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
     * Determine whether the user can create models.
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
     * @param Podcast $podcast
     * @return bool
     */
    public function deletePodcastAudio(User $user, Podcast $podcast): bool
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
