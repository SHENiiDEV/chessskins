import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Chess, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import {
    generateSkinPack,
    getBoardTheme,
    ALL_SKINS,
    ALL_BOARD_SKINS,
    SkinInfo,
    BoardSkinInfo,
} from '@/utils/chessSkins';
import { getBestAIMove, AIDifficulty } from '@/utils/chessAI';
import {
    playMoveSound,
    playCaptureSound,
    playCheckSound,
    playVictorySound,
    playGameStartSound,
    isAudioMuted,
    toggleAudio,
} from '@/utils/chessAudio';
import { calculateMaterial } from '@/utils/chessMaterial';
import axios from 'axios';
import confetti from 'canvas-confetti';
import {
    Swords,
    RotateCcw,
    RotateCw,
    Undo2,
    AlertTriangle,
    CheckCircle2,
    Sparkles,
    BookOpen,
    Layers,
    Coins,
    Bot,
    Gamepad2,
    Crown,
    Volume2,
    VolumeX,
    Copy,
    Check,
    Award,
    Shield,
    Flame,
    Zap,
    Flag,
    ShoppingBag,
    Grid,
    Lock,
    ArrowUpRight,
} from 'lucide-react';
import { BotCombination, PageProps } from '@/types';

interface PlayProps {
    scenarios: BotCombination[];
    activeSkin: string; // active piece skin slug
    activeBoard?: string; // active board skin slug
    ownedPieceSkins?: string[];
    ownedBoardSkins?: string[];
    allPieceSkins?: Array<{ id: number; name: string; slug: string; price_coins: number }>;
    allBoardSkins?: Array<{ id: number; name: string; slug: string; price_coins: number }>;
}

interface MoveEntry {
    ply: number;
    san: string;
    player: 'white' | 'black';
    comment?: string;
    isCheck?: boolean;
    isCapture?: boolean;
}

