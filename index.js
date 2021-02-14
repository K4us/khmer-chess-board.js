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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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

/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */
'use strict';

const { GraveyardManager } = require('./src/GraveyardManager');
const {
    addCss,
    drawBoard,
} = require('./src/index');
const config = require('./package.json');
const khmerChess = require('khmer-chess');
const { SoundManager } = require('./src/SoundManager');
const { BoardManager } = require('./src/BoardManager');
const constance = require('./src/constance');

const {
    BORDER_WIDTH,
    MIN_SQUARE_WIDTH,
    TD_GRAVEYARD_NUMBER,
} = constance;

const { KhmerChess, Piece, boardHelper } = khmerChess;

class KhmerChessBoard {
    static name = config.name;
    static version = config.version;
    options = {
        width: 500,
    };
    container = null;
    graveyardManager = new GraveyardManager();
    boardManager = new BoardManager();
    soundManager = new SoundManager();
    khmerChess = new KhmerChess();
    constructor(options = {}) {
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.container = options.container;

        const minWidth = (boardHelper.ROW_NUMBER - 1) * BORDER_WIDTH + boardHelper.ROW_NUMBER * MIN_SQUARE_WIDTH;
        if (options.width < minWidth) {
            throw new Error(`Board width must more than ${minWidth}`);
        }
        if (options.width) {
            this.options.width = options.width;
        }
        if (options.width) {
            this.options.width = options.width;
        }

        addCss.call(this);
        drawBoard.call(this);
        const squareWidth = this.squareWidth();
        const fSize = 15 * this.options.width / 600;
        this.boardManager.setNote(squareWidth, fSize);
        this.graveyardManager.setNote(squareWidth, fSize);
        this.renderKhmerChess();
    }

    loadRen(renStr) {
        this.khmerChess.load(renStr);
        this.renderKhmerChess();
    }

    squareWidth() {
        const squareWidth = (this.options.width - (boardHelper.ROW_NUMBER - 1) * BORDER_WIDTH) / boardHelper.ROW_NUMBER;
        return squareWidth;
    }
    renderKhmerChess() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const square = this.graveyardManager.get(i);
            square.removePiece();
        }
        this.khmerChess.graveyard().forEach((p, i) => {
            const square = this.graveyardManager.get(i);
            square.setPiece(new Piece(p.type, p.color));
        });
        this.khmerChess.board().forEach((arr, i) => {
            arr.forEach((p, j) => {
                const square = this.boardManager.get(i * boardHelper.ROW_NUMBER + j);
                square.removePiece();
                if (p) {
                    square.setPiece(new Piece(p.type, p.color));
                }
            });
        });
    }
}

console.log(KhmerChess.name, KhmerChess.version);
console.log(KhmerChessBoard.name, KhmerChessBoard.version);

module.exports = { KhmerChessBoard, GraveyardManager, ...khmerChess, ...constance };