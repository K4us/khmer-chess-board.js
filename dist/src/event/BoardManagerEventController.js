"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var BoardManagerEventController = /** @class */ (function (_super) {
    __extends(BoardManagerEventController, _super);
    function BoardManagerEventController() {
        return _super.call(this, {
            events: {
                CLICK: BoardManagerEventController.CLICK,
                SELECTED: BoardManagerEventController.SELECTED,
                ATTEMPT_MOVE: BoardManagerEventController.ATTEMPT_MOVE,
            },
        }) || this;
    }
    BoardManagerEventController.prototype.click = function (data) {
        this._addPropEvent(BoardManagerEventController.CLICK, data);
    };
    BoardManagerEventController.prototype.selected = function (data) {
        this._addPropEvent(BoardManagerEventController.SELECTED, data);
    };
    BoardManagerEventController.prototype.deselected = function (data) {
        this._addPropEvent(BoardManagerEventController.DESELECTED, data);
    };
    BoardManagerEventController.prototype.attemptMove = function (fromCell, toCell) {
        this._addPropEvent(BoardManagerEventController.ATTEMPT_MOVE, {
            fromCell: fromCell,
            toCell: toCell,
        });
    };
    BoardManagerEventController.prototype.addOnCellClickEventListener = function (listener) {
        this._addOnEventListener(BoardManagerEventController.CLICK, listener);
    };
    BoardManagerEventController.prototype.removeOnCellClickEventListener = function (listener) {
        this._removeOnEventListener(BoardManagerEventController.CLICK, listener);
    };
    BoardManagerEventController.prototype.addOnCellSelectedEventListener = function (listener) {
        this._addOnEventListener(BoardManagerEventController.SELECTED, listener);
    };
    BoardManagerEventController.prototype.removeOnCellSelectedEventListener = function (listener) {
        this._removeOnEventListener(BoardManagerEventController.SELECTED, listener);
    };
    BoardManagerEventController.prototype.addOnCellDeselectedEventListener = function (listener) {
        this._addOnEventListener(BoardManagerEventController.DESELECTED, listener);
    };
    BoardManagerEventController.prototype.removeOnCellDeselectedEventListener = function (listener) {
        this._removeOnEventListener(BoardManagerEventController.DESELECTED, listener);
    };
    BoardManagerEventController.prototype.addOnAttemptMoveEventListener = function (listener) {
        this._addOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    };
    BoardManagerEventController.prototype.removeOnAttemptMoveEventListener = function (listener) {
        this._removeOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    };
    BoardManagerEventController.CLICK = 'click';
    BoardManagerEventController.SELECTED = 'selected';
    BoardManagerEventController.DESELECTED = 'deselected';
    BoardManagerEventController.ATTEMPT_MOVE = 'attempt-move';
    return BoardManagerEventController;
}(khmer_chess_1.EventHandler));
exports.default = BoardManagerEventController;
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
//# sourceMappingURL=BoardManagerEventController.js.map