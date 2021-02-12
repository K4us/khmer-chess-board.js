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
const COLUMN_TEXT = 'abcdefgh';

class KhmerChessBoard {
    options = {
        width: 500,
        container: null
    };
    squares = [];
    graveyardSquares = [];
    squaresIndex = {};
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
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.borderSpacing = 0;
        table.style.width = this.options.width;
        const squareWidth = (this.options.width - (COLUMN_NUMBER - 1) * BORDER_WIDTH) / COLUMN_NUMBER;
        table.style.height = this.options.width + 2 * BORDER_WIDTH + squareWidth;
        table.style.textAlign = 'center';
        table.style.border = 0;
        table.style.padding = 0;
        table.style.margin = 0;
        table.style.backgroundColor = 'white';

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.options.container.appendChild(table);

        for (let i = 0; i < COLUMN_NUMBER; i++) {
            const tr = document.createElement('tr');
            tr.style.height = squareWidth;
            tbody.appendChild(tr);
            for (let j = 0; j < COLUMN_NUMBER; j++) {
                const td = document.createElement('td');
                td.style.userSelect = 'none';
                td.style.backgroundColor = '#d4d4d4';
                td.style.border = '1px solid white';
                td.style.padding = 0;
                td.style.margin = 0;
                td.style.maxWidth = squareWidth;
                td.style.maxHeight = squareWidth;
                tr.appendChild(td);
                const div = document.createElement('div');
                div.style.width = squareWidth;
                div.style.height = squareWidth;
                div.style.fontSize = 70;
                div.classList.add('trey');
                td.appendChild(div);
                this.squaresIndex[`${COLUMN_TEXT[j]}${COLUMN_NUMBER - i}`] = td;
            }
        }
        Object.keys(this.squaresIndex).forEach((key) => {
            const arr = key.split('');
            const i = (Number(arr[1]) - 1) * COLUMN_NUMBER + COLUMN_TEXT.indexOf(arr[0]);
            this.squares[i] = this.squaresIndex[key];
        });
        const tr = document.createElement('tr');
        tr.style.height = squareWidth;
        tbody.appendChild(tr);
        const td = document.createElement('td');
        td.style.maxWidth = this.options.width;
        td.style.maxHeight = squareWidth;
        td.style.padding = 0;
        td.style.margin = 0;
        td.style.border = 0;
        td.style.overflowX = 'scroll';
        td.style.overflowY = 'hidden';
        td.colSpan = 8;
        tr.appendChild(td);
        const tableGraveyard = document.createElement('table');
        tableGraveyard.style.borderCollapse = 'collapse';
        tableGraveyard.style.borderSpacing = 0;
        tableGraveyard.style.width = squareWidth * 30;
        tableGraveyard.style.textAlign = 'center';
        td.appendChild(tableGraveyard);
        const tbodyGraveyard = document.createElement('tbody');
        tableGraveyard.appendChild(tbodyGraveyard);
        const trGraveyard = document.createElement('tr');
        tbodyGraveyard.appendChild(trGraveyard);
        for (let i = 0; i < 30; i++) {
            const td = document.createElement('td');
            td.style.userSelect = 'none';
            td.style.backgroundColor = '#f3f3f3';
            td.style.border = '1px solid white';
            td.style.width = squareWidth;
            td.style.height = squareWidth;
            trGraveyard.appendChild(td);
            td.innerText = '*';
            this.graveyardSquares.push(td);
        }

        for (let i = 0; i < COLUMN_NUMBER; i++) {
            const span = document.createElement('span');
            span.style.float = 'left';
            const c = COLUMN_TEXT[i];
            span.innerText = c;
            const td = this.squaresIndex[`${c}1`];
            // td.appendChild(span);
        }
    };
}