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
 *---------------------------------------------------------------------------- */
import {
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
} from './providers/constance';
import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import { boardHelper, KhmerChess, ROW_NUMBER } from 'khmer-chess';

export default class BoardManager {
    _squares: CellManager[] = [];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown = false;
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
    }

    put(i: number, squarePiece: CellManager) {
        this._squares[i] = squarePiece;
    }

    get(index: number) {
        const filtered = this._squares.filter((square: CellManager) => {
            return square.index === index;
        });
        return filtered[0];
    }

    getByIndexCode(code: string) {
        const index = boardHelper.indexCodeToPos(code);
        return this.get(index);
    }

    getByXY(x: number, y: number) {
        const index = boardHelper.nerdXyToPos(x, y);
        return this.get(index);
    }

    flip() {
        this.isUpsideDown = !this.isUpsideDown;
        // backup
        const backupPiecesList = this._squares.map((square) => {
            return square.clone();
        });
        const backupSelectedList = this.getSelectedSquares().map((square) => {
            return square.clone();
        });
        // clear
        this.clearSelectedSquares();
        this.removePiecesFromSquares();
        // flip
        this.applyFlippingFlag();
        // restore
        backupPiecesList.forEach((clonedSquare) => {
            const square = this.getByXY(clonedSquare.x, clonedSquare.y);
            square.setPiece(clonedSquare.piece);
        });
        backupSelectedList.forEach((clonedSquare) => {
            const square = this.getByXY(clonedSquare.x, clonedSquare.y);
            square.select();
        });
    }

    getSelectedSquares() {
        return this._squares.filter((square) => {
            return square.isSelected();
        });
    }

    clearSelectedSquares() {
        this._squares.forEach((s) => {
            return s.unselect();
        });
    }

    removePiecesFromSquares() {
        this._squares.forEach((s) => {
            return s.removePiece();
        });
    }

    applyFlippingFlag() {
        this._squares.forEach((square) => {
            square.setFlipped(this.isUpsideDown);
        });
    }

    enableSelect() {
        this._squares.forEach((s) => {
            return s.setOnClick(() => {
                const selectedList = this.getSelectedSquares();
                if (selectedList.length) {
                    const selectedSquare = selectedList[0];
                    if (s === selectedSquare) {
                        s.unselect();
                    } else {
                        // TODO: 
                        const move = this.khmerChess.move(selectedSquare.index, s.index);
                        if (move !== null) {
                            console.log(selectedSquare.indexCode, 'to', s.indexCode);
                        }
                        this.clearSelectedSquares();
                    }
                } else {
                    s.select();
                }
            });
        });
    }

    setNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const square = this.getByXY(i, 0);
            square.addClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const square = this.getByXY(0, j);
            square.addClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
        }
    }

    renderKhmerChessPieces() {
        this.removePiecesFromSquares();
        this.khmerChess.board().forEach((arr, i) => {
            arr.forEach((piece, j) => {
                const square = this.getByXY(j, i);
                if (piece) {
                    square.setPiece(piece);
                }
            });
        });
    }
}
