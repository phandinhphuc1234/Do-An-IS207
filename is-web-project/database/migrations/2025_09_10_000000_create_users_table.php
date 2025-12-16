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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // Primary key with AUTO_INCREMENT
            $table->string('email', 255)->unique();
            $table->string('password_hash', 255)->nullable();
            $table->string('full_name', 100)->nullable(); // NVARCHAR equivalent
            $table->string('phone', 20)->nullable();
            $table->string('avatar_url', 500)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->unsignedBigInteger('reward_points')->default(0);
            $table->boolean('email_verified')->default(false);
            $table->string('verification_code', 6)->nullable(true);
            $table->string('membership_tier_id', 50)->nullable(true)->default('silver');
            $table->timestamps();
            $table->foreign('membership_tier_id')->references('tier_id')->on('membership_tiers')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
    }
};
