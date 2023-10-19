<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
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
        'payment_method',
        'notes',
        'acknowledge_sent',
        'source',
        'currency',
        'status',
        'refund_status',
        'ip_address',
        'amount',
        'payment_date'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_anonymous' => 'boolean',
        'acknowledge_sent' => 'boolean',
        'is_refund_requested' => 'boolean'
    ];
}

