<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bot_combinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->default('Opening');
            $table->text('description')->nullable();
            $table->json('moves_sequence');
            $table->json('bot_responses');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bot_combinations');
    }
};
