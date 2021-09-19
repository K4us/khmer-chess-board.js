import { EventHandler, ListenerType } from 'khmer-chess';
import KhmerChessBoard from '../KhmerChessBoard';
import { BoardStatusEvent } from './BoardStatusEvent';
export default class BoardStatusEventController extends EventHandler {
    static STATUS_EVENT: string;
    constructor();
    fireEvent(boardEvent: BoardStatusEvent): void;
    addBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>): void;
    removeBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>): void;
    getBoardEvents(khmerChessBoard: KhmerChessBoard): BoardStatusEvent[];
    checkBoardEvent(khmerChessBoard: KhmerChessBoard): void;
}
