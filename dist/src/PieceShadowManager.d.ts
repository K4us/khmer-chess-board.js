import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class PieceShadowManager {
    khmerChessBoard: KhmerChessBoard;
    tdShadowDom: HTMLElement;
    _quickMove: boolean;
    constructor(khmerChessBoard: KhmerChessBoard);
    destroy(): void;
    get isQuickMove(): boolean;
    pending: {
        resolvers: Array<() => void>;
        callbacks: Array<() => void>;
    };
    quickMove(enable: boolean): void;
    setTdShadow(tdShadowDown: HTMLElement): void;
    movingPiece(fromCell: CellManager, toCell: CellManager, callback: Function): void;
    addPendingCallback(callback: () => void): void;
    removePendingCallback(callback: () => void): void;
    finishAnimations(): void;
    _resolve(): void;
    resolveAnimation(): Promise<void>;
}
