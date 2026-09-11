import React, { useId } from 'react';

interface LogoProps {
    className?: string;
    /** Pass a label to expose the mark to screen readers; omit for decorative use. */
    title?: string;
}

/**
 * The ChessSkins mark: a board tile holding a 2x2 corner of a chessboard with
 * one square re-skinned in brass. Same geometry as the favicon, so the tab and
 * the header show the same object.
 */
export default function Logo({ className = 'h-9 w-9', title }: LogoProps) {
    const uid = useId();
    const tile = `${uid}-tile`;
    const brass = `${uid}-brass`;
    const board = `${uid}-board`;

    return (
        <svg
            viewBox="0 0 32 32"
            className={className}
            role={title ? 'img' : 'presentation'}
            aria-label={title}
            aria-hidden={title ? undefined : true}
        >
            <defs>
                <linearGradient id={tile} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B2028" />
                    <stop offset="100%" stopColor="#0A0C10" />
                </linearGradient>
                <linearGradient id={brass} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E4CD93" />
                    <stop offset="100%" stopColor="#B08F45" />
                </linearGradient>
                <clipPath id={board}>
                    <rect x="7" y="7" width="18" height="18" rx="3.5" />
                </clipPath>
            </defs>

            <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8.5" fill={`url(#${tile})`} />
            <rect
                x="0.75"
                y="0.75"
                width="30.5"
                height="30.5"
                rx="8.5"
                fill="none"
                stroke="#C9A75C"
                strokeOpacity="0.38"
                strokeWidth="1.5"
            />

            <g clipPath={`url(#${board})`}>
                <rect x="7" y="7" width="9" height="9" fill="#EFE9DC" />
                <rect x="16" y="7" width="9" height="9" fill="#2B323C" />
                <rect x="7" y="16" width="9" height="9" fill="#2B323C" />
                <rect x="16" y="16" width="9" height="9" fill={`url(#${brass})`} />
            </g>
        </svg>
    );
}
