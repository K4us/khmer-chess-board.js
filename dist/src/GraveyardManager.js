"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constance_1 = require("./providers/constance");
var GraveyardManager = /** @class */ (function () {
    function GraveyardManager() {
        this._cells = [];
    }
    GraveyardManager.prototype.setProps = function (khmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
    };
    GraveyardManager.prototype.setDom = function (domGraveyard) {
        this.domGraveyard = domGraveyard;
    };
    GraveyardManager.prototype.push = function (cell) {
        this._cells.push(cell);
        cell.setProps(this.khmerChessBoard);
    };
    GraveyardManager.prototype.get = function (index) {
        return this._cells[index];
    };
    GraveyardManager.prototype.setCellNote = function () {
        for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
            var cell = this.get(i);
            cell.addClassName(constance_1.GRAVEYARD_NOTE_PREFIX_CLASS + "-" + (i + 1));
            if (this.options.isEnglish) {
                cell.addClassName(this.options.enClass);
            }
        }
    };
    GraveyardManager.prototype.clearCellNote = function () {
        for (var i = 0; i < constance_1.TD_GRAVEYARD_NUMBER; i++) {
            var cell = this.get(i);
            cell.removeClassName(constance_1.GRAVEYARD_NOTE_PREFIX_CLASS + "-" + (i + 1));
            cell.removeClassName(this.options.enClass);
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
        this.khmerChess.piecesInGraveyard.forEach(function (piece, i) {
            var cell = _this.get(i);
            cell.setPiece(piece);
        });
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
//# sourceMappingURL=GraveyardManager.js.map