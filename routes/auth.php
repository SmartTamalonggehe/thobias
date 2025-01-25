<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', [App\Http\Controllers\Auth\AuthController::class, 'login']);
Route::post('/register', [App\Http\Controllers\Auth\AuthController::class, 'register']);
// route group middleware api
Route::middleware('auth:api')->group(function () {
    Route::post('/cek_token', [App\Http\Controllers\Auth\AuthController::class, 'cekToken']);
    Route::post('/logout', [App\Http\Controllers\Auth\AuthController::class, 'logout']);
});
