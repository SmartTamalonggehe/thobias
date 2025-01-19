<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CrudResource;

class CategoryAPI extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $data = Category::where(function ($query) use ($search) {
            $query->where('category_nm', 'like', "%$search%");
        })
            ->orderBy($sortby ?? 'category_nm', $order ?? 'asc')
            ->paginate(10);
        return new CrudResource('success', 'Data Category', $data);
    }
}
