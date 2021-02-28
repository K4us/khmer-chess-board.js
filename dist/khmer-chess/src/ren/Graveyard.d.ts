import Piece from './Piece';
export default class Graveyard {
    pieces: Piece[];
    readonly lastIndex: number;
    constructor(graveyardStr?: string);
    toString(): string;
}
