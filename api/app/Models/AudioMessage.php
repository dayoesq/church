<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

/**
 * @property string $title
 * @property string $slug
 * @property string $status
 * @property string $summary
 * @property string author
 * @property string genre
 * @property mixed $audio
 * @method static create(mixed $data)
 */
class AudioMessage extends Model
{
    use HasFactory;

    //protected array $audios = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'status',
        'genre'
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
     * @return MorphOne
     */
    public function audio(): MorphOne
    {
        return $this->morphMany(Audio::class, 'audioable');
    }

}