<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

// group shipping
Route::prefix('shipping')->group(function () {
    //    resources
    Route::resources([
        'subDistricts' => App\Http\Controllers\SubDistrictController::class
    ]);
});
