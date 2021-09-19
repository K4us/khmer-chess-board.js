"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceShadowManager = /** @class */ (function () {
    function PieceShadowManager(khmerChessBoard) {
        this._quickMove = false;
        this.pending = {
            resolvers: [],
            callbacks: [],
        };
        this.khmerChessBoard = khmerChessBoard;
    }
    PieceShadowManager.prototype.destroy = function () {
        this.khmerChessBoard = null;
        this.tdShadowDom = null;
    };
    PieceShadowManager.prototype.quickMove = function (enable) {
        this._quickMove = enable;
        if (enable) {
            this.finishAnimations();
        }
    };
    PieceShadowManager.prototype.setTdShadow = function (tdShadowDown) {
        this.tdShadowDom = tdShadowDown;
    };
    PieceShadowManager.prototype.movingPiece = function (fromCell, toCell, callback) {
        var _this = this;
        if (this._quickMove) {
            fromCell.removePieceClasses();
            callback();
        }
        else {
            var div_1 = document.createElement('div');
            var pice = fromCell.piece;
            if (!pice || !div_1.animate || this.khmerChessBoard.options.isFullScreen) {
                callback();
            }
            else {
                var fromBc = fromCell.containerDom.getBoundingClientRect();
                var toBc = toCell.containerDom.getBoundingClientRect();
                this.tdShadowDom.appendChild(div_1);
                div_1.style.top = "" + fromBc.top;
                div_1.style.left = "" + fromBc.left;
                div_1.classList.add("type-" + pice.type);
                div_1.classList.add("color-" + pice.color);
                fromCell.removePieceClasses();
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
                var animation_1 = div_1.animate(option, 100);
                var pendingCallback_1 = function () {
                    animation_1.cancel();
                    _this.removePendingCallback(pendingCallback_1);
                    _this._resolve();
                };
                this.addPendingCallback(pendingCallback_1);
                var timeout_1 = setTimeout(function () { return pendingCallback_1(); }, 1e3);
                animation_1.onfinish = animation_1.oncancel = function () {
                    clearTimeout(timeout_1);
                    _this.removePendingCallback(pendingCallback_1);
                    _this.tdShadowDom.removeChild(div_1);
                    callback();
                    callback = function () { };
                };
            }
        }
    };
    PieceShadowManager.prototype.addPendingCallback = function (callback) {
        this.pending.callbacks.push(callback);
    };
    PieceShadowManager.prototype.removePendingCallback = function (callback) {
        this.pending.callbacks = this.pending.callbacks.filter(function (cb) {
            return cb !== callback;
        });
    };
    PieceShadowManager.prototype.finishAnimations = function () {
        while (this.pending.callbacks.length) {
            this.pending.callbacks[0]();
        }
        this._resolve();
    };
    PieceShadowManager.prototype._resolve = function () {
        while (!this.pending.callbacks.length &&
            this.pending.resolvers.length) {
            var resolve = this.pending.resolvers.shift();
            if (resolve) {
                resolve();
            }
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
//# sourceMappingURL=PieceShadowManager.js.map