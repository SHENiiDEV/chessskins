import React, { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Coins, 
    ShieldCheck, 
    CreditCard, 
    Lock, 
    Check, 
    Sparkles, 
    Zap, 
    ArrowRight,
    Building,
    MapPin,
    Globe
} from 'lucide-react';

interface Package {
    id: string;
    coins: number;
    price_usd: number;
    badge?: string;
    popular?: boolean;
    description: string;
}

interface TopUpProps {
    packages: Package[];
    billingData: {
        name: string;
        surname?: string;
        email: string;
        phone?: string;
        address_line_1?: string;
        city?: string;
        country?: string;
        post_code?: string;
    };
}

export default function TopUp({ packages, billingData }: TopUpProps) {
    const [selectedPackId, setSelectedPackId] = useState<string>(
        packages.find(p => p.popular)?.id || packages[0].id
    );

    const { data, setData, post, processing, errors } = useForm({
        package_id: selectedPackId,
        card_number: '4242 •••• •••• 4242',
        card_exp: '12/28',
        card_cvc: '888',
    });

    const activePack = packages.find(p => p.id === selectedPackId) || packages[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/topup/checkout', {
            preserveScroll: true,
        });
    };

    const handleSelectPack = (packId: string) => {
        setSelectedPackId(packId);
        setData('package_id', packId);
    };

    return (
        <AppLayout>
            <Head title="Top Up Coins" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>Instant Wallet Top-Up</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        Purchase Coins
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Select a package. Your KYC billing information from your profile will be securely passed to the payment gateway to guarantee high transaction authorization rates.
                    </p>
                </div>

                {/* Package Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pack) => {
                        const isSelected = selectedPackId === pack.id;

                        return (
                            <div
                                key={pack.id}
                                onClick={() => handleSelectPack(pack.id)}
                                className={`rounded-3xl p-6 cursor-pointer border transition-all duration-200 relative flex flex-col justify-between ${
                                    isSelected
                                        ? 'bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-950 border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02]'
                                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {pack.badge && (
                                    <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                                        {pack.badge}
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                                            <Coins className="w-5 h-5" />
                                        </div>
                                        {isSelected && (
                                            <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-2xl font-black text-white">
                                        {pack.coins.toLocaleString()}{' '}
                                        <span className="text-xs font-semibold text-amber-400">Coins</span>
                                    </div>

                                    <p className="text-xs text-slate-400 mt-2 mb-6 leading-relaxed min-h-[36px]">
                                        {pack.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                    <span className="text-xs text-slate-400">Total Price</span>
                                    <span className="text-xl font-black text-white">
                                        ${pack.price_usd.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Checkout & Billing Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Billing Data Summary (from User profile) */}
                    <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-sm font-bold text-white">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Billing Data from Your Profile</span>
                            </div>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                KYC Verified
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            These billing coordinates are passed to the acquiring bank with the authorization request to prevent transaction declines:
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-slate-500 block mb-1">Payer Name:</span>
                                <span className="font-semibold text-white">
                                    {billingData.name} {billingData.surname}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                                <span className="text-slate-500 block mb-1">Email:</span>
                                <span className="font-semibold text-white truncate block">
                                    {billingData.email}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2">
                                <span className="text-slate-500 block mb-1">Registered Address:</span>
                                <span className="font-semibold text-white">
                                    {billingData.address_line_1}, {billingData.city}, {billingData.country} ({billingData.post_code})
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 flex items-center justify-between">
                                <span className="text-slate-500">Phone Number:</span>
                                <span className="font-semibold text-white">{billingData.phone || '—'}</span>
                            </div>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-2">
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Transmitted over TLS 1.3 encryption with end-to-end tokenization.</span>
                        </div>
                    </div>

                    {/* Right: Payment Gateway Card Form */}
                    <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-sm font-bold text-white">
                                <CreditCard className="w-4 h-4 text-amber-400" />
                                <span>Payment Gateway (Stripe / 3D-Secure)</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-amber-300">
                                Total: ${activePack.price_usd.toFixed(2)}
                            </span>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Card Number
                                </label>
                                <div className="relative">
                                    <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        required
                                        value={data.card_number}
                                        onChange={(e) => setData('card_number', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-mono"
                                        placeholder="4242 4242 4242 4242"
                                    />
                                </div>
                                {errors.card_number && <p className="text-rose-400 text-xs mt-1">{errors.card_number}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Expiration Date (MM/YY)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={5}
                                        value={data.card_exp}
                                        onChange={(e) => setData('card_exp', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-center"
                                        placeholder="12/28"
                                    />
                                    {errors.card_exp && <p className="text-rose-400 text-xs mt-1">{errors.card_exp}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        CVC / CVV
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        maxLength={4}
                                        value={data.card_cvc}
                                        onChange={(e) => setData('card_cvc', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono text-center"
                                        placeholder="•••"
                                    />
                                    {errors.card_cvc && <p className="text-rose-400 text-xs mt-1">{errors.card_cvc}</p>}
                                </div>
                            </div>

                            {/* Summary Box */}
                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                                <div className="flex justify-between text-slate-400">
                                    <span>Selected Package:</span>
                                    <span className="font-semibold text-white">+{activePack.coins.toLocaleString()} Coins</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Charge Amount:</span>
                                    <span className="font-semibold text-white">${activePack.price_usd.toFixed(2)} USD</span>
                                </div>
                                <div className="flex justify-between text-emerald-400 pt-1 border-t border-slate-800/80">
                                    <span>Processing Fee:</span>
                                    <span>$0.00 (Waived)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {processing ? (
                                    <span>Authorizing Gateway...</span>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        <span>Pay ${activePack.price_usd.toFixed(2)} & Receive {activePack.coins} Coins</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
