<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        if ($user) {
            $user->loadMissing(['activeSkin', 'activeBoard']);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
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
                    'active_skin_id' => $user->active_skin_id,
                    'active_skin_slug' => $user->activeSkin?->slug ?? 'default',
                    'active_board_id' => $user->active_board_id,
                    'active_board_slug' => $user->activeBoard?->slug ?? 'board-classic',
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
