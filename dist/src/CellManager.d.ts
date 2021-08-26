import { Point, Piece } from 'khmer-chess';
export default class CellManager {
    point: Point;
    isGraveyard: boolean;
    containerDom: HTMLDivElement;
    piece: Piece;
    isUpsideDown: boolean;
    constructor(point: Point, container: HTMLDivElement, piece: Piece, isGraveyard?: boolean);
    removePieceClasses(): void;
    removePiece(): void;
    setPiece(piece: Piece): void;
    addClassName(className: string): void;
    removeClassName(className: string): void;
    hasClassName(className: string): boolean;
    select(selected: boolean): void;
    get isSelected(): boolean;
    get isCanMove(): boolean;
    get isMoved(): boolean;
    get isCanSelect(): boolean;
    attack(attacked: boolean): Piece;
    turn(attacked: boolean): void;
    get isAttacked(): boolean;
    get isTurn(): boolean;
    setProperties(prop: {
        className: string;
    }): void;
    setOnClick(listener: (this: GlobalEventHandlers, ev: MouseEvent) => any): void;
    removeOnClick(): void;
    setFlipped(isUpsideDown: boolean): void;
    clone(): CellManager;
    scrollIntoView(): void;
    movePieceTo(toCell: CellManager): void;
    movePieceToGraveyard(toCell: CellManager): void;
    moved(): void;
    clearMoved(): void;
    setCanMove(): void;
    clearCanMoved(): void;
}
