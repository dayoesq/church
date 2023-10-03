<?php

namespace App\Utils\Enums;

enum PostStatus : string
{
    case Active = 'active';
    case Pending = 'pending';
    case Draft = 'draft';
    case Archived = 'archived';
    case Published = 'published';

}
