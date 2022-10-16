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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var KhmerChessBoard_1 = __importDefault(require("./KhmerChessBoard"));
var KhmerChessBoardComp = /** @class */ (function (_super) {
    __extends(KhmerChessBoardComp, _super);
    function KhmerChessBoardComp(props) {
        var _this = _super.call(this, props) || this;
        _this.khmerChessBoard = null;
        _this.myRef = react_1.default.createRef();
        return _this;
    }
    KhmerChessBoardComp.prototype.setBoardOptions = function (options) {
        if (this.khmerChessBoard === null) {
            return;
        }
        var khmerChessBoard = this.khmerChessBoard;
        khmerChessBoard.pieceShadowManager.quickMove(!!options.isQuickMove);
        if (options.isSoundEnabled) {
            khmerChessBoard.soundManager.enable();
        }
        if (options.isLogging) {
            khmerChessBoard.boardManager.addBoardStatusEventListener(function (boardStatusEvent) {
                console.log(boardStatusEvent.message);
            });
        }
    };
    KhmerChessBoardComp.prototype.componentWillReceiveProps = function (nextProps) {
        this.setBoardOptions(nextProps);
    };
    KhmerChessBoardComp.prototype.componentDidMount = function () {
        var props = this.props;
        var container = this.myRef.current;
        var khmerChessBoard = new KhmerChessBoard_1.default();
        this.khmerChessBoard = khmerChessBoard;
        khmerChessBoard.setOptions({
            width: props.width,
            container: container,
        });
        this.setBoardOptions(props);
        props.load(khmerChessBoard);
    };
    KhmerChessBoardComp.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.khmerChessBoard) === null || _a === void 0 ? void 0 : _a.destroy();
        this.khmerChessBoard = null;
    };
    KhmerChessBoardComp.prototype.render = function () {
        return (0, jsx_runtime_1.jsx)("div", { className: 'kcb-container', ref: this.myRef }, void 0);
    };
    KhmerChessBoardComp.version = KhmerChessBoard_1.default.version;
    return KhmerChessBoardComp;
}(react_1.default.Component));
exports.default = KhmerChessBoardComp;
//# sourceMappingURL=KhmerChessBoardComp.js.map