export declare const WOOD_COLORS: {
    WHITE: string;
    BLACK: string;
};
export declare const PIECES_SVG: {
    [x: string]: string;
};
export declare const svgCSS: {
    attacked: (color?: string | undefined) => string;
    notAttacked: (color?: string | undefined) => string;
    turn: (color?: string | undefined) => string;
    selected: (color?: string | undefined) => string;
    moved: (color?: string | undefined) => string;
    canMove: (color?: string | undefined) => string;
};
declare type NoteText = {
    x: number;
    y: number;
    t: string;
};
export declare function genBackgroundNote(tObjects: Array<NoteText>, cellWidth: number, fSize: number): string;
export {};
