<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @method static create(mixed $data)
 * @method static findOrFail(int $id)
 * @property int $id
 */
class Project extends Model
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
        'description',
        'target_amount',
        'requires_donation',
        'duration',
        'status',
        'starts_at',
        'ends_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'requires_donation' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime'
    ];

    /**
     * Project's relationship with the image.
     *
     * @return MorphMany
     */
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    /**
     * Project has many donations.
     *
     * @return HasMany
     */
    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }

}
