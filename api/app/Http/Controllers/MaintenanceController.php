<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;

class MaintenanceController extends Controller
{
    /**
     * @throws AuthorizationException
     */
    public function enable(): JsonResponse
    {
        $this->authorize('toggleMaintenance', User::class);

        Artisan::call('down');
        return $this->ok(message: 'Maintenance mode enabled.');
    }

    /**
     * @throws AuthorizationException
     */
    public function disable(): JsonResponse
    {
        $this->authorize('toggleMaintenance', User::class);

        Artisan::call('up');
        return $this->ok(message: 'Maintenance mode disabled.');
    }

}
