<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ShippingStatus extends Model
{
    use HasUuids;

    // has one order
    public function order()
    {
        return $this->hasOne(Order::class);
    }
}
