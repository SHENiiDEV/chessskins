<?php

namespace App\Http\Controllers;

use App\Models\Skin;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    /**
     * Display skin shop and user inventory.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $ownedSkinIds = $user ? $user->skins()->pluck('skins.id')->toArray() : [];
        $activeSkinId = $user?->active_skin_id;
        $activeBoardId = $user?->active_board_id;

        $skins = Skin::where('is_active', true)
            ->orderBy('type', 'asc')
            ->orderBy('price_coins', 'asc')
            ->get()
            ->map(function (Skin $skin) use ($ownedSkinIds, $activeSkinId, $activeBoardId) {
                return [
                    'id' => $skin->id,
                    'name' => $skin->name,
                    'slug' => $skin->slug,
                    'type' => $skin->type ?? 'piece',
                    'price_coins' => $skin->price_coins,
                    'description' => $skin->description,
                    'is_owned' => in_array($skin->id, $ownedSkinIds, true),
                    'is_equipped' => $skin->type === 'board'
                        ? $skin->id === $activeBoardId
                        : $skin->id === $activeSkinId,
                ];
            });

        return Inertia::render('Shop/Index', [
            'skins' => $skins,
        ]);
    }

    /**
     * Purchase a skin using coins.
     */
    public function buy(Request $request, Skin $skin): RedirectResponse
    {
        $user = $request->user();

        if ($user->ownsSkin($skin)) {
            return back()->with('error', 'You already own this skin.');
        }

        if ($user->wallet_balance < $skin->price_coins) {
            return back()->with('error', 'Insufficient Coins! Please top up your wallet in the Top-up section.');
        }

        DB::transaction(function () use ($user, $skin) {
            $user->wallet_balance -= $skin->price_coins;
            if ($skin->type === 'board') {
                $user->active_board_id = $skin->id;
            } else {
                $user->active_skin_id = $skin->id;
            }
            $user->save();

            $user->skins()->attach($skin->id, ['purchased_at' => now()]);

            Transaction::create([
                'user_id' => $user->id,
                'amount' => -$skin->price_coins,
                'type' => 'skin_purchase',
                'status' => 'completed',
                'payment_gateway_reference' => 'SKIN-'.strtoupper($skin->slug).'-'.time(),
            ]);
        });

        $typeLabel = $skin->type === 'board' ? 'Board theme' : 'Skin';

        return back()->with('success', "{$typeLabel} «{$skin->name}» successfully purchased and equipped!");
    }

    /**
     * Equip an already owned skin.
     */
    public function equip(Request $request, Skin $skin): RedirectResponse
    {
        $user = $request->user();

        if (! $user->ownsSkin($skin)) {
            return back()->with('error', 'You must first purchase this item in the shop.');
        }

        if ($skin->type === 'board') {
            $user->active_board_id = $skin->id;
        } else {
            $user->active_skin_id = $skin->id;
        }
        $user->save();

        $typeLabel = $skin->type === 'board' ? 'Board theme' : 'Skin';

        return back()->with('success', "{$typeLabel} «{$skin->name}» equipped for gameplay!");
    }
}
