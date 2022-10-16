"use strict";
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
var khmer_chess_1 = require("khmer-chess");
var constance_1 = require("./providers/constance");
var CellManager = /** @class */ (function () {
    function CellManager(khmerChessBoard, point, container, piece, isGraveyard) {
        if (isGraveyard === void 0) { isGraveyard = false; }
        this.piece = null;
        this.containerDom = document.createElement('td');
        this.isGraveyard = false;
        this.isUpsideDown = false;
        this.khmerChessBoard = khmerChessBoard;
        this.point = point;
        this.setPiece(piece);
        this.containerDom = container;
        this.isGraveyard = isGraveyard;
    }
    CellManager.prototype.destroy = function () {
        this.setPiece(null);
        this.containerDom = null;
        this.point = null;
        this.khmerChessBoard = null;
    };
    CellManager.prototype.removePieceClasses = function () {
        var _this = this;
        this.removeClassName(constance_1.PIECE_CLASS_NAME);
        khmer_chess_1.Piece.colorChars.forEach(function (color) {
            _this.removeClassName("color-" + color);
        });
        khmer_chess_1.Piece.pieceChars.forEach(function (type) {
            _this.removeClassName("type-" + type);
        });
    };
    CellManager.prototype.removePiece = function () {
        this.removePieceClasses();
        this.piece = null;
    };
    CellManager.prototype.setPiece = function (piece) {
        this.removePiece();
        this.piece = piece;
        if (this.piece) {
            this.addClassName("type-" + this.piece.type);
            this.addClassName("color-" + this.piece.color);
            this.addClassName(constance_1.PIECE_CLASS_NAME);
        }
    };
    CellManager.prototype.addClassName = function (className) {
        this.containerDom.classList.add(className);
    };
    CellManager.prototype.removeClassName = function (className) {
        this.containerDom.classList.remove(className);
    };
    CellManager.prototype.hasClassName = function (className) {
        return this.containerDom.classList.contains(className);
    };
    CellManager.prototype.select = function (selected) {
        this.removeClassName(constance_1.SELECTED_CLASS_NAME);
        if (selected && this.piece) {
            this.addClassName(constance_1.SELECTED_CLASS_NAME);
        }
    };
    Object.defineProperty(CellManager.prototype, "canMovePoints", {
        get: function () {
            var points = this.khmerChessBoard.khmerChess.getCanMovePointsByPoint(this.point);
            return points;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "isSelected", {
        get: function () {
            return this.hasClassName(constance_1.SELECTED_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "isCanMove", {
        get: function () {
            return this.hasClassName(constance_1.CAN_MOVE_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "isMoved", {
        get: function () {
            return this.hasClassName(constance_1.MOVED_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "isCanSelect", {
        get: function () {
            return this.hasClassName(constance_1.TURN_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    CellManager.prototype.attack = function (attacked) {
        this.removeClassName(constance_1.ATTACKED_CLASS_NAME);
        if (attacked) {
            this.addClassName(constance_1.ATTACKED_CLASS_NAME);
        }
    };
    CellManager.prototype.turn = function (attacked) {
        this.removeClassName(constance_1.TURN_CLASS_NAME);
        if (attacked) {
            this.addClassName(constance_1.TURN_CLASS_NAME);
        }
    };
    Object.defineProperty(CellManager.prototype, "isAttacked", {
        get: function () {
            return this.hasClassName(constance_1.ATTACKED_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "isTurning", {
        get: function () {
            return this.hasClassName(constance_1.TURN_CLASS_NAME);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellManager.prototype, "onClick", {
        get: function () {
            return this.containerDom.onclick;
        },
        enumerable: false,
        configurable: true
    });
    CellManager.prototype.setOnClick = function (listener) {
        this.containerDom.onclick = listener;
    };
    CellManager.prototype.removeOnClick = function () {
        this.containerDom.onclick = null;
    };
    CellManager.prototype.setFlipped = function (isUpsideDown) {
        this.removeClassName(constance_1.FLIPPED_CLASS);
        if (this.isUpsideDown !== isUpsideDown) {
            var xy = khmer_chess_1.Point.indexToXY(khmer_chess_1.CELL_COUNT - 1 - this.point.index);
            this.point.x = xy.x;
            this.point.y = xy.y;
        }
        this.isUpsideDown = isUpsideDown;
        if (isUpsideDown) {
            this.addClassName(constance_1.FLIPPED_CLASS);
        }
    };
    CellManager.prototype.clone = function () {
        var div = document.createElement('div');
        return new CellManager(this.khmerChessBoard, new khmer_chess_1.Point(this.point.x, this.point.y), div, this.piece);
    };
    CellManager.prototype.movePieceTo = function (toCell) {
        var piece = this.piece;
        this.removePiece();
        toCell.setPiece(piece);
    };
    CellManager.prototype.movePieceToGraveyard = function (toGYCell) {
        var deadPiece = this.piece;
        this.removePiece();
        toGYCell.setPiece(deadPiece);
    };
    CellManager.prototype.movePieceFromGraveyard = function (toCell) {
        var raisePiece = this.piece;
        this.removePiece();
        toCell.setPiece(raisePiece);
    };
    CellManager.prototype.moved = function () {
        this.addClassName(constance_1.MOVED_CLASS_NAME);
    };
    CellManager.prototype.clearMoved = function () {
        this.removeClassName(constance_1.MOVED_CLASS_NAME);
    };
    CellManager.prototype.setCanMove = function () {
        this.addClassName(constance_1.CAN_MOVE_CLASS_NAME);
    };
    CellManager.prototype.clearCanMoved = function () {
        this.removeClassName(constance_1.CAN_MOVE_CLASS_NAME);
    };
    CellManager.prototype.upgrade = function () {
        if (this.piece && this.piece.upgrade()) {
            this.setPiece(this.piece);
        }
    };
    CellManager.prototype.downgrade = function () {
        if (this.piece && this.piece.downgrade()) {
            this.setPiece(this.piece);
        }
    };
    return CellManager;
}());
exports.default = CellManager;
//# sourceMappingURL=CellManager.js.map