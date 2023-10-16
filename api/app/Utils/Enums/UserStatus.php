<?php

namespace App\Utils\Enums;
enum UserStatus : string
{
    case Active = 'active';
    case Pending = 'pending';
    case Banned = 'banned';
    case Suspended = 'suspended';

}
