import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
import OptionsManager from './OptionsManager';
export default class PieceShadowManager {
    tdShadowDom: HTMLElement;
    khmerChessBoard: KhmerChessBoard;
    options: OptionsManager;
    quickMove: boolean;
    pending: {
        resolvers: Array<() => void>;
        callbacks: Array<() => void>;
    };
    enableQuickMove(): void;
    disableQuickMove(): void;
    setTdShadow(tdShadowDown: HTMLElement): void;
    setProps(khmerChessBoard: KhmerChessBoard): void;
    movingPiece(fromCell: CellManager, toCell: CellManager, callback: Function): void;
    _resolve(): void;
    resolveAnimation(): Promise<void>;
}
