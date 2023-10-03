<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\Traits\HasUpdates;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, ApiResponse, HasUpdates;
}
