<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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
        'genre',
        'author'
    ];

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
