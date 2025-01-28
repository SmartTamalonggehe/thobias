<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Category extends Model
{
    use HasUuids;

    // hasMany
    public function subCategory()
    {
        return $this->hasMany(SubCategory::class);
    }
}
