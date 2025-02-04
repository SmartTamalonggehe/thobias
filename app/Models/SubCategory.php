<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SubCategory extends Model
{
    use HasUuids;

    // beloangTo category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // hasMany
    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
