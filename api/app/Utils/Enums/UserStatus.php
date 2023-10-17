<?php

namespace App\Utils\Enums;
enum UserStatus : string
{
    case Active = 'verified';
    case Pending = 'pending';
    case Banned = 'banned';
    case Suspended = 'suspended';

}
