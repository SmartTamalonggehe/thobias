<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Cart extends Model
{
    use HasUuids;

    // belongsTo productVariant
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
