<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @property mixed $images
 * @property mixed $title
 * @property mixed $status
 * @property mixed $body
 * @property mixed $excerpt
 * @property mixed $delivered_by
 * @property mixed $content
 * @method static create(mixed $data)
 */
class Sermon extends Model
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
        'excerpt',
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

}
