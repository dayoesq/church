<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @method static create(mixed $data)
 */
class Anchor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'title'
    ];

    /**
     * Interact with the anchor's first name.
     *
     * @return Attribute
     */
    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Interact with the anchor's last name.
     *
     * @return Attribute
     */
    protected function lastName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Interact with the anchor's email.
     *
     * @return Attribute
     */
    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Str::lower($value),
        );
    }

    /**
     * Interact with the anchor's title.
     *
     * @return Attribute
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::ucfirst($value),
            set: fn ($value) => Str::lower($value),
        );
    }

}
