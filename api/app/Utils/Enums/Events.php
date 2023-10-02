<?php

namespace App\Utils\Enums;
enum Events : string
{
    case Daily = 'daily';
    case Weekly = 'weekly';
    case Bi_weekly = 'bi_weekly';
    case Monthly = 'monthly';
    case Bi_monthly = 'bi_monthly';
    case Quarterly = 'quarterly';
    case Annually = 'annually';
    case Bi_annual = 'bi_annual';
    case Miscellaneous = 'miscellaneous';
}
