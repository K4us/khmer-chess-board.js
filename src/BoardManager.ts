import {
    BOARD_NOTE_V_PREFIX_CLASS,
    BOARD_NOTE_H_PREFIX_CLASS,
} from './providers/constance';
import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import {
    BOARD_SEPARATOR,
    CELL_COUNT,
    KhmerChess,
    PieceIndex,
    Point,
    ROW_NUMBER,
} from 'khmer-chess';
import BoardManagerEventController from './event/BoardManagerEventController';

export default class BoardManager {
    _cellManagers: CellManager[] = [];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown = false;
    boardEventController: BoardManagerEventController<CellManager>;
    constructor() {
        this.boardEventController = new BoardManagerEventController();
    }
    setProps(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
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
        this._cellManagers.forEach((cell) => {
            return cell.setOnClick(this.selectCell.bind(this, cell));
        });
    }
    detachClickEvent() {
        this._cellManagers.forEach((cell) => {
            return cell.removeOnClick();
        });
    }

    push(i: number, cell: CellManager) {
        this._cellManagers[i] = cell;
        cell.setProps(this.khmerChessBoard);
    }

    get(index: number) {
        const filtered = this._cellManagers.filter((cell: CellManager) => {
            return cell.point.index === index;
        });
        return filtered[0];
    }
    getKing(color: string) {
        const filtered = this._cellManagers.filter((cell: CellManager) => {
            return cell.piece && cell.piece.isTypeKing && cell.piece.color === color;
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
        return this._cellManagers.filter((cell) => {
            return cell.piece;
        });
    }
    get pieceInTurnCells() {
        const turn = this.khmerChess.turn;
        return this._cellManagers.filter((cell) => {
            return cell.piece && cell.piece.color === turn;
        });
    }
    get pieceNotInTurnCells() {
        const turn = this.khmerChess.turn;
        return this._cellManagers.filter((cell) => {
            return cell.piece && cell.piece.color !== turn;
        });
    }
    get selectedCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isSelected;
        });
    }
    get canMoveCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isCanMove;
        });
    }
    get movedCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isMoved;
        });
    }
    get attackedCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isAttacked;
        });
    }
    get turnCells() {
        return this._cellManagers.filter((cell) => {
            return cell.isTurning;
        });
    }
    get piecesInBoard() {
        return this._cellManagers.map((cell) => {
            return cell.piece;
        });
    }
    get isTurning() {
        return !!this._cellManagers.find((cell) => {
            return cell.isTurning;
        });
    }
    toString() {
        const pieceIndices = this.piecesInBoard.map((piece, i) => {
            return new PieceIndex(Point.fromIndex(i), piece);
        });
        const str = this.khmerChess.kpgn.ren.board.toString(pieceIndices);
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

    clearTurnCells() {
        this.turnCells.forEach((cell) => {
            cell.turn(false);
        });
    }

    removePiecesFromCells() {
        this._cellManagers.forEach((cell) => {
            cell.removePiece();
        });
    }

    applyFlippingFlag() {
        this._cellManagers.forEach((cell) => {
            cell.setFlipped(this.isUpsideDown);
        });
    }

    setCellNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const cell = this.getByXY(i, 0);
            cell.addClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
            if (this.options.isEnglish) {
                cell.addClassName(this.options.enClass);
            }
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const cell = this.getByXY(0, j);
            cell.addClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
            if (this.options.isEnglish) {
                cell.addClassName(this.options.enClass);
            }
        }
    }
    clearCellNote() {
        for (let i = 0; i < ROW_NUMBER; i++) {
            const cell = this.getByXY(i, 0);
            cell.removeClassName(`${BOARD_NOTE_H_PREFIX_CLASS}-${i + 1}`);
            cell.removeClassName(this.options.enClass);
        }
        for (let j = 0; j < ROW_NUMBER; j++) {
            const cell = this.getByXY(0, j);
            cell.removeClassName(`${BOARD_NOTE_V_PREFIX_CLASS}-${j + 1}`);
            cell.removeClassName(this.options.enClass);
        }
    }

    renderKhmerChessPieces() {
        this.removePiecesFromCells();
        this.khmerChess.piecesInBoard.forEach((piece, i) => {
            const cell = this.get(i);
            cell.setPiece(piece);
        });
    }

    changeTurn(turn?: string) {
        if (turn) {
            this.khmerChess.turn = turn;
        }
        this.pieceInTurnCells.forEach((cell) => {
            cell.turn(true);
        });
        this.pieceInTurnCells.forEach((cell) => {
            cell.turn(true);
        });
        this.boardEventController.changeTurn();
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