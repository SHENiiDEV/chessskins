import React from 'react';

export const PIECES = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'] as const;

export type PieceType = typeof PIECES[number];

/**
 * A board palette. Squares and piece artwork are separate things: the SVG sets
 * in /public/skins carry the pieces, this carries everything painted under them.
 */
export interface BoardTheme {
    /** Light square. */
    light: string;
    /** Dark square. */
    dark: string;
    /** Last-move and selection wash. */
    highlight: string;
    /** Legal-move dot. */
    dot: string;
    /** Interface accent this skin drives across the page. */
    accent: string;
    /** Readable text colour on top of `accent`. */
    accentInk: string;
    /** Ambient page glow. */
    glow: string;
}

const FALLBACK_THEME: BoardTheme = {
    light: '#EFE3CB',
    dark: '#B0794E',
    highlight: '#E6C36B',
    dot: '#8A6238',
    accent: '#C9A75C',
    accentInk: '#191408',
    glow: '#C9A75C',
};

/**
 * Board palettes keyed by skin slug. A slug with no entry falls back to the
 * classic wood palette, so seeding a new skin never breaks a page.
 */
export const BOARD_THEMES: Record<string, BoardTheme> = {
    default: {
        light: '#EFE3CB',
        dark: '#B0794E',
        highlight: '#E6C36B',
        dot: '#8A6238',
        accent: '#D97706',
        accentInk: '#191408',
        glow: '#D97706',
    },
    neon: {
        light: '#1E293B',
        dark: '#0F172A',
        highlight: '#22D3EE',
        dot: '#22D3EE',
        accent: '#06B6D4',
        accentInk: '#04201E',
        glow: '#06B6D4',
    },
    obsidian: {
        light: '#282E3A',
        dark: '#131722',
        highlight: '#60A5FA',
        dot: '#60A5FA',
        accent: '#3B82F6',
        accentInk: '#0A1224',
        glow: '#3B82F6',
    },
    medieval: {
        light: '#DFE6D3',
        dark: '#3E5F43',
        highlight: '#D8B65E',
        dot: '#2A4430',
        accent: '#C2A052',
        accentInk: '#18150A',
        glow: '#C2A052',
    },
    steampunk: {
        light: '#DECCA6',
        dark: '#694828',
        highlight: '#F97316',
        dot: '#8C5B32',
        accent: '#D97706',
        accentInk: '#1C1004',
        glow: '#F97316',
    },
    arcade: {
        light: '#334155',
        dark: '#0F172A',
        highlight: '#38BDF8',
        dot: '#EC4899',
        accent: '#EC4899',
        accentInk: '#1F0614',
        glow: '#EC4899',
    },
    cyberpunk: {
        light: '#2E2A44',
        dark: '#1A182B',
        highlight: '#E057C4',
        dot: '#E057C4',
        accent: '#C56BE8',
        accentInk: '#1B0A24',
        glow: '#C56BE8',
    },
    cosmic: {
        light: '#2B244D',
        dark: '#120E26',
        highlight: '#818CF8',
        dot: '#A78BFA',
        accent: '#A855F7',
        accentInk: '#170B26',
        glow: '#A855F7',
    },
    // Board theme slug aliases
    'board-classic': {
        light: '#EFE3CB',
        dark: '#B0794E',
        highlight: '#E6C36B',
        dot: '#8A6238',
        accent: '#D97706',
        accentInk: '#191408',
        glow: '#D97706',
    },
    'board-neon': {
        light: '#1E293B',
        dark: '#0F172A',
        highlight: '#22D3EE',
        dot: '#22D3EE',
        accent: '#06B6D4',
        accentInk: '#04201E',
        glow: '#06B6D4',
    },
    'board-obsidian': {
        light: '#282E3A',
        dark: '#131722',
        highlight: '#60A5FA',
        dot: '#60A5FA',
        accent: '#3B82F6',
        accentInk: '#0A1224',
        glow: '#3B82F6',
    },
    'board-medieval': {
        light: '#DFE6D3',
        dark: '#3E5F43',
        highlight: '#D8B65E',
        dot: '#2A4430',
        accent: '#C2A052',
        accentInk: '#18150A',
        glow: '#C2A052',
    },
    'board-steampunk': {
        light: '#DECCA6',
        dark: '#694828',
        highlight: '#F97316',
        dot: '#8C5B32',
        accent: '#D97706',
        accentInk: '#1C1004',
        glow: '#F97316',
    },
    'board-arcade': {
        light: '#334155',
        dark: '#0F172A',
        highlight: '#38BDF8',
        dot: '#EC4899',
        accent: '#EC4899',
        accentInk: '#1F0614',
        glow: '#EC4899',
    },
    'board-cyberpunk': {
        light: '#2E2A44',
        dark: '#1A182B',
        highlight: '#E057C4',
        dot: '#E057C4',
        accent: '#C56BE8',
        accentInk: '#1B0A24',
        glow: '#C56BE8',
    },
    'board-cosmic': {
        light: '#2B244D',
        dark: '#120E26',
        highlight: '#818CF8',
        dot: '#A78BFA',
        accent: '#A855F7',
        accentInk: '#170B26',
        glow: '#A855F7',
    },
};

export interface SkinInfo {
    slug: string;
    name: string;
    tagline: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    badgeColor: string;
}

