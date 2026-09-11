<?php

namespace Tests\Feature;

use App\Models\BotCombination;
use Database\Seeders\BotCombinationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BotEngineTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(BotCombinationSeeder::class);
    }

    public function test_can_list_bot_scenarios(): void
    {
        $response = $this->getJson('/bot/scenarios');

        $response->assertOk();
        $response->assertJsonStructure([
            'scenarios' => [
                '*' => ['id', 'name', 'category', 'description', 'moves_sequence'],
            ],
        ]);
        $this->assertGreaterThanOrEqual(4, count($response->json('scenarios')));
    }

    public function test_bot_responds_predictably_to_correct_opening_moves(): void
    {
        $italianGame = BotCombination::where('name', 'like', '%Italian Game%')->first();
        $this->assertNotNull($italianGame);

        // Move 1: Player plays e4
        $response1 = $this->postJson('/bot/move', [
            'scenario_id' => $italianGame->id,
            'history' => ['e4'],
        ]);

        $response1->assertOk();
        $response1->assertJson([
            'status' => 'success',
            'bot_move' => 'e5',
            'is_final' => false,
        ]);
        $this->assertNotEmpty($response1->json('comment'));

        // Move 2: Player continues theoretical line e4 e5 Nf3
        $response2 = $this->postJson('/bot/move', [
            'scenario_id' => $italianGame->id,
            'history' => ['e4', 'e5', 'Nf3'],
        ]);

        $response2->assertOk();
        $response2->assertJson([
            'status' => 'success',
            'bot_move' => 'Nc6',
        ]);
    }

    public function test_bot_detects_deviation_when_player_plays_wrong_move(): void
    {
        $italianGame = BotCombination::where('name', 'like', '%Italian Game%')->first();
        $this->assertNotNull($italianGame);

        // Player deviates with 1. h4 instead of 1. e4
        $response = $this->postJson('/bot/move', [
            'scenario_id' => $italianGame->id,
            'history' => ['h4'],
        ]);

        $response->assertOk();
        $response->assertJson([
            'status' => 'deviated',
        ]);
        $this->assertStringContainsString('Scenario deviated', $response->json('message'));
    }
}
