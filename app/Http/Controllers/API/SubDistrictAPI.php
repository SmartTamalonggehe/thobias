<?php

namespace App\Http\Controllers\API;

use App\Models\SubDistrict;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class SubDistrictAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $data = SubDistrict::where(function ($query) use ($search) {
            $query->where('sub_district_nm', 'like', "%$search%");
        })
            ->orderBy($sortby ?? 'sub_district_nm', $order ?? 'asc')
            ->paginate(10);
        return new CrudResource('success', 'Data SubDistrict', $data);
    }
}
