"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constance_1 = require("./providers/constance");
var GraveyardManager = /** @class */ (function () {
    function GraveyardManager(khmerChessBoard) {
        this._cells = [];
        this.khmerChessBoard = khmerChessBoard;
        this.domGraveyard = document.createElement('div');
    }
    GraveyardManager.prototype.destroy = function () {
        this._cells.forEach(function (cell) {
            cell.destroy();
        });
        this._cells = [];
        this.khmerChessBoard = null;
        this.domGraveyard = null;
    };
    GraveyardManager.prototype.setDom = function (domGraveyard) {
        this.domGraveyard = domGraveyard;
    };
    GraveyardManager.prototype.push = function (cell) {
        this._cells.push(cell);
    };
    GraveyardManager.prototype.get = function (index) {
        return this._cells[index];
    };
    Object.defineProperty(GraveyardManager.prototype, "lastIndex", {
        get: function () {
            var cell = this.lastPieceCell;
            if (cell === null) {
                return null;
            }
            return this._cells.indexOf(cell);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraveyardManager.prototype, "lastPieceCell", {
        get: function () {
            for (var i = this._cells.length - 1; i >= 0; i--) {
                if (this._cells[i].piece !== null) {
                    return this._cells[i];
                }
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraveyardManager.prototype, "firstEmptyCell", {
        get: function () {
            var lastPieceCell = this.lastPieceCell;
            if (lastPieceCell === null) {
                return this._cells[0];
            }
            return this._cells[lastPieceCell.point.index + 1] || null;
        },
        enumerable: false,
        configurable: true
    });
    GraveyardManager.prototype.setCellNote = function () {
        for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
            var cell = this.get(i);
            cell.addClassName(constance_1.GRAVEYARD_NOTE_PREFIX_CLASS + "-" + (i + 1));
            if (this.khmerChessBoard.options.isEnglish) {
                cell.addClassName(this.khmerChessBoard.options.enClass);
            }
        }
    };
    GraveyardManager.prototype.clearCellNote = function () {
        for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
            var cell = this.get(i);
            cell.removeClassName(constance_1.GRAVEYARD_NOTE_PREFIX_CLASS + "-" + (i + 1));
            cell.removeClassName(this.khmerChessBoard.options.enClass);
        }
    };
    GraveyardManager.prototype.removePiecesFromCells = function () {
        for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
            var cell = this.get(i);
            cell.removePiece();
        }
    };
    GraveyardManager.prototype.applyPiecesFromKhmerChess = function () {
        var _this = this;
        this.khmerChessBoard.khmerChess.piecesInGraveyard.forEach(function (piece, i) {
            var cell = _this.get(i);
            cell.setPiece(piece);
        });
        this.scrollLastToView();
    };
    GraveyardManager.prototype.scrollLastToView = function () {
        var lastIndex = this.khmerChessBoard.graveyardManager.lastIndex;
        if (lastIndex === null || lastIndex < 4) {
            lastIndex = 4;
        }
        var cellWidth = this.khmerChessBoard.options.cellWidth;
        var div = this.domGraveyard.parentElement;
        div.scrollLeft = (lastIndex - 4) * cellWidth;
    };
    GraveyardManager.prototype.renderKhmerChessPieces = function () {
        this.removePiecesFromCells();
        this.applyPiecesFromKhmerChess();
    };
    return GraveyardManager;
}());
exports.default = GraveyardManager;
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
//# sourceMappingURL=GraveyardManager.js.map