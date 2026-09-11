import { Chess, Move } from 'chess.js';

// Piece value definitions
const PIECE_VALUES: Record<string, number> = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000,
};

// Piece-Square Tables (from White's perspective; inverted for Black)
const PAWN_TABLE = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_TABLE = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
];

const BISHOP_TABLE = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
];

const ROOK_TABLE = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
];

const QUEEN_TABLE = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
];

const KING_TABLE = [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
];

const PST_MAP: Record<string, number[][]> = {
    p: PAWN_TABLE,
    n: KNIGHT_TABLE,
    b: BISHOP_TABLE,
    r: ROOK_TABLE,
    q: QUEEN_TABLE,
    k: KING_TABLE,
};

/**
 * Static board evaluation function.
 * Positive score favors White, negative favors Black.
 */
function evaluateBoard(game: Chess): number {
    let totalScore = 0;
    const board = game.board();

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            const val = PIECE_VALUES[piece.type] || 0;
            const pst = PST_MAP[piece.type];
            let posScore = 0;

            if (pst) {
                posScore = piece.color === 'w' 
                    ? pst[r][c] 
                    : pst[7 - r][c];
            }

            const pieceScore = val + posScore;

            if (piece.color === 'w') {
                totalScore += pieceScore;
            } else {
                totalScore -= pieceScore;
            }
        }
    }

    return totalScore;
}

/**
 * Minimax algorithm with alpha-beta pruning.
 */
function minimax(
    game: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
): number {
    if (depth === 0 || game.isGameOver()) {
        if (game.isCheckmate()) {
            return isMaximizing ? -99999 : 99999;
        }
        if (game.isDraw()) {
            return 0;
        }
        return evaluateBoard(game);
    }

    const moves = game.moves({ verbose: true });

    // Move ordering heuristic: search captures first
    moves.sort((a, b) => (b.captured ? 1 : 0) - (a.captured ? 1 : 0));

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            game.move(move);
            const evaluation = minimax(game, depth - 1, alpha, beta, false);
            game.undo();
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            game.move(move);
            const evaluation = minimax(game, depth - 1, alpha, beta, true);
            game.undo();
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

export type AIDifficulty = 'casual' | 'club' | 'master';

/**
 * Calculates the best move for the AI given current board position and difficulty.
 */
export function getBestAIMove(game: Chess, difficulty: AIDifficulty = 'club'): Move | null {
    if (game.isGameOver()) return null;

    const legalMoves = game.moves({ verbose: true });
    if (legalMoves.length === 0) return null;
    if (legalMoves.length === 1) return legalMoves[0];

    const isWhiteTurn = game.turn() === 'w';

    // Casual difficulty: occasional deliberate suboptimal moves, fast 1-ply search
    if (difficulty === 'casual') {
        // 35% chance to pick a random legal developing or capturing move
        if (Math.random() < 0.35) {
            const captures = legalMoves.filter(m => m.captured);
            if (captures.length > 0 && Math.random() < 0.7) {
                return captures[Math.floor(Math.random() * captures.length)];
            }
            return legalMoves[Math.floor(Math.random() * legalMoves.length)];
        }
        // Otherwise evaluate depth 1
        return evaluateBestAtDepth(game, 1, isWhiteTurn, legalMoves);
    }

    // Club player: depth 2 search with PST
    if (difficulty === 'club') {
        return evaluateBestAtDepth(game, 2, isWhiteTurn, legalMoves);
    }

    // Master: depth 3 alpha-beta search
    return evaluateBestAtDepth(game, 3, isWhiteTurn, legalMoves);
}

function evaluateBestAtDepth(
    game: Chess,
    depth: number,
    isWhite: boolean,
    legalMoves: Move[]
): Move {
    let bestMove = legalMoves[0];
    let bestValue = isWhite ? -Infinity : Infinity;

    // Shuffle slightly among equal scores to avoid robotic identical play
    const shuffled = [...legalMoves].sort(() => Math.random() - 0.5);

    // Prioritize captures and checks
    shuffled.sort((a, b) => (b.captured ? 2 : 0) - (a.captured ? 2 : 0));

    let alpha = -Infinity;
    let beta = Infinity;

    for (const move of shuffled) {
        game.move(move);
        const evalScore = minimax(game, depth - 1, alpha, beta, !isWhite);
        game.undo();

        if (isWhite) {
            if (evalScore > bestValue) {
                bestValue = evalScore;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestValue);
        } else {
            if (evalScore < bestValue) {
                bestValue = evalScore;
                bestMove = move;
            }
            beta = Math.min(beta, bestValue);
        }
    }

    return bestMove;
}
