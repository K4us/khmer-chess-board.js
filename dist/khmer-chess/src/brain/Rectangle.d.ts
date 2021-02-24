export default class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    isContainsPoint(point: {
        x: any;
        y: any;
    }): boolean;
}
