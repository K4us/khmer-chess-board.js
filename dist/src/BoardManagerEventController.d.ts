import CellManager from './CellManager';
import { ListenerType, EventHandler } from 'khmer-chess';
export default class BoardManagerEventController extends EventHandler {
    static CLICK: string;
    static SELECTED: string;
    static DESELECTED: string;
    static ATTEMPT_MOVE: string;
    constructor();
    click(cellManager: CellManager): void;
    selected(cellManager: CellManager): void;
    deselected(cellManager: CellManager): void;
    attemptMove(fromCell: CellManager, toCell: CellManager): void;
    addOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellClickEventListener(listener: ListenerType<CellManager>): void;
    addOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellSelectedEventListener(listener: ListenerType<CellManager>): void;
    addOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
    removeOnCellDeselectedEventListener(listener: ListenerType<CellManager>): void;
    addOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
    removeOnAttemptMoveEventListener(listener: ListenerType<{
        fromCell: CellManager;
        toCell: CellManager;
    }>): void;
}
