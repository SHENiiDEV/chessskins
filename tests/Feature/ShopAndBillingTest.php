<?php

namespace Tests\Feature;

use App\Models\Skin;
use App\Models\User;
use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShopAndBillingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SkinSeeder::class);
    }

    public function test_user_can_top_up_wallet_with_billing_processing(): void
    {
        $user = User::factory()->create([
            'wallet_balance' => 100,
            'country' => 'Germany',
            'city' => 'Berlin',
            'address_line_1' => 'Alexanderplatz 1',
            'post_code' => '10178',
        ]);

        $response = $this->actingAs($user)->post('/topup/checkout', [
            'package_id' => 'pack_1200',
            'card_number' => '4242 4242 4242 4242',
            'card_exp' => '12/29',
            'card_cvc' => '999',
        ]);

        $response->assertRedirect('/shop');
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertEquals(1300, $user->wallet_balance); // 100 + 1200

        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'amount' => 1200,
            'type' => 'topup',
            'status' => 'completed',
        ]);
    }

    public function test_user_can_purchase_and_equip_skin(): void
    {
        $neonSkin = Skin::where('slug', 'neon')->first();
        $this->assertNotNull($neonSkin);

        $user = User::factory()->create([
            'wallet_balance' => 1000,
            'active_skin_id' => null,
        ]);

        $response = $this->actingAs($user)->post("/shop/buy/{$neonSkin->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertEquals(400, $user->wallet_balance); // 1000 - 600
        $this->assertEquals($neonSkin->id, $user->active_skin_id);
        $this->assertTrue($user->ownsSkin($neonSkin));

        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'amount' => -600,
            'type' => 'skin_purchase',
            'status' => 'completed',
        ]);
    }

    public function test_purchase_rejected_if_balance_insufficient(): void
    {
        $cyberpunkSkin = Skin::where('slug', 'cyberpunk')->first();
        $this->assertNotNull($cyberpunkSkin);

        $user = User::factory()->create([
            'wallet_balance' => 100, // Price is 1200
        ]);

        $response = $this->actingAs($user)->post("/shop/buy/{$cyberpunkSkin->id}");

        $response->assertRedirect();
        $response->assertSessionHas('error');

        $user->refresh();
        $this->assertEquals(100, $user->wallet_balance); // Unchanged
        $this->assertFalse($user->ownsSkin($cyberpunkSkin));
    }

    public function test_user_can_switch_equipped_skin_between_owned_skins(): void
    {
        $defaultSkin = Skin::where('slug', 'default')->first();
        $medievalSkin = Skin::where('slug', 'medieval')->first();

        $user = User::factory()->create([
            'active_skin_id' => $defaultSkin->id,
        ]);

        $user->skins()->attach([$defaultSkin->id, $medievalSkin->id]);

        $response = $this->actingAs($user)->post("/shop/equip/{$medievalSkin->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertEquals($medievalSkin->id, $user->active_skin_id);
    }
}
