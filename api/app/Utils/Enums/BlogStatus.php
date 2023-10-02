<?php

namespace App\Utils\Enums;

enum BlogStatus : string
{
    case Active = 'active';
    case Pending = 'pending';
    case Draft = 'draft';
    case Archived = 'archived';
    case Published = 'published';

}
