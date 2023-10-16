<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property mixed $images
 * @property string $title
 * @property string $content
 * @property mixed $written_by
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
            set: fn ($value) => Str::slug($value)
        );
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

    /**
     * Blog's relationship with the image.
     *
     * @return MorphMany
     */
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
