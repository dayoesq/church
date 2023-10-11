<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @method static create(mixed $data)
 * @method static findOrFail(int $id)
 */
class Position extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
    ];


    /**
     * Interact with the position's title.
     *
     * @return Attribute
     */
    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Str::words($value),
            set: fn ($value) => Str::lower($value),
        );
    }


}
