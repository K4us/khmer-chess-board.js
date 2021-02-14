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

"use strict";

const { boardHelper } = require('khmer-chess');
const { SquarePiece } = require('./SquarePiece');
const { PIECES_SVG } = require('./svg');
const { AUDIO } = require('./audio');

const BORDER_WIDTH = 1
const MIN_SQUARE_WIDTH = 5
const TD_GRAVEYARD_NUMBER = 30;
const TABLE_CLASS = 'khmer-chess-board';

function addCss() {
    const width = this.options.width;
    const squareWidth = this.squareWidth();
    const pieceFontSize = width / 12;

    let css = `
      table.${TABLE_CLASS}  {
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 0px;
        width: ${width}px;
        text-align: center;
        border: 0px;
        padding: 0px;
        margin: auto;
        background-color: white;
      }
      table.${TABLE_CLASS} tr {
        width: ${width}px;
        height: ${squareWidth}px;
      }
      table.${TABLE_CLASS} td {
        user-select: none;
        background-color: #f4d1a6;
        border: 1px solid white;
        padding: 0px;
        margin: 0px;
        max-width: ${squareWidth}px;
        max-height: ${squareWidth}px;
      }
      table.${TABLE_CLASS} td, table.${TABLE_CLASS} td::before {
        font-size: ${pieceFontSize}px;
      }
      table.${TABLE_CLASS} td.piece::before {
        width: ${squareWidth}px;
        height: ${squareWidth}px;
        background-size: ${squareWidth}px ${squareWidth}px;
        display: block;
        content: ' ';
      }
    `;
    boardHelper.getColorArray().forEach((color) => {
        boardHelper.getPieceCharArray().forEach((type) => {
            css += `
            table.${TABLE_CLASS} td.piece.type-${type}.color-${color}::before {
                background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(PIECES_SVG[color + type])}');
            }
              `;
        });
    });

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

function drawBoard() {
    const squareWidth = this.squareWidth();

    const createTable = (parent = this.container) => {
        const table = document.createElement('table');
        table.classList.add(TABLE_CLASS);
        parent.appendChild(table);
        return table;
    }
    const createTbody = (parent) => {
        const tbody = document.createElement('tbody');
        parent.appendChild(tbody);
        return tbody;
    }
    const createTr = (parent) => {
        const tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
    }
    const createTd = (parent) => {
        const td = document.createElement('td');
        parent.appendChild(td);
        return td;
    }

    const table = createTable();
    const tbody = createTbody(table);

    for (let i = 0; i < boardHelper.ROW_NUMBER; i++) {
        const tr = createTr(tbody);
        for (let j = 0; j < boardHelper.ROW_NUMBER; j++) {
            const td = createTd(tr);
            td.style.cursor = 'pointer';
            const squarePiece = new SquarePiece(j, boardHelper.ROW_NUMBER - i - 1, td, null);
            this.squaresIndex[squarePiece.indexCode] = squarePiece;
        }
    }
    Object.keys(this.squaresIndex).forEach((key) => {
        this.squares[this.squaresIndex[key].index] = this.squaresIndex[key];
    });

    const graveyardContainerHeight = squareWidth + 10 * BORDER_WIDTH;
    table.style.height += graveyardContainerHeight;
    const trGraveyardContainer = createTr(tbody);
    trGraveyardContainer.style.height = graveyardContainerHeight;
    const tdGraveyardContainer = createTd(trGraveyardContainer);
    tdGraveyardContainer.addEventListener('mousewheel', function (e) {
        this.scrollLeft -= (e.wheelDelta);
        e.preventDefault();
    }, false);
    tdGraveyardContainer.style.width = this.options.width;
    tdGraveyardContainer.style.height = graveyardContainerHeight;
    tdGraveyardContainer.style.overflowX = 'scroll';
    tdGraveyardContainer.style.overflowY = 'hidden';
    tdGraveyardContainer.colSpan = 8;
    tdGraveyardContainer.style.padding = 8 * BORDER_WIDTH * this.options.width / 600;
    tdGraveyardContainer.style.boxShadow = `inset 0 0 ${this.options.width / 60}px #000000`;
    const tableGraveyard = createTable(tdGraveyardContainer);
    const graveyardWidth = BORDER_WIDTH * (TD_GRAVEYARD_NUMBER - 1) + squareWidth * TD_GRAVEYARD_NUMBER;
    tableGraveyard.style.width = graveyardWidth;
    tableGraveyard.style.height = squareWidth;
    const tbodyGraveyard = createTbody(tableGraveyard);
    const trGraveyard = createTr(tbodyGraveyard);
    trGraveyard.style.width = graveyardWidth;

    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const tdGraveyard = createTd(trGraveyard);
        const squarePiece = new SquarePiece(i, 0, tdGraveyard, null, true);
        this.graveyard.push(squarePiece);
    }

    const fSize = 15 * this.options.width / 600;

    const addBackground = (target, tObjects = []) => {
        let bgImg = `url("data:image/svg+xml;utf8,`;
        bgImg += `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${squareWidth}px' width='${squareWidth}px'>`;

        tObjects.forEach((obj) => {
            bgImg += `<text x='${obj.x}' y='${obj.y}' `;
            bgImg += `fill='white' font-size='${fSize}'>${obj.t}</text>`;
        })

        bgImg += `</svg>")`;
        target.style.backgroundImage = bgImg;
        target.style.backgroundRepeat = 'no-repeat';
    }

    const square = this.squaresIndex['a1'];
    addBackground(square.container, [
        {
            x: squareWidth / 2 - squareWidth / 10,
            y: squareWidth,
            t: 'a'
        }, {
            x: 0,
            y: squareWidth / 2 + squareWidth / 10,
            t: '1'
        }
    ]);
    square.container.style.backgroundRepeat = 'no-repeat';
    for (let i = 1; i < boardHelper.ROW_NUMBER; i++) {
        const c = boardHelper.HORIZONTAL_CODE_LETTERS[i];
        const square = this.squaresIndex[`${c}1`];
        addBackground(square.container, [{
            x: squareWidth / 2 - squareWidth / 10,
            y: squareWidth,
            t: c
        }]);
    }
    for (let i = 1; i < boardHelper.ROW_NUMBER; i++) {
        const square = this.squaresIndex[`a${i + 1}`];
        addBackground(square.container, [{
            x: 0,
            y: squareWidth / 2 + squareWidth / 10,
            t: i + 1
        }]);
    }

    for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
        const square = this.graveyard.get(i);
        addBackground(square.container, [{
            x: squareWidth / 2 - squareWidth / 10,
            y: squareWidth,
            t: i + 1
        }]);
    }
}

class SoundManager {
    move = null;
    capture = null;
    check = null;
    enable = false;
    disable() {
        this.enable = false;
        if (this.move) {
            this.move.parentElement.removeChild(this.move);
            this.move = null;
        }
        if (this.capture) {
            this.capture.parentElement.removeChild(this.capture);
            this.capture = null;
        }
        if (this.check) {
            this.check.parentElement.removeChild(this.check);
            this.check = null;
        }
    }
    enable() {
        this.enable = true;
        this.move = this._addSound(AUDIO.move);
        this.capture = this._addSound(AUDIO.capture);
        this.check = this._addSound(AUDIO.check);
    }
    _addSound(src) {
        const sound = document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        return sound;
    }
}

module.exports = {
    addCss,
    drawBoard,
    BORDER_WIDTH,
    MIN_SQUARE_WIDTH,
    TD_GRAVEYARD_NUMBER,
    TABLE_CLASS
};