<?php

namespace App\Utils\Enums;

enum Roles : string
{
    case ADMIN = 'admin';
    case MANAGEMENT = 'management';
    case SUPER = 'super';
    case USER = 'user';
}
