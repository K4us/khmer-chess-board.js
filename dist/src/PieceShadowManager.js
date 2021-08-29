"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceShadowManager = /** @class */ (function () {
    function PieceShadowManager() {
        this.quickMove = false;
        this.pending = {
            resolvers: [],
            callbacks: [],
        };
    }
    PieceShadowManager.prototype.enableQuickMove = function () {
        this.quickMove = true;
    };
    PieceShadowManager.prototype.disableQuickMove = function () {
        this.quickMove = false;
    };
    PieceShadowManager.prototype.setTdShadow = function (tdShadowDown) {
        this.tdShadowDom = tdShadowDown;
    };
    PieceShadowManager.prototype.setProps = function (khmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.options = khmerChessBoard.options;
    };
    PieceShadowManager.prototype.movingPiece = function (fromCell, toCell, callback) {
        var _this = this;
        var pendingCallback = function () {
            callback();
            _this.pending.callbacks = _this.pending.callbacks.filter(function (cb) { return cb !== pendingCallback; });
            _this._resolve();
            pendingCallback = function () { };
        };
        this.pending.callbacks.push(pendingCallback);
        if (this.quickMove) {
            fromCell.removePieceClasses();
            pendingCallback();
        }
        else {
            var div_1 = document.createElement('div');
            if (!div_1.animate || this.options.isFullScreen) {
                pendingCallback();
            }
            else {
                var fromBc = fromCell.containerDom.getBoundingClientRect();
                var toBc = toCell.containerDom.getBoundingClientRect();
                this.tdShadowDom.appendChild(div_1);
                div_1.style.top = "" + fromBc.top;
                div_1.style.left = "" + fromBc.left;
                div_1.classList.add("type-" + fromCell.piece.type);
                div_1.classList.add("color-" + fromCell.piece.color);
                fromCell.removePieceClasses();
                var timeout_1 = setTimeout(function () {
                    pendingCallback();
                }, 1e3);
                var option = [
                    {
                        transform: 'translate(0px)',
                        opacity: 1,
                    },
                    {
                        transform: "translate(" + (toBc.left - fromBc.left) + "px, " + (toBc.top - fromBc.top) + "px)",
                        opacity: 0,
                    },
                ];
                var animation = div_1.animate(option, 100);
                animation.onfinish = function () {
                    clearTimeout(timeout_1);
                    _this.tdShadowDom.removeChild(div_1);
                    pendingCallback();
                };
            }
        }
    };
    PieceShadowManager.prototype._resolve = function () {
        while (!this.pending.callbacks.length && this.pending.resolvers.length) {
            var resolve = this.pending.resolvers.shift();
            resolve();
        }
    };
    PieceShadowManager.prototype.resolveAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, _) {
            _this.pending.resolvers.push(resolve);
            _this._resolve();
        });
    };
    return PieceShadowManager;
}());
exports.default = PieceShadowManager;
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
//# sourceMappingURL=PieceShadowManager.js.map