export default class Piece {
    type: string;
    color: string;
    readonly pieceCharCode: string;
    constructor(type: string, color: string);
    static fromCharCode(charCode: string): Piece;
    toOriginPiece(): Piece;
    static readonly pieceChars: string[];
    static readonly colorChars: string[];
    static toWhiteCharCode(charCode: string): string;
    static isWhiteCharCode(charCode: string): boolean;
    static toBlackCharCode(charCode: string): string;
    static toNormalCharCode(charCode: string): string;
    static isValidPiece(piece: string): boolean;
    static isWhiteColor(c: string): boolean;
    static isBlackColor(c: string): boolean;
    static oppositeColor(color: any): "w" | "b";
    static isValidPiecesString(str: string, onlyPiece?: boolean): boolean;
}
