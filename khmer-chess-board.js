"use strict";
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

const COLUMN_NUMBER = 8;
const BORDER_WIDTH = 1
const MIN_SQUARE_WIDTH = 5
const TD_GRAVEYARD_NUMBER = 30;
const HORIZONTAL_CODE_LETTERS = 'abcdefgh';

const COLORS = {
    PIECE_COLOR_WHITE: "w",
    PIECE_COLOR_BLACK: "b",
};
const TYPES = {
    PIECE_TYPE_TOUK: "b", // Boat
    PIECE_TYPE_SES: "h", // Horse
    PIECE_TYPE_KOL: "g", // General
    PIECE_TYPE_SDECH: "k", // King
    PIECE_TYPE_NEANG: "q", // Queen
    PIECE_TYPE_TREY: "f", // Fish
    PIECE_TYPE_BORK: "t", // Transform fish
    EMPTY_PIECE: ".",
};

class Piece {
    type = TYPES.PIECE_TYPE_TREY;
    color = COLORS.PIECE_COLOR_WHITE;
    get pCode() {
        if (this.color == COLORS.PIECE_COLOR_WHITE) {
            return this.type.toUpperCase();
        }
        return this.type;
    }
    target = document.createElement('div');
    constructor(type, color, target) {
        this.type = type;
        this.color = color;
        this.target = target;
    }
}
class SquarePiece {
    x = 0;
    y = 0;
    type = TYPES.PIECE_TYPE_TREY;
    color = COLORS.PIECE_COLOR_WHITE;
    get h() {
        if (this.isGraveyard) {
            return `${this.x}x`;
        }
        return HORIZONTAL_CODE_LETTERS[this.x];
    }
    get v() {
        return this.y + 1;
    }
    get index() {
        return this.y * COLUMN_NUMBER + this.x;
    }
    get indexCode() {
        return `${this.h}${this.v}`;
    }
    isGraveyard = false;
    container = document.createElement('td');
    piece = null;
    constructor(x, y, container, piece, isGraveyard) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.piece = piece;
        this.isGraveyard = isGraveyard;
    }
}
class Graveyard {
    squares = [];
    push(squarePiece) {
        this.squares.push(squarePiece);
    }
    get(index) {
        return this.squares[index];
    }
}

class KhmerChessBoard {
    options = {
        width: 500,
        container: null
    };
    squares = [];
    squaresIndex = {};
    graveyard = new Graveyard();
    constructor(options = {}) {
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.options.container = options.container;

        const minWidth = (COLUMN_NUMBER - 1) * BORDER_WIDTH + COLUMN_NUMBER * MIN_SQUARE_WIDTH;
        if (options.width < minWidth) {
            throw new Error(`Board width must more than ${minWidth}`);
        }
        if (options.width) {
            this.options.width = options.width;
        }

        this.drawBoard();
    }
    drawBoard() {
        const squareWidth = this._squareWidth();

        const createTable = (parent = this.options.container) => {
            const table = document.createElement('table');
            table.style.tableLayout = 'fixed';
            table.style.borderCollapse = 'collapse';
            table.style.borderSpacing = 0;
            table.style.width = this.options.width;
            table.style.height = this.options.width;
            table.style.textAlign = 'center';
            table.style.border = 0;
            table.style.padding = 0;
            table.style.margin = 'auto';
            table.style.backgroundColor = 'white';
            // table.style.fontFamily = 'Arial, Helvetica, sans-serif';
            table.classList.add('khmer-chess-board');
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
            tr.style.width = this.options.width;
            tr.style.height = squareWidth;
            parent.appendChild(tr);
            return tr;
        }
        const createTd = (parent) => {
            const td = document.createElement('td');
            td.style.userSelect = 'none';
            td.style.backgroundColor = '#d4d4d4';
            td.style.border = '1px solid white';
            td.style.padding = 0;
            td.style.margin = 0;
            td.style.maxWidth = squareWidth;
            td.style.maxHeight = squareWidth;
            parent.appendChild(td);
            return td;
        }
        const createDiv = (parent) => {
            const div = document.createElement('div');
            div.style.width = squareWidth;
            div.style.height = squareWidth;
            div.style.fontSize = this.options.width / 6;
            div.style.float = 'left';
            div.innerText = '*';
            parent.appendChild(div);
            return
        }

        const table = createTable();
        const tbody = createTbody(table);

        for (let i = 0; i < COLUMN_NUMBER; i++) {
            const tr = createTr(tbody);
            for (let j = 0; j < COLUMN_NUMBER; j++) {
                const td = createTd(tr);
                td.style.cursor = 'pointer';
                const div = createDiv(td);
                const piece = new Piece(TYPES.PIECE_TYPE_TREY, COLORS.PIECE_COLOR_WHITE, div);
                const squarePiece = new SquarePiece(j, COLUMN_NUMBER - i - 1, td, piece);
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

        for (let i = 0; i < 30; i++) {
            const tdGraveyard = createTd(trGraveyard);
            const squarePiece = new SquarePiece(i, 0, tdGraveyard, null, true);
            this.graveyard.push(squarePiece);
        }

        this._addNote();
    };
    _addNote() {
        const squareWidth = this._squareWidth();
        const fSize = 15 * this.options.width / 600;

        const addBackground = (target, tObjects = []) => {
            let bgImg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${squareWidth}px' width='${squareWidth}px'>`;
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
        for (let i = 1; i < COLUMN_NUMBER; i++) {
            const c = HORIZONTAL_CODE_LETTERS[i];
            const square = this.squaresIndex[`${c}1`];
            addBackground(square.container, [{
                x: squareWidth / 2 - squareWidth / 10,
                y: squareWidth,
                t: c
            }]);
        }
        for (let i = 1; i < COLUMN_NUMBER; i++) {
            const square = this.squaresIndex[`a${i + 1}`];
            addBackground(square.container, [{
                x: 0,
                y: squareWidth / 2 + squareWidth / 10,
                t: i + 1
            }]);
        }
    }
    _squareWidth() {
        const squareWidth = (this.options.width - (COLUMN_NUMBER - 1) * BORDER_WIDTH) / COLUMN_NUMBER;
        return squareWidth;
    }
}