<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ProductImage extends Model
{
    use HasUuids;

    // belongsTo product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
