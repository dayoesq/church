<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'organized_by',
        'description',
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
    protected function organizedBy(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::words($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Create slug out of event's title.
     *
     * @return Attribute
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::slug($value),
        );
    }

    /**
     * Event's relationship with the anchor.
     *
     * @return HasMany
     */
    public function anchors(): HasMany
    {
        return $this->hasMany(Anchor::class);
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
