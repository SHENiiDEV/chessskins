import React, { useMemo } from 'react';
import { BoardTheme, FILES, parseFen } from '@/utils/chessSkins';

interface BoardPreviewProps {
    /** Skin slug — picks the SVG piece set under /public/skins. */
    slug: string;
    theme: BoardTheme;
    /** Position to draw. Only the placement field of the FEN is read. */
    fen: string;
    /** Squares to wash with the skin's highlight colour. */
    highlight?: string[];
    className?: string;
}

/**
 * A static, dependency-free 8x8 board. Used wherever a page needs to show a
 * palette rather than play on it — catalogue cards, previews, thumbnails.
 */
export default function BoardPreview({ slug, theme, fen, highlight = [], className = '' }: BoardPreviewProps) {
    const pieces = useMemo(() => parseFen(fen), [fen]);

    const squares = useMemo(() => {
        const list: { id: string; isLight: boolean }[] = [];

        for (let rank = 8; rank >= 1; rank -= 1) {
            for (let file = 0; file < 8; file += 1) {
                list.push({
                    id: `${FILES[file]}${rank}`,
                    isLight: (file + rank) % 2 === 0,
                });
            }
        }

        return list;
    }, []);

    return (
        <div
            className={`grid grid-cols-8 aspect-square overflow-hidden ${className}`}
            role="img"
            aria-label={`Доска со скином ${slug}`}
        >
            {squares.map(({ id, isLight }) => (
                <div
                    key={id}
                    className="relative transition-colors duration-500"
                    style={{ backgroundColor: isLight ? theme.light : theme.dark }}
                >
                    {highlight.includes(id) && (
                        <span
                            className="absolute inset-0"
                            style={{ backgroundColor: theme.highlight, opacity: 0.55 }}
                        />
                    )}
                    {pieces[id] && (
                        <img
                            src={`/skins/${slug}/${pieces[id]}.svg`}
                            alt=""
                            aria-hidden="true"
                            draggable={false}
                            className="relative w-full h-full select-none pointer-events-none"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
