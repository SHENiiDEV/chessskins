import React, { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ShieldCheck, 
    Lock, 
    Mail, 
    User, 
    Phone, 
    Calendar, 
    MapPin, 
    Building, 
    Globe, 
    Check, 
    Info,
    ExternalLink
} from 'lucide-react';

interface RegisterProps {
    allowedCountries: string[];
}

export default function Register({ allowedCountries }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        dob: '',
        address_line_1: '',
        city: '',
        country: allowedCountries.includes('United States') ? 'United States' : allowedCountries[0] || '',
        post_code: '',
        terms: false,
    });

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout>
            <Head title="Registration & KYC Verification" />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                {/* Header card */}
                <div className="text-center mb-8 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>KYC & Billing Ready Form</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Create Player Account
                    </h1>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                        Complete your profile details for instant access to the training bot, skin store purchases, and secure billing transactions.
                    </p>
                </div>

                <form onSubmit={submit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8">
                    
                    {/* Section 1: Account Credentials */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 text-sm font-bold uppercase tracking-wider">
                            <Lock className="w-4 h-4" />
                            <span>1. Account Credentials</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Email Address <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500"
                                        placeholder="grandmaster@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Password (minimum 8 characters) <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Confirm Password <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Personal Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-cyan-400 text-sm font-bold uppercase tracking-wider">
                            <User className="w-4 h-4" />
                            <span>2. Personal Details</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    First Name <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                    placeholder="Garry"
                                />
                                {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Last Name / Surname <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.surname}
                                    onChange={(e) => setData('surname', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                    placeholder="Kasparov"
                                />
                                {errors.surname && <p className="text-rose-400 text-xs mt-1.5">{errors.surname}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Phone Number <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="tel"
                                        required
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white"
                                        placeholder="+1 (555) 019-2834"
                                    />
                                </div>
                                {errors.phone && <p className="text-rose-400 text-xs mt-1.5">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Date of Birth <span className="text-rose-400">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="date"
                                        required
                                        value={data.dob}
                                        onChange={(e) => setData('dob', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white"
                                    />
                                </div>
                                {errors.dob && <p className="text-rose-400 text-xs mt-1.5">{errors.dob}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Billing Address */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-purple-400 text-sm font-bold uppercase tracking-wider">
                            <MapPin className="w-4 h-4" />
                            <span>3. Billing Address</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Address Line 1 (Street, house, apt) <span className="text-rose-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.address_line_1}
                                    onChange={(e) => setData('address_line_1', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                    placeholder="123 Chessmaster Boulevard, Apt 4B"
                                />
                                {errors.address_line_1 && <p className="text-rose-400 text-xs mt-1.5">{errors.address_line_1}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        City <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            required
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white"
                                            placeholder="London"
                                        />
                                    </div>
                                    {errors.city && <p className="text-rose-400 text-xs mt-1.5">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Country <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <select
                                            required
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white appearance-none"
                                        >
                                            {allowedCountries.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.country && <p className="text-rose-400 text-xs mt-1.5">{errors.country}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Post Code / ZIP <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.post_code}
                                        onChange={(e) => setData('post_code', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-4 py-2.5 text-sm text-white"
                                        placeholder="SW1A 1AA"
                                    />
                                    {errors.post_code && <p className="text-rose-400 text-xs mt-1.5">{errors.post_code}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Mandatory Terms & Privacy Consent */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) => setData('terms', e.target.checked)}
                                className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950 transition cursor-pointer"
                            />
                            <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                I agree to the{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowTermsModal(true)}
                                    className="text-amber-400 hover:text-amber-300 underline font-semibold focus:outline-none"
                                >
                                    Terms & Conditions
                                </button>{' '}
                                and{' '}
                                <button
                                    type="button"
                                    onClick={() => setShowPrivacyModal(true)}
                                    className="text-amber-400 hover:text-amber-300 underline font-semibold focus:outline-none"
                                >
                                    Privacy Policy
                                </button>
                                .
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-rose-400 text-xs pl-8 font-medium">{errors.terms}</p>
                        )}
                        {!data.terms && (
                            <p className="text-[11px] text-slate-500 pl-8 flex items-center gap-1">
                                <Info className="w-3 h-3 text-slate-500" />
                                <span>The register button unlocks once consent is confirmed.</span>
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!data.terms || processing}
                            className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                                data.terms && !processing
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                            }`}
                        >
                            {processing ? (
                                <span>Registering account...</span>
                            ) : (
                                <>
                                    <Check className="w-5 h-5" />
                                    <span>Register & Claim 200 Bonus Coins</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-xs text-slate-400">
                            Already registered?{' '}
                            <Link href="/login" className="text-amber-400 hover:underline font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Terms Modal */}
            {showTermsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-lg font-bold text-white">Terms & Conditions</h3>
                            <button onClick={() => setShowTermsModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pr-2">
                            <p><strong>1. Introduction</strong>: Welcome to ChessSkins. By accessing or using our platform, you agree to comply with and be bound by these Terms.</p>
                            <p><strong>2. Account & KYC</strong>: Users must provide accurate, current, and complete personal and billing information. Prohibited jurisdictions will be restricted from opening accounts.</p>
                            <p><strong>3. Virtual Currency (Coins)</strong>: Coins are in-game digital goods with no real-world monetary value outside our platform. Coins can be used solely to unlock piece skins and features.</p>
                            <p><strong>4. Fair Play & Predictable Bot</strong>: The deterministic bot is designed for training. Automated scraping or reverse engineering is prohibited.</p>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => {
                                    setData('terms', true);
                                    setShowTermsModal(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                            >
                                I Understand & Agree
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Privacy Policy Modal */}
            {showPrivacyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col p-6 shadow-2xl">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                            <button onClick={() => setShowPrivacyModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pr-2">
                            <p><strong>1. Data Collection</strong>: We collect your name, email, date of birth, phone number, and billing address strictly for KYC verification, payment gateway integration, and fraud prevention.</p>
                            <p><strong>2. Payment Security</strong>: Card data is processed directly via PCI-DSS certified tokenization and never stored on our application servers.</p>
                            <p><strong>3. Your Rights</strong>: You may request review or deletion of your profile by reaching out to support@chessskins.io.</p>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex justify-end">
                            <button
                                onClick={() => {
                                    setData('terms', true);
                                    setShowPrivacyModal(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                            >
                                Accept Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
