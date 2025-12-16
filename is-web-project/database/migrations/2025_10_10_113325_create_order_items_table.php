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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id('order_item_id'); // INT PRIMARY KEY AUTO_INCREMENT
            $table->unsignedBigInteger('order_id'); // Foreign key column for orders
            $table->unsignedBigInteger('product_id')->nullable(); // Foreign key column for products, nullable
            $table->unsignedBigInteger('variant_id')->nullable(); // Foreign key column for product_variants, nullable
            $table->string('product_name', 255); // NVARCHAR(255) NOT NULL
            $table->json('variant_attributes')->nullable(); // JSON, nullable
            $table->decimal('unit_price', 15, 2); // DECIMAL(15,2) NOT NULL
            $table->integer('quantity'); // INT NOT NULL
            $table->decimal('total_price', 15, 2); // DECIMAL(15,2) NOT NULL
            // Foreign key constraints
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('set null');
            $table->foreign('variant_id')->references('variant_id')->on('product_variants')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
