<?php

namespace Tests\Feature;

use App\Models\Skin;
use App\Models\User;
use Database\Seeders\SkinSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FreePlayAndNewSkinsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SkinSeeder::class);
    }

    public function test_all_eight_skins_and_board_skins_are_available_and_active(): void
    {
        $expectedSlugs = [
            'default',
            'neon',
            'obsidian',
            'medieval',
            'steampunk',
            'arcade',
            'cyberpunk',
            'cosmic',
        ];

        $expectedBoardSlugs = [
            'board-classic',
            'board-neon',
            'board-obsidian',
            'board-medieval',
            'board-steampunk',
            'board-arcade',
            'board-cyberpunk',
            'board-cosmic',
        ];

        $this->assertEquals(8, Skin::piece()->where('is_active', true)->count());
        $this->assertEquals(8, Skin::board()->where('is_active', true)->count());

        foreach ($expectedSlugs as $slug) {
            $this->assertDatabaseHas('skins', [
                'slug' => $slug,
                'type' => 'piece',
                'is_active' => true,
            ]);
        }

        foreach ($expectedBoardSlugs as $boardSlug) {
            $this->assertDatabaseHas('skins', [
                'slug' => $boardSlug,
                'type' => 'board',
                'is_active' => true,
            ]);
        }
    }

    public function test_user_can_purchase_new_premium_skin(): void
    {
        $cosmicSkin = Skin::where('slug', 'cosmic')->first();
        $this->assertNotNull($cosmicSkin);
        $this->assertEquals(1500, $cosmicSkin->price_coins);

        $user = User::factory()->create([
            'wallet_balance' => 2000,
        ]);

        $response = $this->actingAs($user)->post("/shop/buy/{$cosmicSkin->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertEquals(500, $user->wallet_balance);
        $this->assertEquals($cosmicSkin->id, $user->active_skin_id);
        $this->assertTrue($user->ownsSkin($cosmicSkin));
    }

    public function test_user_can_purchase_and_equip_board_skin(): void
    {
        $neonBoard = Skin::where('slug', 'board-neon')->first();
        $this->assertNotNull($neonBoard);
        $this->assertEquals('board', $neonBoard->type);
        $this->assertEquals(400, $neonBoard->price_coins);

        $user = User::factory()->create([
            'wallet_balance' => 1000,
        ]);

        $response = $this->actingAs($user)->post("/shop/buy/{$neonBoard->id}");

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $user->refresh();
        $this->assertEquals(600, $user->wallet_balance);
        $this->assertEquals($neonBoard->id, $user->active_board_id);
        $this->assertTrue($user->ownsSkin($neonBoard));
    }

    public function test_user_earns_coins_reward_upon_winning_free_play_game(): void
    {
        $user = User::factory()->create([
            'wallet_balance' => 100,
        ]);

        $response = $this->actingAs($user)->postJson('/bot/reward-win');

        $response->assertOk();
        $response->assertJson([
            'success' => true,
            'reward' => 50,
            'new_balance' => 150,
        ]);

        $user->refresh();
        $this->assertEquals(150, $user->wallet_balance);

        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'amount' => 50,
            'type' => 'topup',
            'status' => 'completed',
        ]);
    }

    public function test_guest_cannot_claim_free_play_reward(): void
    {
        $response = $this->postJson('/bot/reward-win');
        $response->assertUnauthorized();
    }
}
