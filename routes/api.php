<?php

use Illuminate\Support\Facades\Route;

// api prefix categories
Route::prefix('categories')->group(function () {
    Route::get('/', [App\Http\Controllers\API\CategoryAPI::class, 'index']);
    Route::get('/all', [App\Http\Controllers\API\CategoryAPI::class, 'all']);
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
    Route::get('/detail/{id}', [App\Http\Controllers\API\ProductAPI::class, 'detail']);
});

// api prefix villages
Route::prefix('villages')->group(function () {
    Route::get('/', [App\Http\Controllers\API\VillageAPI::class, 'index']);
    Route::get('/all', [App\Http\Controllers\API\VillageAPI::class, 'all']);
});

// group middleware api
Route::middleware('auth:api')->group(function () {
    Route::prefix('carts')->group(function () {
        Route::get('/', [App\Http\Controllers\API\CartAPI::class, 'index']);
        Route::post('/', [App\Http\Controllers\API\CartAPI::class, 'store']);
        Route::delete('/', [App\Http\Controllers\API\CartAPI::class, 'destroy']);
        Route::post('/costumeQuantity', [App\Http\Controllers\API\CartAPI::class, 'costumeQuantity']);
    });

    Route::resources([
        'recipients' => App\Http\Controllers\API\RecipientAPI::class
    ]);
});

// payments
Route::group(['prefix' => 'payment'], function () {
    Route::post('/', [App\Http\Controllers\API\PaymentAPI::class, 'submitPayment'])->name('submitPayment');
    Route::get('transactionStatus/{orderId}', [App\Http\Controllers\API\PaymentAPI::class, 'getTransactionStatus'])->name('getTransactionStatus');
    Route::post('callback', [App\Http\Controllers\API\PaymentAPI::class, 'paymentCallback'])->name('paymentCallback');
});

// orders
Route::group(['prefix' => 'orders'], function () {
    Route::get('all', [App\Http\Controllers\API\OrderAPI::class, 'all'])->name('orders.all');
    Route::post('update/{id}', [App\Http\Controllers\API\OrderAPI::class, 'update'])->name('orders.update');
});
