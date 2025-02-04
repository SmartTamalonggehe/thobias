<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Village extends Model
{
    use HasUuids;
    // belongsTo subDistrict
    public function subDistrict()
    {
        return $this->belongsTo(SubDistrict::class);
    }
}
