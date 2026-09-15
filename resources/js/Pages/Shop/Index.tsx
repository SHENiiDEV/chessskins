import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ShoppingBag, 
    Coins, 
    Check, 
    Sparkles, 
    Eye, 
    PlusCircle, 
    Crown,
    Grid,
    Layers,
    Palette
} from 'lucide-react';
import { PageProps, Skin } from '@/types';
import { getBoardTheme } from '@/utils/chessSkins';

interface ShopIndexProps {
    skins: Skin[];
}

export default function Index({ skins }: ShopIndexProps) {
    const { auth } = usePage<PageProps>().props;

    // Read initial tab from URL query if available
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const tabParam = urlParams?.get('tab') || urlParams?.get('filter');
    const initialTab = (tabParam === 'boards' || tabParam === 'board')
        ? 'board'
        : (tabParam === 'pieces' || tabParam === 'piece')
        ? 'piece'
        : (tabParam === 'owned')
        ? 'owned'
        : 'all';

    const [filter, setFilter] = useState<'all' | 'piece' | 'board' | 'owned'>(initialTab);
    const [previewSkin, setPreviewSkin] = useState<Skin | null>(null);

    const userBalance = auth.user?.wallet_balance ?? 0;

    const filteredSkins = skins.filter(skin => {
        if (filter === 'owned') return skin.is_owned;
        if (filter === 'piece') return (skin.type || 'piece') === 'piece';
        if (filter === 'board') return skin.type === 'board';
        return true;
    });

    const pieceCount = skins.filter(s => (s.type || 'piece') === 'piece').length;
    const boardCount = skins.filter(s => s.type === 'board').length;
    const ownedCount = skins.filter(s => s.is_owned).length;

    const handleBuy = (skin: Skin) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        if (userBalance < skin.price_coins) {
            router.visit('/topup');
            return;
        }

        router.post(`/shop/buy/${skin.id}`, {}, {
            preserveScroll: true,
        });
    };

    const handleEquip = (skin: Skin) => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        router.post(`/shop/equip/${skin.id}`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Skin & Board Store | Chess Skins" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                {/* Top Banner & Wallet Status */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Collectible Chess Customization</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            Pieces & Board Store
                        </h1>
                        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                            Acquire exclusive vector piece sets and luxury board themes using Coins. 
                            Mix and match any piece set with any board theme for your signature setup.
                        </p>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shrink-0 flex items-center justify-between sm:justify-start gap-4 sm:gap-5 shadow-lg shadow-amber-500/5 w-full md:w-auto">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                <Coins className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Your Balance
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-amber-300">
                                    {userBalance.toLocaleString()}{' '}
                                    <span className="text-xs font-medium text-slate-400">Coins</span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/topup"
                            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition group shrink-0 active:scale-95"
                        >
                            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            <span>Top Up</span>
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 active:scale-95 ${
                                filter === 'all'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            All ({skins.length})
                        </button>
                        <button
                            onClick={() => setFilter('piece')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                                filter === 'piece'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Crown className="w-3.5 h-3.5" />
                            <span>Piece Sets ({pieceCount})</span>
                        </button>
                        <button
                            onClick={() => setFilter('board')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                                filter === 'board'
                                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Grid className="w-3.5 h-3.5" />
                            <span>Board Themes ({boardCount})</span>
                        </button>
                        <button
                            onClick={() => setFilter('owned')}
                            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                                filter === 'owned'
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Layers className="w-3.5 h-3.5" />
                            <span>My Inventory ({ownedCount})</span>
                        </button>
                    </div>

                    <Link
                        href="/play"
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-end sm:self-auto pt-1 sm:pt-0"
                    >
                        <span>Play on Board</span>
                        <span>→</span>
                    </Link>
                </div>

                {/* Skins Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredSkins.map((skin) => {
                        const isBoard = skin.type === 'board';
                        const theme = getBoardTheme(skin.slug);
                        const canAfford = userBalance >= skin.price_coins;

                        return (
                            <div
                                key={skin.id}
                                className={`rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                                    skin.is_equipped
                                        ? isBoard
                                            ? 'bg-gradient-to-b from-cyan-500/10 to-slate-900 border-cyan-500/60 shadow-xl shadow-cyan-500/10'
                                            : 'bg-gradient-to-b from-amber-500/10 to-slate-900 border-amber-500/60 shadow-xl shadow-amber-500/10'
                                        : skin.is_owned
                                        ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/60'
                                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <div>
                                    {/* Showcase Box: Board Swatch OR Piece Trio */}
                                    {isBoard ? (
                                        <div
                                            className="w-full aspect-square rounded-2xl p-4 flex items-center justify-center relative group overflow-hidden mb-4 border border-slate-800/90 shadow-inner"
                                            style={{
                                                backgroundColor: '#090d16',
                                                boxShadow: `0 0 40px -10px ${theme.glow}30`,
                                            }}
                                        >
                                            {/* 4x4 Mini Board Swatch Preview */}
                                            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-2xl grid grid-cols-4 border border-white/20 transition-transform group-hover:scale-105 duration-300">
                                                {Array.from({ length: 16 }).map((_, i) => {
                                                    const row = Math.floor(i / 4);
                                                    const col = i % 4;
                                                    const isDark = (row + col) % 2 === 1;
                                                    return (
                                                        <div
                                                            key={i}
                                                            style={{ backgroundColor: isDark ? theme.dark : theme.light }}
                                                            className="transition-colors"
                                                        />
                                                    );
                                                })}
                                            </div>

                                            {/* Active / Owned Badges */}
                                            {skin.is_equipped && (
                                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                                                    <Crown className="w-3 h-3" />
                                                    <span>Active Board</span>
                                                </div>
                                            )}
                                            {skin.is_owned && !skin.is_equipped && (
                                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[10px] tracking-wider uppercase">
                                                    Owned
                                                </div>
                                            )}

                                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400">
                                                Board Theme
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-square rounded-2xl bg-slate-950/90 border border-slate-800/90 p-4 flex items-center justify-around relative group overflow-hidden mb-4">
                                            <img
                                                src={`/skins/${skin.slug}/wK.svg`}
                                                alt={`${skin.name} King`}
                                                className="w-14 h-14 object-contain transition-transform group-hover:scale-110 duration-300 drop-shadow-md"
                                            />
                                            <img
                                                src={`/skins/${skin.slug}/wN.svg`}
                                                alt={`${skin.name} Knight`}
                                                className="w-12 h-12 object-contain transition-transform group-hover:scale-110 duration-300 drop-shadow-md"
                                            />
                                            <img
                                                src={`/skins/${skin.slug}/bQ.svg`}
                                                alt={`${skin.name} Queen`}
                                                className="w-14 h-14 object-contain transition-transform group-hover:scale-110 duration-300 drop-shadow-md"
                                            />

                                            {/* Quick View Button Overlay */}
                                            <button
                                                onClick={() => setPreviewSkin(skin)}
                                                className="absolute bottom-2 right-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                                                title="Inspect all 12 pieces"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            {skin.is_equipped && (
                                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                                                    <Crown className="w-3 h-3" />
                                                    <span>Active Pieces</span>
                                                </div>
                                            )}
                                            {skin.is_owned && !skin.is_equipped && (
                                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[10px] tracking-wider uppercase">
                                                    Owned
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Skin Details */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-extrabold text-base text-white">
                                            {skin.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
                                            <Coins className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{skin.price_coins === 0 ? 'Free' : skin.price_coins}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-400 leading-relaxed min-h-[40px] mb-5">
                                        {skin.description}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    {skin.is_equipped ? (
                                        <button
                                            disabled
                                            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-default ${
                                                isBoard
                                                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                                                    : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                                            }`}
                                        >
                                            <Check className="w-4 h-4" />
                                            <span>{isBoard ? 'Equipped as Active Board' : 'Equipped as Active Pieces'}</span>
                                        </button>
                                    ) : skin.is_owned ? (
                                        <button
                                            onClick={() => handleEquip(skin)}
                                            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            <span>{isBoard ? 'Equip Board' : 'Equip Pieces'}</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBuy(skin)}
                                            className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                                                canAfford
                                                    ? isBoard
                                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-md shadow-cyan-500/20'
                                                        : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md shadow-amber-500/20'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                            }`}
                                        >
                                            {canAfford ? (
                                                <>
                                                    <ShoppingBag className="w-4 h-4" />
                                                    <span>Buy for {skin.price_coins} Coins</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PlusCircle className="w-4 h-4 text-amber-400" />
                                                    <span>Top Up & Buy</span>
                                                </>
                                            )}
                                        </button>
                                    )}

                                    {!isBoard && (
                                        <button
                                            onClick={() => setPreviewSkin(skin)}
                                            className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
                                        >
                                            Inspect all 12 pieces →
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Complete 12-Piece Set Preview Modal */}
            {previewSkin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                    <span>Full Set: {previewSkin.name}</span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal">
                                        12 SVG Files
                                    </span>
                                </h3>
                                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Path: /skins/{previewSkin.slug}/[piece].svg</p>
                            </div>
                            <button
                                onClick={() => setPreviewSkin(null)}
                                className="text-slate-400 hover:text-white p-1.5 cursor-pointer text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* White pieces */}
                        <div className="space-y-1.5">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">White Pieces</div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-slate-800">
                                {['wK', 'wQ', 'wR', 'wB', 'wN', 'wP'].map((piece) => (
                                    <div key={piece} className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg hover:bg-slate-900 transition">
                                        <img
                                            src={`/skins/${previewSkin.slug}/${piece}.svg`}
                                            alt={piece}
                                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                                        />
                                        <span className="text-[10px] font-mono text-slate-500 mt-1">{piece}.svg</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Black pieces */}
                        <div className="space-y-1.5">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Black Pieces</div>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-950 border border-slate-800">
                                {['bK', 'bQ', 'bR', 'bB', 'bN', 'bP'].map((piece) => (
                                    <div key={piece} className="flex flex-col items-center p-1.5 sm:p-2 rounded-lg hover:bg-slate-900 transition">
                                        <img
                                            src={`/skins/${previewSkin.slug}/${piece}.svg`}
                                            alt={piece}
                                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                                        />
                                        <span className="text-[10px] font-mono text-slate-500 mt-1">{piece}.svg</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                Price: <strong className="text-amber-300">{previewSkin.price_coins} Coins</strong>
                            </span>
                            <button
                                onClick={() => setPreviewSkin(null)}
                                className="px-4 sm:px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs cursor-pointer active:scale-95"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
