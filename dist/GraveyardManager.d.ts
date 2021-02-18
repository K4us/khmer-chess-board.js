import { KhmerChess, Piece } from 'khmer-chess';
import SquareOnBoard from './SquareOnBoard';
import KhmerChessBoard from './KhmerChessboard';
export default class GraveyardManager {
    _squares: SquareOnBoard[];
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    options: {};
    setProps(khmerChessBoard: KhmerChessBoard): void;
    push(squarePiece: SquareOnBoard): void;
    get(index: number): SquareOnBoard;
    setNote(): void;
    removePiecesFromSquares(): void;
    applyPiecesFromKhmerChess(pieces: Piece[]): void;
    renderKhmerChessPieces(): void;
}
