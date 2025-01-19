<?php

use Illuminate\Support\Facades\Route;

// api prefix categories
Route::prefix('categories')->group(function () {
    Route::get('/', [App\Http\Controllers\API\CategoryAPI::class, 'index']);
});

// api prefix subcategories
Route::prefix('subCategories')->group(function () {
    Route::get('/', [App\Http\Controllers\API\SubCategoryAPI::class, 'index']);
    Route::get('/all', [App\Http\Controllers\API\SubCategoryAPI::class, 'all']);
});

// api prefix products
Route::prefix('products')->group(function () {
    Route::get('/', [App\Http\Controllers\API\ProductAPI::class, 'index']);
    Route::get('/all', [App\Http\Controllers\API\ProductAPI::class, 'all']);
});
