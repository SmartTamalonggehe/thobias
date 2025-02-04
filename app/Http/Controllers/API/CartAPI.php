<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\Auth;

class CartAPI
{
    public function index(Request $request)
    {
        $cartItems = Cart::with(['product.productImage', 'productVariant'])
            ->where('user_id', Auth::id())->get();
        return new CrudResource('success', 'Data Cart', $cartItems);
    }

    public function store(Request $request)
    {
        $productId = $request->input('product_id');
        $product_variant_id = $request->input('product_variant_id');
        $quantity = $request->input('quantity', 1);

        // Cek apakah item sudah ada di cart
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->when($product_variant_id, function ($query) use ($product_variant_id) {
                return $query->where('product_variant_id', $product_variant_id);
            })
            ->first();

        if ($cartItem) {
            // Jika sudah ada, tambahkan quantity
            $cartItem->increment('quantity', $quantity);
        } else {
            // Jika belum ada, buat baru dengan quantity
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $productId,
                'product_variant_id' => $product_variant_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json(['message' => 'Added to database cart']);
    }

    public function costumeQuantity(Request $request)
    {
        $productId = $request->input('product_id');
        $product_variant_id = $request->input('product_variant_id');
        $quantity = $request->input('quantity', 1);

        // Cek apakah item sudah ada di cart
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->when($product_variant_id, function ($query) use ($product_variant_id) {
                return $query->where('product_variant_id', $product_variant_id);
            })
            ->first();

        // update quantity
        if ($cartItem) {
            $cartItem->update(['quantity' => $quantity]);
        } else {
            // Jika belum ada, buat baru dengan quantity
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $productId,
                'product_variant_id' => $product_variant_id,
                'quantity' => $quantity
            ]);
        }

        return response()->json(['message' => 'Updated to database cart']);
    }

    // Destroy Cart
    public function destroy(Request $request)
    {
        $id = $request->input('id');

        $cartItem = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Removed from database cart']);
        }

        return response()->json(['message' => 'Product not found in database cart'], 404);
    }
}
