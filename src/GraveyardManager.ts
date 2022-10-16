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
import {
    TD_GRAVEYARD_NUMBER,
    GRAVEYARD_NOTE_PREFIX_CLASS,
} from './providers/constance';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';

export default class GraveyardManager {
    khmerChessBoard: KhmerChessBoard;

    _cells: CellManager[] = [];
    domGraveyard: HTMLElement;
    constructor(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.domGraveyard = document.createElement('div');
    }
    destroy() {
        this._cells.forEach((cell) => {
            cell.destroy();
        });
        this._cells = [];
        (this.khmerChessBoard as any) = null;
        (this.domGraveyard as any) = null;
    }
    setDom(domGraveyard: HTMLElement) {
        this.domGraveyard = domGraveyard;
    }
    push(cell: CellManager) {
        this._cells.push(cell);
    }

    get(index: number) {
        return this._cells[index];
    }

    get lastIndex(): number | null {
        const cell = this.lastPieceCell;
        if (cell === null) {
            return null;
        }
        return this._cells.indexOf(cell);
    }
    get lastPieceCell(): CellManager | null {
        for (let i = this._cells.length - 1; i >= 0; i--) {
            if (this._cells[i].piece !== null) {
                return this._cells[i];
            }
        }
        return null;
    }
    get firstEmptyCell(): CellManager | null {
        const lastPieceCell = this.lastPieceCell;
        if (lastPieceCell === null) {
            return this._cells[0];
        }
        return this._cells[lastPieceCell.point.index + 1] || null;
    }

    setCellNote() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.addClassName(`${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1}`);
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
    }
    clearCellNote() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.removeClassName(`${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1}`);
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
    }

    removePiecesFromCells() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.removePiece();
        }
    }

    applyPiecesFromKhmerChess() {
        this.khmerChessBoard.khmerChess.piecesInGraveyard.forEach((piece, i) => {
            const cell = this.get(i);
            cell.setPiece(piece);
        });
        this.scrollLastToView();
    }

    scrollLastToView() {
        let lastIndex = this.khmerChessBoard.graveyardManager.lastIndex;
        if (lastIndex === null || lastIndex < 4) {
            lastIndex = 4;
        }
        const cellWidth = this.khmerChessBoard.options.cellWidth;
        const div = this.domGraveyard.parentElement as HTMLDivElement;
        div.scrollLeft = (lastIndex - 4) * cellWidth;
    }

    renderKhmerChessPieces() {
        this.removePiecesFromCells();
        this.applyPiecesFromKhmerChess();
    }
}
