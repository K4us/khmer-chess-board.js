import { Point, Piece } from 'khmer-chess';
export default class CellManager {
    point: Point;
    isGraveyard: boolean;
    container: HTMLDivElement;
    piece: Piece;
    isUpsideDown: boolean;
    constructor(point: Point, container: HTMLDivElement, piece: Piece, isGraveyard?: boolean);
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
    clone(): CellManager;
}
