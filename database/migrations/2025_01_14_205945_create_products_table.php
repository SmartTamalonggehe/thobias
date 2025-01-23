<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('sub_category_id')->constrained('sub_categories')->cascadeOnDelete();
            $table->string('product_nm');
            $table->boolean('has_variants')->default(false); // Indikator apakah produk memiliki varian
            $table->integer('price')->nullable(); // Harga untuk produk tanpa varian
            $table->integer('stock')->nullable(); // Stok untuk produk tanpa varian
            $table->text('product_desc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
