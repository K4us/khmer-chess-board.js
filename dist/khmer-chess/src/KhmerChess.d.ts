import KPGN from './kpgn/KPGN';
import Move from './kpgn/Move';
import BoardEventController, { BoardEvent } from './other/BoardEventController';
import { ListenerType } from './other/EventHandler';
import { PieceIndex } from './ren';
import Point from './ren/Point';
import REN from './ren/REN';
export default class KhmerChess {
    static title: string;
    static version: string;
    renInstance: REN;
    kpgnInstance: KPGN;
    boardEventController: BoardEventController;
    constructor(renStr?: string);
    loadRENStr(renStr: string): void;
    resetBoard(): void;
    getCanMoves(): Move[];
    getCanMovePointsByPoint(point: Point): Point[];
    getAttacker(): PieceIndex | null;
    getWinColor(): string | null;
    getStuckColor(): string | null;
    isDraw(): string;
    getDrawCountColor(): string | null;
    gameOver(): string;
    validateRENStr(renStr: string): {
        valid: boolean;
        error_number: number;
        error: any;
    };
    getRENStr(): string;
    readonly piecesInBoardMultiArray: import("./ren/Piece.js").default[][];
    readonly piecesInBoard: import("./ren/Piece.js").default[];
    readonly piecesInGraveyard: import("./ren/Piece.js").default[];
    getKPGN(): {
        event: string;
        date: string;
        location: string;
        players: {
            white: {
                id: string;
                name: string;
            };
            black: {
                id: string;
                name: string;
            };
        };
        result: {
            last: {
                whiteWin: boolean;
                blackWin: boolean;
            };
            white: {
                win: number;
                draw: number;
                lost: number;
            };
        };
        moves: {
            fromIndex: number;
            toIndex: number;
            isJumping: boolean;
            capturedPiece: string;
        }[];
        ren: string;
        timer: {
            totalSecond: string;
            currentWhite: string;
            currentBlack: string;
        };
    };
    loadKpgn(kpgnJosn: any, options: any): void;
    drawAscii(): string;
    turn: string;
    move(moveFromIndex: number, moveToIndex: number): Move | null;
    undoMove(): boolean;
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clearBoard(): void;
    getHistories(): Move[];
    checkBoardEvent(): void;
    addBoardEventListener(listener: ListenerType<BoardEvent>): void;
    removeBoardEventListener(listener: ListenerType<BoardEvent>): void;
}
