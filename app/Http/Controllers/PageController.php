<?php

namespace App\Http\Controllers;

use App\Models\BotCombination;
use App\Models\Skin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Display landing page.
     */
    public function home(): Response
    {
        $skins = Skin::where('is_active', true)->get();
        $scenarios = BotCombination::select('id', 'name', 'category', 'description', 'moves_sequence')->take(4)->get();

        return Inertia::render('Home', [
            'skins' => $skins,
            'scenarios' => $scenarios,
        ]);
    }

    /**
     * Display chess game page.
     */
    public function play(Request $request): Response
    {
        $user = $request->user();
        $scenarios = BotCombination::select('id', 'name', 'category', 'description', 'moves_sequence')->get();

        $activeSkinSlug = 'default';
        $activeBoardSlug = 'board-classic';

        if ($user) {
            $user->loadMissing(['activeSkin', 'activeBoard']);
            if ($user->activeSkin) {
                $activeSkinSlug = $user->activeSkin->slug;
            }
            if ($user->activeBoard) {
                $activeBoardSlug = $user->activeBoard->slug;
            }
        }

        $ownedPieceSkins = ['default'];
        $ownedBoardSkins = ['board-classic'];

        if ($user) {
            $userOwnedPieceSlugs = $user->skins()->where('type', 'piece')->pluck('slug')->toArray();
            $userOwnedBoardSlugs = $user->skins()->where('type', 'board')->pluck('slug')->toArray();

            $ownedPieceSkins = array_values(array_unique(array_merge(['default'], $userOwnedPieceSlugs)));
            $ownedBoardSkins = array_values(array_unique(array_merge(['board-classic'], $userOwnedBoardSlugs)));
        }

        $allPieceSkins = Skin::where('type', 'piece')
            ->where('is_active', true)
            ->orderBy('price_coins', 'asc')
            ->get(['id', 'name', 'slug', 'price_coins', 'description']);

        $allBoardSkins = Skin::where('type', 'board')
            ->where('is_active', true)
            ->orderBy('price_coins', 'asc')
            ->get(['id', 'name', 'slug', 'price_coins', 'description']);

        return Inertia::render('Game/Play', [
            'scenarios' => $scenarios,
            'activeSkin' => $activeSkinSlug,
            'activeBoard' => $activeBoardSlug,
            'ownedPieceSkins' => $ownedPieceSkins,
            'ownedBoardSkins' => $ownedBoardSkins,
            'allPieceSkins' => $allPieceSkins,
            'allBoardSkins' => $allBoardSkins,
        ]);
    }

    /**
     * Display user profile and billing history.
     */
    public function profile(Request $request): Response
    {
        $user = $request->user()->loadMissing(['skins', 'activeSkin', 'transactions']);

        return Inertia::render('Profile/Index', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'phone' => $user->phone,
                'dob' => $user->dob ? $user->dob->format('Y-m-d') : null,
                'address_line_1' => $user->address_line_1,
                'city' => $user->city,
                'country' => $user->country,
                'post_code' => $user->post_code,
                'wallet_balance' => $user->wallet_balance,
                'active_skin' => $user->activeSkin,
                'active_skin_id' => $user->active_skin_id,
                'active_board' => $user->activeBoard,
                'active_board_id' => $user->active_board_id,
                'terms_accepted_at' => $user->terms_accepted_at?->toIso8601String(),
                'created_at' => $user->created_at->format('d.m.Y'),
            ],
            'ownedSkins' => $user->skins,
            'transactions' => $user->transactions,
        ]);
    }

    /**
     * Display Terms and Conditions.
     */
    public function terms(): Response
    {
        return Inertia::render('Legal/Terms');
    }

    /**
     * Display Privacy Policy.
     */
    public function privacy(): Response
    {
        return Inertia::render('Legal/Privacy');
    }

    /**
     * Display How It Works and Training Engine Guide.
     */
    public function howItWorks(): Response
    {
        return Inertia::render('Articles/HowItWorks');
    }

    /**
     * Display Fair Play, RNG Determinism and Engine Rules.
     */
    public function fairPlay(): Response
    {
        return Inertia::render('Articles/FairPlay');
    }

    /**
     * Display Security, Billing, and PCI-DSS Compliance.
     */
    public function security(): Response
    {
        return Inertia::render('Articles/Security');
    }

    /**
     * Display Help Center & Frequently Asked Questions.
     */
    public function faq(): Response
    {
        return Inertia::render('Articles/Faq');
    }
}
