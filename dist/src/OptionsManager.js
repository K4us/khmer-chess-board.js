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
var uniqueIdHelper_1 = require("./helpers/uniqueIdHelper");
var khmer_chess_1 = require("khmer-chess");
var KhmerChessBoard_1 = __importDefault(require("./KhmerChessBoard"));
var OptionsManager = /** @class */ (function () {
    function OptionsManager() {
        this._width = 500;
        this.isFullScreen = false;
        this.uniqueClassName = '';
        this.isEnglish = false;
        this.uniqueClassName = "kcb-" + (0, uniqueIdHelper_1.genId)();
    }
    Object.defineProperty(OptionsManager.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (width) {
            this._width = width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "enClass", {
        get: function () {
            return KhmerChessBoard_1.default.LOCALE_ENGLISH;
        },
        enumerable: false,
        configurable: true
    });
    OptionsManager.prototype.getScaleFit = function (btr) {
        if (this.isFullScreen && btr) {
            var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            if (vw < vh) {
                return vw / btr.width;
            }
            return vh / btr.height;
        }
        return 1;
    };
    Object.defineProperty(OptionsManager.prototype, "cellWidth", {
        get: function () {
            var sqWidth = (this.width - (khmer_chess_1.ROW_NUMBER - 1) * this.borderWidth) / khmer_chess_1.ROW_NUMBER;
            return sqWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "graveyardContainerHeight", {
        get: function () {
            var gyCHeight = this.cellWidth + 10 * this.borderWidth;
            return gyCHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "minWidth", {
        get: function () {
            return (khmer_chess_1.ROW_NUMBER - 1) * this.borderWidth + khmer_chess_1.ROW_NUMBER * constance_1.MIN_CELL_WIDTH;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "graveyardWidth", {
        get: function () {
            return this.borderWidth * (constance_1.TD_GRAVEYARD_NUMBER - 1) + this.cellWidth * constance_1.TD_GRAVEYARD_NUMBER;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "graveyardContainerPadding", {
        get: function () {
            return 8 * this.borderWidth * this.width / 600;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OptionsManager.prototype, "borderWidth", {
        get: function () {
            return this.width * constance_1.BORDER_WIDTH / this._width;
        },
        enumerable: false,
        configurable: true
    });
    return OptionsManager;
}());
exports.default = OptionsManager;
//# sourceMappingURL=OptionsManager.js.map