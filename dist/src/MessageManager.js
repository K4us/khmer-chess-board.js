"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appendCss_1 = __importDefault(require("./helpers/appendCss"));
var MessageManager = /** @class */ (function () {
    function MessageManager(khmerChessBoard) {
        this.containerClassName = 'message-container';
        this.messageClassName = 'message';
        this.logEnabled = true;
        this.khmerChessBoard = khmerChessBoard;
        (0, appendCss_1.default)(this.khmerChessBoard.options.uniqueClassName, this.css());
    }
    MessageManager.prototype.destroy = function () {
        this.domContainer = null;
        this.domMessage = null;
        this.khmerChessBoard = null;
    };
    MessageManager.prototype.enableLog = function () {
        this.logEnabled = true;
    };
    MessageManager.prototype.disableLog = function () {
        this.logEnabled = false;
    };
    MessageManager.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (!this.logEnabled) {
            return;
        }
        console.log.apply(console, __spreadArray([message], optionalParams, false));
    };
    MessageManager.prototype.showMessage = function (message) {
        this.domContainer.style.display = 'block';
        this.domMessage.innerHTML = message;
    };
    MessageManager.prototype.hide = function () {
        this.domContainer.style.display = 'none';
    };
    MessageManager.prototype.draw = function () {
        var container = this.khmerChessBoard.domRootBoard;
        var bc = this.khmerChessBoard.domRootBoard.getBoundingClientRect();
        var div = document.createElement('div');
        this.domContainer = div;
        div.classList.add(this.khmerChessBoard.options.uniqueClassName);
        div.classList.add(this.containerClassName);
        container.appendChild(div);
        div.style.height = bc.height + "px";
        div.style.transform = "translateY(-" + bc.height + "px)";
        var divMessage = document.createElement('div');
        this.domMessage = divMessage;
        divMessage.classList.add(this.messageClassName);
        div.appendChild(divMessage);
        this.hide();
    };
    MessageManager.prototype.css = function () {
        var containerSelector = "." + this.khmerChessBoard.options.uniqueClassName + "." + this.containerClassName;
        return "\n        " + containerSelector + " {\n            width: " + this.khmerChessBoard.options.width + "px;\n            text-align: center;\n            border: 0px;\n            padding: 10px;\n            box-sizing: border-box;\n            margin: auto;\n            position: absolute;\n            background-color: rgba(0, 0, 0, 0.8);\n            color: white;\n            font-size: 18px;\n        }\n        " + containerSelector + " ." + this.messageClassName + " {\n            margin-top: 50%;\n        }\n        ";
    };
    return MessageManager;
}());
exports.default = MessageManager;
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
//# sourceMappingURL=MessageManager.js.map