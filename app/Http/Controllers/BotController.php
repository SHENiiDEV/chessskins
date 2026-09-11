<?php

namespace App\Http\Controllers;

use App\Models\BotCombination;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BotController extends Controller
{
    /**
     * Return list of available bot training scenarios.
     */
    public function scenarios(): JsonResponse
    {
        $scenarios = BotCombination::select('id', 'name', 'category', 'description', 'moves_sequence')->get();

        return response()->json([
            'scenarios' => $scenarios,
        ]);
    }

    /**
     * Process player move against predictable state-machine bot.
     */
    public function processMove(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'scenario_id' => ['required', 'integer', 'exists:bot_combinations,id'],
            'history' => ['required', 'array'],
            'history.*' => ['string'],
        ]);

        $scenario = BotCombination::findOrFail($validated['scenario_id']);
        $historyKey = trim(implode(' ', $validated['history']));

        $responses = $scenario->bot_responses ?? [];

        if (isset($responses[$historyKey])) {
            $botData = $responses[$historyKey];

            return response()->json([
                'status' => 'success',
                'bot_move' => $botData['move'],
                'comment' => $botData['comment'] ?? null,
                'is_final' => (bool) ($botData['is_final'] ?? false),
                'history_count' => count($validated['history']),
            ]);
        }

        return response()->json([
            'status' => 'deviated',
            'message' => 'Scenario deviated! The played move diverged from the scheduled book line.',
            'expected_sequence' => $scenario->moves_sequence,
        ], 200);
    }

    /**
     * Reward user for winning a free game against the AI bot.
     */
    public function rewardWin(Request $request): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Please sign in to earn victory Coins rewards!',
            ], 401);
        }

        $rewardAmount = 50;

        $user->wallet_balance += $rewardAmount;
        $user->save();

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $rewardAmount,
            'type' => 'topup',
            'status' => 'completed',
            'payment_gateway_reference' => 'REWARD-WIN-'.strtoupper(Str::random(8)),
        ]);

        return response()->json([
            'success' => true,
            'reward' => $rewardAmount,
            'new_balance' => $user->wallet_balance,
            'message' => 'Victory bonus: +50 Coins awarded to your wallet!',
        ]);
    }
}
