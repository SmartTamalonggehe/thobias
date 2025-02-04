<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Recipient extends Model
{
    use HasUuids;

    // belongsTo village
    public function village()
    {
        return $this->belongsTo(Village::class);
    }
}
