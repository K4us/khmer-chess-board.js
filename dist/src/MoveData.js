"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var khmer_chess_1 = require("khmer-chess");
var MoveData = /** @class */ (function () {
    function MoveData(_a) {
        var _this = this;
        var index = _a.index, containerDom = _a.containerDom, renData = _a.renData, title = _a.title, str = _a.str, onClick = _a.onClick;
        this.index = index;
        this.renData = renData;
        var span = document.createElement('span');
        span.title = title;
        containerDom.appendChild(span);
        this.dom = span;
        var indexSpan = document.createElement('span');
        indexSpan.innerText = khmer_chess_1.KhmerChess.toKhmerNum(index);
        indexSpan.classList.add('index');
        span.appendChild(indexSpan);
        var infoSpan = document.createElement('span');
        infoSpan.classList.add('info');
        infoSpan.innerText = str;
        span.appendChild(infoSpan);
        infoSpan.onclick = function () {
            if (!_this.isCurrent) {
                onClick();
            }
        };
    }
    Object.defineProperty(MoveData.prototype, "isCurrent", {
        get: function () {
            return this.dom.classList.contains('current');
        },
        enumerable: false,
        configurable: true
    });
    MoveData.prototype.current = function (b) {
        this.dom.classList.remove('current');
        if (b) {
            this.dom.classList.add('current');
        }
    };
    MoveData.prototype.destroy = function () {
        var _a;
        if (this.dom !== null) {
            this.dom.onclick = null;
            (_a = this.dom.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.dom);
        }
    };
    MoveData.prototype.scrollIntoView = function () {
        this.dom.scrollIntoView();
    };
    return MoveData;
}());
exports.default = MoveData;
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
//# sourceMappingURL=MoveData.js.map