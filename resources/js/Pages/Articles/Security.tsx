import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ShieldCheck, 
    Lock, 
    CreditCard, 
    FileText, 
    ArrowLeft, 
    CheckCircle2, 
    Building2, 
    AlertCircle,
    KeyRound,
    UserCheck,
    RefreshCw
} from 'lucide-react';
import { PageProps } from '@/types';

export default function Security() {
    const { company } = usePage<PageProps>().props;

    return (
        <AppLayout>
            <Head title="Security & Billing Compliance — PCI-DSS, Visa & Mastercard Protection" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Lobby</span>
                    </Link>
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Security & Payment Protection</h1>
                            <p className="text-xs text-slate-400 mt-0.5">PCI-DSS Level 1 compliance, Visa Secure, Mastercard 3D Secure, and rigorous KYC billing standards.</p>
                        </div>
                    </div>
                </div>

                {/* Trust Badges Showcase Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-xl mb-10">
                    <div className="text-center sm:text-left mb-6">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                            Certified Payment Rails
                        </span>
                        <h2 className="text-lg font-bold text-white mt-1">
                            Enterprise Security Standards for Every Transaction
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Visa */}
                        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center space-y-3">
                            <div className="h-10 px-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <img src="/images/badges/visa.png" alt="Visa Verified" className="h-6 w-auto object-contain" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-white block">Visa Secure</span>
                                <span className="text-[11px] text-slate-400">EMV 3-D Secure 2.0 multi-factor verification.</span>
                            </div>
                        </div>

                        {/* Mastercard */}
                        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center space-y-3">
                            <div className="h-10 px-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <img src="/images/badges/mastercard.png" alt="Mastercard Identity Check" className="h-6 w-auto object-contain" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-white block">Mastercard Identity Check</span>
                                <span className="text-[11px] text-slate-400">Zero-liability fraud protection and biometric authentication.</span>
                            </div>
                        </div>

                        {/* PCI DSS */}
                        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center text-center space-y-3">
                            <div className="h-10 px-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <img src="/images/badges/pci-dss.png" alt="PCI DSS Compliant" className="h-6 w-auto object-contain" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-white block">PCI-DSS Compliant</span>
                                <span className="text-[11px] text-slate-400">Strict tokenized storage. Zero card data stored on server.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-10 text-sm text-slate-300 leading-relaxed">
                    {/* 1. PCI-DSS Compliance & Card Data Safety */}
                    <section id="pci" className="space-y-4 scroll-mt-24">
                        <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                            <Lock className="w-5 h-5 text-amber-400" />
                            <h3>1. PCI Data Security Standard (PCI-DSS) Architecture</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            ChessSkins is built to adhere strictly to the Payment Card Industry Data Security Standard (PCI-DSS). 
                            When you purchase coin packages on our website:
                        </p>
                        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>End-to-End Encryption (E2EE):</strong> All card details transmitted across our site are protected by TLS 1.3 encryption with 256-bit AES cryptographic keys.</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Zero Plaintext Storage:</strong> We NEVER store full 16-digit primary account numbers (PANs) or card verification values (CVV/CVC) on our databases.</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span><strong>Secure Tokenization:</strong> Transactions are routed through tokenized payment conduits compliant with strict European and international banking directives.</span>
                            </div>
                        </div>
                    </section>

                    {/* 2. 3D Secure 2.0 (3DS) Fraud Shield */}
                    <section id="3ds" className="space-y-4 scroll-mt-24">
                        <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                            <KeyRound className="w-5 h-5 text-cyan-400" />
                            <h3>2. Visa Secure & Mastercard 3D Secure (3DS 2.0)</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            To protect cardholders from unauthorized use and identity theft, every top-up transaction engages 
                            <strong>3-D Secure 2.0</strong> protocol:
                        </p>
                        <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                            <li><strong>Dynamic Bank Challenge:</strong> Your issuing bank prompts you to authenticate via an SMS one-time passcode (OTP), push notification, or biometric scan (Face ID / Fingerprint) in your banking mobile application.</li>
                            <li><strong>Chargeback & Fraud Shield:</strong> Stolen card numbers cannot be executed without secondary two-factor authentication, keeping our community and ecosystem fraud-free.</li>
                        </ul>
                    </section>

                    {/* 3. KYC and Billing Address Verification */}
                    <section id="kyc" className="space-y-4 scroll-mt-24">
                        <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                            <UserCheck className="w-5 h-5 text-emerald-400" />
                            <h3>3. Why We Require Full KYC Billing Information</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Under European Union anti-money laundering (AML) directives, UK Companies Act regulations, and international digital goods tax treaties:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                <strong className="text-white block">Identity Verification</strong>
                                <span className="text-slate-400">Legal name, date of birth (must be 18+), and phone number prevent illicit automated bot accounts and minor credit card abuse.</span>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                                <strong className="text-white block">Address Verification System (AVS)</strong>
                                <span className="text-slate-400">Your street address and postal code are matched against card issuer records to prevent cross-border stolen card attempts.</span>
                            </div>
                        </div>
                    </section>

                    {/* 4. Automated PDF Invoicing */}
                    <section id="invoicing" className="space-y-4 scroll-mt-24">
                        <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                            <FileText className="w-5 h-5 text-purple-400" />
                            <h3>4. Automated Electronic VAT Invoices</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Every checkout produces a permanent, audit-ready financial record:
                        </p>
                        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                            <p>• <strong>Instant Dispatch:</strong> An official invoice is sent to your verified email address immediately following payment confirmation.</p>
                            <p>• <strong>1-Tap PDF Download:</strong> Download signed invoices anytime from your <Link href="/profile" className="text-amber-400 hover:underline font-bold">Profile Dashboard</Link>.</p>
                            <p>• <strong>Tax Details:</strong> Invoices include complete corporate registration number, registered office address, date of transaction, unique invoice reference, and applicable VAT breakdown.</p>
                        </div>
                    </section>

                    {/* 5. Refunds & Consumer Rights */}
                    <section id="refunds" className="space-y-4 scroll-mt-24">
                        <div className="flex items-center gap-2.5 text-white font-bold text-lg">
                            <RefreshCw className="w-5 h-5 text-amber-400" />
                            <h3>5. Refund & Cancellation Terms</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Because Chess Coins and digital skins are digital content made immediately accessible upon purchase:
                        </p>
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
                            <p>• <strong>Unused Balances:</strong> If a coin package was purchased in error and zero coins have been expended, you may request a full refund to your original payment card within 14 calendar days.</p>
                            <p>• <strong>Expended Coins:</strong> Once coins have been exchanged for digital piece sets or board themes in the store, the digital service is deemed fully delivered and non-refundable.</p>
                            <p>• <strong>Technical Disputes:</strong> If a payment was debited but coins were not credited due to network interruption, our system auto-reconciles within 1 hour or our support team resolves it upon email request.</p>
                        </div>
                    </section>

                    {/* Corporate Entity Summary */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>Billing Operator Entity</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                            <div>
                                <span className="text-slate-500 block">Operator:</span>
                                <strong className="text-white">{company?.name || 'Chess Skins Ltd'}</strong>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Registration Number:</span>
                                <strong className="text-white">{company?.number || '14892019'}</strong>
                            </div>
                            <div className="sm:col-span-2">
                                <span className="text-slate-500 block">Registered Office:</span>
                                <strong className="text-slate-300">{company?.addr || '27 Old Gloucester Street, London, WC1N 3AX, United Kingdom'}</strong>
                            </div>
                            <div className="sm:col-span-2">
                                <span className="text-slate-500 block">Support Desk:</span>
                                <a href={`mailto:${company?.email || 'info@chess-skins.com'}`} className="text-amber-400 underline font-medium">
                                    {company?.email || 'info@chess-skins.com'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
