"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var package_json_1 = __importDefault(require("../package.json"));
var GraveyardManager_1 = __importDefault(require("./GraveyardManager"));
var SoundManager_1 = __importDefault(require("./SoundManager"));
var BoardManager_1 = __importDefault(require("./BoardManager"));
var constance_1 = require("./providers/constance");
var addCss_1 = __importDefault(require("./helpers/addCss"));
var addCssNote_1 = __importDefault(require("./helpers/addCssNote"));
var drawBoardAndGraveyard_1 = __importDefault(require("./helpers/drawBoardAndGraveyard"));
var OptionsManager_1 = __importDefault(require("./OptionsManager"));
var khmer_chess_1 = require("khmer-chess");
var MessageManager_1 = __importDefault(require("./MessageManager"));
var PlayManager_1 = __importDefault(require("./PlayManager"));
var PieceShadowManager_1 = __importDefault(require("./PieceShadowManager"));
var khmer_chess_2 = require("khmer-chess");
var KhmerChessBoard = /** @class */ (function () {
    function KhmerChessBoard() {
    }
    KhmerChessBoard.prototype.setOptions = function (options) {
        var _this = this;
        this.khmerChess = new khmer_chess_1.KhmerChess();
        this.options = new OptionsManager_1.default();
        this.playManager = new PlayManager_1.default();
        this.graveyardManager = new GraveyardManager_1.default();
        this.boardManager = new BoardManager_1.default();
        this.soundManager = new SoundManager_1.default();
        this.messageManager = new MessageManager_1.default();
        this.pieceShadowManager = new PieceShadowManager_1.default();
        if (!options.container) {
            throw new Error('Container is required!');
        }
        this.containerDom = options.container;
        if (options.width < this.options.minWidth) {
            throw new Error("Board width must more than " + this.options.minWidth + " ");
        }
        if (options.width) {
            this.options.width = options.width;
        }
        if (options.width) {
            this.options.width = options.width;
        }
        this.playManager.setProps(this);
        this.graveyardManager.setProps(this);
        this.boardManager.setProps(this);
        this.soundManager.setProps(this);
        this.messageManager.setProps(this);
        this.pieceShadowManager.setProps(this);
        this.render();
        this.boardManager.attachClickEvent();
        var boardEventController = this.boardManager.boardEventController;
        boardEventController.addOnCellSelectedEventListener(function (cell) {
            var points = cell.canMovePoints;
            points.forEach(function (point) {
                var targetCell = _this.boardManager.get(point.index);
                targetCell.setCanMove();
            });
        });
        boardEventController.addOnCellDeselectedEventListener(function (cell) {
            _this.boardManager.clearCanMoveCells();
        });
        boardEventController.addOnAttemptMoveEventListener(function (_a) {
            var fromCell = _a.fromCell, toCell = _a.toCell;
            _this.move(fromCell.point.index, toCell.point.index);
        });
        this.khmerChess.addBoardEventListener(function (boardEvent) {
            if (boardEvent.isAttack) {
                _this.attack(boardEvent);
            }
        });
    };
    KhmerChessBoard.prototype.attack = function (boardEvent) {
        var actorPieceIndex = boardEvent.actorPieceIndex;
        var cell = this.boardManager.get(actorPieceIndex.point.index);
        cell.attack(true);
        var king = this.boardManager.getKing(actorPieceIndex.piece.colorOpponent);
        king.attack(true);
    };
    KhmerChessBoard.prototype.move = function (fromIndex, toIndex) {
        var move = this.khmerChess.move(fromIndex, toIndex);
        this.boardManager.clearSelectedCells();
        if (move !== null) {
            this.applyMove(move);
        }
    };
    KhmerChessBoard.prototype.setFullScreen = function (isFullScreen) {
        this.options.isFullScreen = isFullScreen;
        var table = this.domRootBoard;
        table.classList.remove(constance_1.POPUP_CLASS_NAME);
        table.style.top = '0';
        table.style.left = '0';
        table.style.transform = '';
        table.style.zIndex = null;
        if (isFullScreen) {
            table.classList.add(constance_1.POPUP_CLASS_NAME);
            table.style.top = '50%';
            table.style.left = '50%';
            var scaleFit = this.options.getScaleFit(table.getBoundingClientRect());
            table.style.transform = "translate(-50%,-50%) scale(" + scaleFit + ")";
            table.style.zIndex = '9999';
        }
    };
    KhmerChessBoard.prototype.render = function () {
        this.addAllDomCss();
        var _a = (0, drawBoardAndGraveyard_1.default)({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
            container: this.containerDom,
            boardManager: this.boardManager,
            graveyardManager: this.graveyardManager,
        }), domRootBoard = _a.domRootBoard, domGraveyard = _a.domGraveyard, playerContainer = _a.playerContainer, tdShadow = _a.tdShadow;
        this.domRootBoard = domRootBoard;
        this.graveyardManager.setDom(domGraveyard);
        this.pieceShadowManager.setTdShadow(tdShadow);
        this.setCellNote();
        this.applyPieces();
        this.messageManager.draw();
        this.playManager.draw(playerContainer);
    };
    KhmerChessBoard.prototype.setLocale = function (locale) {
        var locales = [KhmerChessBoard.LOCALE_ENGLISH, KhmerChessBoard.LOCALE_KHMER];
        if (!~locales.indexOf(locale)) {
            throw new Error("Unsupported locale: " + locale + ", supported locales: " + locales.join(','));
        }
        else {
            this.options.isEnglish = locale === locales[0];
            this.setCellNote();
        }
    };
    KhmerChessBoard.prototype.setCellNote = function () {
        this.boardManager.clearCellNote();
        this.graveyardManager.clearCellNote();
        this.boardManager.setCellNote();
        this.graveyardManager.setCellNote();
    };
    KhmerChessBoard.prototype.addAllDomCss = function () {
        (0, addCss_1.default)({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
        });
        (0, addCssNote_1.default)({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
        });
        (0, addCssNote_1.default)({
            uniqueClassName: this.options.uniqueClassName,
            options: this.options,
            isEnglish: true,
        });
    };
    KhmerChessBoard.prototype.loadRen = function (renStr) {
        this.khmerChess.loadRENStr(renStr);
        this.applyPieces();
        this.boardManager.changeTurn(this.khmerChess.turn);
    };
    KhmerChessBoard.prototype.applyPieces = function () {
        this.graveyardManager.renderKhmerChessPieces();
        this.boardManager.renderKhmerChessPieces();
    };
    KhmerChessBoard.prototype.removeAllDomElements = function () {
        var elements = document.querySelectorAll("table." + this.options.uniqueClassName + " ");
        elements.forEach(function (element) {
            element.parentElement.removeChild(element);
        });
        this.removeAllDomCss();
    };
    KhmerChessBoard.prototype.removeAllDomCss = function () {
        var elements = document.querySelectorAll("style." + this.options.uniqueClassName + " ");
        elements.forEach(function (element) {
            element.parentElement.removeChild(element);
        });
    };
    KhmerChessBoard.prototype.destroy = function () {
        this.removeAllDomElements();
        this.containerDom = null;
        this.graveyardManager = null;
        this.boardManager = null;
        this.soundManager = null;
        this.khmerChess = null;
    };
    KhmerChessBoard.prototype.applyMove = function (move) {
        this.boardManager.clearMovedCells();
        this.boardManager.clearAttackCells();
        if (move.captured) {
            var fromBCell_1 = this.boardManager.get(move.captured.fromBoardPoint.index);
            var toGYCell_1 = this.graveyardManager.get(move.captured.toGraveyardPoint.index);
            this.pieceShadowManager.movingPiece(fromBCell_1, toGYCell_1, function () {
                fromBCell_1.movePieceToGraveyard(toGYCell_1);
            });
            this.soundManager.playCapture();
        }
        var fromCell = this.boardManager.get(move.moveFrom.index);
        var toCell = this.boardManager.get(move.moveTo.index);
        this.pieceShadowManager.movingPiece(fromCell, toCell, function () {
            fromCell.movePieceTo(toCell);
        });
        this.soundManager.playMove();
        this.khmerChess.checkBoardEvent();
        var turn = khmer_chess_1.Piece.oppositeColor(this.khmerChess.turn);
        this.playManager.add(move.toString(), move.getMessage(this.options.isEnglish));
        this.boardManager.changeTurn(turn);
    };
    KhmerChessBoard.prototype.start = function (turningColor) {
        this.boardManager.changeTurn(turningColor);
    };
    KhmerChessBoard.prototype.reset = function () {
        // TODO: reset all state
        this.boardManager.clearSelectedCells();
        this.boardManager.clearAttackCells();
        this.boardManager.clearMovedCells();
        this.playManager.stop();
        this.loadRen();
        this.boardManager.attachClickEvent();
    };
    KhmerChessBoard.PIECE_COLOR_BLACK = khmer_chess_2.PIECE_COLOR_BLACK;
    KhmerChessBoard.PIECE_COLOR_WHITE = khmer_chess_2.PIECE_COLOR_WHITE;
    KhmerChessBoard.PIECE_TYPE_BOAT = khmer_chess_2.PIECE_TYPE_BOAT;
    KhmerChessBoard.PIECE_TYPE_TRANSFORM_FISH = khmer_chess_2.PIECE_TYPE_TRANSFORM_FISH;
    KhmerChessBoard.PIECE_TYPE_GENERAL = khmer_chess_2.PIECE_TYPE_GENERAL;
    KhmerChessBoard.PIECE_TYPE_QUEEN = khmer_chess_2.PIECE_TYPE_QUEEN;
    KhmerChessBoard.PIECE_TYPE_KING = khmer_chess_2.PIECE_TYPE_KING;
    KhmerChessBoard.PIECE_TYPE_HORSE = khmer_chess_2.PIECE_TYPE_HORSE;
    KhmerChessBoard.PIECE_TYPE_FISH = khmer_chess_2.PIECE_TYPE_FISH;
    KhmerChessBoard.LOCALE_ENGLISH = 'en';
    KhmerChessBoard.LOCALE_KHMER = 'km';
    KhmerChessBoard.title = package_json_1.default.name;
    KhmerChessBoard.version = package_json_1.default.version;
    return KhmerChessBoard;
}());
exports.default = KhmerChessBoard;
/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */
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
//# sourceMappingURL=KhmerChessBoard.js.map