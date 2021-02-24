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
import {
    KhmerChess,
    Point,
    ROW_NUMBER,
    ListenerType,
    EventHandler,
} from 'khmer-chess';

class BoardEventController extends EventHandler {
    static CLICK = 'click';
    static ATTEMPT_MOVE = 'attempt-move';
    constructor() {
        super({
            events: {
                CLICK: BoardEventController.CLICK,
                ATTEMPT_MOVE: BoardEventController.ATTEMPT_MOVE,
            },
        });
    }
    attemptMove(fromCell: CellManager, toCell: CellManager) {
        this._addPropEvent(BoardEventController.ATTEMPT_MOVE    , {
            fromCell,
            toCell,
        });
    }
    click(cellManager: CellManager) {
        this._addPropEvent(BoardEventController.CLICK, cellManager);
    }
    addOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this._addOnEventListener(BoardEventController.CLICK, listener);
    }
    removeOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this._removeOnEventListener(BoardEventController.CLICK, listener);
    }
    addOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._addOnEventListener(BoardEventController.ATTEMPT_MOVE, listener);
    }
    removeOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this._removeOnEventListener(BoardEventController.ATTEMPT_MOVE, listener);
    }
}

export default class BoardManager {
    _cellManagers: CellManager[] = [];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown = false;
    boaEventController: BoardEventController;
    constructor() {
        this.boaEventController = new BoardEventController();
    }
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
    }
    enableClick() {
        this._cellManagers.forEach((cell) => {
            return cell.setOnClick(() => {
                this.boaEventController.click(cell);
                const selectedList = this.getSelectedCells();
                if (selectedList.length) {
                    const selectedCell = selectedList[0];
                    if (cell === selectedCell) {
                        cell.unselect();
                    } else {
                        this.boaEventController.attemptMove(selectedCell, cell);
                    }
                } else {
                    cell.select();
                }
            });
        });
    }

    put(i: number, cellPiece: CellManager) {
        this._cellManagers[i] = cellPiece;
    }

    get(index: number) {
        const filtered = this._cellManagers.filter((cell: CellManager) => {
            return cell.point.index === index;
        });
        return filtered[0];
    }

    getByIndexCode(indexCode: string) {
        const index = Point.indexCodeToIndex(indexCode);
        return this.get(index);
    }

    getByXY(x: number, y: number) {
        const index = Point.xyToIndex(x, y);
        return this.get(index);
    }

    flip() {
        this.isUpsideDown = !this.isUpsideDown;
        // backup
        const backupPiecesList = this._cellManagers.map((cell) => {
            return cell.clone();
        });
        const backupSelectedList = this.getSelectedCells().map((cell) => {
            return cell.clone();
        });
        // clear
        this.clearSelectedCells();
        this.removePiecesFromCells();
        // flip
        this.applyFlippingFlag();
        // restore
        backupPiecesList.forEach((clonedCell) => {
            const cell = this.getByXY(clonedCell.point.x, clonedCell.point.y);
            cell.setPiece(clonedCell.piece);
        });
        backupSelectedList.forEach((clonedCell) => {
            const cell = this.getByXY(clonedCell.point.x, clonedCell.point.y);
            cell.select();
        });
    }

    getSelectedCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isSelected();
        });
    }

    clearSelectedCells() {
        this._cellManagers.forEach((s) => {
            return s.unselect();
        });
    }

    removePiecesFromCells() {
        this._cellManagers.forEach((s) => {
            return s.removePiece();
        });
    }

    applyFlippingFlag() {
        this._cellManagers.forEach((cell) => {
            cell.setFlipped(this.isUpsideDown);
        });
    }

    setNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const cell = this.getByXY(i, 0);
            cell.addClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const cell = this.getByXY(0, j);
            cell.addClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
        }
    }

    renderKhmerChessPieces() {
        this.removePiecesFromCells();
        this.khmerChess.board().forEach((arr, i) => {
            arr.forEach((piece, j) => {
                const cell = this.getByXY(j, i);
                if (piece) {
                    cell.setPiece(piece);
                }
            });
        });
    }
    addOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this.boaEventController.addOnCellClickEventListener(listener);
    }
    removeOnCellClickEventListener(listener: ListenerType<CellManager>) {
        this.boaEventController.removeOnCellClickEventListener(listener);
    }
    addOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this.boaEventController.addOnAttemptMoveEventListener(listener);
    }
    removeOnAttemptMoveEventListener(listener: ListenerType<{ fromCell: CellManager, toCell: CellManager }>) {
        this.boaEventController.removeOnAttemptMoveEventListener(listener);
    }
}
