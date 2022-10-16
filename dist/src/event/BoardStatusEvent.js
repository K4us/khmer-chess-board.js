"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusEvent = void 0;
/*
 * Copyright (c) 2021-2022, K4us
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
 **/
var khmer_chess_1 = require("khmer-chess");
var BoardStatusEvent = /** @class */ (function () {
    function BoardStatusEvent(_a) {
        var khmerChessBoard = _a.khmerChessBoard, countingToNumber = _a.countingToNumber, countingNumber = _a.countingNumber, flag = _a.flag, actorPieceIndex = _a.actorPieceIndex, color = _a.color, move = _a.move;
        this.isMoving = false;
        this.move = null;
        this.message = '';
        this.actorPieceIndex = null;
        this.isWhite = false;
        this.isAttacking = false;
        this.color = khmer_chess_1.PIECE_COLOR_WHITE;
        this.isWin = false;
        this.isDraw = false;
        this.isCannotMove = false;
        this.isStartCounting = false;
        this.isCountingUp = false;
        this.isCountUpOut = false;
        this.countingToNumber = null;
        this.countingNumber = null;
        this.color = color;
        this.flag = flag;
        var isWhite = !!(color ? color === khmer_chess_1.PIECE_COLOR_WHITE : move === null || move === void 0 ? void 0 : move.piece.color);
        this.isWhite = isWhite;
        this.isMoving = flag === khmer_chess_1.EVENT_FLAG_MOVING;
        this.move = move || null;
        this.actorPieceIndex = actorPieceIndex || null;
        this.isWin = flag === khmer_chess_1.EVENT_FLAG_WIN;
        this.isAttacking = flag === khmer_chess_1.EVENT_FLAG_ATTACK;
        this.isStartCounting = flag === khmer_chess_1.EVENT_FLAG_START_COUNTING;
        if (this.isStartCounting) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isCountingUp = flag === khmer_chess_1.EVENT_FLAG_COUNTING_UP;
        if (this.isCountingUp) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isCountUpOut = flag === khmer_chess_1.EVENT_FLAG_COUNT_UP_OUT;
        if (this.isCountUpOut) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isDraw = this.isCountUpOut || flag === khmer_chess_1.EVENT_FLAG_DRAW;
        if (this.isDraw && !this.isCountUpOut) {
            this.isCannotMove = true;
        }
        this.message = this._getMessage(khmerChessBoard);
    }
    BoardStatusEvent.prototype.applyCount = function (countingToNumber, countingNumber) {
        this.countingToNumber = countingToNumber;
        this.countingNumber = countingNumber;
    };
    BoardStatusEvent.prototype._getMessage = function (khmerChessBoard) {
        var _a;
        var isEnglish = khmerChessBoard.options.isEnglish;
        var color = this.isWhite ? khmer_chess_1.PIECE_COLOR_WHITE : khmer_chess_1.PIECE_COLOR_BLACK;
        var boardManager = khmerChessBoard.boardManager;
        var tran = function (arr) {
            return arr[isEnglish ? 0 : 1];
        };
        var pTitle = function (root) {
            if (!root || !root.piece) {
                return tran(['unknown', 'មិន​ស្គាល់']);
            }
            return isEnglish ? root.piece.titleEnglish : root.piece.title;
        };
        if (this.isMoving && this.move) {
            return this.move.getMessage();
        }
        if (this.isAttacking) {
            var piece = (_a = this.actorPieceIndex) === null || _a === void 0 ? void 0 : _a.piece;
            var king = piece && boardManager.getKing(piece.colorOpponent);
            return pTitle(this.actorPieceIndex) + " " + tran(['is attacking', 'អុក']) + " " + pTitle(king);
        }
        if (this.isWin) {
            var king = boardManager.getKing(color);
            return pTitle(king) + " " + tran(['wins', 'ឈ្នះ']);
        }
        if (this.isDraw) {
            var king = boardManager.getKing(color);
            if (this.isCannotMove) {
                return pTitle(king) + " " + tran(['stuck', 'អាប់']);
            }
            else if (this.isCountUpOut) {
                return pTitle(king) + " " + (isEnglish ? 'count all' : 'រាប់​អស់');
            }
            else {
                return "" + tran(['draw', 'ស្មើ']);
            }
        }
        if (this.isCannotMove) {
            var king = boardManager.getKing(color);
            return pTitle(king) + " " + tran(['stuck', 'អាប់']);
        }
        if (this.isStartCounting) {
            var king = boardManager.getKing(color);
            return pTitle(king) + " " + tran(['start counting​ from', 'ចាប់​ផ្តើម​រាប់​ពី']) + " " + this.countingNumber + " " + tran(['to', 'ទៅ']) + " " + this.countingToNumber;
        }
        if (this.isCountingUp) {
            var king = boardManager.getKing(color);
            return pTitle(king) + " " + tran(['counting​ to', 'រាប់បាន']) + " " + this.countingNumber + " " + tran(['of', 'នៃ']) + " " + this.countingToNumber;
        }
        if (this.isCountUpOut) {
            var king = boardManager.getKing(color);
            return pTitle(king) + " " + (isEnglish ? 'count all' : 'រាប់​អស់');
        }
        return this.flag;
    };
    return BoardStatusEvent;
}());
exports.BoardStatusEvent = BoardStatusEvent;
//# sourceMappingURL=BoardStatusEvent.js.map