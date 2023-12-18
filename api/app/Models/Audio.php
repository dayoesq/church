<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Str;

class Audio extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'url',
        'caption',
        'author'
    ];

    protected $table = 'audio';

    /**
     * Convert caption to lowercase.
     *
     * @return Attribute
     */
    protected function caption(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * The image is morphed to many models.
     *
     * @return MorphTo
     */
    public function audioable(): MorphTo
    {
        return $this->morphTo();
    }
}
