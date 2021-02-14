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
"use strict";

const { KhmerChess, Piece, boardHelper } = require('khmer-chess');
const { SquarePiece } = require('./src/SquarePiece');
const { Graveyard } = require('./src/Graveyard');
const { PIECES_SVG, COLORS, TYPES } = require('./src/index');

const BORDER_WIDTH = 1
const MIN_SQUARE_WIDTH = 5
const TD_GRAVEYARD_NUMBER = 30;
const TABLE_CLASS = 'khmer-chess-board';

function addCss(width, squareWidth) {
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
    Object.values(COLORS).forEach((color) => {
        Object.values(TYPES).forEach((type) => {
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

    const createTable = (parent = this.options.container) => {
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
            const piece = new Piece(TYPES.PIECE_TYPE_TREY, COLORS.PIECE_COLOR_WHITE);
            const squarePiece = new SquarePiece(j, boardHelper.ROW_NUMBER - i - 1, td, piece);
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

class KhmerChessBoard {
    BORDER_WIDTH;
    MIN_SQUARE_WIDTH;
    TD_GRAVEYARD_NUMBER;
    TABLE_CLASS;
    options = {
        width: 500,
        container: null
    };
    squares = [];
    squaresIndex = {};
    graveyard = new Graveyard();
    khmerChess = new KhmerChess();
    constructor(options = {}) {
        this.khmerChess.load('bhgqkghb/8/1ff5/8/8/FFFFFFFF/8/BHGKQGHB w ---- -- -.- ffffff');
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.options.container = options.container;

        const minWidth = (boardHelper.ROW_NUMBER - 1) * BORDER_WIDTH + boardHelper.ROW_NUMBER * MIN_SQUARE_WIDTH;
        if (options.width < minWidth) {
            throw new Error(`Board width must more than ${minWidth}`);
        }
        if (options.width) {
            this.options.width = options.width;
        }

        addCss(this.options.width, this.squareWidth());
        drawBoard.call(this);
        this.renderKhmerChess();
    }

    squareWidth() {
        const squareWidth = (this.options.width - (boardHelper.ROW_NUMBER - 1) * BORDER_WIDTH) / boardHelper.ROW_NUMBER;
        return squareWidth;
    }
    renderKhmerChess() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const square = this.graveyard.get(i);
            square.removePiece();
        }
        this.khmerChess.graveyard().forEach((p, i) => {
            const square = this.graveyard.get(i);
            square.setPiece(new Piece(p.type, p.color));
        });
        this.khmerChess.board().forEach((arr, i) => {
            arr.forEach((p, j) => {
                const square = this.squares[i * boardHelper.ROW_NUMBER + j];
                square.removePiece();
                if (p) {
                    square.setPiece(new Piece(p.type, p.color));
                }
            });
        });
    }
}

module.exports = { KhmerChessBoard };