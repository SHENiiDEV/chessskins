import React, { ReactNode } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import FlashMessages from '@/Components/FlashMessages';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <FlashMessages />
        </div>
    );
}
