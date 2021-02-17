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
 *---------------------------------------------------------------------------- */

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
const config = require('./package.json');
const khmerChess = require('khmer-chess');
const { SoundManager } = require('./src/SoundManager');
const { BoardManager } = require('./src/BoardManager');
const constance = require('./src/constance');
const addCss = require('./src/addCss');
const addCssNote = require('./src/addCssNote');
const drawBoardAndGraveyard = require('./src/drawBoardAndGraveyard');
const { Options } = require('./src/Options');

const { KhmerChess } = khmerChess;

class KhmerChessBoard {
    static name = config.name;
    static version = config.version;
    options = new Options();
    container = null;
    graveyardManager = null;
    boardManager = null;
    soundManager = new SoundManager();
    khmerChess = new KhmerChess();
    constructor(options = {}) {
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.container = options.container;

        if (options.width < this.options.minWidth) {
            throw new Error(`Board width must more than ${this.options.minWidth} `);
        }
        if (options.width) {
            this.options.width = options.width;
        }
        if (options.width) {
            this.options.width = options.width;
        }

        this.graveyardManager = new GraveyardManager(this, this.options);
        this.boardManager = new BoardManager(this, this.options);
        this.render();
    }

    setFullScreen(isFullScreen) {
        this.options.isFullScreen = isFullScreen;
        const elements = document.querySelectorAll(`table.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.classList.remove(constance.POPUP_CLASS_NAME);
            element.style.top = 0;
            element.style.left = 0;
            element.style.transform = '';
            if (isFullScreen) {
                element.classList.add(constance.POPUP_CLASS_NAME);
                element.style.top = '50%';
                element.style.left = '50%';
                element.style.transform = `translate(-50%,-50%) scale(${this.options.scaleFit})`;
            }
        });
    }

    render() {
        this.addAllDomCss();
        drawBoardAndGraveyard({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
            container: this.container,
            boardManager: this.boardManager,
            graveyardManager: this.graveyardManager
        });
        this.boardManager.setNote();
        this.graveyardManager.setNote();
        this.applyPieces();
    }

    addAllDomCss() {
        addCss({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options
        });
        addCssNote({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options
        });
    }

    loadRen(renStr) {
        this.khmerChess.load(renStr);
        this.applyPieces();
    }

    applyPieces() {
        this.graveyardManager.receivePieces(this.khmerChess.graveyard());
        this.boardManager.receivePieces(this.khmerChess.board());
    }

    removeAllDomElements() {
        const elements = document.querySelectorAll(`table.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement.removeChild(element);
        });
        this.removeAllDomCss();
    }

    removeAllDomCss() {
        const elements = document.querySelectorAll(`style.${this.options.uniqueClassName} `);
        elements.forEach((element) => {
            element.parentElement.removeChild(element);
        });
    }

    destroy() {
        this.removeAllDomElements();
        this.container = null;
        this.graveyardManager = null;
        this.boardManager = null;
        this.soundManager = null;
        this.khmerChess = null;
    }
}

console.log(KhmerChess.name, KhmerChess.version);
console.log(KhmerChessBoard.name, KhmerChessBoard.version);

module.exports = {
    KhmerChessBoard,
    GraveyardManager,
    ...khmerChess,
    ...constance
};
