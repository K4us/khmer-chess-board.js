import { KhmerChess, Piece } from 'khmer-chess';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
export default class GraveyardManager {
    _squares: CellManager[];
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    options: {};
    setProps(khmerChessBoard: KhmerChessBoard): void;
    push(squarePiece: CellManager): void;
    get(index: number): CellManager;
    setNote(): void;
    removePiecesFromSquares(): void;
    applyPiecesFromKhmerChess(pieces: Piece[]): void;
    renderKhmerChessPieces(): void;
}
