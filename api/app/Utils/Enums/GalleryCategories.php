<?php

namespace App\Utils\Enums;

enum GalleryCategories : string
{
    case Adults = 'adults';
    case Children = 'children';
    case Evangelism = 'evangelism';
    case SummerCamp = 'summer_camp';
    case SundaySchool = 'sunday_school';
    case Revival = 'revival';
    case Baptism = 'baptism';
    case SpecialEvent = 'special_event';
    case Birthday = 'birthday';
    case Anniversary = 'anniversary';
    case ChildDedication = 'child_dedication';
}