export default function Play({
    scenarios,
    activeSkin: initialActiveSkin,
    activeBoard: initialActiveBoard,
    ownedPieceSkins = ['default'],
    ownedBoardSkins = ['board-classic'],
    allPieceSkins = [],
    allBoardSkins = [],
}: PlayProps) {
    const { auth } = usePage<PageProps>().props;

    // Active piece skin
    const [activePieceSkin, setActivePieceSkin] = useState<string>(
        auth.user?.active_skin_slug || initialActiveSkin || 'default'
    );

    // Active board skin
    const [activeBoardSkin, setActiveBoardSkin] = useState<string>(
        auth.user?.active_board_slug || initialActiveBoard || 'board-classic'
    );

    // Active board visual theme
    const boardTheme = useMemo(() => getBoardTheme(activeBoardSkin), [activeBoardSkin]);

    // Drawer customization tab: 'pieces' | 'boards'
    const [customizerTab, setCustomizerTab] = useState<'pieces' | 'boards'>('pieces');

    // Filtered lists of ONLY owned piece skins and board skins
    const ownedPiecesList = useMemo(() => {
        return ALL_SKINS.filter(s => ownedPieceSkins.includes(s.slug));
    }, [ownedPieceSkins]);

    const ownedBoardsList = useMemo(() => {
        return ALL_BOARD_SKINS.filter(b => ownedBoardSkins.includes(b.slug));
    }, [ownedBoardSkins]);

    // Mode: 'scenario' | 'freeplay'
    const [gameMode, setGameMode] = useState<'scenario' | 'freeplay'>('scenario');

    // Mobile tactical tab: 'moves' | 'console' | 'skins'
    const [mobileActiveTab, setMobileActiveTab] = useState<'moves' | 'console' | 'skins'>('moves');

    // Free Play settings & state
    const [difficulty, setDifficulty] = useState<AIDifficulty>('club');
    const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [freePlayStatus, setFreePlayStatus] = useState<string | null>(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [freePlayWon, setFreePlayWon] = useState<boolean>(false);
    const [rewardEarned, setRewardEarned] = useState<number | null>(null);

    // Scenario Mode state
    const [selectedScenario, setSelectedScenario] = useState<BotCombination>(
        scenarios[0] || { id: 1, name: 'Italian Game (Giuoco Piano)', category: 'Open Games', moves_sequence: [] }
    );
    const [deviationError, setDeviationError] = useState<string | null>(null);
    const [scenarioCompleted, setScenarioCompleted] = useState(false);
    const [latestComment, setLatestComment] = useState<string | null>(null);

    // Sound toggle state
    const [soundMuted, setSoundMuted] = useState<boolean>(isAudioMuted());

    // PGN copied feedback state
    const [pgnCopied, setPgnCopied] = useState<boolean>(false);

    // Common game state
    const [game, setGame] = useState<Chess>(new Chess());
    const [gamePosition, setGamePosition] = useState<string>(game.fen());
    const [historySAN, setHistorySAN] = useState<string[]>([]);
    const [moveLog, setMoveLog] = useState<MoveEntry[]>([]);
    const [botThinking, setBotThinking] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Dynamic material evaluation based on current FEN
    const material = useMemo(() => calculateMaterial(gamePosition), [gamePosition]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [moveLog, latestComment]);

    // Equip piece skin (only allowed for owned skins)
    const handleEquipPiece = (slug: string) => {
        if (!ownedPieceSkins.includes(slug)) return;
        setActivePieceSkin(slug);
        playMoveSound();

        const skinObj = allPieceSkins.find(s => s.slug === slug);
        if (skinObj && auth.user) {
            router.post(`/shop/equip/${skinObj.id}`, {}, { preserveScroll: true });
        }
    };

    // Equip board skin (only allowed for owned boards)
    const handleEquipBoard = (slug: string) => {
        if (!ownedBoardSkins.includes(slug)) return;
        setActiveBoardSkin(slug);
        playMoveSound();

        const boardObj = allBoardSkins.find(b => b.slug === slug);
        if (boardObj && auth.user) {
            router.post(`/shop/equip/${boardObj.id}`, {}, { preserveScroll: true });
        }
    };

    // Restart Game helper
    const restartGame = () => {
        playGameStartSound();
        if (gameMode === 'scenario') {
            initScenario(selectedScenario);
        } else {
            initFreePlay(playerColor, difficulty);
        }
    };

    // Toggle Audio
    const handleToggleAudio = () => {
        const next = toggleAudio();
        setSoundMuted(next);
        if (!next) {
            playMoveSound();
        }
    };

    // Copy PGN
    const copyPGN = () => {
        try {
            navigator.clipboard.writeText(game.pgn() || '1. ...');
            setPgnCopied(true);
            setTimeout(() => setPgnCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    // Switch Game Mode
    const switchMode = (mode: 'scenario' | 'freeplay') => {
        setGameMode(mode);
        resetCommonState();
        if (mode === 'scenario') {
            initScenario(selectedScenario);
        } else {
            initFreePlay(playerColor, difficulty);
        }
    };

    const resetCommonState = () => {
        const newGame = new Chess();
        setGame(newGame);
        setGamePosition(newGame.fen());
        setHistorySAN([]);
        setMoveLog([]);
        setBotThinking(false);
        setDeviationError(null);
        setScenarioCompleted(false);
        setFreePlayStatus(null);
        setFreePlayWon(false);
        setRewardEarned(null);
    };

    // Initialize Scenario Mode
    const initScenario = (scenario: BotCombination) => {
        setSelectedScenario(scenario);
        const newGame = new Chess();
        setGame(newGame);
        setGamePosition(newGame.fen());
        setHistorySAN([]);
        setMoveLog([]);
        setDeviationError(null);
        setScenarioCompleted(false);
        setPlayerColor('white');
        setIsFlipped(false);
        setIsPlayerTurn(true);
        setLatestComment(`Opening book «${scenario.name}» activated. Make your first book move with White.`);
    };

    // Initialize Free Play Mode
    const initFreePlay = (color: 'white' | 'black' = playerColor, diff: AIDifficulty = difficulty) => {
        resetCommonState();
        const newGame = new Chess();
        setGame(newGame);
        setGamePosition(newGame.fen());
        setPlayerColor(color);
        setIsFlipped(color === 'black');
        setDifficulty(diff);

        if (color === 'black') {
            setIsPlayerTurn(false);
            setLatestComment('Free play started! AI (White) is preparing the opening move.');
            setTimeout(() => triggerAIMove(newGame, diff), 400);
        } else {
            setIsPlayerTurn(true);
            setLatestComment('Free play started! Make any legal move with White.');
        }
    };

    // Trigger AI Move for Free Play
    const triggerAIMove = (currentGame: Chess, currentDiff: AIDifficulty) => {
        if (currentGame.isGameOver()) return;

        setBotThinking(true);
        setTimeout(() => {
            try {
                const gameCopy = new Chess(currentGame.fen());
                const bestMove = getBestAIMove(gameCopy, currentDiff);

                if (bestMove) {
                    const played = gameCopy.move(bestMove.san);
                    setGame(gameCopy);
                    setGamePosition(gameCopy.fen());

                    const botSAN = bestMove.san;
                    const history = gameCopy.history();
                    setHistorySAN(history);

                    const isCheck = gameCopy.inCheck();
                    const isCapture = !!played?.captured;

                    if (gameCopy.isCheckmate()) {
                        playVictorySound();
                    } else if (isCheck) {
                        playCheckSound();
                    } else if (isCapture) {
                        playCaptureSound();
                    } else {
                        playMoveSound();
                    }

                    const botEntry: MoveEntry = {
                        ply: history.length,
                        san: botSAN,
                        player: playerColor === 'white' ? 'black' : 'white',
                        isCheck,
                        isCapture,
                    };
                    setMoveLog(prev => [...prev, botEntry]);
                    setIsPlayerTurn(true);

                    checkFreePlayGameOver(gameCopy);
                }
            } catch (err) {
                console.error('AI execution error:', err);
            } finally {
                setBotThinking(false);
            }
        }, 400);
    };

    // Check game over in Free Play
    const checkFreePlayGameOver = (currentGame: Chess) => {
        if (currentGame.isCheckmate()) {
            const isWinner =
                (currentGame.turn() === 'w' && playerColor === 'black') ||
                (currentGame.turn() === 'b' && playerColor === 'white');
            if (isWinner) {
                setFreePlayStatus('Checkmate! You won the game!');
                setFreePlayWon(true);
                playVictorySound();
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                claimVictoryReward();
            } else {
                setFreePlayStatus('Checkmate! Bot won the game.');
                playVictorySound();
            }
        } else if (currentGame.isDraw()) {
            setFreePlayStatus('Game drawn (Stalemate / Insufficient material / 3-fold repetition).');
        } else if (currentGame.inCheck()) {
            setLatestComment('Check! Protect your King.');
        }
    };

    // Claim win reward (+50 Coins)
    const claimVictoryReward = () => {
        if (!auth.user) return;
        axios
            .post('/bot/reward-win')
            .then(res => {
                if (res.data.success) {
                    setRewardEarned(res.data.reward);
                    if (auth.user) {
                        auth.user.wallet_balance = res.data.new_balance;
                    }
                }
            })
            .catch(err => console.error('Reward claim error:', err));
    };

    // Resign in Free Play
    const resignGame = () => {
        if (game.isGameOver()) return;
        setFreePlayStatus('You resigned. Bot wins.');
    };

    // Undo move
    const undoMove = () => {
        if (moveLog.length === 0 || botThinking) return;

        const newGame = new Chess();
        const newLog = [...moveLog];

        if (gameMode === 'scenario') {
            if (deviationError) {
                newLog.pop();
            } else if (newLog.length >= 2) {
                newLog.pop();
                newLog.pop();
            } else {
                newLog.pop();
            }
            setDeviationError(null);
            setScenarioCompleted(false);
        } else {
            if (newLog.length >= 2) {
                newLog.pop();
                newLog.pop();
            } else {
                newLog.pop();
            }
            setFreePlayStatus(null);
            setFreePlayWon(false);
        }

        const newSAN: string[] = [];
        newLog.forEach(entry => {
            newGame.move(entry.san);
            newSAN.push(entry.san);
        });

        setGame(newGame);
        setGamePosition(newGame.fen());
        setHistorySAN(newSAN);
        setMoveLog(newLog);
        setIsPlayerTurn(true);
        setLatestComment(newLog.length > 0 ? newLog[newLog.length - 1].comment || null : 'Move undone. Your turn.');
        playMoveSound();
    };

    // Handle user piece drop
    const onDrop = ({
        sourceSquare,
        targetSquare,
    }: {
        piece?: unknown;
        sourceSquare: string;
        targetSquare: string | null;
    }): boolean => {
        if (!targetSquare || botThinking || scenarioCompleted || !!freePlayStatus) return false;

        const currentTurnColor = game.turn() === 'w' ? 'white' : 'black';
        if (gameMode === 'freeplay' && currentTurnColor !== playerColor) {
            return false;
        }

        const gameCopy = new Chess(game.fen());
        let move: Move | null = null;
        try {
            move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q',
            });
        } catch {
            return false;
        }

        if (move === null) return false;

        const playerSAN = move.san;
        const updatedHistory = gameCopy.history();

        setGame(gameCopy);
        setGamePosition(gameCopy.fen());
        setHistorySAN(updatedHistory);

        const isCheck = gameCopy.inCheck();
        const isCapture = !!move.captured;

        if (gameCopy.isCheckmate()) {
            playVictorySound();
        } else if (isCheck) {
            playCheckSound();
        } else if (isCapture) {
            playCaptureSound();
        } else {
            playMoveSound();
        }

        const newEntry: MoveEntry = {
            ply: updatedHistory.length,
            san: playerSAN,
            player: playerColor,
            isCheck,
            isCapture,
        };
        setMoveLog(prev => [...prev, newEntry]);

        // === SCENARIO MODE ===
        if (gameMode === 'scenario') {
            setDeviationError(null);
            setBotThinking(true);
            axios
                .post('/bot/move', {
                    scenario_id: selectedScenario.id,
                    history: updatedHistory,
                })
                .then(response => {
                    const data = response.data;
                    if (data.status === 'success') {
                        const botMoveSAN = data.bot_move;
                        const comment = data.comment;
                        const isFinal = data.is_final;

                        setTimeout(() => {
                            const botGame = new Chess(gameCopy.fen());
                            try {
                                const botPlayed = botGame.move(botMoveSAN);
                                setGame(botGame);
                                setGamePosition(botGame.fen());
                                const finalHistory = botGame.history();
                                setHistorySAN(finalHistory);

                                const botCheck = botGame.inCheck();
                                const botCapture = !!botPlayed?.captured;

                                if (botGame.isCheckmate()) {
                                    playVictorySound();
                                } else if (botCheck) {
                                    playCheckSound();
                                } else if (botCapture) {
                                    playCaptureSound();
                                } else {
                                    playMoveSound();
                                }

                                const botEntry: MoveEntry = {
                                    ply: finalHistory.length,
                                    san: botMoveSAN,
                                    player: 'black',
                                    comment: comment,
                                    isCheck: botCheck,
                                    isCapture: botCapture,
                                };
                                setMoveLog(prev => [...prev, botEntry]);
                                setLatestComment(comment);

                                if (isFinal) {
                                    setScenarioCompleted(true);
                                    playVictorySound();
                                    confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
                                }
                            } catch (err) {
                                console.error('Bot move execution error:', err);
                            } finally {
                                setBotThinking(false);
                            }
                        }, 350);
                    } else if (data.status === 'deviated') {
                        setBotThinking(false);
                        setDeviationError(data.message || 'Scenario deviated!');
                        setLatestComment('Scenario deviated. The played move diverged from the training line.');
                        playCheckSound();
                    }
                })
                .catch(error => {
                    console.error('Bot API error:', error);
                    setBotThinking(false);
                    setDeviationError('Connection error with the bot server.');
                });

            return true;
        }

        // === FREE PLAY MODE ===
        setIsPlayerTurn(false);
        if (gameCopy.isGameOver()) {
            checkFreePlayGameOver(gameCopy);
        } else {
            triggerAIMove(gameCopy, difficulty);
        }

        return true;
    };

    // Effective visual orientation on the board
    const currentOrientation = isFlipped
        ? playerColor === 'white'
            ? 'black'
            : 'white'
        : playerColor;

    // Captured pieces mapping for user and opponent
    const userCapturedPieces =
        playerColor === 'white' ? material.capturedByWhite : material.capturedByBlack;
    const opponentCapturedPieces =
        playerColor === 'white' ? material.capturedByBlack : material.capturedByWhite;

    const userAdvantage = playerColor === 'white' ? material.whiteAdvantage : material.blackAdvantage;
    const opponentAdvantage = playerColor === 'white' ? material.blackAdvantage : material.whiteAdvantage;

    const currentPieceSkinInfo = ALL_SKINS.find(s => s.slug === activePieceSkin);
    const currentBoardSkinInfo = ALL_BOARD_SKINS.find(b => b.slug === activeBoardSkin);

    return (
        <AppLayout>
            <Head title="Grandmaster Play Arena | Chess Skins" />

            <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 pb-16 pt-6">
                {/* Ambient Page Glow calibrated to active board skin */}
                <div
                    className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
                    style={{ backgroundColor: boardTheme.glow }}
                />

                <div className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-6">
                    {/* TOP COMMAND BAR */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                        {/* Mode Switcher Tabs */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
                            <button
                                onClick={() => switchMode('scenario')}
                                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    gameMode === 'scenario'
                                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span className="hidden min-[400px]:inline">Opening Book</span>
                                <span className="min-[400px]:hidden">Book</span>
                            </button>
                            <button
                                onClick={() => switchMode('freeplay')}
                                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                    gameMode === 'freeplay'
                                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <Swords className="w-3.5 h-3.5" />
                                <span className="hidden min-[400px]:inline">Free Play vs AI</span>
                                <span className="min-[400px]:hidden">Free Play</span>
                            </button>
                        </div>

                        {/* Match Status / Move Pill */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>
                                {gameMode === 'scenario'
                                    ? `Book: ${selectedScenario.name}`
                                    : `Chess AI (${difficulty.toUpperCase()})`}
                            </span>
                            <span className="text-slate-600">|</span>
                            <span className="text-amber-400 font-bold">Move #{Math.ceil((historySAN.length + 1) / 2)}</span>
                        </div>

                        {/* Tactical Actions Toolbar */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {/* Audio Mute/Unmute */}
                            <button
                                onClick={handleToggleAudio}
                                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl border transition-all cursor-pointer active:scale-95 ${
                                    soundMuted
                                        ? 'bg-slate-950 border-rose-500/40 text-rose-400 hover:border-rose-500'
                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                                }`}
                                title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
                            >
                                {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>

                            {/* Flip Board */}
                            <button
                                onClick={() => setIsFlipped(!isFlipped)}
                                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
                                title="Flip Board Perspective"
                            >
                                <RotateCw className="w-4 h-4" />
                            </button>

                            {/* Undo Move */}
                            <button
                                onClick={undoMove}
                                disabled={moveLog.length === 0 || botThinking}
                                className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer active:scale-95"
                                title="Takeback Move"
                            >
                                <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                                <span className="hidden sm:inline">Undo</span>
                            </button>

                            {/* Copy PGN */}
                            <button
                                onClick={copyPGN}
                                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
                                title="Copy PGN Notation"
                            >
                                {pgnCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>

                            {/* New Game */}
                            <button
                                onClick={restartGame}
                                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer active:scale-95"
                                title="Reset to start position"
                            >
                                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="hidden sm:inline">New Game</span>
                                <span className="sm:hidden">New</span>
                            </button>

                            {/* Resign (Free play only) */}
                            {gameMode === 'freeplay' && !freePlayStatus && (
                                <button
                                    onClick={resignGame}
                                    disabled={historySAN.length === 0}
                                    className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-xs font-bold text-rose-300 flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95"
                                    title="Resign game"
                                >
                                    <Flag className="w-3.5 h-3.5 text-rose-400" />
                                    <span className="hidden sm:inline">Resign</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* MAIN ARENA GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* LEFT COLUMN: THE GRAND CHESSBOARD & PLAYER HUDs */}
                        <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center w-full">
                            <div className="w-full max-w-[620px] space-y-2.5 sm:space-y-3">
                                {/* TOP OPPONENT HUD CARD */}
                                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-between transition-all">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <div className="relative shrink-0">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 shadow-inner">
                                                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                                            </div>
                                            {botThinking && (
                                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400 animate-ping" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="font-black text-xs sm:text-sm text-white tracking-wide truncate">
                                                    {gameMode === 'scenario'
                                                        ? 'Book Master Bot'
                                                        : `Stockfish (${difficulty.toUpperCase()})`}
                                                </span>
                                                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase shrink-0">
                                                    {playerColor === 'white' ? 'Black' : 'White'}
                                                </span>
                                            </div>

                                            {/* Status / Captured Pieces */}
                                            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[11px] sm:text-xs">
                                                {botThinking ? (
                                                    <span className="font-semibold text-amber-400 flex items-center gap-1 animate-pulse truncate">
                                                        <Zap className="w-3 h-3 shrink-0" />
                                                        <span>Thinking...</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 truncate">
                                                        {isPlayerTurn ? 'Waiting for move' : 'Making turn...'}
                                                    </span>
                                                )}

                                                {/* Opponent Captured Pieces */}
                                                {opponentCapturedPieces.length > 0 && (
                                                    <div className="flex items-center gap-1 pl-1.5 sm:pl-2 border-l border-slate-800 shrink-0">
                                                        {opponentCapturedPieces.map((p, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[11px] sm:text-xs text-slate-300 font-mono flex items-center"
                                                                title={`Captured ${p.type.toUpperCase()}`}
                                                            >
                                                                {p.type.toUpperCase()}
                                                                {p.count > 1 && (
                                                                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold">
                                                                        x{p.count}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        ))}
                                                        {opponentAdvantage > 0 && (
                                                            <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                                                +{opponentAdvantage}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Opponent Badge */}
                                    <div className="text-right shrink-0 pl-2">
                                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            {gameMode === 'scenario' ? 'Opening' : 'Rating'}
                                        </div>
                                        <div className="text-xs font-mono font-bold text-slate-200 truncate max-w-[110px] sm:max-w-none">
                                            {gameMode === 'scenario'
                                                ? selectedScenario.category
                                                : difficulty === 'master'
                                                ? '1900+ ELO'
                                                : difficulty === 'club'
                                                ? '1500 ELO'
                                                : '1000 ELO'}
                                        </div>
                                    </div>
                                </div>

                                {/* CHESSBOARD WRAPPER WITH LUXURY BEVEL & THEMED GLOW */}
                                <div
                                    className="p-1 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-900 border sm:border-2 border-white/10 relative transition-shadow duration-700"
                                    style={{
                                        boxShadow: `0 0 70px -20px ${boardTheme.glow}35, inset 0 1px 0 rgba(255,255,255,0.1)`,
                                    }}
                                >
                                    <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                                        <Chessboard
                                            key={`${gameMode}-${currentOrientation}-${activePieceSkin}-${activeBoardSkin}`}
                                            options={{
                                                id: `grandmaster-board-${gameMode}-${currentOrientation}`,
                                                position: gamePosition,
                                                onPieceDrop: onDrop,
                                                boardOrientation: currentOrientation,
                                                pieces: generateSkinPack(activePieceSkin),
                                                darkSquareStyle: { backgroundColor: boardTheme.dark },
                                                lightSquareStyle: { backgroundColor: boardTheme.light },
                                                boardStyle: {
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
                                                },
                                                animationDurationInMs: 250,
                                                showAnimations: true,
                                                allowDragging: !botThinking && !scenarioCompleted && !freePlayStatus,
                                                canDragPiece: ({ piece }) => {
                                                    if (botThinking || scenarioCompleted || !!freePlayStatus)
                                                        return false;
                                                    const currentTurn = game.turn();
                                                    const expectedColor = playerColor === 'white' ? 'w' : 'b';
                                                    if (currentTurn !== expectedColor) return false;
                                                    return piece.pieceType.startsWith(expectedColor);
                                                },
                                            }}
                                        />
                                    </div>

                                    {/* Deviation Alert Overlay (Scenario Mode) */}
                                    {deviationError && (
                                        <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 p-4 sm:p-6 rounded-2xl bg-rose-950/95 border-2 border-rose-500 shadow-2xl backdrop-blur-xl text-center space-y-3 z-30 animate-in fade-in zoom-in duration-200">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                                                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-black text-white">Scenario Deviated!</h3>
                                                <p className="text-xs text-rose-200 mt-1 max-w-sm mx-auto">
                                                    {deviationError} Return to the book line or play Free Play mode.
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
                                                <button
                                                    onClick={undoMove}
                                                    className="px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                                                >
                                                    <Undo2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    <span>Undo Move</span>
                                                </button>
                                                <button
                                                    onClick={() => switchMode('freeplay')}
                                                    className="px-3 sm:px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition cursor-pointer active:scale-95"
                                                >
                                                    Free Play
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Scenario Completion Banner */}
                                    {scenarioCompleted && (
                                        <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 p-4 sm:p-6 rounded-2xl bg-emerald-950/95 border-2 border-emerald-500 shadow-2xl backdrop-blur-xl text-center space-y-3 z-30 animate-in fade-in zoom-in duration-200">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-black text-white">Scenario Mastered!</h3>
                                                <p className="text-xs text-emerald-200 mt-1 max-w-sm mx-auto">
                                                    Flawless execution of «{selectedScenario.name}». Theoretical opening complete!
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
                                                <button
                                                    onClick={restartGame}
                                                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer active:scale-95"
                                                >
                                                    Practice Again
                                                </button>
                                                <Link
                                                    href="/shop"
                                                    className="px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-semibold text-xs hover:bg-slate-800 transition"
                                                >
                                                    Browse Skins
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/* Free Play Game Over / Victory Modal */}
                                    {freePlayStatus && (
                                        <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 p-5 sm:p-6 rounded-2xl bg-slate-900/95 border-2 border-amber-500 shadow-2xl backdrop-blur-xl text-center space-y-3 z-30 animate-in fade-in zoom-in duration-200">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                                                {freePlayWon ? <Crown className="w-7 h-7 sm:w-8 sm:h-8" /> : <Award className="w-7 h-7 sm:w-8 sm:h-8" />}
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-black text-white">{freePlayStatus}</h3>
                                                {rewardEarned && (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
                                                        <Coins className="w-4 h-4 text-amber-400" />
                                                        <span>+{rewardEarned} Coins Claimed!</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-2">
                                                <button
                                                    onClick={() => initFreePlay()}
                                                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer active:scale-95"
                                                >
                                                    Play Again
                                                </button>
                                                <Link
                                                    href="/shop"
                                                    className="px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
                                                >
                                                    Spend in Store
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* BOTTOM PLAYER HUD CARD */}
                                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-between transition-all">
                                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 shadow-inner shrink-0">
                                            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <span className="font-black text-xs sm:text-sm text-white tracking-wide truncate">
                                                    {auth.user ? `${auth.user.name} ${auth.user.surname}` : 'You (Challenger)'}
                                                </span>
                                                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase shrink-0">
                                                    {playerColor === 'white' ? 'White' : 'Black'}
                                                </span>
                                            </div>

                                            {/* Status & Captured pieces */}
                                            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-[11px] sm:text-xs">
                                                <span className="flex items-center gap-1 truncate">
                                                    <span
                                                        className={`w-2 h-2 rounded-full shrink-0 ${
                                                            isPlayerTurn && !botThinking
                                                                ? 'bg-emerald-400 animate-pulse'
                                                                : 'bg-slate-600'
                                                        }`}
                                                    />
                                                    <span className={isPlayerTurn && !botThinking ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                                                        {isPlayerTurn && !botThinking ? 'Your turn' : 'Thinking...'}
                                                    </span>
                                                </span>

                                                {/* User Captured pieces */}
                                                {userCapturedPieces.length > 0 && (
                                                    <div className="flex items-center gap-1 pl-1.5 sm:pl-2 border-l border-slate-800 shrink-0">
                                                        {userCapturedPieces.map((p, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-[11px] sm:text-xs text-slate-300 font-mono flex items-center"
                                                                title={`Captured ${p.type.toUpperCase()}`}
                                                            >
                                                                {p.type.toUpperCase()}
                                                                {p.count > 1 && (
                                                                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold">
                                                                        x{p.count}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        ))}
                                                        {userAdvantage > 0 && (
                                                            <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                                                +{userAdvantage}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Skin & Board Indicators */}
                                    <div className="text-right shrink-0 pl-2">
                                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Equipped
                                        </div>
                                        <div className="text-xs font-bold text-amber-300 flex items-center justify-end gap-1">
                                            <span className="truncate max-w-[80px] sm:max-w-none">{currentPieceSkinInfo?.name || activePieceSkin}</span>
                                            <span className="text-slate-600">•</span>
                                            <span className="text-cyan-400 truncate max-w-[70px] sm:max-w-none">{currentBoardSkinInfo?.name.split(' ')[0] || 'Board'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* MOBILE TACTICAL CONTROLS & TABS (MOBILE ONLY) */}
                                <div className="lg:hidden w-full space-y-2.5 pt-1">
                                    {/* Coach Live Commentary banner on mobile */}
                                    <div className="p-2.5 rounded-xl bg-slate-900/95 border border-white/10 shadow-md flex items-center gap-2 text-xs text-slate-200">
                                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                                        <p className="truncate leading-relaxed font-sans">{latestComment || 'Game in progress. Make your move on the board.'}</p>
                                    </div>

                                    {/* Mobile Segmented Tab Selector */}
                                    <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10 shadow-lg gap-1">
                                        <button
                                            onClick={() => setMobileActiveTab('moves')}
                                            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                                mobileActiveTab === 'moves'
                                                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                                                    : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            <Layers className="w-3.5 h-3.5" />
                                            <span>Moves ({historySAN.length})</span>
                                        </button>
                                        <button
                                            onClick={() => setMobileActiveTab('console')}
                                            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                                mobileActiveTab === 'console'
                                                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                                                    : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {gameMode === 'scenario' ? <BookOpen className="w-3.5 h-3.5" /> : <Gamepad2 className="w-3.5 h-3.5" />}
                                            <span>{gameMode === 'scenario' ? 'Openings' : 'AI Level'}</span>
                                        </button>
                                        <button
                                            onClick={() => setMobileActiveTab('skins')}
                                            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                                mobileActiveTab === 'skins'
                                                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                                                    : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            <Crown className="w-3.5 h-3.5" />
                                            <span>Skins</span>
                                        </button>
                                    </div>

                                    {/* Mobile Tab 1: MOVES LOG */}
                                    {mobileActiveTab === 'moves' && (
                                        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2.5 shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5 tracking-wider">
                                                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                                                    <span>Moves History ({historySAN.length} plies)</span>
                                                </span>
                                                <button
                                                    onClick={copyPGN}
                                                    className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1 hover:text-white cursor-pointer"
                                                >
                                                    {pgnCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                    <span>{pgnCopied ? 'Copied' : 'Copy PGN'}</span>
                                                </button>
                                            </div>
                                            <div className="bg-slate-950 rounded-lg border border-slate-800/80 p-2 max-h-48 overflow-y-auto font-mono text-xs space-y-1">
                                                {moveLog.length === 0 ? (
                                                    <div className="text-slate-500 text-center py-6 italic">
                                                        No moves yet. Make your first move on the board.
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                                        {Array.from({ length: Math.ceil(moveLog.length / 2) }).map((_, roundIdx) => {
                                                            const whiteMove = moveLog[roundIdx * 2];
                                                            const blackMove = moveLog[roundIdx * 2 + 1];

                                                            return (
                                                                <React.Fragment key={roundIdx}>
                                                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/80 text-slate-200 border border-slate-800/40">
                                                                        <span className="text-slate-500 text-[10px] w-4">{roundIdx + 1}.</span>
                                                                        <span className="font-bold text-amber-300 flex items-center gap-0.5">
                                                                            {whiteMove?.san}
                                                                            {whiteMove?.isCapture && <span className="text-[8px] text-rose-400 font-bold">x</span>}
                                                                            {whiteMove?.isCheck && <span className="text-[8px] text-amber-400 font-bold">+</span>}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900/40 text-slate-300 border border-slate-800/20">
                                                                        <span className="font-bold text-indigo-300 flex items-center gap-0.5">
                                                                            {blackMove ? blackMove.san : '...'}
                                                                            {blackMove?.isCapture && <span className="text-[8px] text-rose-400 font-bold">x</span>}
                                                                            {blackMove?.isCheck && <span className="text-[8px] text-indigo-400 font-bold">+</span>}
                                                                        </span>
                                                                    </div>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Tab 2: CONSOLE (SCENARIOS OR AI SETTINGS) */}
                                    {mobileActiveTab === 'console' && (
                                        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-3 shadow-lg">
                                            {gameMode === 'freeplay' ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase">
                                                            <Gamepad2 className="w-3.5 h-3.5" />
                                                            <span>AI Engine Level</span>
                                                        </span>
                                                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                            +50 Coins / Win
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-1.5">
                                                        {[
                                                            { id: 'casual', label: 'Casual', elo: '~1000' },
                                                            { id: 'club', label: 'Club', elo: '~1500' },
                                                            { id: 'master', label: 'Master', elo: '~1900+' },
                                                        ].map(d => (
                                                            <button
                                                                key={d.id}
                                                                onClick={() => {
                                                                    setDifficulty(d.id as AIDifficulty);
                                                                    initFreePlay(playerColor, d.id as AIDifficulty);
                                                                }}
                                                                className={`p-2 rounded-xl text-center border transition-all cursor-pointer active:scale-95 ${
                                                                    difficulty === d.id
                                                                        ? 'bg-slate-800 border-amber-400 shadow-sm'
                                                                        : 'bg-slate-950 border-slate-800 text-slate-400'
                                                                }`}
                                                            >
                                                                <div className="text-xs font-bold text-white">{d.label}</div>
                                                                <div className="text-[10px] text-amber-400 font-mono">{d.elo}</div>
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="space-y-1">
                                                        <label className="text-[11px] font-semibold text-slate-400">Play As Color:</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setPlayerColor('white');
                                                                    initFreePlay('white', difficulty);
                                                                }}
                                                                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                                                                    playerColor === 'white'
                                                                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                                                                        : 'bg-slate-950 border-slate-800 text-slate-300'
                                                                }`}
                                                            >
                                                                <Crown className="w-3.5 h-3.5" />
                                                                <span>White (First)</span>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setPlayerColor('black');
                                                                    initFreePlay('black', difficulty);
                                                                }}
                                                                className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                                                                    playerColor === 'black'
                                                                        ? 'bg-indigo-600 text-white border-indigo-400'
                                                                        : 'bg-slate-950 border-slate-800 text-slate-300'
                                                                }`}
                                                            >
                                                                <Shield className="w-3.5 h-3.5" />
                                                                <span>Black (Counter)</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                            <span>Opening Library</span>
                                                        </span>
                                                        <span className="text-[11px] text-slate-400 font-mono">{scenarios.length} Openings</span>
                                                    </div>

                                                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                                                        {scenarios.map(sc => (
                                                            <button
                                                                key={sc.id}
                                                                onClick={() => initScenario(sc)}
                                                                className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer active:scale-98 ${
                                                                    selectedScenario.id === sc.id
                                                                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-inner'
                                                                        : 'bg-slate-950 border-slate-800 text-slate-300'
                                                                }`}
                                                            >
                                                                <div className="min-w-0">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <span className="font-bold text-xs text-white truncate">{sc.name}</span>
                                                                        <span className="text-[8px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase shrink-0">
                                                                            {sc.category}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                                                                        {sc.description}
                                                                    </p>
                                                                </div>
                                                                {selectedScenario.id === sc.id && (
                                                                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-sm" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Mobile Tab 3: SKINS & BOARDS (OWNED) */}
                                    {mobileActiveTab === 'skins' && (
                                        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2.5 shadow-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
                                                    <button
                                                        onClick={() => setCustomizerTab('pieces')}
                                                        className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                                            customizerTab === 'pieces'
                                                                ? 'bg-amber-500 text-slate-950 font-black'
                                                                : 'text-slate-400'
                                                        }`}
                                                    >
                                                        Piece Sets ({ownedPiecesList.length})
                                                    </button>
                                                    <button
                                                        onClick={() => setCustomizerTab('boards')}
                                                        className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                                            customizerTab === 'boards'
                                                                ? 'bg-cyan-500 text-slate-950 font-black'
                                                                : 'text-slate-400'
                                                        }`}
                                                    >
                                                        Board Themes ({ownedBoardsList.length})
                                                    </button>
                                                </div>

                                                <Link
                                                    href={customizerTab === 'pieces' ? '/shop' : '/shop?tab=boards'}
                                                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5 font-semibold"
                                                >
                                                    <span>Store</span>
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </Link>
                                            </div>

                                            {customizerTab === 'pieces' ? (
                                                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                                    {ownedPiecesList.map(skin => (
                                                        <button
                                                            key={skin.slug}
                                                            onClick={() => handleEquipPiece(skin.slug)}
                                                            className={`relative p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                                                                activePieceSkin === skin.slug
                                                                    ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400 shadow-sm'
                                                                    : 'bg-slate-950 border-slate-800'
                                                            }`}
                                                        >
                                                            {activePieceSkin === skin.slug && (
                                                                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                            )}
                                                            <div className="w-7 h-7 flex items-center justify-center">
                                                                <img
                                                                    src={`/skins/${skin.slug}/wK.svg`}
                                                                    alt={skin.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <div className="text-[9px] font-bold text-slate-200 truncate max-w-[70px]">
                                                                {skin.name}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                                    {ownedBoardsList.map(board => (
                                                        <button
                                                            key={board.slug}
                                                            onClick={() => handleEquipBoard(board.slug)}
                                                            className={`relative p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                                                                activeBoardSkin === board.slug
                                                                    ? 'bg-slate-800 border-cyan-400 ring-1 ring-cyan-400 shadow-sm'
                                                                    : 'bg-slate-950 border-slate-800'
                                                            }`}
                                                        >
                                                            {activeBoardSkin === board.slug && (
                                                                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                                            )}
                                                            <div className="w-7 h-7 rounded overflow-hidden border border-slate-700 grid grid-cols-2">
                                                                <div style={{ backgroundColor: board.light }} />
                                                                <div style={{ backgroundColor: board.dark }} />
                                                                <div style={{ backgroundColor: board.dark }} />
                                                                <div style={{ backgroundColor: board.light }} />
                                                            </div>
                                                            <div className="text-[9px] font-bold text-slate-200 truncate max-w-[70px]">
                                                                {board.name.replace('Board', '')}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* OWNED INVENTORY SELECTOR (DESKTOP ONLY) */}
                                <div className="hidden lg:block p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-white/10 shadow-lg backdrop-blur-md space-y-3">
                                    <div className="flex items-center justify-between">
                                        {/* Dual Tab Switcher */}
                                        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                                            <button
                                                onClick={() => setCustomizerTab('pieces')}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                    customizerTab === 'pieces'
                                                        ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                <Crown className="w-3.5 h-3.5" />
                                                <span>Piece Sets ({ownedPiecesList.length})</span>
                                            </button>
                                            <button
                                                onClick={() => setCustomizerTab('boards')}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                    customizerTab === 'boards'
                                                        ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/20'
                                                        : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                <Grid className="w-3.5 h-3.5" />
                                                <span>Board Themes ({ownedBoardsList.length})</span>
                                            </button>
                                        </div>

                                        <Link
                                            href={customizerTab === 'pieces' ? '/shop' : '/shop?tab=boards'}
                                            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                                        >
                                            <span>Shop More</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>

                                    {/* TAB 1: PIECE SETS (ONLY OWNED ONES) */}
                                    {customizerTab === 'pieces' && (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                            {ownedPiecesList.map(skin => (
                                                <button
                                                    key={skin.slug}
                                                    onClick={() => handleEquipPiece(skin.slug)}
                                                    className={`group relative p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                                                        activePieceSkin === skin.slug
                                                            ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                                                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                                                    }`}
                                                    title={`${skin.name} — ${skin.tagline}`}
                                                >
                                                    {/* Active check badge */}
                                                    {activePieceSkin === skin.slug && (
                                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                                                    )}

                                                    {/* Mini Piece Preview */}
                                                    <div className="w-8 h-8 flex items-center justify-center">
                                                        <img
                                                            src={`/skins/${skin.slug}/wK.svg`}
                                                            alt={skin.name}
                                                            className="w-full h-full object-contain drop-shadow group-hover:scale-110 transition-transform"
                                                        />
                                                    </div>

                                                    <div className="text-center w-full">
                                                        <div
                                                            className={`text-[10px] font-bold truncate ${
                                                                activePieceSkin === skin.slug
                                                                    ? 'text-amber-300 font-black'
                                                                    : 'text-slate-300'
                                                            }`}
                                                        >
                                                            {skin.name}
                                                        </div>
                                                        <span className="text-[8px] font-semibold text-slate-500 uppercase">
                                                            Equipped
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Store Card Prompt for unowned pieces */}
                                            {ALL_SKINS.length > ownedPiecesList.length && (
                                                <Link
                                                    href="/shop"
                                                    className="p-2.5 rounded-xl border border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-950/40 hover:bg-slate-900/40 flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer text-center"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-colors">
                                                        <ShoppingBag className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 group-hover:text-amber-300">
                                                        +{ALL_SKINS.length - ownedPiecesList.length} More
                                                    </div>
                                                    <span className="text-[8px] text-slate-500">In Store</span>
                                                </Link>
                                            )}
                                        </div>
                                    )}

                                    {/* TAB 2: BOARD THEMES (ONLY OWNED ONES) */}
                                    {customizerTab === 'boards' && (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                            {ownedBoardsList.map(board => (
                                                <button
                                                    key={board.slug}
                                                    onClick={() => handleEquipBoard(board.slug)}
                                                    className={`group relative p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                                                        activeBoardSkin === board.slug
                                                            ? 'bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400'
                                                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                                                    }`}
                                                    title={`${board.name} — ${board.tagline}`}
                                                >
                                                    {/* Active check badge */}
                                                    {activeBoardSkin === board.slug && (
                                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
                                                    )}

                                                    {/* Mini 2x2 Board Swatch Preview */}
                                                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 grid grid-cols-2 shadow-inner group-hover:scale-105 transition-transform">
                                                        <div style={{ backgroundColor: board.light }} />
                                                        <div style={{ backgroundColor: board.dark }} />
                                                        <div style={{ backgroundColor: board.dark }} />
                                                        <div style={{ backgroundColor: board.light }} />
                                                    </div>

                                                    <div className="text-center w-full">
                                                        <div
                                                            className={`text-[10px] font-bold truncate ${
                                                                activeBoardSkin === board.slug
                                                                    ? 'text-cyan-300 font-black'
                                                                    : 'text-slate-300'
                                                            }`}
                                                        >
                                                            {board.name.replace('Board', '')}
                                                        </div>
                                                        <span className="text-[8px] font-semibold text-slate-500 uppercase">
                                                            Equipped
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Store Card Prompt for unowned boards */}
                                            {ALL_BOARD_SKINS.length > ownedBoardsList.length && (
                                                <Link
                                                    href="/shop?tab=boards"
                                                    className="p-2.5 rounded-xl border border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/40 hover:bg-slate-900/40 flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer text-center"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                                                        <Grid className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-300">
                                                        +{ALL_BOARD_SKINS.length - ownedBoardsList.length} More
                                                    </div>
                                                    <span className="text-[8px] text-slate-500">In Store</span>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TACTICAL CONTROL CONSOLE (DESKTOP ONLY) */}
                        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 space-y-4">
                            {/* ARENA CONFIGURATION CARD */}
                            {gameMode === 'freeplay' ? (
                                <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5 tracking-wider">
                                            <Gamepad2 className="w-4 h-4" />
                                            <span>Free Play Intelligence</span>
                                        </span>
                                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                                            <Coins className="w-3 h-3 text-emerald-400" />
                                            <span>+50 Coins / Win</span>
                                        </span>
                                    </div>

                                    {/* AI Difficulty Selector */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400">AI Engine Level:</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                {
                                                    id: 'casual',
                                                    label: 'Casual',
                                                    elo: '~1000 ELO',
                                                    desc: 'Playful & forgiving',
                                                    color: 'border-emerald-500/40 text-emerald-300',
                                                },
                                                {
                                                    id: 'club',
                                                    label: 'Club',
                                                    elo: '~1500 ELO',
                                                    desc: 'Solid fundamentals',
                                                    color: 'border-amber-500/40 text-amber-300',
                                                },
                                                {
                                                    id: 'master',
                                                    label: 'Master',
                                                    elo: '~1900+ ELO',
                                                    desc: 'Minimax & AlphaBeta',
                                                    color: 'border-rose-500/40 text-rose-300',
                                                },
                                            ].map(d => (
                                                <button
                                                    key={d.id}
                                                    onClick={() => {
                                                        setDifficulty(d.id as AIDifficulty);
                                                        initFreePlay(playerColor, d.id as AIDifficulty);
                                                    }}
                                                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer active:scale-95 ${
                                                        difficulty === d.id
                                                            ? 'bg-slate-800 border-amber-400 shadow-md shadow-amber-500/20'
                                                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                                    }`}
                                                >
                                                    <div className="text-xs font-black text-white">{d.label}</div>
                                                    <div className="text-[10px] text-amber-400 font-bold font-mono">{d.elo}</div>
                                                    <div className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{d.desc}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color Choice */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-400">Play As:</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => {
                                                    setPlayerColor('white');
                                                    initFreePlay('white', difficulty);
                                                }}
                                                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                                                    playerColor === 'white'
                                                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                <Crown className="w-4 h-4" />
                                                <span>White (Moves First)</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setPlayerColor('black');
                                                    initFreePlay('black', difficulty);
                                                }}
                                                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                                                    playerColor === 'black'
                                                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/20'
                                                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                <Shield className="w-4 h-4" />
                                                <span>Black (Counterplay)</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* SCENARIO SELECTION CARD */
                                <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5 tracking-wider">
                                            <BookOpen className="w-4 h-4" />
                                            <span>Opening Book Library</span>
                                        </span>
                                        <span className="text-xs text-slate-400 font-mono">{scenarios.length} Scenarios</span>
                                    </div>

                                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                        {scenarios.map(sc => (
                                            <button
                                                key={sc.id}
                                                onClick={() => initScenario(sc)}
                                                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer active:scale-98 ${
                                                    selectedScenario.id === sc.id
                                                        ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-inner'
                                                        : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                                                }`}
                                            >
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-xs sm:text-sm text-white">{sc.name}</span>
                                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold uppercase">
                                                            {sc.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                                                        {sc.description}
                                                    </p>
                                                </div>
                                                {selectedScenario.id === sc.id && (
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1.5 shadow-sm shadow-amber-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ANALYSIS / BOT INTELLIGENCE FEED */}
                            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md space-y-2.5">
                                <div className="flex items-center justify-between text-xs font-bold text-cyan-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles className="w-4 h-4" />
                                        <span>Grandmaster Analysis & Commentary</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">Live Engine</span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs sm:text-sm text-slate-200 leading-relaxed min-h-[64px] flex items-center shadow-inner">
                                    {latestComment ? (
                                        <p className="animate-in fade-in duration-200">{latestComment}</p>
                                    ) : (
                                        <p className="text-slate-500 italic">Game in progress. Make your move on the board.</p>
                                    )}
                                </div>
                            </div>

                            {/* MOVE NOTATION LOG CARD */}
                            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl backdrop-blur-md space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase text-slate-300 flex items-center gap-1.5 tracking-wider">
                                        <Layers className="w-4 h-4 text-purple-400" />
                                        <span>Game Notation (SAN)</span>
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">
                                        {historySAN.length} plies
                                    </span>
                                </div>

                                <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 h-48 overflow-y-auto font-mono text-xs space-y-1 shadow-inner">
                                    {moveLog.length === 0 ? (
                                        <div className="text-slate-600 text-center py-12 italic">
                                            No moves yet. Make the first move on the chessboard.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            {Array.from({ length: Math.ceil(moveLog.length / 2) }).map((_, roundIdx) => {
                                                const whiteMove = moveLog[roundIdx * 2];
                                                const blackMove = moveLog[roundIdx * 2 + 1];

                                                return (
                                                    <React.Fragment key={roundIdx}>
                                                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 text-slate-200 border border-slate-800/40">
                                                            <span className="text-slate-500 w-5">{roundIdx + 1}.</span>
                                                            <span className="font-bold text-amber-300 flex items-center gap-1">
                                                                {whiteMove?.san}
                                                                {whiteMove?.isCapture && <span className="text-[9px] text-rose-400 font-bold">x</span>}
                                                                {whiteMove?.isCheck && <span className="text-[9px] text-amber-400 font-bold">+</span>}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/40 text-slate-300 border border-slate-800/20">
                                                            <span className="font-bold text-indigo-300 flex items-center gap-1">
                                                                {blackMove ? blackMove.san : '...'}
                                                                {blackMove?.isCapture && <span className="text-[9px] text-rose-400 font-bold">x</span>}
                                                                {blackMove?.isCheck && <span className="text-[9px] text-indigo-400 font-bold">+</span>}
                                                            </span>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}
                                            <div ref={chatEndRef} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
