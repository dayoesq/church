<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property string $title
 * @property string $type
 * @property mixed $organised_by
 * @property mixed $starts_at
 * @property mixed $ends_at
 * @property mixed $created_by
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
        'type',
        'organised_by',
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
    protected function organisedBy(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::words($value),
            set: fn ($value) => Str::lower($value),
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
