<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewOrderEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    /**
     * Create a new event instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
        Log::info('NewOrderEvent triggered', ['data' => $data]);
    }

    public function broadcastOn()
    {
        try {
            Log::info('Broadcasting on orders channel');
            return new Channel('orders');
        } catch (\Exception $e) {
            Log::error('Broadcast error', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    public function broadcastAs()
    {
        return 'new_order';
    }

    public function broadcastWith()
    {
        return $this->data;
    }
}