export const ALL_SKINS: SkinInfo[] = [
    { slug: 'default', name: 'Staunton Classic', tagline: 'Warm hand-carved wood', rarity: 'Common', badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
    { slug: 'neon', name: 'Neon Pulse', tagline: 'High-contrast cyan lasers', rarity: 'Rare', badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20' },
    { slug: 'obsidian', name: 'Obsidian & Pearl', tagline: 'Midnight glass & frosted silver', rarity: 'Epic', badgeColor: 'text-blue-300 bg-blue-500/10 border-blue-500/20' },
    { slug: 'medieval', name: 'Royal Heraldry', tagline: 'Feudal gold & heraldic green', rarity: 'Rare', badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
    { slug: 'steampunk', name: 'Clockwork Automaton', tagline: 'Victorian brass cogs & copper', rarity: 'Epic', badgeColor: 'text-orange-300 bg-orange-500/10 border-orange-500/20' },
    { slug: 'arcade', name: '8-Bit Arcade', tagline: 'Retro CRT pixel nostalgia', rarity: 'Epic', badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20' },
    { slug: 'cyberpunk', name: 'Cyberpunk 2099', tagline: 'Synthwave magenta laser grid', rarity: 'Legendary', badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20' },
    { slug: 'cosmic', name: 'Cosmic Galaxy', tagline: 'Deep interstellar stardust', rarity: 'Legendary', badgeColor: 'text-violet-300 bg-violet-500/10 border-violet-500/20' },
];

export interface BoardSkinInfo {
    slug: string;
    name: string;
    tagline: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    badgeColor: string;
    light: string;
    dark: string;
    glow: string;
}

export const ALL_BOARD_SKINS: BoardSkinInfo[] = [
    { slug: 'board-classic', name: 'Staunton Classic Wood', tagline: 'Rich natural walnut & ivory', rarity: 'Common', badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20', light: '#EFE3CB', dark: '#B0794E', glow: '#D97706' },
    { slug: 'board-neon', name: 'Cyber Neon Slate', tagline: 'Dark graphite with cyan lasers', rarity: 'Rare', badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20', light: '#1E293B', dark: '#0F172A', glow: '#06B6D4' },
    { slug: 'board-obsidian', name: 'Obsidian Glass', tagline: 'Midnight crystal & frosted pearl', rarity: 'Epic', badgeColor: 'text-blue-300 bg-blue-500/10 border-blue-500/20', light: '#282E3A', dark: '#131722', glow: '#3B82F6' },
    { slug: 'board-medieval', name: 'Royal Heraldry Forest', tagline: 'Feudal manor forest green', rarity: 'Rare', badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20', light: '#DFE6D3', dark: '#3E5F43', glow: '#C2A052' },
    { slug: 'board-steampunk', name: 'Victorian Brass Parchment', tagline: 'Aged parchment & copper rivets', rarity: 'Epic', badgeColor: 'text-orange-300 bg-orange-500/10 border-orange-500/20', light: '#DECCA6', dark: '#694828', glow: '#F97316' },
    { slug: 'board-arcade', name: '8-Bit Arcade Terminal', tagline: 'Retro CRT scanline palette', rarity: 'Epic', badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20', light: '#334155', dark: '#0F172A', glow: '#EC4899' },
    { slug: 'board-cyberpunk', name: 'Cyberpunk Synthwave', tagline: 'Hot laser magenta & purple haze', rarity: 'Legendary', badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20', light: '#2E2A44', dark: '#1A182B', glow: '#C56BE8' },
    { slug: 'board-cosmic', name: 'Cosmic Galaxy Stardust', tagline: 'Starlight nebula & astral violet', rarity: 'Legendary', badgeColor: 'text-violet-300 bg-violet-500/10 border-violet-500/20', light: '#2B244D', dark: '#120E26', glow: '#A855F7' },
];

export const getBoardTheme = (slug?: string | null): BoardTheme => {
    if (!slug) return FALLBACK_THEME;
    if (BOARD_THEMES[slug]) return BOARD_THEMES[slug];
    const prefixed = `board-${slug}`;
    if (BOARD_THEMES[prefixed]) return BOARD_THEMES[prefixed];
    const stripped = slug.replace(/^board-/, '');
    if (BOARD_THEMES[stripped]) return BOARD_THEMES[stripped];
    return FALLBACK_THEME;
};

/**
 * Builds the `pieces` map react-chessboard v5 expects. Each renderer fills its
 * square, so the board sizes the artwork rather than a hard-coded pixel width.
 */
export const generateSkinPack = (skinName: string) => {
    return PIECES.reduce((acc, piece) => {
        acc[piece] = () => (
            <img
                src={`/skins/${skinName}/${piece}.svg`}
                alt={piece}
                className="w-full h-full select-none pointer-events-none drop-shadow-sm"
                draggable={false}
            />
        );
        return acc;
    }, {} as Record<string, () => React.ReactElement>);
};

/** Board squares, a1 first, as react-chessboard names them. */
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

/**
 * Expands the piece-placement field of a FEN into a square -> piece map
 * ('e1' => 'wK'). Only the placement field is read; the rest is ignored.
 */
export const parseFen = (fen: string): Record<string, PieceType> => {
    const placement = fen.split(' ')[0] ?? '';
    const map: Record<string, PieceType> = {};

    placement.split('/').forEach((row, rowIndex) => {
        const rank = 8 - rowIndex;
        let fileIndex = 0;

        for (const character of row) {
            if (/\d/.test(character)) {
                fileIndex += Number(character);
                continue;
            }

            const colour = character === character.toUpperCase() ? 'w' : 'b';
            const square = `${FILES[fileIndex]}${rank}`;
            map[square] = `${colour}${character.toUpperCase()}` as PieceType;
            fileIndex += 1;
        }
    });

    return map;
};
