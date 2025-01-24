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
        $cartItems = Cart::where('user_id', Auth::id())->get();
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

    // Destroy Cart
    public function destroy(Request $request)
    {
        $productId = $request->input('product_id');

        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Removed from database cart']);
        }

        return response()->json(['message' => 'Product not found in database cart'], 404);
    }
    public function copySessionCartToDatabase()
    {
        $cart = session()->get('cart', []);

        foreach ($cart as $productId => $item) {
            Cart::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'product_id' => $productId
                ],
                [
                    'quantity' => $item['quantity']
                ]
            );
        }

        session()->forget('cart'); // Hapus sesi setelah memindahkan ke tabel
    }

    // Mengupdate Cart di Tabel
    public function setCartQuantity(Request $request)
    {
        $productId = $request->input('product_id');
        $newQuantity = $request->input('quantity');

        // Cek apakah item ada di cart
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            // Jika item ditemukan, update quantity
            if ($newQuantity > 0) {
                $cartItem->update(['quantity' => $newQuantity]);
                return response()->json(['message' => 'Product quantity updated in database cart']);
            } else {
                // Jika quantity baru kurang dari atau sama dengan 0, hapus item dari cart
                $cartItem->delete();
                return response()->json(['message' => 'Product removed from cart due to zero quantity']);
            }
        } else {
            // Jika item tidak ditemukan di cart, dan newQuantity lebih dari 0, tambahkan ke cart
            if ($newQuantity > 0) {
                Cart::create([
                    'user_id' => Auth::id(),
                    'product_id' => $productId,
                    'quantity' => $newQuantity
                ]);
                return response()->json(['message' => 'Product added to cart with specified quantity']);
            } else {
                // Jika newQuantity tidak lebih dari 0, tidak perlu menambahkan apa-apa
                return response()->json(['message' => 'No action taken, quantity specified is zero or less']);
            }
        }
    }
}
