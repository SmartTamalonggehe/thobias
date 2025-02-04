<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\ProductVariant;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class ProductVariantAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $product_id = $request->product_id;
        $data = ProductVariant::with('product')
            ->where(function ($query) use ($search) {
                $query->where('product_id', 'like', "%$search%");
            })
            ->where(function ($query) use ($product_id) {
                $query->where('product_id', $product_id);
            })
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->paginate(10);
        return new CrudResource('success', 'Data ProductVariant', $data);
    }
}
