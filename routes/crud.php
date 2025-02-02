<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::resources([
    'subDistricts' => App\Http\Controllers\SubDistrictController::class,
    'villages' => App\Http\Controllers\VillageController::class,
    'categories' => App\Http\Controllers\CategoryController::class,
    'subCategories' => App\Http\Controllers\SubCategoryController::class,
    'products' => App\Http\Controllers\ProductController::class,
    'productVariants' => App\Http\Controllers\ProductVariantController::class,
    'productImages' => App\Http\Controllers\ProductImageController::class,
    'orders' => App\Http\Controllers\OrderController::class,
    'reviews' => App\Http\Controllers\ReviewController::class,
    'payments' => App\Http\Controllers\PaymentController::class
]);
