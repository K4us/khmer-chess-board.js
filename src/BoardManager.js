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
 *----------------------------------------------------------------------------*/

'use strict';

const boardHelper = require('khmer-chess/src/board-helper');
const { squareWidth } = require('./svg');

class BoardManager {
    squares = [];
    options = {};
    isUpsideDown = false;
    setOptions(options) {
        this.options = options;
    }
    put(i, squarePiece) {
        this.squares[i] = squarePiece;
    }
    get(index) {
        return this.squares[index];
    }
    getByIndexCode(code) {
        const index = boardHelper.indexCodeToPos(code);
        return this.get(index);
    }
    getByXY(x, y) {
        const index = boardHelper.nerdXyToPos(x, y);
        return this.get(index);
    }
    flip() {
        this.isUpsideDown = !this.isUpsideDown;
        const propArr = this.squares.map((s) => {
            return s.getProperties();
        });
        this.squares.forEach((s) => {
            return s.clear();
        });
        this.squares = this.squares.reverse();
        this.squares.forEach((s, i) => {
            return s.setProperties(propArr[i]);
        });
        this.clearNote();
        this.setNote();
    }
    enableSelect() {
        this.squares.forEach((s) => {
            return s.setOnClick(() => {
                s.isSelected() ? s.unselect() : s.select();
            });
        });
    }
    clearNote() {
        this.squares.forEach((s) => {
            s.clearNote();
        });
    }
    setNote() {
        const sqWidth = squareWidth(this.options.width);
        const fSize = 15 * this.options.width / 600;

        const hx = sqWidth / 2 - sqWidth / 10;
        const vy = sqWidth / 2 + sqWidth / 10;
        for (let i = 0; i < boardHelper.ROW_NUMBER; i++) {
            const x = i;
            const y = this.isUpsideDown ? boardHelper.ROW_NUMBER - 1 : 0;
            const square = this.getByXY(x, y);
            square.addNote([{
                x: hx,
                y: sqWidth,
                t: boardHelper.HORIZONTAL_NOTE_LETTERS[x]
            }]);
        }
        for (let j = 0; j < boardHelper.ROW_NUMBER; j++) {
            const x = this.isUpsideDown ? boardHelper.ROW_NUMBER - 1 : 0;
            const y = j;
            const square = this.getByXY(x, y);
            square.addNote([{
                x: 0,
                y: vy,
                t: boardHelper.VERTICAL_NOTE_LETTERS[y]
            }], sqWidth, fSize);
        }
        const x = this.isUpsideDown ? boardHelper.ROW_NUMBER - 1 : 0;
        const y = this.isUpsideDown ? boardHelper.ROW_NUMBER - 1 : 0;
        const square = this.getByXY(x, y);
        square.addNote([
            {
                x: hx,
                y: sqWidth,
                t: boardHelper.HORIZONTAL_NOTE_LETTERS[x]
            }, {
                x: 0,
                y: vy,
                t: boardHelper.VERTICAL_NOTE_LETTERS[y]
            }
        ], sqWidth, fSize);
    }
}

module.exports = { BoardManager };