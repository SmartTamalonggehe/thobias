<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Review extends Model
{
    use HasUuids;

    // belongsTo product
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    // belongsTo user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
