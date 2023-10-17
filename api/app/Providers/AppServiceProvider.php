<?php

namespace App\Providers;

use App\Mail\Updated;
use App\Mail\Welcome;
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        User::created(callback: function ($user) {
            retry(5, function() use ($user) {
                Mail::to($user)->send(new Welcome($user));
            }, 100);
        });

        User::updated(callback: function ($user) {
            if($user->isDirty('email')) {
                retry(5, function() use ($user) {
                    Mail::to($user)->send(new Updated($user));
                }, 100);
            }

        });

        Gate::define('update-self', [UserPolicy::class, 'updateSelf']);

    }
}
