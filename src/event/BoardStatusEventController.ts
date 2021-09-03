import {
    EVENT_FLAG_ATTACK,
    EVENT_FLAG_WIN,
    PieceIndex,
    EventHandler,
    ListenerType,
    PIECE_COLOR_WHITE,
    EVENT_FLAG_DRAW,
    EVENT_FLAG_COUNT_DOWN_OUT,
    EVENT_FLAG_COUNTING_DOWN,
    EVENT_FLAG_START_COUNTING
} from 'khmer-chess';
import KhmerChessBoard from '../KhmerChessBoard';
export type Option = {
    flag: string;
    actorPieceIndex?: PieceIndex;
    color: string;
    countingDownFromNumber?: number;
    countingDownNumber?: number;
};
export class BoardStatusEvent {
    flag: string;
    actorPieceIndex: PieceIndex;
    isAttack = false;
    isWhiteAttacking = false;
    isBlackAttacking = false;
    isWin = false;
    isWhiteWin = false;
    isBlackWin = false;
    isDraw = false;
    isWhiteCannotMove = false;
    isBlackCannotMove = false;
    isCountDownOut = false;
    isWhiteCountDownOut = false;
    isBlackCountDownOut = false;
    isCountingDown = false;
    countingDownFrom: number | null = null
    whiteCountingDownNumber: number | null = null
    blackCountingDownNumber: number | null = null
    constructor({ countingDownFromNumber, countingDownNumber,
        flag, actorPieceIndex, color }: Option) {

        this.flag = flag;
        const isWhite = color === PIECE_COLOR_WHITE;
        this.actorPieceIndex = actorPieceIndex || null;
        this.isWin = flag === EVENT_FLAG_WIN;
        this.isAttack = this.isWin || flag === EVENT_FLAG_ATTACK;
        if (this.isAttack) {
            this.isWhiteAttacking = isWhite;
            this.isBlackAttacking = !isWhite;
        }
        if (this.isWin) {
            this.isWhiteWin = isWhite;
            this.isBlackWin = !isWhite;
        }
        this.isCountDownOut = flag === EVENT_FLAG_COUNT_DOWN_OUT;
        if (this.isCountDownOut) {
            this.isWhiteCountDownOut = isWhite;
            this.isBlackCountDownOut = !isWhite;
        }
        this.isDraw = this.isCountDownOut || flag === EVENT_FLAG_DRAW;
        if (this.isDraw && !this.isCountDownOut) {
            this.isWhiteCannotMove = isWhite;
            this.isBlackCannotMove = !isWhite;
        }
        this.isCountingDown = flag === EVENT_FLAG_COUNTING_DOWN;
        if (this.isCountingDown) {
            this.countingDownFrom = countingDownFromNumber;
            if (isWhite) {
                this.whiteCountingDownNumber = countingDownNumber;
            } else {
                this.blackCountingDownNumber = countingDownNumber;
            }
        }
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
        const { khmerChess, boardManager, playManager } = khmerChessBoard;
        const boardStatusEventController = boardManager.boardStatusEventController;
        const move = playManager.currentMove;
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
        const startCountingColor = move.boardStatus.startCountingColor;
        if (startCountingColor) {
            const isWite = startCountingColor === PIECE_COLOR_WHITE;
            const countdown = khmerChess.kpgn.ren.countdown;
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_START_COUNTING,
                color: startCountingColor,
                countingDownFromNumber: countdown.countingDownFromNumber,
                countingDownNumber: countdown.countingDownFromNumber,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        const countingDownColor = move.boardStatus.countingDownColor;
        if (countingDownColor) {
            const isWite = countingDownColor === PIECE_COLOR_WHITE;
            const countdown = khmerChess.kpgn.ren.countdown;
            const countingDownNumber = isWite ? countdown.whiteCountingDownNumber : countdown.blackCountingDownNumber;
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_COUNTING_DOWN,
                color: countingDownColor,
                countingDownFromNumber: countdown.countingDownFromNumber,
                countingDownNumber,
            });
            boardStatusEventController.fireEvent(boardEvent);
        }
        const drawCountColor = move.boardStatus.drawCountColor;
        if (drawCountColor) {
            const countdown = khmerChess.kpgn.ren.countdown;
            const boardEvent = new BoardStatusEvent({
                flag: EVENT_FLAG_COUNT_DOWN_OUT,
                color: drawCountColor,
                countingDownFromNumber: countdown.countingDownFromNumber,
                countingDownNumber: 0,
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