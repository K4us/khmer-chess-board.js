"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var constance_1 = require("./providers/constance");
var CellManager_1 = __importDefault(require("./CellManager"));
var khmer_chess_1 = require("khmer-chess");
var BoardManagerEventController_1 = __importDefault(require("./event/BoardManagerEventController"));
var BoardStatusEventController_1 = __importDefault(require("./event/BoardStatusEventController"));
var BoardManager = /** @class */ (function () {
    function BoardManager(khmerChessBoard) {
        var _this = this;
        this._cells = Array.from({ length: khmer_chess_1.CELL_COUNT }, function (_, i) {
            var dom = document.createElement('div');
            return new CellManager_1.default(_this.khmerChessBoard, khmer_chess_1.Point.fromIndex(i), dom, null);
        });
        this.isUpsideDown = false;
        this.khmerChessBoard = khmerChessBoard;
        this.boardStatusEventController = new BoardStatusEventController_1.default();
        this.boardEventController = new BoardManagerEventController_1.default();
    }
    BoardManager.prototype.destroy = function () {
        this._cells.forEach(function (cell) {
            cell.destroy();
        });
        this._cells = [];
        this.boardEventController.destroy();
        this.boardEventController = null;
        this.boardStatusEventController.destroy();
        this.boardStatusEventController = null;
        this.khmerChessBoard = null;
    };
    BoardManager.prototype.selectCell = function (cell) {
        this.boardEventController.click(cell);
        var selectedList = this.selectedCells;
        var selectedCell = selectedList[0];
        if (selectedCell) {
            if (cell === selectedCell) {
                cell.select(false);
                return this.boardEventController.deselected(selectedCell);
            }
            else {
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
    };
    BoardManager.prototype.attachClickEvent = function () {
        var _this = this;
        this._cells.forEach(function (cell) {
            return cell.setOnClick(_this.selectCell.bind(_this, cell));
        });
    };
    BoardManager.prototype.detachClickEvent = function () {
        this._cells.forEach(function (cell) {
            return cell.removeOnClick();
        });
    };
    BoardManager.prototype.set = function (i, cell) {
        this._cells[i] = cell;
    };
    BoardManager.prototype.get = function (index) {
        return this._cells[index];
    };
    BoardManager.prototype.getKing = function (color) {
        var pieceIndex = this.khmerChessBoard.khmerChess.kpgn.ren.board.getKing(color);
        if (!pieceIndex) {
            return null;
        }
        return this.get(pieceIndex.point.index);
    };
    BoardManager.prototype.getByIndexCode = function (indexCode) {
        var index = khmer_chess_1.Point.indexCodeToIndex(indexCode);
        return this.get(index);
    };
    BoardManager.prototype.getByXY = function (x, y) {
        var index = khmer_chess_1.Point.xyToIndex(x, y);
        return this.get(index);
    };
    BoardManager.prototype.flip = function () {
        this.isUpsideDown = !this.isUpsideDown;
        this._applyFlip();
    };
    BoardManager.prototype._applyFlip = function () {
        var _this = this;
        // backup
        var backupPiecesList = this._cells.map(function (cell) {
            return cell.clone();
        });
        var backupSelectedList = this.selectedCells.map(function (cell) {
            return cell.clone();
        });
        // clear
        this.clearSelectedCells();
        this.removePiecesFromCells();
        // flip
        this.applyFlippingFlag();
        // restore
        backupPiecesList.forEach(function (clonedCell) {
            var cell = _this.getByXY(clonedCell.point.x, clonedCell.point.y);
            cell.setPiece(clonedCell.piece);
        });
        backupSelectedList.forEach(function (clonedCell) {
            var cell = _this.getByXY(clonedCell.point.x, clonedCell.point.y);
            cell.select(true);
        });
    };
    Object.defineProperty(BoardManager.prototype, "pieceCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.piece;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "pieceInTurnCells", {
        get: function () {
            var turn = this.khmerChessBoard.khmerChess.turn;
            return this._cells.filter(function (cell) {
                return cell.piece && cell.piece.color === turn;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "pieceNotInTurnCells", {
        get: function () {
            var turn = this.khmerChessBoard.khmerChess.turn;
            return this._cells.filter(function (cell) {
                return cell.piece && cell.piece.color !== turn;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "selectedCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.isSelected;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "canMoveCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.isCanMove;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "movedCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.isMoved;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "attackedCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.isAttacked;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "turnCells", {
        get: function () {
            return this._cells.filter(function (cell) {
                return cell.isTurning;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "piecesInBoard", {
        get: function () {
            return this._cells.map(function (cell) {
                return cell.piece;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoardManager.prototype, "isTurning", {
        get: function () {
            return !!this._cells.find(function (cell) {
                return cell.isTurning;
            });
        },
        enumerable: false,
        configurable: true
    });
    BoardManager.prototype.toString = function () {
        var pieceIndices = this.piecesInBoard.map(function (piece, i) {
            return new khmer_chess_1.PieceIndex(khmer_chess_1.Point.fromIndex(i), piece);
        });
        var str = this.khmerChessBoard.khmerChess.kpgn.ren.board.toString(pieceIndices);
        return str;
    };
    BoardManager.prototype.clearSelectedCells = function () {
        var _this = this;
        this.selectedCells.forEach(function (cell) {
            cell.select(false);
            _this.boardEventController.deselected(cell);
        });
    };
    BoardManager.prototype.clearCanMoveCells = function () {
        this.canMoveCells.forEach(function (cell) {
            cell.clearCanMoved();
        });
    };
    BoardManager.prototype.highlightMovedCells = function (fromCell, toCell) {
        fromCell.moved();
        toCell.moved();
    };
    BoardManager.prototype.clearMovedCells = function () {
        this.movedCells.forEach(function (cell) {
            cell.clearMoved();
        });
    };
    BoardManager.prototype.clearAttackCells = function () {
        this.attackedCells.forEach(function (cell) {
            cell.attack(false);
        });
    };
    BoardManager.prototype.enableTurnCells = function () {
        this.pieceInTurnCells.forEach(function (cell) {
            cell.turn(true);
        });
    };
    BoardManager.prototype.clearTurnCells = function () {
        this.turnCells.forEach(function (cell) {
            cell.turn(false);
        });
    };
    BoardManager.prototype.removePiecesFromCells = function () {
        this._cells.forEach(function (cell) {
            cell.removePiece();
        });
    };
    BoardManager.prototype.applyFlippingFlag = function () {
        var _this = this;
        this._cells.forEach(function (cell) {
            cell.setFlipped(_this.isUpsideDown);
        });
    };
    BoardManager.prototype.setCellNote = function () {
        for (var i = 0; i < khmer_chess_1.ROW_NUMBER; i++) {
            var cell = this.getByXY(i, 0);
            cell.addClassName(constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-" + (i + 1));
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
        for (var j = 0; j < khmer_chess_1.ROW_NUMBER; j++) {
            var cell = this.getByXY(0, j);
            cell.addClassName(constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-" + (j + 1));
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
    };
    BoardManager.prototype.clearCellNote = function () {
        for (var i = 0; i < khmer_chess_1.ROW_NUMBER; i++) {
            var cell = this.getByXY(i, 0);
            cell.removeClassName(constance_1.BOARD_NOTE_H_PREFIX_CLASS + "-" + (i + 1));
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
        for (var j = 0; j < khmer_chess_1.ROW_NUMBER; j++) {
            var cell = this.getByXY(0, j);
            cell.removeClassName(constance_1.BOARD_NOTE_V_PREFIX_CLASS + "-" + (j + 1));
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
    };
    BoardManager.prototype.renderKhmerChessPieces = function () {
        var _this = this;
        this.removePiecesFromCells();
        this.khmerChessBoard.khmerChess.piecesInBoard.forEach(function (piece, i) {
            var cell = _this.get(i);
            cell.setPiece(piece);
        });
    };
    Object.defineProperty(BoardManager.prototype, "isP2P", {
        get: function () {
            return this.khmerChessBoard.domRootBoard.classList.contains(constance_1.CSS_P2P);
        },
        enumerable: false,
        configurable: true
    });
    BoardManager.prototype.setP2P = function (b) {
        this.khmerChessBoard.domRootBoard.classList.remove(constance_1.CSS_P2P);
        if (b) {
            this.khmerChessBoard.domRootBoard.classList.add(constance_1.CSS_P2P);
        }
        this.isUpsideDown = false;
        this._applyFlip();
    };
    BoardManager.prototype.takeTurn = function () {
        this.clearTurnCells();
        this.enableTurnCells();
    };
    BoardManager.prototype.checkBoardEvent = function () {
        this.boardStatusEventController.checkBoardEvent(this.khmerChessBoard);
    };
    BoardManager.prototype.getBoardStatusEvents = function () {
        return this.boardStatusEventController.getBoardEvents(this.khmerChessBoard);
    };
    BoardManager.prototype.addBoardStatusEventListener = function (listener) {
        this.boardStatusEventController.addBoardStatusEventListener(listener);
        this.checkBoardEvent();
    };
    BoardManager.prototype.removeBoardStatusEventListener = function (listener) {
        this.boardStatusEventController.removeBoardStatusEventListener(listener);
    };
    BoardManager.prototype.forceCount = function () {
        var move = this.khmerChessBoard.playManager.currentMove;
        if (move === null) {
            return false;
        }
        var ren = this.khmerChessBoard.khmerChess.kpgn.ren;
        if (!ren.countUp.isCounting && move.piece.colorOpponent === ren.turn) {
            this.khmerChessBoard.khmerChess.kpgn.ren.checkCountStatus(move, true);
            this.khmerChessBoard.playManager.render();
            if (move.isStartCounting) {
                this.checkBoardEvent();
                return true;
            }
        }
        return false;
    };
    return BoardManager;
}());
exports.default = BoardManager;
//# sourceMappingURL=BoardManager.js.map