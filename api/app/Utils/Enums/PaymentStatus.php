<?php

namespace App\Utils\Enums;

enum PaymentStatus : string
{
    case Pending = 'pending';
    case Successful = 'successful';
    case Failed = 'failed';
}
