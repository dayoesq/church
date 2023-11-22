<?php

namespace App\Providers;

use App\Models\Blog;
use App\Models\Event;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api/v1')
                ->group(base_path('routes/api.php'));

        });

        // Custom model binding
        Route::bind('event', function (string $value) {
            return Event::where('slug', $value)->firstOrFail();
        });

        Route::bind('blog', function (string $value) {
            return Blog::where('slug', $value)->firstOrFail();
        });
    }
}
