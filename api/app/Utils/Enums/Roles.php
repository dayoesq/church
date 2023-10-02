<?php

namespace App\Utils\Enums;

enum Roles : string
{
    case Admin = 'admin';
    case Management = 'management';
    case Super = 'super';
    case User = 'user';
}
