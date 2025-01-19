<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductVariant extends Model
{
    use HasUuids;

    // belongsTo
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // hasMany
    public function productImage()
    {
        return $this->hasMany(ProductImage::class);
    }

    // hasMany review
    public function review()
    {
        return $this->hasMany(Review::class);
    }

    // hasMany orderItem
    public function orderItem()
    {
        return $this->hasMany(OrderItem::class);
    }
}
