import { ListenerType, EventHandler } from 'khmer-chess';
export default class BoardManagerEventController<T> extends EventHandler {
    static CLICK: string;
    static SELECTED: string;
    static DESELECTED: string;
    static ATTEMPT_MOVE: string;
    static CHANGE_TURN: string;
    constructor();
    click(data: T): void;
    selected(data: T): void;
    deselected(data: T): void;
    attemptMove(fromCell: T, toCell: T): void;
    changeTurn(): void;
    addOnCellClickEventListener(listener: ListenerType<T>): void;
    removeOnCellClickEventListener(listener: ListenerType<T>): void;
    addOnCellSelectedEventListener(listener: ListenerType<T>): void;
    removeOnCellSelectedEventListener(listener: ListenerType<T>): void;
    addOnCellDeselectedEventListener(listener: ListenerType<T>): void;
    removeOnCellDeselectedEventListener(listener: ListenerType<T>): void;
    addOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: T;
        toCell: T;
    }>): void;
    removeOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: T;
        toCell: T;
    }>): void;
    addOnChangeTurnEventListener(listener: ListenerType<{
        fromCell: T;
        toCell: T;
    }>): void;
    removeOnChangeTurnEventListener(listener: ListenerType<{
        fromCell: T;
        toCell: T;
    }>): void;
}
