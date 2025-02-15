<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Product extends Model
{
    use HasUuids;

    // belongsTo category
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    // hasMany productVariants
    public function productVariant()
    {
        return $this->hasMany(ProductVariant::class);
    }

    // hasMany
    public function productImage()
    {
        return $this->hasMany(ProductImage::class);
    }

    // hasMany
    public function review()
    {
        return $this->hasMany(Review::class);
    }
}
