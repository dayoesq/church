<?php

namespace App\Utils\Enums;

enum DonationSource : string
{
    case Website = 'website';
    case MobileApp = 'mobile_app';
    case InPerson = 'in_person';
}
