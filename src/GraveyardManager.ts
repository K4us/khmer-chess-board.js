import { KhmerChess, Piece } from 'khmer-chess';
import {
    TD_GRAVEYARD_NUMBER,
    GRAVEYARD_NOTE_PREFIX_CLASS,
} from './providers/constance';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
import OptionsManager from './OptionsManager';

export default class GraveyardManager {
    _cells: CellManager[] = [];
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    options: OptionsManager;
    domGraveyard: HTMLElement;
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
    }
    setDom(domGraveyard: HTMLElement) {
        this.domGraveyard = domGraveyard;
    }
    push(cellPiece: CellManager) {
        this._cells.push(cellPiece);
    }

    get(index: number) {
        return this._cells[index];
    }

    setCellNote() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.addClassName(`${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1}`);
            if (this.options.isEnglish) {
                cell.addClassName(this.options.enClass);
            }
        }
    }
    clearCellNote() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.removeClassName(`${GRAVEYARD_NOTE_PREFIX_CLASS}-${i + 1}`);
            cell.removeClassName(this.options.enClass);
        }
    }

    removePiecesFromCells() {
        for (let i = 0; i < TD_GRAVEYARD_NUMBER; i++) {
            const cell = this.get(i);
            cell.removePiece();
        }
    }

    applyPiecesFromKhmerChess() {
        this.khmerChess.piecesInGraveyard.forEach((piece, i) => {
            const cell = this.get(i);
            cell.setPiece(piece);
        });
    }

    renderKhmerChessPieces() {
        this.removePiecesFromCells();
        this.applyPiecesFromKhmerChess();
    }
}

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
 **/