export default class SoundManager {
    static MOVE_FLAG: string;
    static CAPTURE_FLAG: string;
    static CHECK_FLAG: string;
    move: HTMLAudioElement;
    capture: HTMLAudioElement;
    check: HTMLAudioElement;
    isEnable: boolean;
    disable(): void;
    enable(): void;
    _addSound(src: string): HTMLAudioElement;
    play(flag: string): void;
    playMove(): void;
    playCapture(): void;
    playCheck(): void;
}
