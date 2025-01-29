<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class ProductAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $sub_category_id = $request->sub_category_id;
        $category_id = $request->category_id;
        $limit = $request->limit ?? 10;
        $data = Product::with(['subCategory.category', 'productVariant', 'productImage'])
            ->where(function ($query) use ($search) {
                $query->where('product_nm', 'like', "%$search%");
            })
            ->when($sub_category_id, function ($query) use ($sub_category_id) {
                $query->where('sub_category_id', $sub_category_id);
            })
            ->when($category_id, function ($query) use ($category_id) {
                $query->whereHas('subCategory.category', function ($query) use ($category_id) {
                    $query->where('category_id', $category_id);
                });
            })
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->paginate($limit);
        return new CrudResource('success', 'Data Product', $data);
    }

    public function all(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $sub_category_id = $request->sub_category_id;
        $category_id = $request->category_id;
        $data = Product::with(['subCategory.category', 'productVariant', 'productImage'])
            ->where(function ($query) use ($search) {
                $query->where('product_nm', 'like', "%$search%");
            })
            ->where(function ($query) use ($sub_category_id) {
                $query->where('sub_category_id', $sub_category_id);
            })
            ->where(function ($query) use ($category_id) {
                $query->whereHas('subCategory.category', function ($query) use ($category_id) {
                    $query->where('category_id', $category_id);
                });
            })
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->get();
        return new CrudResource('success', 'Data Product', $data);
    }
    // detail
    public function detail($id)
    {
        $data = Product::with(['subCategory.category', 'productVariant', 'productImage'])->find($id);
        return new CrudResource('success', 'Data Product', $data);
    }
}
