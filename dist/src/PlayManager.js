"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appendCss_1 = __importDefault(require("./helpers/appendCss"));
var PlayManagerEventController_1 = __importDefault(require("./event/PlayManagerEventController"));
// TODO: implement play
var MoveData = /** @class */ (function () {
    function MoveData(_a) {
        var _this = this;
        var containerDom = _a.containerDom, renData = _a.renData, title = _a.title, str = _a.str, onClick = _a.onClick;
        this.renData = renData;
        var span = document.createElement('span');
        span.title = title;
        span.innerText = str;
        containerDom.appendChild(span);
        this.dom = span;
        span.onclick = function () {
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
    return MoveData;
}());
var PlayManager = /** @class */ (function () {
    function PlayManager() {
        this.containerClassName = 'player-table';
        this.renDataList = [];
        this.playEventController = new PlayManagerEventController_1.default();
    }
    PlayManager.prototype.setProps = function (khmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.options = khmerChessBoard.options;
        (0, appendCss_1.default)(this.options.uniqueClassName, this.css());
    };
    PlayManager.prototype.add = function (str, title) {
        var _this = this;
        var moveData = new MoveData({
            containerDom: this.containerDom,
            renData: '',
            title: title,
            str: str,
            onClick: function () {
                _this.playEventController.click(moveData);
            },
        });
        this.renDataList.push(moveData);
        this.rendCurrent();
    };
    PlayManager.prototype.rendCurrent = function () {
        this.renDataList.forEach(function (e) { return e.current(false); });
        if (this.renDataList.length) {
            var moveData = this.renDataList[this.renDataList.length - 1];
            moveData.current(true);
        }
    };
    PlayManager.prototype.draw = function (playerContainer) {
        var containerWidth = ~~(this.options.width * 3 / 4);
        var table = document.createElement('table');
        table.classList.add(this.options.uniqueClassName);
        table.classList.add(this.containerClassName);
        playerContainer.appendChild(table);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        var tdHistory = document.createElement('td');
        var div = document.createElement('div');
        div.style.width = containerWidth + "px";
        div.classList.add('container');
        this.containerDom = div;
        tdHistory.appendChild(div);
        tdHistory.style.width = containerWidth + "px";
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        var btn = document.createElement('button');
        btn.innerHTML = '<';
        this.backBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '^';
        this.playBtnDom = btn;
        tdHistory.appendChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = '#';
        this.pauseBtnDom = btn;
        tdHistory.appendChild(btn);
        btn.style.display = 'none';
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '>';
        this.nextBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        this.btnListen();
    };
    PlayManager.prototype.btnListen = function () {
        var _this = this;
        this.backBtnDom.onclick = function () {
            _this.playEventController.back();
        };
        this.playBtnDom.onclick = function () {
            _this.playEventController.play();
        };
        this.pauseBtnDom.onclick = function () {
            _this.playEventController.pause();
        };
        this.nextBtnDom.onclick = function () {
            _this.playEventController.next();
        };
    };
    PlayManager.prototype.css = function () {
        var containerSelector = "table." + this.options.uniqueClassName + "." + this.containerClassName;
        return "\n        " + containerSelector + " {\n            width: 100%;\n            height: 100%;\n            box-shadow: rgb(0, 0, 0) 0px 0px 2px inset;\n        }\n        " + containerSelector + " td {\n            padding: 0px;\n            margin: 0px;\n            text-align: center;\n            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px inset;\n        }\n        " + containerSelector + " .container {\n            font-size: 14px;\n            text-align: right;\n            overflow-x: auto;\n        }\n        " + containerSelector + " .container::-webkit-scrollbar {\n            width: 1em;\n        }\n        " + containerSelector + " .container span{\n            margin: 0 2px;\n            padding: 0 2px;\n            border: 1px solid rgba(0, 0, 0, 0.2);\n            border-radius: 2px;\n            cursor: pointer;\n        }\n        " + containerSelector + " .container span.current{\n            background-color: rgba(255, 255, 255, 0.3);\n            cursor: auto;\n        }\n        ";
    };
    PlayManager.prototype.undo = function () {
        throw new Error('TODO undo');
    };
    PlayManager.prototype.stop = function () {
        this.khmerChessBoard.boardManager.clearTurnCells();
    };
    return PlayManager;
}());
exports.default = PlayManager;
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
//# sourceMappingURL=PlayManager.js.map