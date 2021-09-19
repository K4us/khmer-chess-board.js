import {
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
    CSS_P2P,
} from './providers/constance';
import CellManager from './CellManager';
import KhmerChessBoard from './KhmerChessBoard';
import {
    CELL_COUNT,
    ListenerType,
    PieceIndex,
    Point,
    ROW_NUMBER,
} from 'khmer-chess';
import BoardManagerEventController from './event/BoardManagerEventController';
import BoardStatusEventController from './event/BoardStatusEventController';
import { BoardStatusEvent } from './event/BoardStatusEvent';

export default class BoardManager {
    khmerChessBoard: KhmerChessBoard;

    _cells: CellManager[] = Array.from({ length: CELL_COUNT }, (_, i) => {
        const dom = document.createElement('div');
        return new CellManager(this.khmerChessBoard, Point.fromIndex(i), dom, null);
    });
    boardStatusEventController: BoardStatusEventController;
    boardEventController: BoardManagerEventController<CellManager>;

    isUpsideDown = false;
    constructor(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;

        this.boardStatusEventController = new BoardStatusEventController();
        this.boardEventController = new BoardManagerEventController();
    }
    destroy() {
        this._cells.forEach((cell) => {
            cell.destroy();
        });
        this._cells = [];
        this.boardEventController.destroy();
        (this.boardEventController as any) = null;
        this.boardStatusEventController.destroy();
        (this.boardStatusEventController as any) = null;

        (this.khmerChessBoard as any) = null;
    }
    selectCell(cell: CellManager) {
        this.boardEventController.click(cell);
        const selectedList = this.selectedCells;
        const selectedCell = selectedList[0];
        if (selectedCell) {
            if (cell === selectedCell) {
                cell.select(false);
                return this.boardEventController.deselected(selectedCell);
            } else {
                if (cell.isCanMove) {
                    return this.boardEventController.attemptMove(selectedCell, cell);
                }
            }
        }
        if (cell.isCanSelect) {
            if (selectedCell) {
                selectedCell.select(false);
                this.boardEventController.deselected(selectedCell);
            }
            cell.select(true);
            return this.boardEventController.selected(cell);
        }
    }
    attachClickEvent() {
        this._cells.forEach((cell) => {
            return cell.setOnClick(this.selectCell.bind(this, cell));
        });
    }
    detachClickEvent() {
        this._cells.forEach((cell) => {
            return cell.removeOnClick();
        });
    }

    set(i: number, cell: CellManager) {
        this._cells[i] = cell;
    }

    get(index: number) {
        return this._cells[index];
    }
    getKing(color: string) {
        const pieceIndex = this.khmerChessBoard.khmerChess.kpgn.ren.board.getKing(color);
        if (!pieceIndex) {
            return null;
        }
        return this.get(pieceIndex.point.index);
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
        this._applyFlip();
    }
    _applyFlip() {
        // backup
        const backupPiecesList = this._cells.map((cell) => {
            return cell.clone();
        });
        const backupSelectedList = this.selectedCells.map((cell) => {
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
            cell.select(true);
        });
    }

    get pieceCells() {
        return this._cells.filter((cell) => {
            return cell.piece;
        });
    }
    get pieceInTurnCells() {
        const turn = this.khmerChessBoard.khmerChess.turn;
        return this._cells.filter((cell) => {
            return cell.piece && cell.piece.color === turn;
        });
    }
    get pieceNotInTurnCells() {
        const turn = this.khmerChessBoard.khmerChess.turn;
        return this._cells.filter((cell) => {
            return cell.piece && cell.piece.color !== turn;
        });
    }
    get selectedCells() {
        return this._cells.filter((cell) => {
            return cell.isSelected;
        });
    }
    get canMoveCells() {
        return this._cells.filter((cell) => {
            return cell.isCanMove;
        });
    }
    get movedCells() {
        return this._cells.filter((cell) => {
            return cell.isMoved;
        });
    }
    get attackedCells() {
        return this._cells.filter((cell) => {
            return cell.isAttacked;
        });
    }
    get turnCells() {
        return this._cells.filter((cell) => {
            return cell.isTurning;
        });
    }
    get piecesInBoard() {
        return this._cells.map((cell) => {
            return cell.piece;
        });
    }
    get isTurning() {
        return !!this._cells.find((cell) => {
            return cell.isTurning;
        });
    }
    toString() {
        const pieceIndices = this.piecesInBoard.map((piece, i) => {
            return new PieceIndex(Point.fromIndex(i), piece);
        });
        const str = this.khmerChessBoard.khmerChess.kpgn.ren.board.toString(pieceIndices);
        return str;
    }

