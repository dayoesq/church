<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\User;

class BlogPolicy
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
     * Determine whether the user can create the model.
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return $user->isAuthorized() && $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Blog $blog
     * @return bool
     */
    public function update(User $user, Blog $blog): bool
    {
        return $user->isAuthorized() && ($user->isSuperAdmin() || $user->id === $blog->author);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Blog $blog
     * @return bool
     */
    public function delete(User $user, Blog $blog): bool
    {
        return $user->isAuthorized() && ($user->isSuper() || $user->id === $blog->author);
    }

}
