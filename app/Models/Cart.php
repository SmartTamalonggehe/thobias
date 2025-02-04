<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Cart extends Model
{
    use HasUuids;

    // hasOne product
    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    // hasOne productVariant
    public function productVariant()
    {
        return $this->hasOne(ProductVariant::class, 'id', 'product_variant_id');
    }
}
