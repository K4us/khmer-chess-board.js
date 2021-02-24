import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import { KhmerChess, ListenerType, EventHandler } from 'khmer-chess';
declare class BoardEventController extends EventHandler {
    static CLICK: string;
    static SELECTED: string;
    static DESELECTED: string;
    static ATTEMPT_MOVE: string;
    constructor();
    click(cellManager: CellManager): void;
    selected(cellManager: CellManager): void;
    deselected(cellManager: CellManager): void;
    attemptMove(fromCell: CellManager, toCell: CellManager): void;
    addOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    addOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    addOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
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
    put(i: number, cellPiece: CellManager): void;
    get(index: number): CellManager;
    getByIndexCode(indexCode: string): CellManager;
    getByXY(x: number, y: number): CellManager;
    flip(): void;
    readonly selectedCells: CellManager[];
    readonly canMoveCells: CellManager[];
    readonly movedCells: CellManager[];
    clearSelectedCells(): void;
    clearCanMoveCells(): void;
    clearMovedCells(): void;
    removePiecesFromCells(): void;
    applyFlippingFlag(): void;
    setNote(): void;
    renderKhmerChessPieces(): void;
    addOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    addOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    addOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
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
