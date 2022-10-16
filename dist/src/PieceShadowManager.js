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
        this.tdShadowDom = document.createElement('div');
    }
    PieceShadowManager.prototype.destroy = function () {
        this.khmerChessBoard = null;
        this.tdShadowDom = null;
    };
    Object.defineProperty(PieceShadowManager.prototype, "isQuickMove", {
        get: function () {
            return this._quickMove;
        },
        enumerable: false,
        configurable: true
    });
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
        var fromBc = fromCell.containerDom.getBoundingClientRect();
        var toBc = toCell.containerDom.getBoundingClientRect();
        fromCell.removePieceClasses();
        if (this._quickMove) {
            callback();
            callback = function () { };
        }
        else {
            var div_1 = document.createElement('div');
            var pice = fromCell.piece;
            if (!pice || !div_1.animate || this.khmerChessBoard.options.isFullScreen) {
                callback();
            }
            else {
                this.tdShadowDom.appendChild(div_1);
                div_1.style.top = "" + fromBc.top;
                div_1.style.left = "" + fromBc.left;
                div_1.classList.add("type-" + pice.type);
                div_1.classList.add("color-" + pice.color);
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
        while (this.pending.callbacks.length > 0) {
            this.pending.callbacks[0]();
        }
        this._resolve();
    };
    PieceShadowManager.prototype._resolve = function () {
        var _a = this.pending, resolvers = _a.resolvers, callbacks = _a.callbacks;
        while (callbacks.length === 0 &&
            resolvers.length > 0) {
            var resolve = resolvers.shift();
            resolve === null || resolve === void 0 ? void 0 : resolve();
        }
    };
    PieceShadowManager.prototype.waitForAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, _) {
            _this.pending.resolvers.push(resolve);
            _this._resolve();
        });
    };
    return PieceShadowManager;
}());
exports.default = PieceShadowManager;
//# sourceMappingURL=PieceShadowManager.js.map