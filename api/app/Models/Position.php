<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Position extends Model
{
    use HasFactory;

    /**
     * Interact with the position's title.
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
