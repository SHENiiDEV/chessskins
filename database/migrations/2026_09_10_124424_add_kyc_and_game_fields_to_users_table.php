<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('surname')->after('name')->nullable();
            $table->string('phone')->after('email')->nullable();
            $table->date('dob')->after('phone')->nullable();
            $table->string('address_line_1')->after('dob')->nullable();
            $table->string('city')->after('address_line_1')->nullable();
            $table->string('country')->after('city')->nullable();
            $table->string('post_code')->after('country')->nullable();
            $table->unsignedInteger('wallet_balance')->default(0)->after('post_code');
            $table->foreignId('active_skin_id')->nullable()->after('wallet_balance')->constrained('skins')->nullOnDelete();
            $table->timestamp('terms_accepted_at')->nullable()->after('active_skin_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('active_skin_id');
            $table->dropColumn([
                'surname',
                'phone',
                'dob',
                'address_line_1',
                'city',
                'country',
                'post_code',
                'wallet_balance',
                'terms_accepted_at',
            ]);
        });
    }
};
