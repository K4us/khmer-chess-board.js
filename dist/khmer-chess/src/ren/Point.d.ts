export default class Point {
    x: number;
    y: number;
    readonly index: number;
    readonly graveyardIndex: number;
    readonly indexCode: string;
    readonly h: string;
    readonly v: number;
    constructor(x: number, y: number);
    static xyToIndex(x: number, y: number): number;
    static indexCodeToXY(indexCode: string): {
        x: number;
        y: number;
    };
    static indexCodeToIndex(indexCode: string): number;
    static fromIndexCode(indexCode: string): Point;
    static indexToXY(index: number): {
        x: number;
        y: number;
    };
    static fromIndex(index: number): Point;
    static fromIndexGraveyardIndex(index: number): Point;
    static isIndexInBoard(index: number): boolean;
}
