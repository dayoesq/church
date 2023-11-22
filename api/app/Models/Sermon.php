<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Str;

/**
 * @property mixed $images
 * @property mixed $title
 * @property mixed $status
 * @property mixed $body
 * @property mixed $excerpt
 * @property mixed $delivered_by
 * @property mixed $content
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
        'status',
        'delivered_by'
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
     * The sermon morphs many audios
     *
     * @return MorphMany
     */
    public function audios(): MorphMany
    {
        return $this->morphMany(Audio::class, 'audioable');
    }

}
