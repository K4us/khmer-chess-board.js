import {
    EVENT_FLAG_ATTACK,
    EVENT_FLAG_WIN,
    EventHandler,
    ListenerType,
    EVENT_FLAG_DRAW,
    EVENT_FLAG_COUNT_UP_OUT,
    EVENT_FLAG_COUNTING_UP,
    EVENT_FLAG_START_COUNTING,
    REN,
    PieceIndex,
} from 'khmer-chess';
import KhmerChessBoard from '../KhmerChessBoard';
import { BoardStatusEvent } from './BoardStatusEvent';

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
        const move = playManager.currentMove;
        if (!move) {
            return;
        }
        const ren = REN.fromString(move.renStr);
        ren.syncWithMove(move);
        if (move.attacker && move.attacker.piece) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_ATTACK,
                actorPieceIndex: move.attacker,
                color: move.attacker.piece.color,
            });
            this.fireEvent(boardEvent);
        }
        const winColor = move.winColor;
        if (winColor) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_WIN,
                actorPieceIndex: move.attacker as PieceIndex,
                color: winColor,
            });
            this.fireEvent(boardEvent);
        }
        const stuckColor = move.stuckColor;
        if (stuckColor) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_DRAW,
                color: stuckColor,
            });
            this.fireEvent(boardEvent);
        }
        if (move.isStartCounting) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_START_COUNTING,
                color: ren.countUp.color as string,
                countingToNumber: ren.countUp.countingToNumber as number,
                countingNumber: ren.countUp.countingNumber as number,
            });
            this.fireEvent(boardEvent);
        }
        if (ren.countUp.isCountingUp) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_COUNTING_UP,
                color: ren.countUp.color as string,
                countingToNumber: ren.countUp.countingToNumber as number,
                countingNumber: ren.countUp.countingNumber as number,
            });
            this.fireEvent(boardEvent);
        }
        if (ren.countUp.isCountingOut) {
            const boardEvent = new BoardStatusEvent({
                khmerChessBoard,
                flag: EVENT_FLAG_COUNT_UP_OUT,
                color: ren.countUp.color as string,
                countingToNumber: ren.countUp.countingToNumber as number,
                countingNumber: ren.countUp.countingToNumber as number,
            });
            this.fireEvent(boardEvent);
        }
    }
}
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>, K4us Net <k4us.net@gmail.com>
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