export interface CapturedPiece {
    type: 'p' | 'n' | 'b' | 'r' | 'q';
    pieceKey: string; // e.g. 'wP' or 'bP'
    count: number;
    value: number;
}

export interface MaterialEvaluation {
    // Pieces of Black that were captured by White
    capturedByWhite: CapturedPiece[];
    // Pieces of White that were captured by Black
    capturedByBlack: CapturedPiece[];
    // Material points for living White pieces
    whitePoints: number;
    // Material points for living Black pieces
    blackPoints: number;
    // Advantage (>0: White advantage, <0: Black advantage, 0: equal)
    whiteAdvantage: number;
    blackAdvantage: number;
}

const PIECE_VALUES: Record<string, number> = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
};

const STARTING_COUNTS: Record<string, number> = {
    p: 8,
    n: 2,
    b: 2,
    r: 2,
    q: 1,
};

const PIECE_ORDER: Array<'p' | 'n' | 'b' | 'r' | 'q'> = ['q', 'r', 'b', 'n', 'p'];

/**
 * Calculates captured pieces and material imbalance from a FEN string.
 */
export function calculateMaterial(fen: string): MaterialEvaluation {
    const placement = fen.split(' ')[0] || '';

    const currentWhite: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };
    const currentBlack: Record<string, number> = { p: 0, n: 0, b: 0, r: 0, q: 0 };

    for (const char of placement) {
        if (char === '/' || /\d/.test(char)) continue;

        const lower = char.toLowerCase();
        if (char === char.toUpperCase()) {
            // White piece
            if (currentWhite[lower] !== undefined) {
                currentWhite[lower]++;
            }
        } else {
            // Black piece
            if (currentBlack[lower] !== undefined) {
                currentBlack[lower]++;
            }
        }
    }

    let whitePoints = 0;
    let blackPoints = 0;

    for (const type of Object.keys(PIECE_VALUES)) {
        whitePoints += (currentWhite[type] || 0) * PIECE_VALUES[type];
        blackPoints += (currentBlack[type] || 0) * PIECE_VALUES[type];
    }

    const capturedByWhite: CapturedPiece[] = [];
    const capturedByBlack: CapturedPiece[] = [];

    for (const type of PIECE_ORDER) {
        // Missing black pieces were captured by White
        const blackMissing = Math.max(0, STARTING_COUNTS[type] - (currentBlack[type] || 0));
        if (blackMissing > 0) {
            capturedByWhite.push({
                type,
                pieceKey: `b${type.toUpperCase()}`,
                count: blackMissing,
                value: PIECE_VALUES[type],
            });
        }

        // Missing white pieces were captured by Black
        const whiteMissing = Math.max(0, STARTING_COUNTS[type] - (currentWhite[type] || 0));
        if (whiteMissing > 0) {
            capturedByBlack.push({
                type,
                pieceKey: `w${type.toUpperCase()}`,
                count: whiteMissing,
                value: PIECE_VALUES[type],
            });
        }
    }

    const diff = whitePoints - blackPoints;

    return {
        capturedByWhite,
        capturedByBlack,
        whitePoints,
        blackPoints,
        whiteAdvantage: diff > 0 ? diff : 0,
        blackAdvantage: diff < 0 ? Math.abs(diff) : 0,
    };
}
