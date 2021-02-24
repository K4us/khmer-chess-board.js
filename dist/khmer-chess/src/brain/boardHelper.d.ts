import Point from '../ren/Point';
import Piece from '../ren/Piece';
import PieceIndex from '../ren/PieceIndex';
declare class BoardHelper {
    getCharPieceFromString(piecesString: string, index: number): string;
    getPieceProperties(pieceCode: string): Piece;
    getCharPieceInPos(index: number, piecesString: string): string;
    getPieceByIndex(index: number, piecesString: string): {
        isValidPiece: boolean;
        piece: Piece | null;
    };
    convertMask: (point1: Point, index: number, color: string) => number;
    getPieceCanMovePoses(index: number, piece: Piece): number[];
    getPieceCanMovePosesValid(index: number, piece: Piece, piecesString: string): number[];
    replacePiecesStringAtIndex(piecesString: string, c: string, index: number): string;
    injectPiece(piecesString: string, index1: number, index2: number): string;
    getPieceCode(piece: Piece): string;
    getKingWillInDanger(color: string, piecesString: string): Point[];
    getKingInDanger(color: string, piecesString: string): Point[] | null;
    generatePosesCanMove(index: number, piece: Piece, piecesString: string, isHaveMoved: boolean): Point[];
    isCharPiecesInBoard(code: string, piecesString: string): boolean;
    getPiecesInBoard(piecesString: string): string[];
    isHaveCaptured(piecesString: string): boolean;
    filterPieceInBoard(piecesString: string): {
        whitePieces: PieceIndex[];
        blackPieces: PieceIndex[];
    };
    extractPiecesToArray(piecesString: string): {
        [x: string]: string[];
    };
    isStateCount(c: string, piecesString: string): boolean;
    checkCountable(color: string, piecesString: string): boolean;
    checkCount(color: string, piecesString: string, force: boolean): number[];
}
declare const _default: BoardHelper;
export default _default;
