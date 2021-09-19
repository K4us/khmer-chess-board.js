import { PieceIndex, Move } from 'khmer-chess';
import KhmerChessBoard from '../KhmerChessBoard';
export declare type Option = {
    khmerChessBoard: KhmerChessBoard;
    flag: string;
    actorPieceIndex?: PieceIndex;
    color?: string;
    countingToNumber?: number;
    countingNumber?: number;
    move?: Move;
};
export declare class BoardStatusEvent {
    flag: string;
    isMoving: boolean;
    move: Move | null;
    message: string;
    actorPieceIndex: PieceIndex | null;
    isWhite: boolean;
    isAttacking: boolean;
    color: string;
    isWin: boolean;
    isDraw: boolean;
    isCannotMove: boolean;
    isStartCounting: boolean;
    isCountingUp: boolean;
    isCountUpOut: boolean;
    countingToNumber: number | null;
    countingNumber: number | null;
    constructor({ khmerChessBoard, countingToNumber, countingNumber, flag, actorPieceIndex, color, move }: Option);
    applyCount(countingToNumber: number | null, countingNumber: number | null): void;
    _getMessage(khmerChessBoard: KhmerChessBoard): string;
}
