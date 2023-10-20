<?php

namespace App\Utils\Enums;

enum DonationStatus : string
{
    case Pending = 'pending';
    case successful = 'successful';
    case Failed = 'failed';

}
