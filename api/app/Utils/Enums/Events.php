<?php

namespace App\Utils\Enums;
enum Events : string
{
    case DAILY = 'daily';
    case WEEKLY = 'weekly';
    case BI_WEEKLY = 'bi_weekly';
    case MONTHLY = 'monthly';
    case BI_MONTHLY = 'bi_monthly';
    case QUARTERLY = 'quarterly';
    case ANNUALLY = 'annually';
    case BI_ANNUAL = 'bi_annual';
    case MISCELLANEOUS = 'miscellaneous';
}
