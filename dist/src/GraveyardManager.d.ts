import { KhmerChess } from 'khmer-chess';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class GraveyardManager {
    _cells: CellManager[];
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    options: {};
    setProps(khmerChessBoard: KhmerChessBoard): void;
    push(cellPiece: CellManager): void;
    get(index: number): CellManager;
    setNote(): void;
    removePiecesFromCells(): void;
    applyPiecesFromKhmerChess(): void;
    renderKhmerChessPieces(): void;
}
