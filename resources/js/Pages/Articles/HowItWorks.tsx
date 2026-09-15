import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Cpu, 
    Palette, 
    Trophy, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    CheckCircle2, 
    ShieldCheck, 
    Layers, 
    Zap, 
    BookOpen, 
    Award,
    HelpCircle
} from 'lucide-react';
import { PageProps } from '@/types';

export default function HowItWorks() {
    const { company } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="How It Works — Deterministic AI Chess Training & Collectible Skins" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button & Title Header */}
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Lobby</span>
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                    How ChessSkins Works
                                </h1>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    A structured guide to predictable AI sparring, opening mastery, and collectible vector pieces.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/play"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 transition self-start sm:self-auto"
                        >
                            <span>Enter Chess Arena</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                    <a
                        href="#engine"
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition text-center group"
                    >
                        <Zap className="w-5 h-5 mx-auto text-amber-400 mb-1.5 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-slate-200 block">The Bot Engine</span>
                        <span className="text-[11px] text-slate-500">State Machine & Logic</span>
                    </a>
                    <a
                        href="#ai-tiers"
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition text-center group"
                    >
                        <Cpu className="w-5 h-5 mx-auto text-cyan-400 mb-1.5 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-slate-200 block">AI Levels</span>
                        <span className="text-[11px] text-slate-500">800 to 2400 ELO</span>
                    </a>
                    <a
                        href="#skins"
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition text-center group"
                    >
                        <Palette className="w-5 h-5 mx-auto text-emerald-400 mb-1.5 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-slate-200 block">Vector Skins</span>
                        <span className="text-[11px] text-slate-500">Cosmetics & Boards</span>
                    </a>
                    <a
                        href="#rewards"
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition text-center group"
                    >
                        <Trophy className="w-5 h-5 mx-auto text-purple-400 mb-1.5 group-hover:scale-110 transition" />
                        <span className="text-xs font-bold text-slate-200 block">Progression</span>
                        <span className="text-[11px] text-slate-500">Coin Economy</span>
                    </a>
                </div>

                <div className="space-y-12 text-slate-300">
                    {/* SECTION 1: THE PREDICTABLE ENGINE */}
                    <section id="engine" className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                                Pillar 1
                            </span>
                            <h2 className="text-2xl font-black text-white">
                                The Predictable Bot: Structured Chess Sparring
                            </h2>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-300">
                            Traditional chess engines like Stockfish calculate millions of nodes per second to uncover superhuman moves. 
                            While impressive, playing against them often feels demoralizing: they punish invisible positional inaccuracies 
                            or intentionally play bizarre, unrealistic blunders when dialed down.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Opening Repertoire Mastery</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Our engine incorporates verified opening book trees: Italian Game (Giuoco Piano), Sicilian Defense, 
                                    Ruy Lopez, and Queen’s Gambit. You can test your preparation against standard theoretical lines 
                                    knowing exactly what moves the bot prioritizes.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Zap className="w-4 h-4" />
                                    <span>Scenario & Blunder Refutation</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    In addition to free sparring, ChessSkins features curated tactical scenarios with deliberate weaknesses 
                                    (e.g., exposed queen, undefended bishop, uncastled king). Identifying and punishing these mistakes 
                                    develops instant tactical pattern recognition.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <div className="text-xs leading-relaxed text-slate-300">
                                <strong className="text-amber-300">Instant Coach Feedback:</strong> After every move, the live commentary HUD 
                                analyzes the board state, classifies your move (Book Move, Best, Good, or Blunder), and suggests strategic 
                                focal points for your next turn.
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: AI DIFFICULTY TIERS */}
                    <section id="ai-tiers" className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">
                                Pillar 2
                            </span>
                            <h2 className="text-2xl font-black text-white">
                                Calibrated AI Difficulty Tiers
                            </h2>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-300">
                            Whether you are learning piece values or training for tournament play, our multi-tier heuristic engine adjusts 
                            its search depth, positional evaluation weights, and piece-square tables dynamically:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Level 1 • Beginner</div>
                                <div className="text-xl font-black text-white">800 ELO</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Focuses on basic piece development. Makes human-like intermediate errors and leaves occasional tactical opportunities 
                                    for you to punish. Ideal for beginners.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Level 2 • Club Player</div>
                                <div className="text-xl font-black text-white">1500 ELO</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Solid positional grasp. Castles early, contests open files with rooks, defends vulnerable outposts, and requires 
                                    concerted multi-move tactics to crack.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Level 3 • Grandmaster</div>
                                <div className="text-xl font-black text-white">2400 ELO</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Deep tactical calculation using alpha-beta pruning and comprehensive endgame evaluation. Punishes even minor pawn 
                                    structure weaknesses.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: SKINS & THEMES */}
                    <section id="skins" className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                                Pillar 3
                            </span>
                            <h2 className="text-2xl font-black text-white">
                                Collectible Vector Piece Sets & Board Palettes
                            </h2>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-300">
                            Every piece set on ChessSkins is designed from scratch as scalable vector graphics (SVG). Unlike raster PNG bitmaps 
                            that pixelate or blur on high-resolution displays, our pieces stay tack-sharp on 4K monitors, iPads, and mobile screens.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    <span>Strictly Cosmetic — Zero Pay-to-Win</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Skins are 100% cosmetic visual enhancements. All pieces strictly adhere to international FIDE chess rules. 
                                    A Neon or Cyberpunk Knight moves identical to a Staunton Knight. No speed boosts, no handicaps, and no gameplay advantages.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers className="w-4 h-4 text-cyan-400" />
                                    <span>Modular Mix & Match</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Pieces and boards are decoupled. You can equip the <strong>Obsidian</strong> piece set on a <strong>Neon Cyber</strong> board, 
                                    or the <strong>Medieval Gold</strong> set on an <strong>Emerald Classic</strong> board. Your active loadout is saved to your account.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                            <strong className="text-white block">Available Piece Themes:</strong>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {['Classic Staunton', 'Neon Glow', 'Obsidian Minimal', 'Medieval Royalty', 'Steampunk Brass', 'Arcade 8-Bit', 'Cyberpunk Matrix', 'Cosmic Galaxy'].map((name) => (
                                    <span key={name} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: PROGRESSION & ECONOMY */}
                    <section id="rewards" className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                                Pillar 4
                            </span>
                            <h2 className="text-2xl font-black text-white">
                                Coin Economy & Transparent Progression
                            </h2>
                        </div>

                        <p className="text-sm leading-relaxed text-slate-300">
                            Our platform operates on a clear, single-currency economy: <strong>Chess Coins</strong>. You can acquire coins through 
                            in-game victories or top-up your balance via our secure PCI-DSS compliant payment gateway.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-amber-400 text-xs font-bold uppercase">Earn via Checkmates</div>
                                <div className="text-lg font-black text-white">+50 Coins / Win</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Defeating the bot in free play or refuting tactical scenarios grants victory coins directly into your account balance.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-cyan-400 text-xs font-bold uppercase">Safe Top-Up</div>
                                <div className="text-lg font-black text-white">From €4.99</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Instant coin packages processed via Visa and Mastercard with 3D-Secure 2.0 multi-factor verification.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                                <div className="text-emerald-400 text-xs font-bold uppercase">Automated Invoicing</div>
                                <div className="text-lg font-black text-white">VAT Invoices</div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Every top-up generates an official downloadable PDF invoice with unique serial number and VAT breakdown in your profile.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Step by Step Getting Started */}
                    <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6">
                        <h2 className="text-2xl font-black text-white">
                            Ready to Start Playing?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">1</div>
                                <strong className="text-white block text-sm">Launch Arena</strong>
                                <span className="text-slate-400">Jump directly into <Link href="/play" className="text-amber-400 hover:underline font-medium">Free Play</Link> with default piece sets.</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">2</div>
                                <strong className="text-white block text-sm">Select Opening</strong>
                                <span className="text-slate-400">Pick an opening repertoire to practice human master theory.</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">3</div>
                                <strong className="text-white block text-sm">Checkmate Bot</strong>
                                <span className="text-slate-400">Earn victory coins and monitor coach move evaluation tags.</span>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">4</div>
                                <strong className="text-white block text-sm">Unlock Skins</strong>
                                <span className="text-slate-400">Browse the <Link href="/shop" className="text-amber-400 hover:underline font-medium">Store</Link> to equip futuristic neon, obsidian or arcade styles.</span>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <Link
                                href="/play"
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-300 transition"
                            >
                                Play Against Bot Now
                            </Link>
                            <Link
                                href="/fair-play"
                                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-sm hover:text-white hover:border-slate-700 transition"
                            >
                                Fair Play & Rules →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
