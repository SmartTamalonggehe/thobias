<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class FCMService
{
    protected $messaging;

    public function __construct()
    {
        try {
            // Menggunakan helper function dari package untuk mendapatkan instance Firebase
            $this->messaging = app('firebase.messaging');
        } catch (\Exception $e) {
            Log::error('Firebase Messaging initialization failed: ' . $e->getMessage());
            throw $e;
        }
    }

    public function sendNotification($token, $title, $body, $data = [])
    {
        try {
            $notification = Notification::create($title, $body);

            $message = CloudMessage::withTarget('token', $token)
                ->withNotification($notification);

            if (!empty($data)) {
                $message = $message->withData($data);
            }

            $this->messaging->send($message);

            return [
                'success' => true,
                'message' => 'Notification sent successfully'
            ];
        } catch (\Exception $e) {
            Log::error('Failed to send notification: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function sendMultipleNotifications($tokens, $title, $body, $data = [])
    {
        try {
            $notification = Notification::create($title, $body);

            $message = CloudMessage::new()
                ->withNotification($notification);

            if (!empty($data)) {
                $message = $message->withData($data);
            }

            $this->messaging->sendMulticast($message, $tokens);

            return [
                'success' => true,
                'message' => 'Notifications sent successfully'
            ];
        } catch (\Exception $e) {
            Log::error('Failed to send multiple notifications: ' . $e->getMessage());

            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}
