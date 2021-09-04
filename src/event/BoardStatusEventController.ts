import {
    EVENT_FLAG_ATTACK,
    EVENT_FLAG_WIN,
    PieceIndex,
    EventHandler,
    ListenerType,
    PIECE_COLOR_WHITE,
    EVENT_FLAG_DRAW,
    EVENT_FLAG_COUNT_UP_OUT,
    EVENT_FLAG_COUNTING_UP,
    EVENT_FLAG_START_COUNTING,
    REN
} from 'khmer-chess';
import KhmerChessBoard from '../KhmerChessBoard';
export type Option = {
    flag: string;
    actorPieceIndex?: PieceIndex;
    color: string;
    countingFromNumber?: number;
    countingNumber?: number;
};
export class BoardStatusEvent {
    flag: string;
    actorPieceIndex: PieceIndex;
    isWhite = false;
    isAttacking = false;

    isWin = false;

    isDraw = false;
    isCannotMove = false;

    isStartCounting = false;

    isCountUpOut = false;

    isCountingUp = false;

    countingFrom: number | null = null
    countingNumber: number | null = null

    constructor({ countingFromNumber: countingFromNumber, countingNumber: countingNumber,
        flag, actorPieceIndex, color }: Option) {

        this.flag = flag;
        const isWhite = color === PIECE_COLOR_WHITE;
        this.isWhite = isWhite;
        this.actorPieceIndex = actorPieceIndex || null;
        this.isWin = flag === EVENT_FLAG_WIN;
        this.isAttacking = flag === EVENT_FLAG_ATTACK;
        this.isStartCounting = flag === EVENT_FLAG_START_COUNTING;
        if (this.isStartCounting) {
            this.applyCount(countingFromNumber, countingNumber)
        }
        this.isCountingUp = flag === EVENT_FLAG_COUNTING_UP;
        if (this.isCountingUp) {
            this.applyCount(countingFromNumber, countingNumber)
        }
        this.isCountUpOut = flag === EVENT_FLAG_COUNT_UP_OUT;
        if (this.isCountUpOut) {
            this.applyCount(countingFromNumber, countingNumber)
        }
        this.isDraw = this.isCountUpOut || flag === EVENT_FLAG_DRAW;
        if (this.isDraw && !this.isCountUpOut) {
            this.isCannotMove = true;
        }
    }
    applyCount(countingFromNumber: number, countingNumber: number) {
        this.countingFrom = countingFromNumber;
        this.countingNumber = countingNumber;
    }
    getMessage() {
        // TODO: implement this
    }
}
export default class BoardStatusEventController extends EventHandler {
    static STATUS_EVENT = 'status-event';
    constructor() {
        super({
            events: {
                EVENT: BoardStatusEventController.STATUS_EVENT,
            },
        });
    }
    fireEvent(boardEvent: BoardStatusEvent) {
        this._addPropEvent(BoardStatusEventController.STATUS_EVENT, boardEvent);
    }
    addBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>) {
        this._addOnEventListener(BoardStatusEventController.STATUS_EVENT, listener);
    }
    removeBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>) {
        this._removeOnEventListener(BoardStatusEventController.STATUS_EVENT, listener);
    }

    checkBoardEvent(khmerChessBoard: KhmerChessBoard) {
        const { boardManager, playManager } = khmerChessBoard;
        const boardStatusEventController = boardManager.boardStatusEventController;
        const move = playManager.currentMove;
        const ren = REN.fromString(move.renStr);
        ren.syncWithMove(move);
        if (move.attacker) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_ATTACK,
                actorPieceIndex: move.attacker,
                color: move.attacker.piece.color,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        const winColor = move.winColor;
        if (winColor) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_WIN,
                actorPieceIndex: move.attacker,
                color: winColor,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        const stuckColor = move.stuckColor;
        if (stuckColor) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_DRAW,
                color: stuckColor,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        if (move.isStartCounting) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_START_COUNTING,
                color: ren.countUp.color,
                countingFromNumber: ren.countUp.countingFromNumber,
                countingNumber: ren.countUp.countingNumber,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        if (ren.countUp.isCountingUp) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_COUNTING_UP,
                color: ren.countUp.color,
                countingFromNumber: ren.countUp.countingFromNumber,
                countingNumber: ren.countUp.countingNumber,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        if (ren.countUp.isCountingOut) {
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_COUNT_UP_OUT,
                color: ren.countUp.color,
                countingFromNumber: ren.countUp.countingFromNumber,
                countingNumber: ren.countUp.countingFromNumber,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
    }
}
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------- */