import { KhmerChess } from 'khmer-chess';
import SquareOnBoard from './SquareOnBoard';
import Options from './Options';
import KhmerChessBoard from './KhmerChessboard';
export default class BoardManager {
    _squares: SquareOnBoard[];
    options: Options;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown: boolean;
    setProps(khmerChessBoard: KhmerChessBoard): void;
    put(i: number, squarePiece: SquareOnBoard): void;
    get(index: number): SquareOnBoard;
    getByIndexCode(code: string): SquareOnBoard;
    getByXY(x: number, y: number): SquareOnBoard;
    flip(): void;
    getSelectedSquares(): SquareOnBoard[];
    clearSelectedSquares(): void;
    removePiecesFromSquares(): void;
    applyFlippingFlag(): void;
    enableSelect(): void;
    setNote(): void;
    renderKhmerChessPieces(): void;
}
