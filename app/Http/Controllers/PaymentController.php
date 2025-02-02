<?php

namespace App\Http\Controllers;

use App\Events\NewOrderEvent;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // try {
        //     $result = event(new NewOrderEvent([
        //         'data' => 1,
        //     ]));
        //     Log::info('Event dispatched', ['result' => $result]);
        //     return response()->json(['status' => 'success']);
        // } catch (\Exception $e) {
        //     Log::error('Event dispatch error', ['error' => $e->getMessage()]);
        //     return response()->json(['error' => $e->getMessage()], 500);
        // }
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
