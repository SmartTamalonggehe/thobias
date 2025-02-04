<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Order extends Model
{
    use HasUuids;

    // has many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // has one village
    public function village()
    {
        return $this->hasOne(Village::class, 'id', 'village_id');
    }

    // has one shipping status
    public function shippingStatus()
    {
        return $this->hasOne(ShippingStatus::class, 'order_id', 'id');
    }

    // hasMany reviews
    public function review()
    {
        return $this->hasMany(Review::class);
    }

    public function notifications(): MorphMany
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
