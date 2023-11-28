<?php

namespace App\Utils\Enums;

enum RefundStatus : string
{
    case Pending = 'pending';
    case Processed = 'processed';
    case Rejected = 'rejected';
}
