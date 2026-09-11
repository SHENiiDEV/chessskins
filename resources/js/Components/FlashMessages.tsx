import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function FlashMessages() {
    const { flash } = usePage<PageProps>().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short">
            <div
                className={`p-4 rounded-xl shadow-2xl backdrop-blur-md border flex items-start gap-3 ${
                    type === 'success'
                        ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-500/10'
                        : 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-500/10'
                }`}
            >
                {type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-sm font-medium leading-relaxed">{message}</div>
                <button
                    onClick={() => setVisible(false)}
                    className="text-slate-400 hover:text-white transition shrink-0"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
