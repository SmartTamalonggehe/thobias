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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('village_id')->constrained('villages')->cascadeOnDelete();
            $table->string('nm_recipient');
            $table->string('phone');
            $table->text('address');
            $table->integer('shipping_cost');
            $table->integer('total_price');
            $table->integer('total_payment');
            $table->text('snap_token')->nullable();
            $table->string('status'); // belum bayar, dikirim, selesai, batal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
