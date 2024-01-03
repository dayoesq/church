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
 * @property string $cover_image
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
        'status',
        'cover_image'
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
     * Interact with the blog's relationship with the comment.
     * @return HasMany
     *
     */
    public function comments(): hasMany
    {
        return $this->hasMany(Comment::class);
    }

}
