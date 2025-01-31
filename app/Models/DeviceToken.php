<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class DeviceToken extends Model
{
    use HasUuids;
    // hasOne user
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
