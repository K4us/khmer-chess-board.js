export declare const WOOD_COLORS: {
    WHITE: string;
    BLACK: string;
};
export declare const PIECES_SVG: {
    [x: string]: string;
};
export declare const svgCSS: {
    attacked: (color?: string) => string;
    notAttacked: (color?: string) => string;
    turn: (color?: string) => string;
    selected: (color?: string) => string;
    moved: (color?: string) => string;
    canMove: (color?: string) => string;
};
declare type NoteText = {
    x: number;
    y: number;
    t: string;
};
export declare function genBackgroundNote(tObjects: Array<NoteText>, cellWidth: number, fSize: number): string;
export {};
