<?php

namespace App\Utils\Enums;

enum AudioGenre : string
{
    case Sermon = 'sermon';
    case Worship = 'worship';
    case Praise = 'praise';
    case PraiseWorship = 'praise & worship';
    case Message = 'message';

}
