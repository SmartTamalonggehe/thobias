<?php

namespace App\Http\Controllers;

use App\Http\Resources\CrudResource;
use App\Models\Notification;
use App\Services\FCMService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    protected $fcmService;

    public function __construct(FCMService $fcmService)
    {
        $this->fcmService = $fcmService;
    }

    public function sendNotification(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        $url = config('app.url');
        $data = [
            'route' => "$url/notifications", // URL tujuan
            'type' => 'navigation',
        ];

        $result = $this->fcmService->sendNotification(
            $request->token,
            $request->title,
            $request->body,
            $data
        );

        return response()->json($result);
    }

    public function sendMultipleNotifications(Request $request)
    {
        $request->validate([
            'tokens' => 'required|array',
            'tokens.*' => 'string',
            'title' => 'required|string',
        ]);

        $url = config('app.url');
        $data = [
            'route' => "$url/notifications", // URL tujuan
            'type' => 'navigation',
        ];

        $result = $this->fcmService->sendMultipleNotifications(
            $request->tokens,
            $request->title,
            $request->body,
            $data
        );

        return response()->json($result);
    }
}
