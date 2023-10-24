<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $content
 * @property int $author
 * @property int $blog_id
 * @property int $id
 * @property int $parent_id
 * @method static paginate(int $int)
 */
class Comment extends Model
{
    use HasFactory;


    /**
     * Comment belongs to the blog post.
     *
     * @return BelongsTo
     */
    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class);
    }

    /**
     * Comment belongs to the user.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }

    /**
     * Comment references itself.
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Comment could have many replies.
     *
     * @return HasMany
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

}
