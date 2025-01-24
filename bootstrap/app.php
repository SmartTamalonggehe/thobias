<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function ($router) {
            Route::middleware('web')
                ->name('web')
                ->group(base_path('routes/web.php'));

            Route::prefix('auth')
                ->middleware('api')
                ->name('auth')
                ->group(base_path('routes/auth.php'));

            Route::middleware('api')
                ->prefix('crud')
                ->name('crud')
                ->group(base_path('routes/crud.php'));

            Route::prefix('api')
                ->middleware('api')
                ->name('api')
                ->group(base_path('routes/api.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
