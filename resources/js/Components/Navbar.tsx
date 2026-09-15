import React, { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import { PageProps } from '@/types';
import { Coins, Home as HomeIcon, LogOut, Menu, Plus, ShoppingBag, Swords, User as UserIcon, X, FileText, Shield } from 'lucide-react';

const NAV_LINKS = [
    { href: '/play', label: 'Training' },
    { href: '/shop', label: 'Skins' },
    { href: '/topup', label: 'Top up' },
];

const isCurrent = (url: string, href: string): boolean =>
    url === href || url.startsWith(`${href}/`);

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;
    const url = usePage().url;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    /** The bar stays weightless at the top of the page and gains an edge once you scroll. */
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /** Close both menus on navigation. */
    useEffect(() => {
        setMobileOpen(false);
        setUserMenuOpen(false);
    }, [url]);

    /** A dropdown has to close on an outside click and on Escape, not on mouse-out. */
    useEffect(() => {
        if (!userMenuOpen) {
            return;
        }

        const onPointerDown = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [userMenuOpen]);

    const handleLogout = () => router.post('/logout');

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
                isScrolled
                    ? 'border-slate-800/80 bg-slate-950/85 backdrop-blur-xl'
                    : 'border-transparent bg-slate-950/50 backdrop-blur-md'
            }`}
        >
            <div className="mx-auto flex h-[68px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link href="/" className="group flex items-center gap-3" aria-label="ChessSkins — home">
                    <Logo className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    <span className="flex flex-col leading-none">
                        <span className="font-display text-[17px] tracking-[0.13em] text-white">
                            CHESS<span className="text-brass">SKINS</span>
                        </span>
                        <span className="mt-1.5 hidden font-mono text-[9px] uppercase tracking-[0.26em] text-slate-500 sm:block">
                            Predictable bot
                        </span>
                    </span>
                </Link>

                {/* Primary navigation — full height so the active rule sits on the bar's edge */}
                <nav className="ml-10 hidden h-full items-stretch md:flex">
                    {NAV_LINKS.map((link) => {
                        const current = isCurrent(url, link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={current ? 'page' : undefined}
                                className={`relative flex items-center px-4 text-sm transition-colors ${
                                    current ? 'text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {link.label}
                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-brass transition-opacity duration-300 ${
                                        current ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Account */}
                <div className="ml-auto hidden items-center gap-2.5 md:flex">
                    {auth.user ? (
                        <>
                            <Link
                                href="/topup"
                                title="Top up balance"
                                className="group flex items-center gap-2 rounded-full border border-brass-deep/60 bg-brass/10 py-1.5 pl-3 pr-2.5 transition-colors hover:border-brass hover:bg-brass/15"
                            >
                                <Coins className="h-3.5 w-3.5 text-brass" />
                                <span className="font-mono text-[13px] font-medium tabular-nums text-brass-soft">
                                    {auth.user.wallet_balance.toLocaleString('ru-RU')}
                                </span>
                                <Plus className="h-3.5 w-3.5 text-brass-deep transition-colors group-hover:text-brass" />
                            </Link>

                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((open) => !open)}
                                    aria-haspopup="menu"
                                    aria-expanded={userMenuOpen}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                                        userMenuOpen
                                            ? 'border-brass bg-brass/15 text-brass-soft'
                                            : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
                                    }`}
                                >
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </button>

                                {userMenuOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 mt-2 w-60 overflow-hidden rounded-sm border border-slate-800 bg-slate-900 shadow-2xl shadow-black/60"
                                    >
                                        <div className="border-b border-slate-800 px-4 py-3">
                                            <p className="truncate text-sm text-white">
                                                {auth.user.name} {auth.user.surname}
                                            </p>
                                            <p className="truncate font-mono text-[11px] text-slate-500">
                                                {auth.user.email}
                                            </p>
                                            {auth.user.active_skin_slug && (
                                                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brass">
                                                    Skin: {auth.user.active_skin_slug}
                                                </p>
                                            )}
                                        </div>

                                        <Link
                                            href="/profile"
                                            role="menuitem"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                                        >
                                            <UserIcon className="h-4 w-4 text-slate-500" />
                                            Profile & transactions
                                        </Link>
                                        <Link
                                            href="/shop"
                                            role="menuitem"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                                        >
                                            <ShoppingBag className="h-4 w-4 text-slate-500" />
                                            Skin inventory
                                        </Link>

                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 border-t border-slate-800 px-4 py-2.5 text-left text-sm text-rose-400 transition-colors hover:bg-rose-500/10"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-3.5 py-2 text-sm text-slate-400 transition-colors hover:text-white"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 rounded-sm bg-brass px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#191408] transition-all hover:brightness-110"
                            >
                                <Swords className="h-3.5 w-3.5" />
                                Get started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile top controls */}
                <div className="ml-auto flex items-center gap-2 md:hidden">
                    {auth.user ? (
                        <>
                            <Link
                                href="/topup"
                                className="flex items-center gap-1.5 rounded-full border border-brass-deep/60 bg-brass/10 px-2.5 py-1 transition-colors active:scale-95"
                                title="Top up balance"
                            >
                                <Coins className="h-3.5 w-3.5 text-brass" />
                                <span className="font-mono text-xs font-semibold tabular-nums text-brass-soft">
                                    {auth.user.wallet_balance.toLocaleString('ru-RU')}
                                </span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => setMobileOpen((open) => !open)}
                                aria-expanded={mobileOpen}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-bold text-slate-300 transition-colors hover:border-slate-500"
                            >
                                {auth.user.name.charAt(0).toUpperCase()}
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <Link
                                href="/login"
                                className="rounded-sm px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white"
                            >
                                Sign in
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileOpen((open) => !open)}
                                aria-expanded={mobileOpen}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-800 text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                            >
                                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile slide-down drawer */}
            {mobileOpen && (
                <div className="border-t border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl md:hidden shadow-2xl animate-in slide-in-from-top-2 duration-200">
                    <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 space-y-3">
                        {auth.user ? (
                            <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 space-y-3 shadow-inner">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-brass/20 border border-brass/40 flex items-center justify-center text-brass font-bold text-sm shrink-0">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-white">
                                                {auth.user.name} {auth.user.surname}
                                            </p>
                                            <p className="truncate font-mono text-[11px] text-slate-400">
                                                {auth.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                                        Verified
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                                    <Link
                                        href="/profile"
                                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold transition"
                                    >
                                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                                        <span>My Profile</span>
                                    </Link>
                                    <Link
                                        href="/topup"
                                        className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brass/15 hover:bg-brass/25 border border-brass/30 text-brass-soft font-semibold transition"
                                    >
                                        <Coins className="w-3.5 h-3.5 text-brass" />
                                        <span>Top Up</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 p-1">
                                <Link
                                    href="/login"
                                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-center text-xs font-semibold text-slate-200 active:scale-95 transition"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-xl bg-brass px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#191408] shadow-md shadow-brass/20 active:scale-95 transition"
                                >
                                    Get started
                                </Link>
                            </div>
                        )}

                        <div className="space-y-1 pt-1 border-t border-slate-900">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                        isCurrent(url, link.href)
                                            ? 'bg-brass/10 text-brass font-bold border border-brass/20'
                                            : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                                        {link.href}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 px-2">
                            <div className="flex items-center gap-3">
                                <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
                                <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
                            </div>

                            {auth.user && (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition font-semibold"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    <span>Sign out</span>
                                </button>
                            )}
                        </div>
                    </nav>
                </div>
            )}

            {/* Mobile Fixed Bottom Navigation Bar */}
            <nav
                aria-label="Mobile Navigation"
                className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
                <div className="grid grid-cols-5 h-16 items-center px-1">
                    {[
                        { href: '/', label: 'Home', icon: HomeIcon },
                        { href: '/play', label: 'Play', icon: Swords },
                        { href: '/shop', label: 'Skins', icon: ShoppingBag },
                        { href: '/topup', label: 'Top Up', icon: Coins },
                        {
                            href: auth.user ? '/profile' : '/login',
                            label: auth.user ? 'Profile' : 'Sign in',
                            icon: UserIcon,
                        },
                    ].map((tab) => {
                        const active = tab.href === '/'
                            ? (url === '/' || url === '')
                            : (url === tab.href || url.startsWith(`${tab.href}/`));

                        const Icon = tab.icon;

                        return (
                            <Link
                                key={tab.label}
                                href={tab.href}
                                aria-current={active ? 'page' : undefined}
                                className={`relative flex flex-col items-center justify-center h-full transition-all active:scale-95 ${
                                    active ? 'text-brass' : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {active && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-0 inset-x-3 h-[2px] rounded-full bg-brass shadow-[0_0_8px_rgba(201,167,92,0.8)]"
                                    />
                                )}
                                <Icon className={`h-5 w-5 transition-transform ${active ? 'scale-110' : ''}`} />
                                <span className={`text-[10px] mt-1 tracking-tight ${active ? 'font-black text-brass-soft' : 'font-medium'}`}>
                                    {tab.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
}
