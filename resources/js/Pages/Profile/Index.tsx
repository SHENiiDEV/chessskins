import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    User as UserIcon, 
    Coins, 
    ShieldCheck, 
    Clock, 
    ShoppingBag, 
    CreditCard, 
    MapPin, 
    Calendar, 
    Phone, 
    Mail, 
    PlusCircle,
    Crown,
    Grid,
    ArrowUpRight,
    ArrowDownLeft,
    FileDown
} from 'lucide-react';
import { getBoardTheme } from '@/utils/chessSkins';
import { User, Skin, Transaction } from '@/types';

interface ProfileProps {
    user: User;
    ownedSkins: Skin[];
    transactions: Transaction[];
}

export default function Profile({ user, ownedSkins, transactions }: ProfileProps) {
    const handleEquip = (skin: Skin) => {
        router.post(`/shop/equip/${skin.id}`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Profile & Transactions" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
                {/* Header Profile Summary */}
                <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-black text-xl sm:text-2xl text-slate-950 shadow-xl shadow-amber-500/20 shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-black text-white">
                                    {user.name} {user.surname}
                                </h1>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-semibold">
                                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span>Verified</span>
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Platform member since {user.created_at || 'recently'}
                            </p>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="flex items-center justify-between sm:justify-start gap-4 bg-slate-950 px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-800 w-full sm:w-auto">
                        <div>
                            <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider block">Wallet Balance</span>
                            <span className="text-xl sm:text-2xl font-black text-amber-300">
                                {user.wallet_balance.toLocaleString()} <span className="text-xs text-slate-400">Coins</span>
                            </span>
                        </div>
                        <Link
                            href="/topup"
                            className="p-2 sm:p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition cursor-pointer active:scale-95"
                            title="Top up balance"
                        >
                            <PlusCircle className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    {/* Left: KYC Profile Details & Active Skin */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Personal & Billing Details */}
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-cyan-400" />
                                <span>KYC Profile Verification</span>
                            </h2>

                            <div className="space-y-3 text-xs">
                                <div className="flex items-center gap-2.5 text-slate-300">
                                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-300">
                                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                                    <span>{user.phone || '—'}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-300">
                                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                                    <span>Date of Birth: {user.dob || '—'}</span>
                                </div>
                                <div className="flex items-start gap-2.5 text-slate-300 pt-2 border-t border-slate-800">
                                    <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p>{user.address_line_1}</p>
                                        <p className="text-slate-400">
                                            {user.city}, {user.country} ({user.post_code})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Owned Skins & Boards Quick View */}
                        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                                    <span>My Inventory ({ownedSkins.length})</span>
                                </h2>
                                <Link href="/shop" className="text-xs text-amber-400 hover:underline">
                                    To Store →
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                                {ownedSkins.map((skin) => {
                                    const isBoard = skin.type === 'board' || skin.slug.startsWith('board-');
                                    const isEquipped = isBoard
                                        ? skin.id === user.active_board_id
                                        : skin.id === user.active_skin_id;
                                    const theme = getBoardTheme(skin.slug);

                                    return (
                                        <div
                                            key={skin.id}
                                            className={`p-3 rounded-2xl border text-center space-y-2 flex flex-col justify-between transition-all ${
                                                isEquipped
                                                    ? isBoard
                                                        ? 'bg-cyan-500/10 border-cyan-500/50'
                                                        : 'bg-amber-500/10 border-amber-500/50'
                                                    : 'bg-slate-950 border-slate-800'
                                            }`}
                                        >
                                            <div className="aspect-square flex items-center justify-center p-2 relative">
                                                {isBoard ? (
                                                    <div className="w-12 h-12 rounded-md overflow-hidden grid grid-cols-4 border border-white/20 shadow-md">
                                                        {Array.from({ length: 16 }).map((_, i) => {
                                                            const row = Math.floor(i / 4);
                                                            const col = i % 4;
                                                            const isDark = (row + col) % 2 === 1;
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    style={{ backgroundColor: isDark ? theme.dark : theme.light }}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={`/skins/${skin.slug}/wK.svg`}
                                                        alt={skin.name}
                                                        className="w-10 h-10 object-contain drop-shadow"
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).src = '/skins/default/wK.svg';
                                                        }}
                                                    />
                                                )}
                                                <span className="absolute top-0 right-0 text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                                                    {isBoard ? 'Board' : 'Pieces'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white truncate" title={skin.name}>{skin.name}</div>
                                                <div className="text-[10px] text-slate-400 truncate">{skin.slug}</div>
                                            </div>
                                            {isEquipped ? (
                                                <span className={`text-[10px] font-bold py-1 rounded-lg block ${
                                                    isBoard ? 'text-cyan-400 bg-cyan-500/10' : 'text-amber-400 bg-amber-500/10'
                                                }`}>
                                                    Equipped
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleEquip(skin)}
                                                    className="w-full py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition cursor-pointer"
                                                >
                                                    Equip
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Billing & Transaction History */}
                    <div className="lg:col-span-8 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 sm:space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                <span>Financial Transaction History</span>
                            </h2>
                            <Link
                                href="/topup"
                                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                            >
                                <span>Top Up</span>
                                <span>→</span>
                            </Link>
                        </div>

                        {transactions.length === 0 ? (
                            <div className="text-center py-12 text-slate-500 text-sm">
                                No financial transactions recorded yet.
                            </div>
                        ) : (
                            <>
                                {/* Mobile Transaction Cards (sm:hidden) */}
                                <div className="sm:hidden space-y-2.5">
                                    {transactions.map((t) => (
                                        <div
                                            key={t.id}
                                            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1.5 font-medium text-xs text-slate-200">
                                                    {t.type === 'topup' ? (
                                                        <>
                                                            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                                            <span>Wallet Top-up</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                                            <span>Skin Purchase</span>
                                                        </>
                                                    )}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                                                    {t.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span
                                                    className={`font-black font-mono text-sm ${
                                                        t.amount > 0 ? 'text-emerald-400' : 'text-slate-300'
                                                    }`}
                                                >
                                                    {t.amount > 0 ? `+${t.amount}` : t.amount} Coins
                                                </span>
                                                <span className="text-[11px] text-slate-500 font-sans">
                                                    {new Date(t.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>

                                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                                                <span className="truncate max-w-[140px] font-mono text-[10px]">
                                                    Ref: {t.payment_gateway_reference || '—'}
                                                </span>
                                                {t.type === 'topup' && t.status === 'completed' && (
                                                    <a
                                                        href={`/invoices/${t.id}/download`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-[11px] font-bold transition shadow-sm active:scale-95"
                                                    >
                                                        <FileDown className="w-3 h-3" />
                                                        <span>PDF Invoice</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop Transaction Table (hidden sm:block) */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                                                <th className="pb-3 font-semibold">Type</th>
                                                <th className="pb-3 font-semibold">Amount</th>
                                                <th className="pb-3 font-semibold">Status</th>
                                                <th className="pb-3 font-semibold">Gateway Reference</th>
                                                <th className="pb-3 font-semibold text-center">Invoice</th>
                                                <th className="pb-3 font-semibold text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60 font-mono">
                                            {transactions.map((t) => (
                                                <tr key={t.id} className="hover:bg-slate-950/40 transition">
                                                    <td className="py-3.5">
                                                        <span className="flex items-center gap-1.5 font-sans font-medium text-slate-200">
                                                            {t.type === 'topup' ? (
                                                                <>
                                                                    <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                                                                    <span>Wallet Top-up</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                                                                    <span>Skin Purchase</span>
                                                                </>
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5">
                                                        <span
                                                            className={`font-bold ${
                                                                t.amount > 0 ? 'text-emerald-400' : 'text-slate-300'
                                                            }`}
                                                        >
                                                            {t.amount > 0 ? `+${t.amount}` : t.amount} Coins
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5">
                                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                                                            {t.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 text-slate-400 truncate max-w-[160px]">
                                                        {t.payment_gateway_reference || '—'}
                                                    </td>
                                                    <td className="py-3.5 text-center font-sans">
                                                        {t.type === 'topup' && t.status === 'completed' ? (
                                                            <a
                                                                href={`/invoices/${t.id}/download`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-sans text-[11px] font-bold transition group shadow-sm"
                                                                title="Download Official Tax Invoice (PDF)"
                                                            >
                                                                <FileDown className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                                                                <span>PDF</span>
                                                            </a>
                                                        ) : (
                                                            <span className="text-slate-600 text-[11px]">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3.5 text-slate-400 text-right font-sans">
                                                        {new Date(t.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
