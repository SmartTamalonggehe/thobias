<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderAPI extends Controller
{
    public function all(Request $request)
    {
        $user_id = $request->user_id;
        $status = $request->status == 'semua' ? null : $request->status;
        $orders = Order::with([
            'orderItems.productVariant',
            'orderItems.product.productImage',
            'user.recipient',
            'village',
            "shippingStatus",
            "review"
        ])
            ->where('user_id', $user_id)
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status)
                    ->orWhereHas('shippingStatus', function ($query) use ($status) {
                        $query->where('status', $status);
                    });
            })
            ->orderBy('created_at', 'desc')
            ->get();
        return new CrudResource('success', 'Data Order', $orders);
    }

    public function update(Request $request, string $id)
    {
        $data_req = $request->all();
        // return $data_req;

        Order::find($id)->update([
            'status' => $data_req['status'],
        ]);


        return new CrudResource('success', 'Data Berhasil Diubah', []);
    }
}
