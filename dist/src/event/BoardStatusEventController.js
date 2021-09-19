"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var BoardStatusEvent_1 = require("./BoardStatusEvent");
var BoardStatusEventController = /** @class */ (function (_super) {
    __extends(BoardStatusEventController, _super);
    function BoardStatusEventController() {
        return _super.call(this, {
            events: {
                EVENT: BoardStatusEventController.STATUS_EVENT,
            },
        }) || this;
    }
    BoardStatusEventController.prototype.fireEvent = function (boardEvent) {
        this._addPropEvent(BoardStatusEventController.STATUS_EVENT, boardEvent);
    };
    BoardStatusEventController.prototype.addBoardStatusEventListener = function (listener) {
        this._addOnEventListener(BoardStatusEventController.STATUS_EVENT, listener);
    };
    BoardStatusEventController.prototype.removeBoardStatusEventListener = function (listener) {
        this._removeOnEventListener(BoardStatusEventController.STATUS_EVENT, listener);
    };
    BoardStatusEventController.prototype.getBoardEvents = function (khmerChessBoard) {
        var playManager = khmerChessBoard.playManager;
        var move = playManager.currentMove;
        var events = [];
        if (!move) {
            return events;
        }
        var ren = khmer_chess_1.REN.fromString(move.renStr);
        ren.syncWithMove(move);
        if (move.attacker && move.attacker.piece) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_ATTACK,
                actorPieceIndex: move.attacker,
                color: move.attacker.piece.color,
            });
            events.push(boardEvent);
        }
        var winColor = move.winColor;
        if (winColor) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_WIN,
                actorPieceIndex: move.attacker,
                color: winColor,
            });
            events.push(boardEvent);
        }
        var stuckColor = move.stuckColor;
        if (stuckColor) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_DRAW,
                color: stuckColor,
            });
            events.push(boardEvent);
        }
        if (move.isStartCounting) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_START_COUNTING,
                color: ren.countUp.color,
                countingToNumber: ren.countUp.countingToNumber,
                countingNumber: ren.countUp.countingNumber,
            });
            events.push(boardEvent);
        }
        if (ren.countUp.isCountingUp) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_COUNTING_UP,
                color: ren.countUp.color,
                countingToNumber: ren.countUp.countingToNumber,
                countingNumber: ren.countUp.countingNumber,
            });
            events.push(boardEvent);
        }
        if (ren.countUp.isCountingOut) {
            var boardEvent = new BoardStatusEvent_1.BoardStatusEvent({
                khmerChessBoard: khmerChessBoard,
                flag: khmer_chess_1.EVENT_FLAG_COUNT_UP_OUT,
                color: ren.countUp.color,
                countingToNumber: ren.countUp.countingToNumber,
                countingNumber: ren.countUp.countingToNumber,
            });
            events.push(boardEvent);
        }
        return events;
    };
    BoardStatusEventController.prototype.checkBoardEvent = function (khmerChessBoard) {
        var _this = this;
        var events = this.getBoardEvents(khmerChessBoard);
        events.forEach(function (event) {
            _this.fireEvent(event);
        });
    };
    BoardStatusEventController.STATUS_EVENT = 'status-event';
    return BoardStatusEventController;
}(khmer_chess_1.EventHandler));
exports.default = BoardStatusEventController;
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
//# sourceMappingURL=BoardStatusEventController.js.map