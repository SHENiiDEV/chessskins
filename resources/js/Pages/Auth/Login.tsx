import React, { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    const fillDemo = () => {
        setData({
            email: 'grandmaster@example.com',
            password: 'password123',
            remember: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Sign In" />

            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
                <div className="text-center mb-8 space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto shadow-lg shadow-amber-500/20">
                        ♚
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Sign In to ChessSkins
                    </h1>
                    <p className="text-slate-400 text-xs">
                        Sign in to continue training and equip your collectible skins
                    </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
                    {/* Demo quick fill badge */}
                    <button
                        type="button"
                        onClick={fillDemo}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Autofill Demo Grandmaster Account</span>
                    </button>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400"
                                />
                                <span>Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Enter Game</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="text-center pt-2 border-t border-slate-800">
                        <p className="text-xs text-slate-400">
                            Don't have an account yet?{' '}
                            <Link href="/register" className="text-amber-400 hover:underline font-semibold">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
