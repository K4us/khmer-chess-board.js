import KhmerChessBoard from './KhmerChessBoard';
import PlayManagerEventController from './event/PlayManagerEventController';
import { Move } from 'khmer-chess';
import MoveData from './MoveData';
export default class PlayManager {
    khmerChessBoard: KhmerChessBoard;
    renDataList: MoveData[];
    playEventController: PlayManagerEventController<MoveData>;
    playerContainer: HTMLElement;
    dataContainerDom: HTMLElement;
    backBtnDom: HTMLButtonElement;
    playBtnDom: HTMLButtonElement;
    pauseBtnDom: HTMLButtonElement;
    nextBtnDom: HTMLButtonElement;
    containerClassName: string;
    currentIndex: number;
    constructor(khmerChessBoard: KhmerChessBoard);
    destroy(): void;
    hideController(): void;
    showController(): void;
    get isControllerHidden(): boolean;
    get isCanBack(): boolean;
    get isCanNext(): boolean | 0;
    renderMoveData(): void;
    draw(playerContainer: HTMLElement): void;
    btnListen(): void;
    css(): string;
    get isCanUndo(): boolean;
    undo(): void;
    get isCanPlay(): boolean;
    get isPlaying(): boolean;
    offTurning(): void;
    turning(): void;
    play(): boolean;
    pause(): boolean;
    toggle(): void;
    render(): void;
    loadCurrentRen(): void;
    get currentMove(): Move | null;
    back(callback?: (arg0: void | Error) => void): boolean;
    next(callback?: (arg0: void | Error) => void): boolean;
    applyMove(move: Move, callback?: (arg0: void | Error) => void): void;
    applyMoveBack(move: Move, callback?: (arg0: void | Error) => void): void;
    highlightCurrentMove(): void;
    toIndex(index: number): void;
    resetCurrentIndex(): void;
}
