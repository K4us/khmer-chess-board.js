import {
    EVENT_FLAG_ATTACK,
    EVENT_FLAG_WIN,
    PieceIndex,
    PIECE_COLOR_WHITE,
    EVENT_FLAG_DRAW,
    EVENT_FLAG_COUNT_UP_OUT,
    EVENT_FLAG_COUNTING_UP,
    EVENT_FLAG_START_COUNTING,
    PIECE_COLOR_BLACK,
    Piece,
} from 'khmer-chess';
import CellManager from '../CellManager';
import KhmerChessBoard from '../KhmerChessBoard';

export type Option = {
    khmerChessBoard: KhmerChessBoard;
    flag: string;
    actorPieceIndex?: PieceIndex;
    color: string;
    countingToNumber?: number;
    countingNumber?: number;
};
export class BoardStatusEvent {
    khmerChessBoard: KhmerChessBoard;
    flag: string;
    message = '';
    actorPieceIndex: PieceIndex | null = null;
    isWhite = false;
    isAttacking = false;

    isWin = false;

    isDraw = false;
    isCannotMove = false;

    isStartCounting = false;
    isCountingUp = false;
    isCountUpOut = false;

    countingToNumber: number | null = null
    countingNumber: number | null = null

    constructor({ khmerChessBoard, countingToNumber, countingNumber,
        flag, actorPieceIndex, color }: Option) {
        this.khmerChessBoard = khmerChessBoard;
        this.flag = flag;
        const isWhite = color === PIECE_COLOR_WHITE;
        this.isWhite = isWhite;
        this.actorPieceIndex = actorPieceIndex || null;
        this.isWin = flag === EVENT_FLAG_WIN;
        this.isAttacking = flag === EVENT_FLAG_ATTACK;
        this.isStartCounting = flag === EVENT_FLAG_START_COUNTING;
        if (this.isStartCounting) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isCountingUp = flag === EVENT_FLAG_COUNTING_UP;
        if (this.isCountingUp) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isCountUpOut = flag === EVENT_FLAG_COUNT_UP_OUT;
        if (this.isCountUpOut) {
            this.applyCount(countingToNumber || null, countingNumber || null);
        }
        this.isDraw = this.isCountUpOut || flag === EVENT_FLAG_DRAW;
        if (this.isDraw && !this.isCountUpOut) {
            this.isCannotMove = true;
        }
        this.message = this.getMessage();
    }
    applyCount(countingToNumber: number | null, countingNumber: number | null) {
        this.countingToNumber = countingToNumber;
        this.countingNumber = countingNumber;
    }
    getMessage() {
        const isEnglish = this.khmerChessBoard.options.isEnglish;
        const color = this.isWhite ? PIECE_COLOR_WHITE : PIECE_COLOR_BLACK;
        const boardManager = this.khmerChessBoard.boardManager;
        const tran = (arr: [string, string]) => {
            return arr[isEnglish ? 0 : 1];
        };
        const pTitle = (root: PieceIndex | CellManager | null | undefined) => {
            if (!root || !root.piece) {
                return tran(['unknown', 'មិន​ស្គាល់']);
            }
            return isEnglish ? root.piece.titleEnglish : root.piece.title;
        };

        if (this.isAttacking) {
            const piece = this.actorPieceIndex?.piece;
            const king = piece && boardManager.getKing(piece.colorOpponent);
            return `${pTitle(this.actorPieceIndex)} ${tran(['is attacking', 'អុក'])} ${pTitle(king)}`;
        }
        if (this.isWin) {
            const king = boardManager.getKing(color);
            return `${pTitle(king)} ${tran(['wins', 'ឈ្នះ'])}`;
        }
        if (this.isDraw) {
            const king = boardManager.getKing(color);
            if (this.isCannotMove) {
                return `${pTitle(king)} ${tran(['stuck', 'អាប់'])}`;
            } else if (this.isCountUpOut) {
                return `${pTitle(king)} ${isEnglish ? 'count all' : 'រាប់​អស់'}`;
            } else {
                return `${tran(['draw', 'ស្មើ'])}`;
            }
        }
        if (this.isCannotMove) {
            const king = boardManager.getKing(color);
            return `${pTitle(king)} ${tran(['stuck', 'អាប់'])}`;
        }
        if (this.isStartCounting) {
            const king = boardManager.getKing(color);
            return `${pTitle(king)} ${tran(['start counting​ from', 'ចាប់​ផ្តើម​រាប់​ពី'])} ${this.countingNumber} ${tran(['to', 'ទៅ'])} ${this.countingToNumber}`;
        }
        if (this.isCountingUp) {
            const king = boardManager.getKing(color);
            return `${pTitle(king)} ${tran(['counting​ to', 'រាប់បាន'])} ${this.countingNumber} ${tran(['of', 'នៃ'])} ${this.countingToNumber}`;
        }
        if (this.isCountUpOut) {
            const king = boardManager.getKing(color);
            return `${pTitle(king)} ${isEnglish ? 'count all' : 'រាប់​អស់'}`;
        }
        return this.flag;
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