import { PieceIndex } from '../ren';
import EventHandler, { ListenerType } from './EventHandler';
export declare class BoardEvent {
    flag: string;
    actorPieceIndex: PieceIndex;
    readonly isAttack: boolean;
    readonly isWin: boolean;
    constructor({ flag, actorPieceIndex }: {
        flag: string;
        actorPieceIndex: PieceIndex;
    });
}
export default class BoardEventController extends EventHandler {
    static EVENT: string;
    constructor();
    fireEvent(boardEvent: BoardEvent): void;
    addBoardEventListener(listener: ListenerType<BoardEvent>): void;
    removeBoardEventListener(listener: ListenerType<BoardEvent>): void;
}
