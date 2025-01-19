<?php

namespace App\Http\Controllers\API;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class ProductImageAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $product_variant_id = $request->product_variant_id;
        $data = ProductImage::with('productVariant')
            ->where(function ($query) use ($search) {
                $query->where('is_main', 'like', "%$search%");
            })
            ->where(function ($query) use ($product_variant_id) {
                $query->where('product_variant_id', $product_variant_id);
            })
            ->orderBy($sortby ?? 'is_main', $order ?? 'asc')
            ->paginate(10);
        return new CrudResource('success', 'Data ProductImage', $data);
    }
}
