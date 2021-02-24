import { PieceIndex, Point } from '../ren/index';
declare type OptionsType = {
    piecesString: string;
    currentTurn: string;
    isNeangMoved: boolean;
    isSdechMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
};
declare type CalCountPropsType = {
    piecesString: string;
    force: boolean;
};
declare class MoveHelper {
    piecesString: string;
    currentTurn: string;
    isNeangMoved: boolean;
    isSdechMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
    whiteMoves: PieceIndex[];
    blackMoves: PieceIndex[];
    whiteKingInDanger: Point[] | null;
    whiteKingWillInDanger: Point[] | null;
    blackKingInDanger: Point[] | null;
    blackKingWillInDanger: Point[] | null;
    winColor: string | null;
    stuckColor: string | null;
    init(option: OptionsType): void;
    generateCanMoves(): void;
    cleanPieceNoMove(): void;
    checkIfKingInDanger(): void;
    genWinLost(): void;
    getStuck(): void;
    calcCanMove(option: OptionsType): {
        moves: PieceIndex[];
        anotherMoves: PieceIndex[];
    };
    calcState(option: OptionsType): {
        blackKingInDanger: Point[];
        whiteKingInDanger: Point[];
        blackKingWillInDanger: Point[];
        whiteKingWillInDanger: Point[];
        winColor: string;
        stuckColor: string;
        blackCountable: boolean;
        whiteCountable: boolean;
    };
    calCount(option: CalCountPropsType): {
        countingBlack: number[];
        countingWhite: number[];
    };
}
declare const _default: MoveHelper;
export default _default;
