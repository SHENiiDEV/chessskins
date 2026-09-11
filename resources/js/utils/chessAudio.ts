/**
 * Web Audio API synthesizer for chess sound effects.
 * Requires zero external audio files, works with zero network latency,
 * and provides instant auditory feedback on moves, captures, checks, and victories.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

let isSoundMuted = typeof window !== 'undefined' ? localStorage.getItem('chess_sound_muted') === 'true' : false;

export const isAudioMuted = (): boolean => isSoundMuted;

export const setAudioMuted = (muted: boolean): boolean => {
    isSoundMuted = muted;
    if (typeof window !== 'undefined') {
        localStorage.setItem('chess_sound_muted', muted ? 'true' : 'false');
    }
    return isSoundMuted;
};

export const toggleAudio = (): boolean => {
    return setAudioMuted(!isSoundMuted);
};

/**
 * Standard piece move sound: crisp, soft wooden knock
 */
export const playMoveSound = () => {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.07);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.09);
    } catch {
        // Ignore audio errors gracefully
    }
};

/**
 * Piece capture sound: punchy tactile snap
 */
export const playCaptureSound = () => {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;

        // Primary click
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(450, now);
        osc1.frequency.exponentialRampToValueAtTime(80, now + 0.08);

        gain1.gain.setValueAtTime(0.35, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);

        // Subtle sub thud
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(160, now);
        osc2.frequency.exponentialRampToValueAtTime(50, now + 0.12);

        gain2.gain.setValueAtTime(0.4, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.1);
        osc2.start(now);
        osc2.stop(now + 0.14);
    } catch {
        // Ignore audio errors gracefully
    }
};

/**
 * Check alert chime: two-tone harmonic chime
 */
export const playCheckSound = () => {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        const freqs = [587.33, 880.00]; // D5 and A5

        freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + idx * 0.07;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, start);

            gain.gain.setValueAtTime(0.25, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(start);
            osc.stop(start + 0.26);
        });
    } catch {
        // Ignore audio errors gracefully
    }
};

/**
 * Victory / Checkmate chime: triumphant major arpeggio
 */
export const playVictorySound = () => {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        chord.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + i * 0.08;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.25, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(start);
            osc.stop(start + 0.55);
        });
    } catch {
        // Ignore audio errors gracefully
    }
};

/**
 * Game start ready chime
 */
export const playGameStartSound = () => {
    if (isSoundMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
        const now = ctx.currentTime;
        const notes = [440, 554.37, 659.25]; // A4, C#5, E5

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + i * 0.06;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(0.2, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(start);
            osc.stop(start + 0.35);
        });
    } catch {
        // Ignore audio errors gracefully
    }
};
