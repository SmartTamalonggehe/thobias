<?php

namespace App\Http\Controllers;

use App\Events\NewOrderEvent;
use App\Events\ShippingStatusEvent;
use App\Http\Controllers\API\NotificationAPI;
use App\Http\Resources\CrudResource;
use App\Models\Cart;
use App\Models\DeviceToken;
use App\Models\Order;
use App\Models\ShippingStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $notification, $notificationController;
    // constractor
    public function __construct()
    {
        $this->notification = new NotificationAPI();
        $this->notificationController = new NotificationController();
    }
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'status' => 'required',
        ];

        $messages = [
            'status.required' => 'Nama Order harus diisi.',
        ];
        $validator = Validator::make($request, $rules, $messages);

        if ($validator->fails()) {
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $validator->errors()->first(),
            ];
            return response()->json($message, 400);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $status = explode(',', $request->status);

        $orders = Order::with([
            'user.recipient',
            'orderItems.productVariant.product',
            'village.subDistrict',
            'review',
            'orderItems.product.productImage',
            "shippingStatus",
            "review"
        ])
            ->where(function ($query) use ($search) {
                $query->where('status', 'like', "%$search%");
            })
            ->when($sortby, function ($query) use ($sortby, $order) {
                $query->orderBy($sortby, $order ?? 'asc');
            })
            ->when($status, function ($query) use ($status) {
                $query->whereIn('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return new CrudResource('success', 'Data Order', $orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req);
        if ($validate) {
            return $validate;
        }

        DB::beginTransaction();
        try {
            $order = Order::create($request->only([
                'user_id',
                'village_id',
                'nm_recipient',
                'phone',
                'address',
                'shipping_cost',
                'total_price',
                'total_payment',
                'status',
            ]));

            foreach ($request->carts as $item) {
                // escape product
                unset($item['product_variant'], $item['product'], $item['created_at'], $item['updated_at']);
                $order->orderItems()->create($item);
                // delete cart
            }
            Cart::where('user_id', $request->user_id)->delete();
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Disimpan', $order->load('orderItems'));
        } catch (\Throwable $th) {
            DB::rollBack();
            // error
            return response()->json(['message' => $th->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req, $id);
        if ($validate) {
            return $validate;
        }
        DB::beginTransaction();
        try {
            $data = ShippingStatus::find($id);

            $data->update([
                'status' => $data_req['status'],
            ]);

            // event
            event(new ShippingStatusEvent($data));

            // notification
            $this->notification->store([
                'type' => 'shipping_status',
                'notifiable_type' => 'App\Models\ShippingStatus', // Tambahkan ini
                'notifiable_id' => $id, // Tambahkan ini
                'data' => json_encode($data), // encode data array ke JSON
                'read' => false,
            ]);

            // find fcm token in deviceToken table
            $deviceToken = DeviceToken::where('user_id', $data->user_id)->first();
            $requestFCM = new Request();
            $body = "";
            if ($data->status == "dikemas") {
                $body = "Pesanan Anda Sedang Di Proses. Silahkan Tunggu";
            } elseif ($data->status == "dikirim") {
                $body = "Pesanan Anda Sedang Dalam Pengiriman. Silahkan Tunggu";
            } elseif ($data->status == "selesai") {
                $body = "Anda Telah Menyelesaikan Pesanan. Silahkan berikan Ulasan";
            }
            $requestFCM->merge([
                'token' => $deviceToken->token,
                'title' => $data->status,
                'body' => $body,
            ]);


            $this->notificationController->sendNotification($request);

            DB::commit();
            return new CrudResource('success', 'Data Berhasil Diubah', []);
        } catch (\Throwable $th) {
            DB::rollBack();
            // error
            return response()->json(['message' => $th->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Order::findOrFail($id);
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
