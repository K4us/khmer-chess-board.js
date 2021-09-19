import KhmerChessBoard from './KhmerChessBoard';
export default class SoundManager {
    khmerChessBoard: KhmerChessBoard;
    move: HTMLAudioElement | null;
    capture: HTMLAudioElement | null;
    check: HTMLAudioElement | null;
    static MOVE_FLAG: string;
    static CAPTURE_FLAG: string;
    static CHECK_FLAG: string;
    isEnable: boolean;
    constructor(khmerChessBoard: KhmerChessBoard);
    destroy(): void;
    disable(): void;
    enable(): void;
    _addSound(src: string): HTMLAudioElement;
    play(flag: string): void;
    playMove(): void;
    playCapture(): void;
    playCheck(): void;
}
