import Piece from './Piece';
import Point from './Point';
export default class PieceIndex {
    point: Point;
    piece: Piece | null;
    constructor(x: number, y: number, piece: Piece | null);
    toCode(): string;
    toPieceCharCode(): string;
}