    clearSelectedCells() {
        this.selectedCells.forEach((cell) => {
            cell.select(false);
            this.boardEventController.deselected(cell);
        });
    }
    clearCanMoveCells() {
        this.canMoveCells.forEach((cell) => {
            cell.clearCanMoved();
        });
    }

    highlightMovedCells(fromCell: CellManager, toCell: CellManager) {
        fromCell.moved();
        toCell.moved();
    }

    clearMovedCells() {
        this.movedCells.forEach((cell) => {
            cell.clearMoved();
        });
    }

    clearAttackCells() {
        this.attackedCells.forEach((cell) => {
            cell.attack(false);
        });
    }

    enableTurnCells() {
        this.pieceInTurnCells.forEach((cell) => {
            cell.turn(true);
        });
    }

    clearTurnCells() {
        this.turnCells.forEach((cell) => {
            cell.turn(false);
        });
    }

    removePiecesFromCells() {
        this._cells.forEach((cell) => {
            cell.removePiece();
        });
    }

    applyFlippingFlag() {
        this._cells.forEach((cell) => {
            cell.setFlipped(this.isUpsideDown);
        });
    }

    setCellNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const cell = this.getByXY(i, 0);
            cell.addClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const cell = this.getByXY(0, j);
            cell.addClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
    }
    clearCellNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const cell = this.getByXY(i, 0);
            cell.removeClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const cell = this.getByXY(0, j);
            cell.removeClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
    }

    renderKhmerChessPieces() {
        this.removePiecesFromCells();
        this.khmerChessBoard.khmerChess.piecesInBoard.forEach((piece, i) => {
            const cell = this.get(i);
            cell.setPiece(piece);
        });
    }

    get isP2P() {
        return this.khmerChessBoard.domRootBoard.classList.contains(CSS_P2P);
    }

    setP2P(b: boolean) {
        this.khmerChessBoard.domRootBoard.classList.remove(CSS_P2P);
        if (b) {
            this.khmerChessBoard.domRootBoard.classList.add(CSS_P2P);
        }
        this.isUpsideDown = false;
        this._applyFlip();
    }

    takeTurn() {
        this.clearTurnCells();
        this.enableTurnCells();
    }

    checkBoardEvent() {
        this.boardStatusEventController.checkBoardEvent(this.khmerChessBoard);
    }
    getBoardStatusEvents() {
        return this.boardStatusEventController.getBoardEvents(this.khmerChessBoard);
    }
    addBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>) {
        this.boardStatusEventController.addBoardStatusEventListener(listener);
        this.checkBoardEvent();
    }
    removeBoardStatusEventListener(listener: ListenerType<BoardStatusEvent>) {
        this.boardStatusEventController.removeBoardStatusEventListener(listener);
    }

    forceCount() {
        const move = this.khmerChessBoard.playManager.currentMove;
        if (move === null) {
            return false;
        }
        const ren = this.khmerChessBoard.khmerChess.kpgn.ren;
        if (!ren.countUp.isCounting && move.piece.colorOpponent === ren.turn) {
            this.khmerChessBoard.khmerChess.kpgn.ren.checkCountStatus(move, true);
            this.khmerChessBoard.playManager.render();
            if (move.isStartCounting) {
                this.checkBoardEvent();
                return true;
            }
        }
        return false;
    }
}

/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>, K4us Net <k4us.net@gmail.com>
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