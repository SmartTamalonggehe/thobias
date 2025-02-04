<?php

namespace App\Http\Controllers;

use App\Models\DeviceToken;
use Illuminate\Http\Request;

class DeviceTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // create or update, upadate if user_id already exists
        $data_req = $request->all();

        DeviceToken::updateOrCreate([
            'user_id' => $data_req['user_id'],
        ], [
            'fcm_token' => $data_req['fcm_token'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(DeviceToken $deviDeviceToken)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DeviceToken $deviDeviceToken)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeviceToken $deviDeviceToken)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeviceToken $deviDeviceToken)
    {
        //
    }
}
