<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ShippingStatusEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $shipping_status;

    public function __construct($shipping_status)
    {
        $this->shipping_status = $shipping_status;
    }

    public function broadcastOn()
    {
        return new Channel('shipping_status');
    }

    public function broadcastAs()
    {
        return 'new_shipping_status';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->shipping_status->id,
            'status' => $this->shipping_status->status,
        ];
    }
}
