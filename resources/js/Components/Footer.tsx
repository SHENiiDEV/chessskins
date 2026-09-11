import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import { ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand summary */}
                <div className="space-y-4 md:col-span-1">
                    <div className="flex items-center gap-2.5">
                        <Logo className="h-8 w-8" />
                        <span className="font-display text-base tracking-[0.13em] text-white">
                            CHESS<span className="text-brass">SKINS</span>
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Innovative web chess training platform featuring deterministic bot state-machine scenarios and collectible vector piece skins.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>KYC & AML Compliant Platform</span>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-3">Platform</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/play" className="hover:text-amber-400 transition-colors">
                                Bot Training
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className="hover:text-amber-400 transition-colors">
                                Skin Store
                            </Link>
                        </li>
                        <li>
                            <Link href="/topup" className="hover:text-amber-400 transition-colors">
                                Top-up Coins
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal / Compliance */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-3">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/terms" className="hover:text-amber-400 transition-colors">
                                Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <span className="text-xs text-slate-500 block pt-1">
                                Strict billing validation & 3D-Secure certified processing.
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Contacts & Support */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-amber-400" />
                            <a href="mailto:support@chessskins.io" className="hover:text-amber-400 transition-colors">
                                support@chessskins.io
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <span>Global CDN & Edge Servers</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>v1.0.0 Pro Production Build</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <p>© {new Date().getFullYear()} ChessSkins Platform. All rights reserved.</p>
                <div className="flex space-x-6">
                    <Link href="/terms" className="hover:text-slate-400 transition">Terms & Conditions</Link>
                    <Link href="/privacy" className="hover:text-slate-400 transition">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
