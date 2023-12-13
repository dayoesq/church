<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property string $title
 * @property mixed $starts_at
 * @property mixed $ends_at
 * @property string $organized_by
 * @property string $anchors
 * @property string $slug
 * @property string $description
 * @property mixed $images
 * @method static create(array $validated)
 * @method static where(string $string, string $value)
 */
class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'organizer',
        'description',
        'location',
        'fee',
        'slug',
        'status',
        'starts_at',
        'ends_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    /**
     * Interact with the event's organiser.
     *
     * @return Attribute
     */
    protected function organizer(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::upper($value),
        );
    }

    /**
     * Event's relationship with the image.
     *
     * @return MorphMany
     */
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }


}
