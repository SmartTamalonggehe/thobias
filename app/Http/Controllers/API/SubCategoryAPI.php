<?php

namespace App\Http\Controllers\API;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class SubCategoryAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $data = SubCategory::with('category')
            ->where(function ($query) use ($search) {
                $query->where('sub_category_nm', 'like', "%$search%");
            })
            ->orderBy($sortby ?? 'sub_category_nm', $order ?? 'asc')
            ->paginate(10);
        return new CrudResource('success', 'Data SubCategory', $data);
    }

    public function all(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $data = SubCategory::with('category')
            ->where(function ($query) use ($search) {
                $query->where('sub_category_nm', 'like', "%$search%");
            })
            ->orderBy($sortby ?? 'sub_category_nm', $order ?? 'asc')
            ->get();
        return new CrudResource('success', 'Data SubCategory', $data);
    }
}
