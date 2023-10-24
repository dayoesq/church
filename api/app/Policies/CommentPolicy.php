<?php

namespace App\Policies;

use App\Models\User;

class CommentPolicy
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
     * Only registered and authorized user can comment to posts.
     *
     * @param User $user
     * @return bool
     */
    public function replyToAComment(User $user): bool
    {
        return $user->isAuthorizedUser();
    }

    /**
     * Only registered and authorized see comments and their corresponding replies.
     *
     * @param User $user
     * @return bool
     */
    public function getCommentReplies(User $user): bool
    {
        return $user->isAuthorizedUser();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @return bool
     */
    public function destroy(User $user): bool
    {
        return $user->isAuthorizedSuperAdmin();
    }

}
