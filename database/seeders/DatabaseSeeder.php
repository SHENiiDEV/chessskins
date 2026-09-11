<?php

namespace Database\Seeders;

use App\Models\Skin;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SkinSeeder::class,
            BotCombinationSeeder::class,
        ]);

        $defaultSkin = Skin::where('slug', 'default')->first();
        $neonSkin = Skin::where('slug', 'neon')->first();

        // Create a default test user
        $demoUser = User::updateOrCreate(
            ['email' => 'grandmaster@example.com'],
            [
                'name' => 'Magnus',
                'surname' => 'Carlsen',
                'password' => Hash::make('password123'),
                'phone' => '+1 415 555 2671',
                'dob' => '1990-11-30',
                'address_line_1' => '742 Evergreen Terrace',
                'city' => 'Springfield',
                'country' => 'Norway',
                'post_code' => '97201',
                'wallet_balance' => 1500,
                'active_skin_id' => $defaultSkin?->id,
                'terms_accepted_at' => now(),
            ]
        );

        if ($defaultSkin && ! $demoUser->ownsSkin($defaultSkin)) {
            $demoUser->skins()->attach($defaultSkin->id, ['purchased_at' => now()]);
        }

        // Demo initial topup transaction
        Transaction::firstOrCreate(
            [
                'user_id' => $demoUser->id,
                'payment_gateway_reference' => 'TXN-DEMO-WELCOME-1500',
            ],
            [
                'amount' => 1500,
                'type' => 'topup',
                'status' => 'completed',
            ]
        );
    }
}
