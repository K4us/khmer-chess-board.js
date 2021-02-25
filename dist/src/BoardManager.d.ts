import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import { KhmerChess, ListenerType } from 'khmer-chess';
import BoardManagerEventController from './BoardManagerEventController';
export default class BoardManager {
    _cellManagers: CellManager[];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown: boolean;
    boaEventController: BoardManagerEventController;
    constructor();
    setProps(khmerChessBoard: KhmerChessBoard): void;
    enableClick(): void;
    put(i: number, cellPiece: CellManager): void;
    get(index: number): CellManager;
    getKing(color: string): CellManager;
    getByIndexCode(indexCode: string): CellManager;
    getByXY(x: number, y: number): CellManager;
    flip(): void;
    readonly selectedCells: CellManager[];
    readonly canMoveCells: CellManager[];
    readonly movedCells: CellManager[];
    readonly attackedCells: CellManager[];
    clearSelectedCells(): void;
    clearCanMoveCells(): void;
    clearMovedCells(): void;
    clearAttackCells(): void;
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
