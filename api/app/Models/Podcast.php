<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property string $title
 * @property string $status
 * @property string $summary
 * @property string author
 * @property string genre
 * @property array $podcasts
 * @method static create(mixed $data)
 * @method static get(string[] $array)
 */
class Podcast extends Model
{
    use HasFactory;

    protected array $audio = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'status',
        'genre',
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
            set: fn ($value) => Str::lower($value)
        );
    }

    /**
     * The audio message morphs podcasts
     *
     * @return MorphMany
     */
    public function audio(): MorphMany
    {
        return $this->morphMany(Audio::class, 'audioable');
    }
}
