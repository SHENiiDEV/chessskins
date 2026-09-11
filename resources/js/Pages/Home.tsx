import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Chessboard } from 'react-chessboard';
import { generateSkinPack, getBoardTheme } from '@/utils/chessSkins';
import { 
    Swords, 
    Sparkles, 
    ShieldCheck, 
    Cpu, 
    Target, 
    Zap, 
    CheckCircle, 
    ArrowRight,
    ShoppingBag,
    Award,
    Crown,
    Grid,
    Layers
} from 'lucide-react';
import { Skin, BotCombination } from '@/types';

interface HomeProps {
    skins: Skin[];
    scenarios: BotCombination[];
}

export default function Home({ skins, scenarios }: HomeProps) {
    const [selectedSkinSlug, setSelectedSkinSlug] = useState<string>('neon');
    const [demoPosition, setDemoPosition] = useState<string>('r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3');
    const [showcaseFilter, setShowcaseFilter] = useState<'all' | 'piece' | 'board'>('all');

    const boardTheme = getBoardTheme(selectedSkinSlug);

    return (
        <AppLayout>
            <Head title="Chess with Predictable Bot & Skin Store" />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
                {/* Ambient background glow effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left column: Headings and CTAs */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase shadow-inner">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                                <span>A New Era of Chess Training</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                                Chess with a <br />
                                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                                    Predictable Bot
                                </span> <br />
                                & Skin Store
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                                Master Grandmaster openings and sharp tactics without random engine blunders. 
                                The deterministic state machine validates each move with pinpoint accuracy, 
                                while custom vector skin sets turn every game into visual art.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                                <Link
                                    href="/play"
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Swords className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                                    <span>Start Training</span>
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <Link
                                    href="/register"
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Create Account</span>
                                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                        +200 Coins
                                    </span>
                                </Link>
                            </div>

                            {/* Trust metrics */}
                            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                                <div>
                                    <div className="text-2xl font-black text-white">100%</div>
                                    <div className="text-xs text-slate-400">Deterministic Bot</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-amber-400">4+ Themes</div>
                                    <div className="text-xs text-slate-400">SVG Piece Skins</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-cyan-400">KYC Ready</div>
                                    <div className="text-xs text-slate-400">Compliant Billing</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column: Interactive 3D/Interactive Chess Showcase */}
                        <div className="lg:col-span-5 flex flex-col items-center">
                            <div className="w-full max-w-[420px] p-3 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 relative group">
                                {/* Skin Switcher Badges */}
                                <div className="flex items-center justify-between gap-1 pb-3 px-1">
                                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        Board Theme:
                                    </span>
                                    <div className="flex items-center gap-1 flex-wrap justify-end">
                                        {['neon', 'obsidian', 'medieval', 'steampunk', 'arcade', 'cyberpunk', 'cosmic', 'default'].map((skin) => (
                                            <button
                                                key={skin}
                                                onClick={() => setSelectedSkinSlug(skin)}
                                                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize transition cursor-pointer ${
                                                    selectedSkinSlug === skin
                                                        ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                                                        : 'bg-slate-950/70 text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {skin}
                                            </button>
                                        ))}
                                    </div>

                                </div>

                                {/* Actual Chessboard with Custom Skin & Board Palette */}
                                <div 
                                    className="rounded-xl overflow-hidden shadow-inner border border-slate-950/50 bg-slate-950 aspect-square transition-all duration-300"
                                    style={{
                                        boxShadow: `0 0 40px -10px ${boardTheme.glow}35`,
                                    }}
                                >
                                    <Chessboard
                                        options={{
                                            id: 'home-demo-board',
                                            position: demoPosition,
                                            pieces: generateSkinPack(selectedSkinSlug),
                                            allowDragging: false,
                                            allowDrawingArrows: false,
                                            darkSquareStyle: { backgroundColor: boardTheme.dark },
                                            lightSquareStyle: { backgroundColor: boardTheme.light },
                                            lightSquareNotationStyle: { color: boardTheme.dark },
                                            darkSquareNotationStyle: { color: boardTheme.light },
                                        }}
                                    />
                                </div>

                                <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                        Italian Game (Giuoco Piano)
                                    </span>
                                    <Link href="/shop" className="text-amber-400 hover:underline font-medium">
                                        Skin Catalog →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature / Advantages Block */}
            <section className="py-20 bg-slate-900/50 border-y border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                            Platform Advantages
                        </h2>
                        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            Why train with our predictable bot?
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                            Conventional chess engines play chaotically or unpredictably at lower difficulties. 
                            Our bot operates on a strictly defined finite-state machine, ensuring flawless practice of classical book variations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                                No Engine Randomness
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                No random blunders or inexplicable computer moves. 
                                The bot follows exact opening theory. If you deviate, the bot immediately alerts you to the exact misstep.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                Precise Scenarios & Traps
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Practice the Italian Game, Sicilian Najdorf, Queen's Gambit Declined, and Scholar's Mate refutations with move-by-move master commentary.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all group space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                Collectible Vector Skins
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Earn or purchase Coins to customize your board pieces—from neon cyber glow to feudal gold heraldry and cyberpunk 2099.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skins Showcase Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Catalog Showcase</span>
                            </h2>
                            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                Collectible Pieces & Board Themes
                            </h3>
                            <p className="text-slate-400 text-sm mt-1 max-w-xl">
                                Personalize your chess battlefield with handcrafted SVG piece collections and luxury board palettes.
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition self-start md:self-auto"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Open Store</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Showcase Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2 mb-8">
                        <button
                            onClick={() => setShowcaseFilter('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                showcaseFilter === 'all'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            All Styles ({skins.length})
                        </button>
                        <button
                            onClick={() => setShowcaseFilter('piece')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                showcaseFilter === 'piece'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Crown className="w-3.5 h-3.5" />
                            <span>Piece Sets ({skins.filter(s => (s.type || 'piece') === 'piece' && !s.slug.startsWith('board-')).length})</span>
                        </button>
                        <button
                            onClick={() => setShowcaseFilter('board')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                                showcaseFilter === 'board'
                                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Grid className="w-3.5 h-3.5" />
                            <span>Board Themes ({skins.filter(s => s.type === 'board' || s.slug.startsWith('board-')).length})</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skins
                            .filter((skin) => {
                                const isBoard = skin.type === 'board' || skin.slug.startsWith('board-');
                                if (showcaseFilter === 'piece') return !isBoard;
                                if (showcaseFilter === 'board') return isBoard;
                                return true;
                            })
                            .map((skin) => {
                                const isBoard = skin.type === 'board' || skin.slug.startsWith('board-');
                                const theme = getBoardTheme(skin.slug);

                                return (
                                    <div
                                        key={skin.id}
                                        className={`rounded-2xl bg-slate-900/70 border p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-xl ${
                                            isBoard
                                                ? 'border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
                                                : 'border-slate-800 hover:border-amber-500/50 hover:shadow-amber-500/10'
                                        }`}
                                    >
                                        <div>
                                            {/* Visual Preview Box */}
                                            {isBoard ? (
                                                <div
                                                    className="w-full aspect-video rounded-xl p-3 flex items-center justify-center relative overflow-hidden mb-4 border border-slate-800/90 shadow-inner group-hover:scale-105 transition-transform duration-300"
                                                    style={{
                                                        backgroundColor: '#090d16',
                                                        boxShadow: `0 0 35px -10px ${theme.glow}30`,
                                                    }}
                                                >
                                                    {/* 4x4 Mini Board Swatch Preview */}
                                                    <div className="w-24 h-24 rounded-lg overflow-hidden shadow-xl grid grid-cols-4 border border-white/20">
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
                                                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
                                                        <Grid className="w-3 h-3" />
                                                        <span>Board Theme</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full aspect-video rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-around px-4 mb-4 group-hover:scale-105 transition-transform duration-300 relative">
                                                    <img
                                                        src={`/skins/${skin.slug}/wK.svg`}
                                                        alt={`${skin.name} King`}
                                                        className="w-11 h-11 drop-shadow-md"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = '/skins/default/wK.svg';
                                                        }}
                                                    />
                                                    <img
                                                        src={`/skins/${skin.slug}/wN.svg`}
                                                        alt={`${skin.name} Knight`}
                                                        className="w-10 h-10 drop-shadow-md"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = '/skins/default/wN.svg';
                                                        }}
                                                    />
                                                    <img
                                                        src={`/skins/${skin.slug}/bQ.svg`}
                                                        alt={`${skin.name} Queen`}
                                                        className="w-11 h-11 drop-shadow-md"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = '/skins/default/bQ.svg';
                                                        }}
                                                    />
                                                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                                                        <Crown className="w-3 h-3" />
                                                        <span>Piece Set</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mb-2 gap-2">
                                                <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors truncate">
                                                    {skin.name}
                                                </h4>
                                                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 whitespace-nowrap">
                                                    {skin.price_coins === 0 ? 'Free' : `${skin.price_coins} Coins`}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                                                {skin.description}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/shop?tab=${isBoard ? 'boards' : 'pieces'}`}
                                            className={`w-full py-2.5 rounded-lg text-xs font-bold text-center transition flex items-center justify-center gap-1.5 ${
                                                isBoard
                                                    ? 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200'
                                                    : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200'
                                            }`}
                                        >
                                            <span>View in Store</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Scenarios Preview Section */}
            <section className="py-20 bg-slate-900/30 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                            Curated Combinations
                        </h2>
                        <h3 className="text-3xl font-black text-white">
                            Grandmaster Training Repertoires
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {scenarios.map((scenario) => (
                            <div
                                key={scenario.id}
                                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4"
                            >
                                <div className="space-y-2">
                                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                        {scenario.category}
                                    </span>
                                    <h4 className="text-lg font-bold text-white">
                                        {scenario.name}
                                    </h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {scenario.description}
                                    </p>
                                </div>
                                <Link
                                    href="/play"
                                    className="shrink-0 p-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                                    title="Start this scenario"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10 space-y-4 max-w-xl">
                            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                                Ready to elevate your chess mastery?
                            </h3>
                            <p className="font-medium text-slate-950/80 text-sm sm:text-base">
                                Register now, receive 200 welcome coins, and start perfecting your opening repertoire immediately.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-3">
                                <Link
                                    href="/register"
                                    className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-slate-900 transition shadow-lg"
                                >
                                    Create Free Account
                                </Link>
                                <Link
                                    href="/play"
                                    className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-slate-950 font-bold text-sm transition"
                                >
                                    Quick Play as Guest
                                </Link>
                            </div>
                        </div>

                        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none select-none text-[240px] font-serif leading-none">
                            ♚
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
