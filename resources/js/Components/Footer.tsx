import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import { 
    ShieldCheck, 
    Mail, 
    Globe, 
    Sparkles, 
    Building2, 
    MapPin, 
    Lock, 
    CreditCard, 
    CheckCircle2, 
    Cpu, 
    BookOpen, 
    Scale, 
    HelpCircle, 
    FileText,
    Award
} from 'lucide-react';
import { PageProps } from '@/types';

export default function Footer() {
    const { company } = usePage<PageProps>().props;

    return (
        <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Main 4-Column Directory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: Brand & Operating Entity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <Logo className="h-8 w-8" />
                            <span className="font-display text-base tracking-[0.13em] text-white">
                                CHESS<span className="text-brass">SKINS</span>
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                            A next-generation interactive web chess training platform. Practice against predictable, 
                            deterministic AI state-machines that punish tactical blunders, master opening repertoires, 
                            and customize your board with handcrafted vector SVG piece collections.
                        </p>

                        <div className="space-y-1.5 pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                                <ShieldCheck className="w-4 h-4 shrink-0" />
                                <span>KYC & AML Compliant Billing</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                                <Award className="w-4 h-4 shrink-0" />
                                <span>Official FIDE Chess Rules Certified</span>
                            </div>
                        </div>

                        {/* Operating Company Box */}
                        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
                            <div className="flex items-center gap-1.5 font-bold text-slate-200">
                                <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{company?.name || 'Chess Skins Ltd'}</span>
                            </div>
                            {company?.number && (
                                <div className="text-slate-400">
                                    Registration No: <strong className="text-slate-300 font-mono">{company.number}</strong>
                                </div>
                            )}
                            {company?.addr && (
                                <div className="flex items-start gap-1.5 text-slate-400 pt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                                    <span className="leading-snug">{company.addr}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 2: How It Works & Guides */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-amber-400" />
                            <span>How It Works & Guides</span>
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                                    <span>How It Works Overview</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-semibold">Guide</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/fair-play" className="hover:text-amber-400 transition-colors">
                                    Fair Play & RNG Determinism
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works#ai-tiers" className="hover:text-amber-400 transition-colors">
                                    AI Difficulty Tiers (800–2400 ELO)
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works#skins" className="hover:text-amber-400 transition-colors">
                                    Handcrafted Vector Skins Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/how-it-works#rewards" className="hover:text-amber-400 transition-colors">
                                    Victory Coins & Rewards
                                </Link>
                            </li>
                            <li>
                                <Link href="/play" className="hover:text-amber-400 transition-colors">
                                    Predictable Bot Arena
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Security & Legal Compliance */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Security & Legal</span>
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/security" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                                    <span>Security & PCI-DSS Safety</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 font-semibold">Protected</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/security#3ds" className="hover:text-cyan-400 transition-colors">
                                    Visa & Mastercard 3D Secure 2.0
                                </Link>
                            </li>
                            <li>
                                <Link href="/security#kyc" className="hover:text-cyan-400 transition-colors">
                                    KYC & Billing Verification
                                </Link>
                            </li>
                            <li>
                                <Link href="/security#invoicing" className="hover:text-cyan-400 transition-colors">
                                    Automated PDF Tax Invoices
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                                    Privacy & Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Support & Economy */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Help Center & Store</span>
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href="/faq" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                                    <span>Help Center & FAQ</span>
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold">Answers</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="hover:text-amber-400 transition-colors">
                                    Piece Sets & Board Store
                                </Link>
                            </li>
                            <li>
                                <Link href="/topup" className="hover:text-amber-400 transition-colors">
                                    Coin Top-Up Packages
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-amber-400 transition-colors">
                                    My Inventory & Invoices
                                </Link>
                            </li>
                            <li className="pt-2">
                                <span className="text-[11px] text-slate-500 block mb-1">Customer Support Desk:</span>
                                <a 
                                    href={`mailto:${company?.email || 'info@chess-skins.com'}`} 
                                    className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-medium text-xs break-all"
                                >
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    <span>{company?.email || 'info@chess-skins.com'}</span>
                                </a>
                                <span className="block text-[10px] text-slate-500 mt-0.5">Response within 24h on business days</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Certified Security & Payment Rails Banner */}
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center lg:text-left max-w-xl">
                            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-white uppercase tracking-wider">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Verified Payment Security & Fraud Prevention</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                Payments are protected by PCI-DSS Level 1 compliant infrastructure with Visa Secure and Mastercard Identity Check (EMV 3-D Secure 2.0). All card numbers are encrypted with 256-bit AES/TLS 1.3 and tokenized. No raw cardholder data is stored on our servers.
                            </p>
                        </div>

                        {/* Verified Badges with Logos */}
                        <div className="flex items-center flex-wrap justify-center gap-3 shrink-0">
                            {/* Visa */}
                            <div 
                                className="h-10 px-3.5 bg-white rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                                title="Verified by Visa Secure"
                            >
                                <img src="/images/badges/visa.png" alt="Visa" className="h-6 w-auto object-contain" />
                            </div>

                            {/* Mastercard */}
                            <div 
                                className="h-10 px-3.5 bg-white rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                                title="Mastercard Identity Check"
                            >
                                <img src="/images/badges/mastercard.png" alt="Mastercard" className="h-6 w-auto object-contain" />
                            </div>

                            {/* PCI DSS Compliant */}
                            <div 
                                className="h-10 px-3.5 bg-white rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-105"
                                title="PCI DSS Level 1 Certified"
                            >
                                <img src="/images/badges/pci-dss.png" alt="PCI DSS Compliant" className="h-6 w-auto object-contain" />
                            </div>

                            {/* 256-Bit SSL */}
                            <div 
                                className="h-10 px-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-1.5 text-slate-300 text-xs font-semibold shadow-inner"
                                title="256-Bit SSL Bank-Grade Encryption"
                            >
                                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="font-mono text-[11px]">256-Bit SSL</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Regulatory & Consumer Legal Disclosure */}
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-[11px] text-slate-500 leading-relaxed space-y-2">
                    <p>
                        <strong className="text-slate-400">Legal & Regulatory Notice:</strong> ChessSkins is an interactive web entertainment and chess training platform operated by{' '}
                        <strong className="text-slate-300">{company?.name || 'Chess Skins Ltd'}</strong>
                        {company?.number && <> (Company Registration No: <strong className="text-slate-300">{company.number}</strong>)</>}
                        {company?.addr && <>, registered at <span className="text-slate-400">{company.addr}</span></>}.
                    </p>
                    <p>
                        All chess piece collections, board palettes, and visual themes sold on this platform are virtual digital cosmetics for exclusive use within the ChessSkins web application. Digital skins do not modify official piece movement rules, timers, or the Laws of Chess as approved by the World Chess Federation (FIDE). All game scenarios operate on deterministic finite state-machines with zero random difficulty manipulation.
                    </p>
                    <p>
                        All coin purchases are processed securely through PCI-DSS Level 1 certified payment rails. Automated electronic VAT/tax invoices are generated instantly upon checkout and remain permanently accessible for download within the user profile. In accordance with consumer protection regulations, unused coin balances are eligible for refund within 14 calendar days of purchase upon contacting{' '}
                        <a href={`mailto:${company?.email || 'info@chess-skins.com'}`} className="text-slate-400 hover:text-amber-400 underline">
                            {company?.email || 'info@chess-skins.com'}
                        </a>.
                    </p>
                </div>

                {/* Bottom Bar: Copyright & Quick Links */}
                <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} {company?.name || 'Chess Skins Ltd'}. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px]">
                        <Link href="/how-it-works" className="hover:text-slate-300 transition">How It Works</Link>
                        <Link href="/fair-play" className="hover:text-slate-300 transition">Fair Play</Link>
                        <Link href="/security" className="hover:text-slate-300 transition">Security</Link>
                        <Link href="/faq" className="hover:text-slate-300 transition">FAQ</Link>
                        <Link href="/terms" className="hover:text-slate-300 transition">Terms & Conditions</Link>
                        <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
