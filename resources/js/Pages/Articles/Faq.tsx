import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    HelpCircle, 
    ChevronDown, 
    ArrowLeft, 
    Sparkles, 
    CreditCard, 
    ShieldCheck, 
    Cpu, 
    Palette, 
    Mail,
    Search
} from 'lucide-react';
import { PageProps } from '@/types';

interface FaqItem {
    question: string;
    answer: string | React.ReactNode;
    category: 'engine' | 'skins' | 'billing' | 'account';
}

export default function Faq() {
    const { company } = usePage<PageProps>().props;
    const [activeTab, setActiveTab] = useState<'all' | 'engine' | 'skins' | 'billing' | 'account'>('all');
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs: FaqItem[] = [
        {
            category: 'engine',
            question: 'How does the predictable bot differ from standard chess engines like Stockfish?',
            answer: 'Traditional engines search millions of moves per second and either play unbeatably or blunder randomly when dialed down. Our engine uses a deterministic finite state machine with curated opening books and tactical blunder scenarios. It provides realistic human-like sparring where mistakes can be systematically refuted.'
        },
        {
            category: 'engine',
            question: 'Can I choose specific openings to train against?',
            answer: 'Yes! In the Play arena, you can select from classic repertoires including the Italian Game (Giuoco Piano), Sicilian Defense, Ruy Lopez, and Queen’s Gambit. The bot prioritizes mainline book moves so you can test your opening preparation.'
        },
        {
            category: 'engine',
            question: 'How do Victory Coins work in the game?',
            answer: 'Every time you checkmate the bot in free play or successfully complete a tactical scenario, you are awarded 50 Chess Coins into your account wallet. These coins can be accumulated to purchase piece sets and board themes in the store.'
        },
        {
            category: 'engine',
            question: 'Does the game enforce standard FIDE rules?',
            answer: 'Yes, 100%. All World Chess Federation rules are strictly enforced, including en passant, kingside and queenside castling, pawn promotion (Queen, Rook, Bishop, Knight), 50-move draw, threefold repetition, and stalemate.'
        },
        {
            category: 'skins',
            question: 'Are piece skins and board themes permanent purchases?',
            answer: 'Yes. Once unlocked or purchased with Chess Coins, piece skins and board themes belong to your account permanently. You can switch between them at any time without extra fees.'
        },
        {
            category: 'skins',
            question: 'Do custom piece skins give any gameplay or strategic advantage?',
            answer: 'No. All skins are purely cosmetic visual enhancements. A Neon Knight moves identically to a Classic Staunton Knight. Piece hitboxes, movement rules, and timers are identical across all cosmetics.'
        },
        {
            category: 'skins',
            question: 'Can I mix and match different piece sets with different board themes?',
            answer: 'Absolutely. Piece skins and board themes are fully modular. You can equip the Obsidian Minimal pieces on the Neon Cyber board, or the Steampunk Brass set on the Emerald Classic board.'
        },
        {
            category: 'skins',
            question: 'How do I preview all 12 pieces of a theme before buying?',
            answer: 'In the Shop catalog, click the "Preview Pieces" button on any piece set card. A popup modal displays high-resolution SVG previews of all 12 pieces (King, Queen, Rook, Bishop, Knight, Pawn for both White and Black).'
        },
        {
            category: 'billing',
            question: 'What payment methods do you accept for Coin Top-Ups?',
            answer: 'We accept Visa, Mastercard, Maestro, and international debit/credit cards. All payments are processed through PCI-DSS Level 1 compliant gateways with EMV 3-D Secure 2.0 fraud verification.'
        },
        {
            category: 'billing',
            question: 'How do I obtain an invoice for my top-up purchase?',
            answer: 'An official invoice is sent to your registered email immediately following checkout. You can also view and download PDF invoices anytime directly from your Profile dashboard under "Billing History".'
        },
        {
            category: 'billing',
            question: 'Why do I have to enter my full name and billing address during checkout?',
            answer: 'Under EU and UK anti-money laundering (AML) laws and digital sales tax regulations, we must verify customer identity (KYC) and validate billing addresses against issuing bank records to prevent fraud and generate legally valid VAT invoices.'
        },
        {
            category: 'billing',
            question: 'Can I get a refund if I decide not to use my purchased coins?',
            answer: 'Yes. If a coin package was purchased in error and zero coins have been spent, you are entitled to a full refund within 14 calendar days under our digital goods return policy. Simply email our support desk with your invoice reference.'
        },
        {
            category: 'account',
            question: 'Do I need an account to play against the bot?',
            answer: 'No, guest visitors can play free games against the bot immediately! However, registering a free account is required to save your match statistics, earn victory coins, and retain purchased cosmetics in your inventory.'
        },
        {
            category: 'account',
            question: 'How is my personal data protected?',
            answer: 'We adhere strictly to the General Data Protection Regulation (GDPR) and UK Data Protection Act. We never sell your personal information, and payment card details are tokenized by PCI-certified processors without ever touching our servers in plaintext.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeTab === 'all' || faq.category === activeTab;
        const matchesQuery = searchQuery === '' || 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery;
    });

    return (
        <AppLayout>
            <Head title="Help Center & Frequently Asked Questions — ChessSkins" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Lobby</span>
                    </Link>
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Help Center & FAQ</h1>
                            <p className="text-xs text-slate-400 mt-0.5">Find answers regarding gameplay, predictable AI, piece skins, billing, and security.</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar & Category Tabs */}
                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions (e.g., bot levels, invoices, skins, refunds)..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/80 transition"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                                activeTab === 'all'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            All Questions ({faqs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('engine')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                                activeTab === 'engine'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Cpu className="w-3.5 h-3.5" />
                            <span>AI & Engine</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('skins')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                                activeTab === 'skins'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <Palette className="w-3.5 h-3.5" />
                            <span>Skins & Boards</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('billing')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                                activeTab === 'billing'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Billing & KYC</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                                activeTab === 'account'
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Account & Privacy</span>
                        </button>
                    </div>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-3 mb-12">
                    {filteredFaqs.length === 0 ? (
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
                            No questions found matching "{searchQuery}". Try a different keyword or contact our support team.
                        </div>
                    ) : (
                        filteredFaqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        isOpen
                                            ? 'bg-slate-900/90 border-slate-700 shadow-lg shadow-amber-500/5'
                                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="w-full px-6 py-4.5 flex items-center justify-between text-left gap-4 cursor-pointer"
                                    >
                                        <span className="text-sm sm:text-base font-bold text-white leading-snug">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180 text-amber-400' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Contact Operator Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="text-base font-bold text-white">Still have questions?</h3>
                        <p className="text-xs text-slate-400">
                            Our support desk responds to player inquiries within 24 hours on business days.
                        </p>
                    </div>
                    <a
                        href={`mailto:${company?.email || 'info@chess-skins.com'}`}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-300 transition flex items-center gap-2 shrink-0"
                    >
                        <Mail className="w-4 h-4" />
                        <span>Email Support</span>
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
