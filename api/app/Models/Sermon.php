<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property string $title
 * @property string $slug
 * @property string $status
 * @property string $summary
 * @property string author
 * @property mixed $audios
 * @method static create(mixed $data)
 */
class Sermon extends Model
{
    use HasFactory;

    protected array $audios = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'status',
        'summary',
        'author'
    ];

    /**
     * Interact with the sermon's title.
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
     * Sluggify the sermon's title.
     *
     * @return Attribute
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::slug($value)
        );
    }

    /**
     * The sermon morphs many audios
     *
     * @return MorphMany
     */
    public function audios(): MorphMany
    {
        return $this->morphMany(Audio::class, 'audioable');
    }

}
