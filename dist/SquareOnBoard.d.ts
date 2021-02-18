import { Piece } from 'khmer-chess';
export default class SquareOnBoard {
    _x: number;
    _y: number;
    readonly x: number;
    readonly y: number;
    readonly index: number;
    readonly indexCode: string;
    isGraveyard: boolean;
    container: HTMLDivElement;
    piece: Piece;
    isUpsideDown: boolean;
    constructor(x: number, y: number, container: HTMLDivElement, piece: Piece, isGraveyard?: boolean);
    removePiece(): Piece;
    setPiece(piece: Piece): void;
    addClassName(className: string): void;
    removeClassName(className: string): void;
    hasClassName(className: string): boolean;
    select(): Piece;
    unselect(): void;
    isSelected(): boolean;
    attack(attacked: boolean): Piece;
    isAttacked(): boolean;
    getProperties(): {
        className: string;
    };
    clear(): void;
    setProperties(prop: {
        className: string;
    }): void;
    setOnClick(listener: (this: GlobalEventHandlers, ev: MouseEvent) => any): void;
    removeOnClick(): void;
    setFlipped(isUpsideDown: boolean): void;
    clone(): SquareOnBoard;
}
