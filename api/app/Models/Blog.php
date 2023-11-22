<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @property mixed $images
 * @property string $title
 * @property string $content
 * @property string|int $id
 * @property int|string $author
 * @property mixed $slug
 * @method static where(string $string, string $string1)
 * @method static paginate(int $int)
 */
class Blog extends Model
{
    use HasFactory;

    protected array $images = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'status'
    ];


    /**
     * Interact with the blog's title.
     *
     * @return Attribute
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::words($value)
        );
    }

    /**
     * Sluggify blog's title.
     *
     * @return Attribute
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->slug,
            set: fn () => Str::slug($this->title)
        );
    }

    /**
     * Interact with the blog's relationship with the comment.
     * @return HasMany
     *
     */
    public function comments(): hasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Create an excerpt for the post.
     * It might be worth the while to pass the logic to the client.
     *
     * @param int $length
     * @return string
     */
    public function getExcerpt(int $length = 150): string
    {

        $content = $this->attributes['content'];
        $excerpt = strip_tags($content);
        $excerpt = Str::substr($excerpt, 0, $length);

        if (Str::length($content) > $length) {
            $excerpt .= '...';
        }

        return $excerpt;
    }

}
