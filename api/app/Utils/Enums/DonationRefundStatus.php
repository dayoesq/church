<?php

namespace App\Utils\Enums;

enum DonationRefundStatus : string
{
    case Pending = 'pending';
    case Processed = 'processed';
    case Rejected = 'rejected';
}
