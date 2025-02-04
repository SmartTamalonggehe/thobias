<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationAPI extends Controller
{
    public function index(Request $request)
    {
        $data = Notification::with('notifiable')->orderBy('updated_at', 'desc')->paginate(10);
        return new CrudResource('success', 'Data Notification', $data);
    }

    public function all(Request $request)
    {
        $query = Notification::with('notifiable')
            ->whereHas('notifiable')
            ->orderBy('updated_at', 'desc');

        // Filter berdasarkan type jika dikirim dari request
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter berdasarkan notifiable.status jika dikirim dari request
        if ($request->has('notifiable.status')) {
            $query->whereHas('notifiable', function ($q) use ($request) {
                $q->where('status', $request->input('notifiable.status'));
            });
        }

        $data = $query->get();

        return new CrudResource('success', 'Data Notification', $data);
    }

    // store
    // store
    public function store($data_req)
    {
        $data = Notification::create([
            'type' => $data_req['type'],
            'notifiable_type' => $data_req['notifiable_type'], // Tambahkan ini
            'notifiable_id' => $data_req['notifiable_id'], // Tambahkan ini
            'data' => $data_req['data'], // encode data array ke JSON
            'read' => false,
        ]);

        return new CrudResource('success', 'Data Berhasil Disimpan', $data);
    }

    // update read to true
    public function update(string $id)
    {
        $data = Notification::find($id);
        $data->read = true;
        $data->save();

        return new CrudResource('success', 'Data Berhasil Diubah', $data);
    }
}
