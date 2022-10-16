"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appendCss_1 = __importDefault(require("./helpers/appendCss"));
var PlayManagerEventController_1 = __importDefault(require("./event/PlayManagerEventController"));
var MoveData_1 = __importDefault(require("./MoveData"));
var PlayManager = /** @class */ (function () {
    function PlayManager(khmerChessBoard) {
        this.renDataList = [];
        this.containerClassName = 'player-table';
        this.currentIndex = 0;
        this.khmerChessBoard = khmerChessBoard;
        this.playEventController = new PlayManagerEventController_1.default();
        (0, appendCss_1.default)(this.khmerChessBoard.options.uniqueClassName, this.css());
        this.playerContainer = document.createElement('div');
        this.dataContainerDom = document.createElement('div');
        this.backBtnDom = document.createElement('button');
        this.playBtnDom = document.createElement('button');
        this.pauseBtnDom = document.createElement('button');
        this.nextBtnDom = document.createElement('button');
    }
    PlayManager.prototype.destroy = function () {
        this.renDataList.forEach(function (moveData) {
            moveData.destroy();
        });
        this.renDataList = [];
        this.playerContainer = null;
        this.dataContainerDom = null;
        this.renDataList = null;
        this.playEventController.destroy();
        this.playEventController = null;
        this.backBtnDom = null;
        this.playBtnDom = null;
        this.pauseBtnDom = null;
        this.nextBtnDom = null;
        this.khmerChessBoard = null;
    };
    PlayManager.prototype.hideController = function () {
        if (this.playerContainer.parentElement) {
            this.playerContainer.parentElement.style.display = 'none';
        }
    };
    PlayManager.prototype.showController = function () {
        if (this.playerContainer.parentElement) {
            this.playerContainer.parentElement.style.display = '';
        }
    };
    Object.defineProperty(PlayManager.prototype, "isControllerHidden", {
        get: function () {
            var _a;
            return !!(((_a = this.playerContainer.parentElement) === null || _a === void 0 ? void 0 : _a.style.display.toLocaleLowerCase()) === 'none');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "isCanBack", {
        get: function () {
            return !!(this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "isCanNext", {
        get: function () {
            var movesLength = this.khmerChessBoard.khmerChess.kpgn.moves.length;
            return this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex < movesLength;
        },
        enumerable: false,
        configurable: true
    });
    PlayManager.prototype.renderMoveData = function () {
        var _this = this;
        this.renDataList.forEach(function (moveData) {
            moveData.destroy();
        });
        var isEnglish = this.khmerChessBoard.options.isEnglish;
        var current = this.currentIndex - 1;
        var moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.renDataList = moves.map(function (move, i) {
            var moveData = new MoveData_1.default({
                index: i + 1,
                containerDom: _this.dataContainerDom,
                renData: '',
                title: move.getMessage(isEnglish),
                str: move.toString(),
                onClick: function () {
                    _this.toIndex(moveData.index);
                    _this.playEventController.click(moveData);
                },
            });
            if (current === i) {
                moveData.current(true);
            }
            return moveData;
        });
        if (this.renDataList.length) {
            this.dataContainerDom.scrollTop = this.dataContainerDom.scrollHeight;
        }
    };
    PlayManager.prototype.draw = function (playerContainer) {
        this.playerContainer = playerContainer;
        var containerWidth = ~~(this.khmerChessBoard.options.width * 3 / 4);
        var table = document.createElement('table');
        table.classList.add(this.khmerChessBoard.options.uniqueClassName);
        table.classList.add(this.containerClassName);
        playerContainer.appendChild(table);
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        var tdHistory = document.createElement('td');
        var div = document.createElement('div');
        div.style.width = containerWidth + "px";
        div.style.height = '50px';
        div.classList.add('container');
        this.dataContainerDom = div;
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
            _this.back();
        };
        this.playBtnDom.onclick = function () {
            _this.play();
        };
        this.pauseBtnDom.onclick = function () {
            _this.pause();
        };
        this.nextBtnDom.onclick = function () {
            _this.next();
        };
    };
    PlayManager.prototype.css = function () {
        var containerSelector = "table." + this.khmerChessBoard.options.uniqueClassName + "." + this.containerClassName;
        return "\n        " + containerSelector + " {\n            width: 100%;\n            height: 100%;\n            box-shadow: rgb(0, 0, 0) 0px 0px 2px inset;\n        }\n        " + containerSelector + " td {\n            padding: 0px;\n            margin: 0px;\n            text-align: center;\n            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px inset;\n        }\n        " + containerSelector + " .container {\n            font-size: 14px;\n            text-align: right;\n            overflow-x: auto;\n        }\n        " + containerSelector + " .container::-webkit-scrollbar {\n            width: 1em;\n        }\n        " + containerSelector + " .container .data {\n            display: inline-block;\n            margin: 2px;\n            padding: 0 2px;\n            border: 1px solid green;\n            border-radius: 2px;\n            cursor: pointer;\n        }\n        " + containerSelector + " .container > div.current {\n            background-color: rgba(255, 255, 255, 0.3);\n            cursor: not-allowed;\n        }\n        " + containerSelector + " .container span.index {\n            color: grey;\n            padding-right: 2px;\n            border-right: 1px solid gray;\n            margin-right: 2px;\n            font-size: 12px;\n        }\n        ";
    };
    Object.defineProperty(PlayManager.prototype, "isCanUndo", {
        get: function () {
            return !!this.khmerChessBoard.khmerChess.kpgn.latestMove;
        },
        enumerable: false,
        configurable: true
    });
    PlayManager.prototype.undo = function () {
        var _this = this;
        if (this.isCanUndo) {
            this.offTurning();
            this.toIndex(this.khmerChessBoard.khmerChess.kpgn.moves.length);
            this.back(function () {
                _this.khmerChessBoard.khmerChess.kpgn.moves.pop();
                _this.turning();
            });
        }
    };
    Object.defineProperty(PlayManager.prototype, "isCanPlay", {
        get: function () {
            return !this.isCanNext;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "isPlaying", {
        get: function () {
            return this.khmerChessBoard.boardManager.isTurning;
        },
        enumerable: false,
        configurable: true
    });
    PlayManager.prototype.offTurning = function () {
        this.khmerChessBoard.boardManager.clearTurnCells();
        this.render();
    };
    PlayManager.prototype.turning = function () {
        this.khmerChessBoard.boardManager.takeTurn();
        this.render();
    };
    PlayManager.prototype.play = function () {
        if (!this.isCanPlay) {
            return false;
        }
        this.playEventController.play();
        this.turning();
        return true;
    };
    PlayManager.prototype.pause = function () {
        this.playEventController.pause();
        this.offTurning();
        return true;
    };
    PlayManager.prototype.toggle = function () {
        if (this.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    };
    PlayManager.prototype.render = function () {
        this.playBtnDom.style.display = 'none';
        this.pauseBtnDom.style.display = 'none';
        this.backBtnDom.disabled = true;
        this.nextBtnDom.disabled = true;
        if (this.isPlaying) {
            this.pauseBtnDom.style.display = '';
        }
        else {
            this.playBtnDom.style.display = '';
        }
        this.backBtnDom.disabled = !this.isCanBack;
        this.nextBtnDom.disabled = !this.isCanNext;
        this.playBtnDom.disabled = !this.isCanPlay;
        this.renderMoveData();
    };
    PlayManager.prototype.loadCurrentRen = function () {
        var _a;
        this.khmerChessBoard.loadRen((_a = this.currentMove) === null || _a === void 0 ? void 0 : _a.renStr);
        this.khmerChessBoard.boardManager.checkBoardEvent();
    };
    Object.defineProperty(PlayManager.prototype, "currentMove", {
        get: function () {
            return this.khmerChessBoard.khmerChess.kpgn.getMove(this.currentIndex - 1);
        },
        enumerable: false,
        configurable: true
    });
    PlayManager.prototype.back = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        if (!this.isCanBack) {
            return false;
        }
        this.offTurning();
        this.playEventController.back();
        this.currentIndex--;
        var kpgn = this.khmerChessBoard.khmerChess.kpgn;
        var move = kpgn.getMove(this.currentIndex);
        if (move === null) {
            return false;
        }
        this.applyMoveBack(move, function (error) {
            callback(error);
        });
        return true;
    };
    PlayManager.prototype.next = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        var kpgn = this.khmerChessBoard.khmerChess.kpgn;
        this.playEventController.next();
        var move = kpgn.getMove(this.currentIndex);
        if (move === null) {
            return false;
        }
        this.currentIndex++;
        this.applyMove(move, function (error) {
            callback(error);
        });
        return true;
    };
    PlayManager.prototype.applyMove = function (move, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var _a = this.khmerChessBoard, boardManager = _a.boardManager, graveyardManager = _a.graveyardManager, pieceShadowManager = _a.pieceShadowManager, soundManager = _a.soundManager;
        pieceShadowManager.finishAnimations();
        var finish = function () {
            var fromCell = boardManager.get(move.moveFrom.index);
            var toCell = boardManager.get(move.moveTo.index);
            pieceShadowManager.movingPiece(fromCell, toCell, function () {
                fromCell.movePieceTo(toCell);
                if (move.isUpgrading) {
                    toCell.upgrade();
                }
                _this.loadCurrentRen();
                _this.highlightCurrentMove();
                soundManager.playMove();
                _this.render();
                callback();
            });
        };
        if (move.captured) {
            var fromBCell_1 = boardManager.get(move.captured.fromBoardPoint.index);
            var toGYCell_1 = graveyardManager.get(move.captured.toGraveyardPoint.index);
            pieceShadowManager.movingPiece(fromBCell_1, toGYCell_1, function () {
                fromBCell_1.movePieceToGraveyard(toGYCell_1);
                graveyardManager.scrollLastToView();
                finish();
            });
            soundManager.playCapture();
        }
        else {
            finish();
        }
    };
    PlayManager.prototype.applyMoveBack = function (move, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var _a = this.khmerChessBoard, boardManager = _a.boardManager, graveyardManager = _a.graveyardManager, pieceShadowManager = _a.pieceShadowManager, soundManager = _a.soundManager;
        pieceShadowManager.finishAnimations();
        pieceShadowManager;
        var fromCell = boardManager.get(move.moveTo.index);
        var toCell = boardManager.get(move.moveFrom.index);
        var finish = function () {
            _this.loadCurrentRen();
            _this.highlightCurrentMove();
            soundManager.playMove();
            _this.render();
            callback();
        };
        pieceShadowManager.movingPiece(fromCell, toCell, function () {
            fromCell.movePieceTo(toCell);
            if (move.isUpgrading) {
                toCell.downgrade();
            }
            if (move.captured) {
                var fromGYCell_1 = graveyardManager.get(move.captured.toGraveyardPoint.index);
                var toBCell_1 = boardManager.get(move.captured.fromBoardPoint.index);
                pieceShadowManager.movingPiece(fromGYCell_1, toBCell_1, function () {
                    fromGYCell_1.movePieceFromGraveyard(toBCell_1);
                    graveyardManager.scrollLastToView();
                    finish();
                });
                soundManager.playCapture();
            }
            else {
                finish();
            }
        });
    };
    PlayManager.prototype.highlightCurrentMove = function () {
        var boardManager = this.khmerChessBoard.boardManager;
        boardManager.clearSelectedCells();
        boardManager.clearMovedCells();
        boardManager.clearAttackCells();
        var currentMove = this.currentMove;
        if (currentMove) {
            var lastFromCell = boardManager.get(currentMove.moveFrom.index);
            var lastToCell = boardManager.get(currentMove.moveTo.index);
            if (lastFromCell !== null && lastToCell !== null) {
                boardManager.highlightMovedCells(lastFromCell, lastToCell);
            }
            if (currentMove.attacker) {
                var attacker = currentMove.attacker;
                var cell = boardManager.get(attacker.point.index);
                cell.attack(true);
                if (attacker.piece !== null) {
                    var king = boardManager.getKing(attacker.piece.colorOpponent);
                    if (king != null) {
                        king.attack(true);
                    }
                }
            }
        }
    };
    PlayManager.prototype.toIndex = function (index) {
        var pieceShadowManager = this.khmerChessBoard.pieceShadowManager;
        var isQuickMove = pieceShadowManager.isQuickMove;
        while (this.currentIndex !== index) {
            pieceShadowManager.quickMove(Math.abs(this.currentIndex - index) !== 1);
            if (this.currentIndex < index) {
                this.next();
            }
            else {
                this.back();
            }
        }
        pieceShadowManager.quickMove(isQuickMove);
        this.highlightCurrentMove();
    };
    PlayManager.prototype.resetCurrentIndex = function () {
        var moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.currentIndex = moves.length;
    };
    return PlayManager;
}());
exports.default = PlayManager;
//# sourceMappingURL=PlayManager.js.map