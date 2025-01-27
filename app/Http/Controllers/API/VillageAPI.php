<?php

namespace App\Http\Controllers\API;

use App\Models\Village;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class VillageAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $data = Village::with('subDistrict')->where(function ($query) use ($search) {
            $query->where('village_nm', 'like', "%$search%");
        })
            ->orderBy($sortby ?? 'village_nm', $order ?? 'asc')
            ->paginate(10);
        return new CrudResource('success', 'Data Village', $data);
    }

    // all
    public function all()
    {
        $data = Village::with('subDistrict')->get();
        return new CrudResource('success', 'Data Village', $data);
    }
}
