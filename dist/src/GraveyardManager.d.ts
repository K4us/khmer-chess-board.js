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
    get lastIndex(): number | null;
    get lastPieceCell(): CellManager | null;
    get firstEmptyCell(): CellManager | null;
    setCellNote(): void;
    clearCellNote(): void;
    removePiecesFromCells(): void;
    applyPiecesFromKhmerChess(): void;
    scrollLastToView(): void;
    renderKhmerChessPieces(): void;
}
