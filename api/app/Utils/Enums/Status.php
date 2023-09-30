<?php

namespace App\Utils\Enums;
enum Status : string
{
    case ACTIVE = 'active';
    case PENDING = 'pending';
    case BANNED = 'banned';
    case SUSPENDED = 'suspended';

}
