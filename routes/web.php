<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BotController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

// Public Pages
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/play', [PageController::class, 'play'])->name('play');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/terms', [PageController::class, 'terms'])->name('terms');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');

// Predictable Bot API
Route::post('/bot/move', [BotController::class, 'processMove'])->name('bot.move');
Route::get('/bot/scenarios', [BotController::class, 'scenarios'])->name('bot.scenarios');

// Guest Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// Authenticated User Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Profile & Inventory
    Route::get('/profile', [PageController::class, 'profile'])->name('profile');

    // Free Play Victory Reward
    Route::post('/bot/reward-win', [BotController::class, 'rewardWin'])->name('bot.reward-win');

    // Shop Actions
    Route::post('/shop/buy/{skin}', [ShopController::class, 'buy'])->name('shop.buy');
    Route::post('/shop/equip/{skin}', [ShopController::class, 'equip'])->name('shop.equip');

    // Billing & Top-up
    Route::get('/topup', [PaymentController::class, 'topup'])->name('topup');
    Route::post('/topup/checkout', [PaymentController::class, 'checkout'])->name('topup.checkout');
});
