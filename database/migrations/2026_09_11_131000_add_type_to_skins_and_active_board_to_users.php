<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('skins', function (Blueprint $table) {
            $table->string('type')->default('piece')->after('slug'); // 'piece' or 'board'
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('active_board_id')->nullable()->after('active_skin_id')->constrained('skins')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['active_board_id']);
            $table->dropColumn('active_board_id');
        });

        Schema::table('skins', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
