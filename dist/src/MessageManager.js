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
        this.domContainer = document.createElement('div');
        this.domMessage = document.createElement('div');
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
//# sourceMappingURL=MessageManager.js.map