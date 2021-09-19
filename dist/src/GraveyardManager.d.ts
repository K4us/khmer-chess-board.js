import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class GraveyardManager {
    khmerChessBoard: KhmerChessBoard;
    _cells: CellManager[];
    domGraveyard: HTMLElement;
    constructor(khmerChessBoard: KhmerChessBoard);
    destroy(): void;
    setDom(domGraveyard: HTMLElement): void;
    push(cell: CellManager): void;
    get(index: number): CellManager;
    get latestPieceCell(): CellManager | null;
    get firstEmptyCell(): CellManager | null;
    setCellNote(): void;
    clearCellNote(): void;
    removePiecesFromCells(): void;
    applyPiecesFromKhmerChess(): void;
    renderKhmerChessPieces(): void;
}
