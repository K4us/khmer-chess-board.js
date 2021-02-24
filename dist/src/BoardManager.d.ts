import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import { KhmerChess, ListenerType, EventHandler } from 'khmer-chess';
declare class BoardEventController extends EventHandler {
    static CLICK: string;
    static ATTEMPT_MOVE: string;
    constructor();
    attemptMove(fromCell: CellManager, toCell: CellManager): void;
    click(cellManager: CellManager): void;
    addOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    addOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
    removeOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
}
export default class BoardManager {
    _cellManagers: CellManager[];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown: boolean;
    boaEventController: BoardEventController;
    constructor();
    setProps(khmerChessBoard: KhmerChessBoard): void;
    enableClick(): void;
    put(i: number, squarePiece: CellManager): void;
    get(index: number): CellManager;
    getByIndexCode(indexCode: string): CellManager;
    getByXY(x: number, y: number): CellManager;
    flip(): void;
    getSelectedSquares(): CellManager[];
    clearSelectedSquares(): void;
    removePiecesFromSquares(): void;
    applyFlippingFlag(): void;
    setNote(): void;
    renderKhmerChessPieces(): void;
    addOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    addOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
    removeOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
}
export {};
