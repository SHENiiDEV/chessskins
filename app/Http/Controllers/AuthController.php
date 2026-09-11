<?php

namespace App\Http\Controllers;

use App\Models\Skin;
use App\Models\User;
use App\Services\CountryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Display registration view.
     */
    public function showRegister(): Response
    {
        return Inertia::render('Auth/Register', [
            'allowedCountries' => CountryService::getAllowedCountries(),
        ]);
    }

    /**
     * Handle user registration with KYC and billing fields.
     */
    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'surname' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'string', 'max:30'],
            'dob' => ['required', 'date', 'before:today'],
            'address_line_1' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'country' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (! CountryService::isAllowed($value)) {
                        $fail('Registration from the selected country is restricted by compliance regulations.');
                    }
                },
            ],
            'post_code' => ['required', 'string', 'max:20'],
            'terms' => ['accepted'],
        ], [
            'terms.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy to register.',
        ]);

        $defaultSkin = Skin::where('slug', 'default')->first();
        $defaultBoard = Skin::where('slug', 'board-classic')->first();

        $user = User::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'dob' => $validated['dob'],
            'address_line_1' => $validated['address_line_1'],
            'city' => $validated['city'],
            'country' => $validated['country'],
            'post_code' => $validated['post_code'],
            'wallet_balance' => 200, // Welcome gift of 200 coins
            'active_skin_id' => $defaultSkin?->id,
            'active_board_id' => $defaultBoard?->id,
            'terms_accepted_at' => now(),
        ]);

        $defaultSkinIds = array_filter([$defaultSkin?->id, $defaultBoard?->id]);
        if (! empty($defaultSkinIds)) {
            $user->skins()->attach($defaultSkinIds, ['purchased_at' => now()]);
        }

        Auth::login($user);

        return redirect()->route('play')->with('success', 'Welcome to ChessSkins! 200 bonus Coins have been credited to your wallet.');
    }

    /**
     * Display login view.
     */
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle login authentication.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            return redirect()->intended(route('play'))->with('success', 'Welcome back to the chessboard!');
        }

        return back()->withErrors([
            'email' => 'Invalid email address or password.',
        ])->onlyInput('email');
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('success', 'You have been successfully logged out.');
    }
}
