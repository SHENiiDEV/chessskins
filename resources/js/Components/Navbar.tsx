import React, { useEffect, useRef, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import { PageProps } from '@/types';
import { Coins, LogOut, Menu, Plus, ShoppingBag, Swords, User as UserIcon, X } from 'lucide-react';

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

                {/* Mobile controls */}
                <div className="ml-auto flex items-center gap-2 md:hidden">
                    {auth.user && (
                        <Link
                            href="/topup"
                            className="flex items-center gap-1.5 rounded-full border border-brass-deep/60 bg-brass/10 px-2.5 py-1"
                        >
                            <Coins className="h-3.5 w-3.5 text-brass" />
                            <span className="font-mono text-xs tabular-nums text-brass-soft">
                                {auth.user.wallet_balance}
                            </span>
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-expanded={mobileOpen}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-800 text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile sheet */}
            {mobileOpen && (
                <div className="border-t border-slate-800/80 bg-slate-950 md:hidden">
                    <nav className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center justify-between border-b border-slate-900 py-3.5 text-base transition-colors ${
                                    isCurrent(url, link.href) ? 'text-brass' : 'text-slate-300'
                                }`}
                            >
                                {link.label}
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
                                    {link.href}
                                </span>
                            </Link>
                        ))}

                        <div className="py-4">
                            {auth.user ? (
                                <div className="space-y-2">
                                    <Link
                                        href="/profile"
                                        className="block rounded-sm border border-slate-800 px-4 py-3 text-sm text-slate-200"
                                    >
                                        Profile ({auth.user.name})
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full rounded-sm border border-rose-500/30 px-4 py-3 text-left text-sm text-rose-400"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        href="/login"
                                        className="rounded-sm border border-slate-700 px-4 py-3 text-center text-sm text-slate-200"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-sm bg-brass px-4 py-3 text-center text-sm font-semibold text-[#191408]"
                                    >
                                        Get started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
