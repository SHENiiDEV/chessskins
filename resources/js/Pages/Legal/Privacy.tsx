import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export default function Privacy() {
    return (
        <AppLayout>
            <Head title="Privacy Policy — Data Protection" />

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
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
                            <p className="text-xs text-slate-400">Last updated: September 10, 2026</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">1. Personal Data Collection & Processing</h2>
                        <p>
                            We collect and process the information provided during registration (first name, surname, email, date of birth, telephone number, postal code, city, country, and address line) 
                            strictly for KYC/AML compliance, secure billing authorization, and platform service delivery.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">2. Billing Security & Cardholder Protection</h2>
                        <p>
                            Financial transactions are secured via TLS 1.3 encrypted connections. 
                            Cardholder credentials are submitted directly to PCI-DSS Level 1 certified payment processors. 
                            ChessSkins never stores raw payment card numbers, PINs, or CVV/CVC security codes on its application servers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">3. Cookies & Session Security</h2>
                        <p>
                            We employ essential session cookies solely for user authentication state management and cross-site request forgery (CSRF) defense.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-lg font-bold text-white">4. User Privacy Rights</h2>
                        <p>
                            You hold the right to request access to, rectification of, or deletion of your personal profile data by contacting our Data Protection Officer at: 
                            <a href="mailto:privacy@chessskins.io" className="text-cyan-400 underline ml-1">privacy@chessskins.io</a>.
                        </p>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
