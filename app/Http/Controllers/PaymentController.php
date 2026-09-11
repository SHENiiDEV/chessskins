<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Top-up coin packages.
     *
     * @var array<int, array<string, mixed>>
     */
    public const PACKAGES = [
        [
            'id' => 'pack_500',
            'coins' => 500,
            'price_usd' => 5.00,
            'badge' => 'Starter',
            'popular' => false,
            'description' => 'Perfect for acquiring a stylish neon or classic tournament skin.',
        ],
        [
            'id' => 'pack_1200',
            'coins' => 1200,
            'price_usd' => 10.00,
            'badge' => 'Best Value +20%',
            'popular' => true,
            'description' => 'Most popular package! Easily get both Cyberpunk and Neon sets.',
        ],
        [
            'id' => 'pack_3000',
            'coins' => 3000,
            'price_usd' => 20.00,
            'badge' => 'Super Set +50%',
            'popular' => false,
            'description' => 'Unlock the full collection of premium piece styles and future sets.',
        ],
        [
            'id' => 'pack_10000',
            'coins' => 10000,
            'price_usd' => 50.00,
            'badge' => 'Grandmaster 2x',
            'popular' => false,
            'description' => 'Ultimate coin vault for serious collectors and tournament preparation.',
        ],
    ];

    /**
     * Display top-up page with billing info review.
     */
    public function topup(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Shop/TopUp', [
            'packages' => self::PACKAGES,
            'billingData' => [
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'phone' => $user->phone,
                'address_line_1' => $user->address_line_1,
                'city' => $user->city,
                'country' => $user->country,
                'post_code' => $user->post_code,
            ],
        ]);
    }

    /**
     * Process mock payment transaction and credit coins to user wallet.
     */
    public function checkout(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'package_id' => ['required', 'string'],
            'card_number' => ['required', 'string', 'min:15'],
            'card_exp' => ['required', 'string', 'regex:/^(0[1-9]|1[0-2])\/?([0-9]{2})$/'],
            'card_cvc' => ['required', 'string', 'digits_between:3,4'],
        ], [
            'card_number.required' => 'Please enter a valid payment card number.',
            'card_exp.regex' => 'Expiration date must be formatted as MM/YY.',
            'card_cvc.digits_between' => 'CVC/CVV code must be 3 or 4 digits.',
        ]);

        $selectedPack = collect(self::PACKAGES)->firstWhere('id', $validated['package_id']);

        if (! $selectedPack) {
            return back()->with('error', 'The selected coin package is invalid.');
        }

        $user = $request->user();
        $reference = 'PG-STRIPE-'.strtoupper(Str::random(10));

        DB::transaction(function () use ($user, $selectedPack, $reference) {
            $user->wallet_balance += $selectedPack['coins'];
            $user->save();

            Transaction::create([
                'user_id' => $user->id,
                'amount' => $selectedPack['coins'],
                'type' => 'topup',
                'status' => 'completed',
                'payment_gateway_reference' => $reference,
            ]);
        });

        return redirect()->route('shop')->with(
            'success',
            "Payment processed successfully! +{$selectedPack['coins']} Coins credited to your wallet. Reference: {$reference}"
        );
    }
}
