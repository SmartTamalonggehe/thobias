<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class OrderItem extends Model
{
    use HasUuids;

    // has one to productVariant
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    // belongsTo order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
