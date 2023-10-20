<?php

namespace App\Utils\Enums;

enum ProjectStatus : string
{
    case Proposed = 'proposed';
    case OnGoing = 'on_going';
    case Completed = 'completed';
    case Abandoned = 'abandoned';
}
