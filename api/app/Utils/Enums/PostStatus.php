<?php

namespace App\Utils\Enums;

enum PostStatus : string
{
    case Draft = 'draft';
    case Archived = 'archived';
    case Published = 'published';

}
