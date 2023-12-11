<?php

namespace App\Utils\Enums;

enum EventStatus : string
{
    case Ongoing = 'ongoing';
    case Upcoming = 'upcoming';
    case Concluded = 'concluded';
}
