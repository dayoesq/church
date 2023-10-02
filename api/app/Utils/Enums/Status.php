<?php

namespace App\Utils\Enums;
enum Status : string
{
    case Active = 'active';
    case Pending = 'pending';
    case Banned = 'banned';
    case Suspended = 'suspended';

}
