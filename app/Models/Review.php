<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Review extends Model
{
    use HasUuids;

    // belongsTo product variant
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    // belongsTo product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // belongsTo user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
