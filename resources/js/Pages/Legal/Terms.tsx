import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { FileText, ShieldCheck, ArrowLeft, Building2, MapPin, Mail } from 'lucide-react';
import { PageProps } from '@/types';

export default function Terms() {
    const { company } = usePage<PageProps>().props;
    return (
        <AppLayout>
            <Head title="Terms & Conditions — User Agreement" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Home</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Terms & Conditions</h1>
                            <p className="text-xs text-slate-400">Last updated: September 10, 2026</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8 text-sm text-slate-300 leading-relaxed">
                    {/* Operator Information Box */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>Platform Operator Information</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                            <div>
                                <span className="text-slate-500 block">Operating Entity:</span>
                                <strong className="text-white text-sm">{company?.name || 'Chess Skins Ltd'}</strong>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Company Registration Number:</span>
                                <strong className="text-white text-sm">{company?.number || '14892019'}</strong>
                            </div>
                            <div className="sm:col-span-2">
                                <span className="text-slate-500 block">Registered Office Address:</span>
                                <strong className="text-slate-300">{company?.addr || '27 Old Gloucester Street, London, WC1N 3AX, United Kingdom'}</strong>
                            </div>
                            <div className="sm:col-span-2">
                                <span className="text-slate-500 block">Official Contact / Compliance Email:</span>
                                <a href={`mailto:${company?.email || 'info@chess-skins.com'}`} className="text-amber-400 underline font-medium">
                                    {company?.email || 'info@chess-skins.com'}
                                </a>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">1. Introduction & Acceptance of Terms</h2>
                        <p>
                            This User Agreement governs your access to and use of the chess platform operated by <strong>{company?.name || 'Chess Skins Ltd'}</strong>. 
                            By creating an account, accessing, or playing on our service, you acknowledge that you have read, 
                            understood, and agreed to be legally bound by these terms.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">2. Identity Verification & KYC Requirements</h2>
                        <p>
                            To comply with international card payment network rules (including Visa and Mastercard risk mitigation protocols), 
                            users must provide authentic and verifiable personal information upon registration: full name, date of birth, 
                            telephone number, and residential billing address.
                        </p>
                        <p className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                            <strong>Restricted Jurisdictions</strong>: Registration, gameplay accounts, and payment processing are strictly prohibited 
                            for residents or citizens located in designated sanctioned jurisdictions, including: Sudan, Dem. Rep. of the Congo, 
                            Iran, Mali, Myanmar (Burma), North Korea, South Sudan, Syria, Yemen, Afghanistan, Belarus, Central African Republic, 
                            Cuba, Haiti, Iraq, Russia, Somalia, Venezuela, and Zimbabwe.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">3. Virtual Currency (Coins) & Piece Skins</h2>
                        <p>
                            Coins represent a closed-loop digital in-game utility unit designed exclusively for unlocking cosmetic piece skins and board visual assets. 
                            Coins possess no real-world financial tender status, are non-refundable, and cannot be redeemed or cashed out for fiat currency.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">4. Intellectual Property & Fair Play</h2>
                        <p>
                            All piece skins, SVG icon vectors, deterministic bot state machine algorithms, and software code are the proprietary intellectual property of <strong>{company?.name || 'Chess Skins Ltd'}</strong>. 
                            Automated crawling, unauthorized scraping, or reverse engineering of the training bot state tree is strictly prohibited.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">5. Customer Support & Contact</h2>
                        <p>
                            For inquiries concerning your account, transactions, or compliance documentation, please contact our support team at: 
                            <a href={`mailto:${company?.email || 'info@chess-skins.com'}`} className="text-amber-400 underline ml-1">
                                {company?.email || 'info@chess-skins.com'}
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
