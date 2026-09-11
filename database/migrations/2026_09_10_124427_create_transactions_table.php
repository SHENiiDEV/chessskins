<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('amount'); // Positive for topup, negative for purchase, or stored as absolute with type
            $table->string('type'); // 'topup' or 'skin_purchase'
            $table->string('status')->default('completed'); // 'completed', 'pending', 'failed'
            $table->string('payment_gateway_reference')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
