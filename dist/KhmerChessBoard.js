"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _package = _interopRequireDefault(require("../package.json"));

var _GraveyardManager = _interopRequireDefault(require("./GraveyardManager"));

var _SoundManager = _interopRequireDefault(require("./SoundManager"));

var _BoardManager = _interopRequireDefault(require("./BoardManager"));

var _constance = require("./providers/constance");

var _addCss = _interopRequireDefault(require("./helpers/addCss"));

var _addCssNote = _interopRequireDefault(require("./helpers/addCssNote"));

var _drawBoardAndGraveyard = _interopRequireDefault(require("./helpers/drawBoardAndGraveyard"));

var _OptionsManager = _interopRequireDefault(require("./OptionsManager"));

var _khmerChess = require("khmer-chess");

var _MessageManager = _interopRequireDefault(require("./MessageManager"));

var _PlayerManager = _interopRequireDefault(require("./PlayerManager"));

var _PieceShadowManager = _interopRequireDefault(require("./PieceShadowManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KhmerChessBoard = /*#__PURE__*/function () {
  function KhmerChessBoard() {
    _classCallCheck(this, KhmerChessBoard);

    _defineProperty(this, "containerDom", void 0);

    _defineProperty(this, "domBoard", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "playerManager", void 0);

    _defineProperty(this, "graveyardManager", void 0);

    _defineProperty(this, "boardManager", void 0);

    _defineProperty(this, "khmerChess", void 0);

    _defineProperty(this, "soundManager", void 0);

    _defineProperty(this, "messageManager", void 0);

    _defineProperty(this, "pieceShadowManager", void 0);
  }

  _createClass(KhmerChessBoard, [{
    key: "setOptions",
    value: function setOptions(options) {
      var _this = this;

      this.options = new _OptionsManager["default"]();
      this.playerManager = new _PlayerManager["default"]();
      this.graveyardManager = new _GraveyardManager["default"]();
      this.boardManager = new _BoardManager["default"]();
      this.khmerChess = new _khmerChess.KhmerChess();
      this.soundManager = new _SoundManager["default"]();
      this.messageManager = new _MessageManager["default"]();
      this.pieceShadowManager = new _PieceShadowManager["default"]();

      if (!options.container) {
        throw new Error('Container is required!');
      }

      this.containerDom = options.container;

      if (options.width < this.options.minWidth) {
        throw new Error("Board width must more than ".concat(this.options.minWidth, " "));
      }

      if (options.width) {
        this.options.width = options.width;
      }

      if (options.width) {
        this.options.width = options.width;
      }

      this.playerManager.setProps(this);
      this.graveyardManager.setProps(this);
      this.boardManager.setProps(this);
      this.messageManager.setProps(this);
      this.pieceShadowManager.setProps(this);
      this.render();
      this.boardManager.enableClick();
      var boardEventController = this.boardManager.boardEventController;
      boardEventController.addOnCellSelectedEventListener(function (cell) {
        var points = cell.canMovePoints;
        points.forEach(function (point) {
          var cell = _this.boardManager.get(point.index);

          cell.setCanMove();
        });
      });
      boardEventController.addOnCellDeselectedEventListener(function (cell) {
        _this.boardManager.clearCanMoveCells();
      });
      boardEventController.addOnAttemptMoveEventListener(function (_ref) {
        var fromCell = _ref.fromCell,
            toCell = _ref.toCell;

        _this.move(fromCell.point.index, toCell.point.index);
      });
      this.khmerChess.addBoardEventListener(function (boardEvent) {
        if (boardEvent.isAttack) {
          var cell = _this.boardManager.get(boardEvent.actorPieceIndex.point.index);

          cell.attack(true);

          var king = _this.boardManager.getKing(cell.piece.colorOpponent);

          king.attack(true);
        }
      });
    }
  }, {
    key: "move",
    value: function move(fromIndex, toIndex) {
      var move = this.khmerChess.move(fromIndex, toIndex);
      this.boardManager.clearSelectedCells();

      if (move !== null) {
        this.applyMove(move);
      }
    }
  }, {
    key: "setFullScreen",
    value: function setFullScreen(isFullScreen) {
      this.options.isFullScreen = isFullScreen;
      var table = this.domBoard;
      table.classList.remove(_constance.POPUP_CLASS_NAME);
      table.style.top = '0';
      table.style.left = '0';
      table.style.transform = '';
      table.style.zIndex = null;

      if (isFullScreen) {
        table.classList.add(_constance.POPUP_CLASS_NAME);
        table.style.top = '50%';
        table.style.left = '50%';
        var scaleFit = this.options.getScaleFit(table.getBoundingClientRect());
        table.style.transform = "translate(-50%,-50%) scale(".concat(scaleFit, ")");
        table.style.zIndex = '9999';
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.addAllDomCss();

      var _drawBoardAndGraveyar = (0, _drawBoardAndGraveyard["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options,
        container: this.containerDom,
        boardManager: this.boardManager,
        graveyardManager: this.graveyardManager
      }),
          domBoard = _drawBoardAndGraveyar.domBoard,
          domGraveyard = _drawBoardAndGraveyar.domGraveyard,
          playerContainer = _drawBoardAndGraveyar.playerContainer,
          tdShadow = _drawBoardAndGraveyar.tdShadow;

      this.domBoard = domBoard;
      this.graveyardManager.setDom(domGraveyard);
      this.pieceShadowManager.setTdShadow(tdShadow);
      this.setCellNote();
      this.applyPieces();
      this.messageManager.draw();
      this.playerManager.draw(playerContainer);
    }
  }, {
    key: "setLocale",
    value: function setLocale(locale) {
      var locales = [KhmerChessBoard.LOCALE_ENGLISH, KhmerChessBoard.LOCALE_KHMER];

      if (!~locales.indexOf(locale)) {
        console.log("Unsupported locale: ".concat(locale, ", supported locales: ").concat(locales.join(',')));
      } else {
        this.options.isEnglish = locale === locales[0];
        this.setCellNote();
      }
    }
  }, {
    key: "setCellNote",
    value: function setCellNote() {
      this.boardManager.clearCellNote();
      this.graveyardManager.clearCellNote();
      this.boardManager.setCellNote();
      this.graveyardManager.setCellNote();
    }
  }, {
    key: "addAllDomCss",
    value: function addAllDomCss() {
      (0, _addCss["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options
      });
      (0, _addCssNote["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options
      });
      (0, _addCssNote["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options,
        isEnglish: true
      });
    }
  }, {
    key: "loadRen",
    value: function loadRen(renStr) {
      this.khmerChess.loadRENStr(renStr);
      this.applyPieces();
    }
  }, {
    key: "applyPieces",
    value: function applyPieces() {
      this.graveyardManager.renderKhmerChessPieces();
      this.boardManager.renderKhmerChessPieces();
    }
  }, {
    key: "removeAllDomElements",
    value: function removeAllDomElements() {
      var elements = document.querySelectorAll("table.".concat(this.options.uniqueClassName, " "));
      elements.forEach(function (element) {
        element.parentElement.removeChild(element);
      });
      this.removeAllDomCss();
    }
  }, {
    key: "removeAllDomCss",
    value: function removeAllDomCss() {
      var elements = document.querySelectorAll("style.".concat(this.options.uniqueClassName, " "));
      elements.forEach(function (element) {
        element.parentElement.removeChild(element);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllDomElements();
      this.containerDom = null;
      this.graveyardManager = null;
      this.boardManager = null;
      this.soundManager = null;
      this.khmerChess = null;
    }
  }, {
    key: "applyMove",
    value: function applyMove(move) {
      this.boardManager.clearMovedCells();
      this.boardManager.clearAttackCells();

      if (move.captured) {
        var fromBCell = this.boardManager.get(move.captured.fromBoardPoint.index);
        var toGYCell = this.graveyardManager.get(move.captured.toGraveyardPoint.index);
        this.pieceShadowManager.movingPiece(fromBCell, toGYCell, function () {
          fromBCell.movePieceToGraveyard(toGYCell);
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

      var turn = _khmerChess.Piece.oppositeColor(this.khmerChess.turn);

      this.playerManager.add(move.toString(), move.getMessage(this.options.isEnglish));
      this.boardManager.changeTurn(turn);
    }
  }, {
    key: "start",
    value: function start() {
      this.boardManager.changeTurn(_khmerChess.PIECE_COLOR_WHITE);
    }
  }]);

  return KhmerChessBoard;
}();

exports["default"] = KhmerChessBoard;

_defineProperty(KhmerChessBoard, "PIECE_COLOR_BLACK", _khmerChess.PIECE_COLOR_BLACK);

_defineProperty(KhmerChessBoard, "PIECE_COLOR_WHITE", _khmerChess.PIECE_COLOR_WHITE);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_BOAT", _khmerChess.PIECE_TYPE_BOAT);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_TRANSFORM_FISH", _khmerChess.PIECE_TYPE_TRANSFORM_FISH);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_GENERAL", _khmerChess.PIECE_TYPE_GENERAL);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_QUEEN", _khmerChess.PIECE_TYPE_QUEEN);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_KING", _khmerChess.PIECE_TYPE_KING);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_HORSE", _khmerChess.PIECE_TYPE_HORSE);

_defineProperty(KhmerChessBoard, "PIECE_TYPE_FISH", _khmerChess.PIECE_TYPE_FISH);

_defineProperty(KhmerChessBoard, "LOCALE_ENGLISH", 'en');

_defineProperty(KhmerChessBoard, "LOCALE_KHMER", 'km');

_defineProperty(KhmerChessBoard, "title", _package["default"].name);

_defineProperty(KhmerChessBoard, "version", _package["default"].version);

console.log(_khmerChess.KhmerChess.title, _khmerChess.KhmerChess.version);
console.log(KhmerChessBoard.title, KhmerChessBoard.version);
window.KhmerChessBoard = KhmerChessBoard;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9LaG1lckNoZXNzQm9hcmQudHMiXSwibmFtZXMiOlsiS2htZXJDaGVzc0JvYXJkIiwib3B0aW9ucyIsIk9wdGlvbnNNYW5hZ2VyIiwicGxheWVyTWFuYWdlciIsIlBsYXllck1hbmFnZXIiLCJncmF2ZXlhcmRNYW5hZ2VyIiwiR3JhdmV5YXJkTWFuYWdlciIsImJvYXJkTWFuYWdlciIsIkJvYXJkTWFuYWdlciIsImtobWVyQ2hlc3MiLCJLaG1lckNoZXNzIiwic291bmRNYW5hZ2VyIiwiU291bmRNYW5hZ2VyIiwibWVzc2FnZU1hbmFnZXIiLCJNZXNzYWdlTWFuYWdlciIsInBpZWNlU2hhZG93TWFuYWdlciIsIlBpZWNlU2hhZG93TWFuYWdlciIsImNvbnRhaW5lciIsIkVycm9yIiwiY29udGFpbmVyRG9tIiwid2lkdGgiLCJtaW5XaWR0aCIsInNldFByb3BzIiwicmVuZGVyIiwiZW5hYmxlQ2xpY2siLCJib2FyZEV2ZW50Q29udHJvbGxlciIsImFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsImNlbGwiLCJwb2ludHMiLCJjYW5Nb3ZlUG9pbnRzIiwiZm9yRWFjaCIsInBvaW50IiwiZ2V0IiwiaW5kZXgiLCJzZXRDYW5Nb3ZlIiwiYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJjbGVhckNhbk1vdmVDZWxscyIsImFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJtb3ZlIiwiYWRkQm9hcmRFdmVudExpc3RlbmVyIiwiYm9hcmRFdmVudCIsImlzQXR0YWNrIiwiYWN0b3JQaWVjZUluZGV4IiwiYXR0YWNrIiwia2luZyIsImdldEtpbmciLCJwaWVjZSIsImNvbG9yT3Bwb25lbnQiLCJmcm9tSW5kZXgiLCJ0b0luZGV4IiwiY2xlYXJTZWxlY3RlZENlbGxzIiwiYXBwbHlNb3ZlIiwiaXNGdWxsU2NyZWVuIiwidGFibGUiLCJkb21Cb2FyZCIsImNsYXNzTGlzdCIsInJlbW92ZSIsIlBPUFVQX0NMQVNTX05BTUUiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJ0cmFuc2Zvcm0iLCJ6SW5kZXgiLCJhZGQiLCJzY2FsZUZpdCIsImdldFNjYWxlRml0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYWRkQWxsRG9tQ3NzIiwidW5pcXVlQ2xhc3NOYW1lIiwiZG9tR3JhdmV5YXJkIiwicGxheWVyQ29udGFpbmVyIiwidGRTaGFkb3ciLCJzZXREb20iLCJzZXRUZFNoYWRvdyIsInNldENlbGxOb3RlIiwiYXBwbHlQaWVjZXMiLCJkcmF3IiwibG9jYWxlIiwibG9jYWxlcyIsIkxPQ0FMRV9FTkdMSVNIIiwiTE9DQUxFX0tITUVSIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJsb2ciLCJqb2luIiwiaXNFbmdsaXNoIiwiY2xlYXJDZWxsTm90ZSIsInJlblN0ciIsImxvYWRSRU5TdHIiLCJyZW5kZXJLaG1lckNoZXNzUGllY2VzIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbGVtZW50IiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsRG9tQ3NzIiwicmVtb3ZlQWxsRG9tRWxlbWVudHMiLCJjbGVhck1vdmVkQ2VsbHMiLCJjbGVhckF0dGFja0NlbGxzIiwiY2FwdHVyZWQiLCJmcm9tQkNlbGwiLCJmcm9tQm9hcmRQb2ludCIsInRvR1lDZWxsIiwidG9HcmF2ZXlhcmRQb2ludCIsIm1vdmluZ1BpZWNlIiwibW92ZVBpZWNlVG9HcmF2ZXlhcmQiLCJwbGF5Q2FwdHVyZSIsIm1vdmVGcm9tIiwibW92ZVRvIiwibW92ZVBpZWNlVG8iLCJwbGF5TW92ZSIsImNoZWNrQm9hcmRFdmVudCIsInR1cm4iLCJQaWVjZSIsIm9wcG9zaXRlQ29sb3IiLCJ0b1N0cmluZyIsImdldE1lc3NhZ2UiLCJjaGFuZ2VUdXJuIiwiUElFQ0VfQ09MT1JfV0hJVEUiLCJQSUVDRV9DT0xPUl9CTEFDSyIsIlBJRUNFX1RZUEVfQk9BVCIsIlBJRUNFX1RZUEVfVFJBTlNGT1JNX0ZJU0giLCJQSUVDRV9UWVBFX0dFTkVSQUwiLCJQSUVDRV9UWVBFX1FVRUVOIiwiUElFQ0VfVFlQRV9LSU5HIiwiUElFQ0VfVFlQRV9IT1JTRSIsIlBJRUNFX1RZUEVfRklTSCIsImNvbmZpZyIsIm5hbWUiLCJ2ZXJzaW9uIiwidGl0bGUiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFNQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBY3FCQSxlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F3QmpCLG9CQUFXQyxPQUFYLEVBR0c7QUFBQTs7QUFFQyxXQUFLQSxPQUFMLEdBQWUsSUFBSUMsMEJBQUosRUFBZjtBQUNBLFdBQUtDLGFBQUwsR0FBcUIsSUFBSUMseUJBQUosRUFBckI7QUFDQSxXQUFLQyxnQkFBTCxHQUF3QixJQUFJQyw0QkFBSixFQUF4QjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsSUFBSUMsd0JBQUosRUFBcEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLElBQUlDLHNCQUFKLEVBQWxCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixJQUFJQyx3QkFBSixFQUFwQjtBQUNBLFdBQUtDLGNBQUwsR0FBc0IsSUFBSUMsMEJBQUosRUFBdEI7QUFDQSxXQUFLQyxrQkFBTCxHQUEwQixJQUFJQyw4QkFBSixFQUExQjs7QUFFQSxVQUFJLENBQUNmLE9BQU8sQ0FBQ2dCLFNBQWIsRUFBd0I7QUFDcEIsY0FBTSxJQUFJQyxLQUFKLENBQVUsd0JBQVYsQ0FBTjtBQUNIOztBQUNELFdBQUtDLFlBQUwsR0FBb0JsQixPQUFPLENBQUNnQixTQUE1Qjs7QUFFQSxVQUFJaEIsT0FBTyxDQUFDbUIsS0FBUixHQUFnQixLQUFLbkIsT0FBTCxDQUFhb0IsUUFBakMsRUFBMkM7QUFDdkMsY0FBTSxJQUFJSCxLQUFKLHNDQUF3QyxLQUFLakIsT0FBTCxDQUFhb0IsUUFBckQsT0FBTjtBQUNIOztBQUNE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ZUFBbEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCBHcmF2ZXlhcmRNYW5hZ2VyIGZyb20gJy4vR3JhdmV5YXJkTWFuYWdlcic7XG5pbXBvcnQgU291bmRNYW5hZ2VyIGZyb20gJy4vU291bmRNYW5hZ2VyJztcbmltcG9ydCBCb2FyZE1hbmFnZXIgZnJvbSAnLi9Cb2FyZE1hbmFnZXInO1xuaW1wb3J0IHsgUE9QVVBfQ0xBU1NfTkFNRSB9IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5pbXBvcnQgYWRkQ3NzIGZyb20gJy4vaGVscGVycy9hZGRDc3MnO1xuaW1wb3J0IGFkZENzc05vdGUgZnJvbSAnLi9oZWxwZXJzL2FkZENzc05vdGUnO1xuaW1wb3J0IGRyYXdCb2FyZEFuZEdyYXZleWFyZCBmcm9tICcuL2hlbHBlcnMvZHJhd0JvYXJkQW5kR3JhdmV5YXJkJztcbmltcG9ydCBPcHRpb25zTWFuYWdlciBmcm9tICcuL09wdGlvbnNNYW5hZ2VyJztcbmltcG9ydCB7XG4gICAgQm9hcmRFdmVudCxcbiAgICBLaG1lckNoZXNzLFxuICAgIE1vdmUsXG4gICAgUGllY2UsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCBNZXNzYWdlTWFuYWdlciBmcm9tICcuL01lc3NhZ2VNYW5hZ2VyJztcbmltcG9ydCBQbGF5ZXJNYW5hZ2VyIGZyb20gJy4vUGxheWVyTWFuYWdlcic7XG5pbXBvcnQgUGllY2VTaGFkb3dNYW5hZ2VyIGZyb20gJy4vUGllY2VTaGFkb3dNYW5hZ2VyJztcblxuaW1wb3J0IHtcbiAgICBQSUVDRV9DT0xPUl9CTEFDSyxcbiAgICBQSUVDRV9DT0xPUl9XSElURSxcbiAgICBQSUVDRV9UWVBFX0JPQVQsXG4gICAgUElFQ0VfVFlQRV9UUkFOU0ZPUk1fRklTSCxcbiAgICBQSUVDRV9UWVBFX0dFTkVSQUwsXG4gICAgUElFQ0VfVFlQRV9RVUVFTixcbiAgICBQSUVDRV9UWVBFX0tJTkcsXG4gICAgUElFQ0VfVFlQRV9IT1JTRSxcbiAgICBQSUVDRV9UWVBFX0ZJU0gsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2htZXJDaGVzc0JvYXJkIHtcbiAgICBzdGF0aWMgUElFQ0VfQ09MT1JfQkxBQ0sgPSBQSUVDRV9DT0xPUl9CTEFDSztcbiAgICBzdGF0aWMgUElFQ0VfQ09MT1JfV0hJVEUgPSBQSUVDRV9DT0xPUl9XSElURTtcbiAgICBzdGF0aWMgUElFQ0VfVFlQRV9CT0FUID0gUElFQ0VfVFlQRV9CT0FUO1xuICAgIHN0YXRpYyBQSUVDRV9UWVBFX1RSQU5TRk9STV9GSVNIID0gUElFQ0VfVFlQRV9UUkFOU0ZPUk1fRklTSDtcbiAgICBzdGF0aWMgUElFQ0VfVFlQRV9HRU5FUkFMID0gUElFQ0VfVFlQRV9HRU5FUkFMO1xuICAgIHN0YXRpYyBQSUVDRV9UWVBFX1FVRUVOID0gUElFQ0VfVFlQRV9RVUVFTjtcbiAgICBzdGF0aWMgUElFQ0VfVFlQRV9LSU5HID0gUElFQ0VfVFlQRV9LSU5HO1xuICAgIHN0YXRpYyBQSUVDRV9UWVBFX0hPUlNFID0gUElFQ0VfVFlQRV9IT1JTRTtcbiAgICBzdGF0aWMgUElFQ0VfVFlQRV9GSVNIID0gUElFQ0VfVFlQRV9GSVNIO1xuICAgIHN0YXRpYyBMT0NBTEVfRU5HTElTSCA9ICdlbic7XG4gICAgc3RhdGljIExPQ0FMRV9LSE1FUiA9ICdrbSc7XG4gICAgc3RhdGljIHRpdGxlID0gY29uZmlnLm5hbWU7XG4gICAgc3RhdGljIHZlcnNpb24gPSBjb25maWcudmVyc2lvbjtcbiAgICBjb250YWluZXJEb206IEhUTUxFbGVtZW50O1xuICAgIGRvbUJvYXJkOiBIVE1MRWxlbWVudDtcbiAgICBvcHRpb25zOiBPcHRpb25zTWFuYWdlcjtcbiAgICBwbGF5ZXJNYW5hZ2VyOiBQbGF5ZXJNYW5hZ2VyO1xuICAgIGdyYXZleWFyZE1hbmFnZXI6IEdyYXZleWFyZE1hbmFnZXI7XG4gICAgYm9hcmRNYW5hZ2VyOiBCb2FyZE1hbmFnZXI7XG4gICAga2htZXJDaGVzczogS2htZXJDaGVzcztcbiAgICBzb3VuZE1hbmFnZXI6IFNvdW5kTWFuYWdlcjtcbiAgICBtZXNzYWdlTWFuYWdlcjogTWVzc2FnZU1hbmFnZXI7XG4gICAgcGllY2VTaGFkb3dNYW5hZ2VyOiBQaWVjZVNoYWRvd01hbmFnZXI7XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zOiB7XG4gICAgICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgICAgIHdpZHRoOiBudW1iZXI7XG4gICAgfSkge1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBPcHRpb25zTWFuYWdlcigpO1xuICAgICAgICB0aGlzLnBsYXllck1hbmFnZXIgPSBuZXcgUGxheWVyTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmdyYXZleWFyZE1hbmFnZXIgPSBuZXcgR3JhdmV5YXJkTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlciA9IG5ldyBCb2FyZE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0gbmV3IEtobWVyQ2hlc3MoKTtcbiAgICAgICAgdGhpcy5zb3VuZE1hbmFnZXIgPSBuZXcgU291bmRNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZU1hbmFnZXIgPSBuZXcgTWVzc2FnZU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5waWVjZVNoYWRvd01hbmFnZXIgPSBuZXcgUGllY2VTaGFkb3dNYW5hZ2VyKCk7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgaXMgcmVxdWlyZWQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJEb20gPSBvcHRpb25zLmNvbnRhaW5lcjtcblxuICAgICAgICBpZiAob3B0aW9ucy53aWR0aCA8IHRoaXMub3B0aW9ucy5taW5XaWR0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCb2FyZCB3aWR0aCBtdXN0IG1vcmUgdGhhbiAke3RoaXMub3B0aW9ucy5taW5XaWR0aH0gYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYXllck1hbmFnZXIuc2V0UHJvcHModGhpcyk7XG4gICAgICAgIHRoaXMuZ3JhdmV5YXJkTWFuYWdlci5zZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuc2V0UHJvcHModGhpcyk7XG4gICAgICAgIHRoaXMubWVzc2FnZU1hbmFnZXIuc2V0UHJvcHModGhpcyk7XG4gICAgICAgIHRoaXMucGllY2VTaGFkb3dNYW5hZ2VyLnNldFByb3BzKHRoaXMpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyLmVuYWJsZUNsaWNrKCk7XG4gICAgICAgIGNvbnN0IGJvYXJkRXZlbnRDb250cm9sbGVyID0gdGhpcy5ib2FyZE1hbmFnZXIuYm9hcmRFdmVudENvbnRyb2xsZXI7XG4gICAgICAgIGJvYXJkRXZlbnRDb250cm9sbGVyLmFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gY2VsbC5jYW5Nb3ZlUG9pbnRzO1xuICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRNYW5hZ2VyLmdldChwb2ludC5pbmRleCk7XG4gICAgICAgICAgICAgICAgY2VsbC5zZXRDYW5Nb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJvYXJkRXZlbnRDb250cm9sbGVyLmFkZE9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5jbGVhckNhbk1vdmVDZWxscygpO1xuICAgICAgICB9KTtcbiAgICAgICAgYm9hcmRFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIoKHsgZnJvbUNlbGwsIHRvQ2VsbCB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdmUoZnJvbUNlbGwucG9pbnQuaW5kZXgsIHRvQ2VsbC5wb2ludC5pbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MuYWRkQm9hcmRFdmVudExpc3RlbmVyKChib2FyZEV2ZW50OiBCb2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoYm9hcmRFdmVudC5pc0F0dGFjaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkTWFuYWdlci5nZXQoYm9hcmRFdmVudC5hY3RvclBpZWNlSW5kZXgucG9pbnQuaW5kZXgpO1xuICAgICAgICAgICAgICAgIGNlbGwuYXR0YWNrKHRydWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtpbmcgPSB0aGlzLmJvYXJkTWFuYWdlci5nZXRLaW5nKGNlbGwucGllY2UuY29sb3JPcHBvbmVudCk7XG4gICAgICAgICAgICAgICAga2luZy5hdHRhY2sodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmUoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBtb3ZlID0gdGhpcy5raG1lckNoZXNzLm1vdmUoZnJvbUluZGV4LCB0b0luZGV4KTtcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuY2xlYXJTZWxlY3RlZENlbGxzKCk7XG4gICAgICAgIGlmIChtb3ZlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TW92ZShtb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZ1bGxTY3JlZW4oaXNGdWxsU2NyZWVuOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5pc0Z1bGxTY3JlZW4gPSBpc0Z1bGxTY3JlZW47XG4gICAgICAgIGNvbnN0IHRhYmxlID0gdGhpcy5kb21Cb2FyZDtcblxuICAgICAgICB0YWJsZS5jbGFzc0xpc3QucmVtb3ZlKFBPUFVQX0NMQVNTX05BTUUpO1xuICAgICAgICB0YWJsZS5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIHRhYmxlLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIHRhYmxlLnN0eWxlLnRyYW5zZm9ybSA9ICcnO1xuICAgICAgICB0YWJsZS5zdHlsZS56SW5kZXggPSBudWxsO1xuXG4gICAgICAgIGlmIChpc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQoUE9QVVBfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB0YWJsZS5zdHlsZS50b3AgPSAnNTAlJztcbiAgICAgICAgICAgIHRhYmxlLnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlRml0ID0gdGhpcy5vcHRpb25zLmdldFNjYWxlRml0KHRhYmxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgICAgIHRhYmxlLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoLTUwJSwtNTAlKSBzY2FsZSgke3NjYWxlRml0fSlgO1xuICAgICAgICAgICAgdGFibGUuc3R5bGUuekluZGV4ID0gJzk5OTknO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmFkZEFsbERvbUNzcygpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBkb21Cb2FyZCxcbiAgICAgICAgICAgIGRvbUdyYXZleWFyZCxcbiAgICAgICAgICAgIHBsYXllckNvbnRhaW5lcixcbiAgICAgICAgICAgIHRkU2hhZG93LFxuICAgICAgICB9ID0gZHJhd0JvYXJkQW5kR3JhdmV5YXJkKHtcbiAgICAgICAgICAgIHVuaXF1ZUNsYXNzTmFtZTogdGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcy5jb250YWluZXJEb20sXG4gICAgICAgICAgICBib2FyZE1hbmFnZXI6IHRoaXMuYm9hcmRNYW5hZ2VyLFxuICAgICAgICAgICAgZ3JhdmV5YXJkTWFuYWdlcjogdGhpcy5ncmF2ZXlhcmRNYW5hZ2VyLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kb21Cb2FyZCA9IGRvbUJvYXJkO1xuICAgICAgICB0aGlzLmdyYXZleWFyZE1hbmFnZXIuc2V0RG9tKGRvbUdyYXZleWFyZCk7XG4gICAgICAgIHRoaXMucGllY2VTaGFkb3dNYW5hZ2VyLnNldFRkU2hhZG93KHRkU2hhZG93KTtcbiAgICAgICAgdGhpcy5zZXRDZWxsTm90ZSgpO1xuICAgICAgICB0aGlzLmFwcGx5UGllY2VzKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZU1hbmFnZXIuZHJhdygpO1xuICAgICAgICB0aGlzLnBsYXllck1hbmFnZXIuZHJhdyhwbGF5ZXJDb250YWluZXIpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBsb2NhbGVzID0gW0tobWVyQ2hlc3NCb2FyZC5MT0NBTEVfRU5HTElTSCwgS2htZXJDaGVzc0JvYXJkLkxPQ0FMRV9LSE1FUl07XG4gICAgICAgIGlmICghfmxvY2FsZXMuaW5kZXhPZihsb2NhbGUpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5zdXBwb3J0ZWQgbG9jYWxlOiAke2xvY2FsZX0sIHN1cHBvcnRlZCBsb2NhbGVzOiAke2xvY2FsZXMuam9pbignLCcpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmlzRW5nbGlzaCA9IGxvY2FsZSA9PT0gbG9jYWxlc1swXTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2VsbE5vdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENlbGxOb3RlKCkge1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5jbGVhckNlbGxOb3RlKCk7XG4gICAgICAgIHRoaXMuZ3JhdmV5YXJkTWFuYWdlci5jbGVhckNlbGxOb3RlKCk7XG5cbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuc2V0Q2VsbE5vdGUoKTtcbiAgICAgICAgdGhpcy5ncmF2ZXlhcmRNYW5hZ2VyLnNldENlbGxOb3RlKCk7XG4gICAgfVxuXG4gICAgYWRkQWxsRG9tQ3NzKCkge1xuICAgICAgICBhZGRDc3Moe1xuICAgICAgICAgICAgdW5pcXVlQ2xhc3NOYW1lOiB0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgICAgYWRkQ3NzTm90ZSh7XG4gICAgICAgICAgICB1bmlxdWVDbGFzc05hbWU6IHRoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWUsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICBhZGRDc3NOb3RlKHtcbiAgICAgICAgICAgIHVuaXF1ZUNsYXNzTmFtZTogdGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIGlzRW5nbGlzaDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFJlbihyZW5TdHI6IHN0cmluZykge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MubG9hZFJFTlN0cihyZW5TdHIpO1xuICAgICAgICB0aGlzLmFwcGx5UGllY2VzKCk7XG4gICAgfVxuXG4gICAgYXBwbHlQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMuZ3JhdmV5YXJkTWFuYWdlci5yZW5kZXJLaG1lckNoZXNzUGllY2VzKCk7XG4gICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyLnJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKTtcbiAgICB9XG5cbiAgICByZW1vdmVBbGxEb21FbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB0YWJsZS4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9IGApO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbW92ZUFsbERvbUNzcygpO1xuICAgIH1cblxuICAgIHJlbW92ZUFsbERvbUNzcygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBzdHlsZS4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9IGApO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRG9tRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20gPSBudWxsO1xuICAgICAgICB0aGlzLmdyYXZleWFyZE1hbmFnZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlciA9IG51bGw7XG4gICAgICAgIHRoaXMuc291bmRNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcHBseU1vdmUobW92ZTogTW92ZSkge1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5jbGVhck1vdmVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuY2xlYXJBdHRhY2tDZWxscygpO1xuICAgICAgICBpZiAobW92ZS5jYXB0dXJlZCkge1xuICAgICAgICAgICAgY29uc3QgZnJvbUJDZWxsID0gdGhpcy5ib2FyZE1hbmFnZXIuZ2V0KG1vdmUuY2FwdHVyZWQuZnJvbUJvYXJkUG9pbnQuaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgdG9HWUNlbGwgPSB0aGlzLmdyYXZleWFyZE1hbmFnZXIuZ2V0KG1vdmUuY2FwdHVyZWQudG9HcmF2ZXlhcmRQb2ludC5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLnBpZWNlU2hhZG93TWFuYWdlci5tb3ZpbmdQaWVjZShmcm9tQkNlbGwsIHRvR1lDZWxsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZnJvbUJDZWxsLm1vdmVQaWVjZVRvR3JhdmV5YXJkKHRvR1lDZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zb3VuZE1hbmFnZXIucGxheUNhcHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcm9tQ2VsbCA9IHRoaXMuYm9hcmRNYW5hZ2VyLmdldChtb3ZlLm1vdmVGcm9tLmluZGV4KTtcbiAgICAgICAgY29uc3QgdG9DZWxsID0gdGhpcy5ib2FyZE1hbmFnZXIuZ2V0KG1vdmUubW92ZVRvLmluZGV4KTtcbiAgICAgICAgdGhpcy5waWVjZVNoYWRvd01hbmFnZXIubW92aW5nUGllY2UoZnJvbUNlbGwsIHRvQ2VsbCwgKCkgPT4ge1xuICAgICAgICAgICAgZnJvbUNlbGwubW92ZVBpZWNlVG8odG9DZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc291bmRNYW5hZ2VyLnBsYXlNb3ZlKCk7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcy5jaGVja0JvYXJkRXZlbnQoKTtcbiAgICAgICAgY29uc3QgdHVybiA9IFBpZWNlLm9wcG9zaXRlQ29sb3IodGhpcy5raG1lckNoZXNzLnR1cm4pO1xuICAgICAgICB0aGlzLnBsYXllck1hbmFnZXIuYWRkKG1vdmUudG9TdHJpbmcoKSwgbW92ZS5nZXRNZXNzYWdlKHRoaXMub3B0aW9ucy5pc0VuZ2xpc2gpKTtcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuY2hhbmdlVHVybih0dXJuKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuY2hhbmdlVHVybihQSUVDRV9DT0xPUl9XSElURSk7XG4gICAgfVxufVxuXG5jb25zb2xlLmxvZyhLaG1lckNoZXNzLnRpdGxlLCBLaG1lckNoZXNzLnZlcnNpb24pO1xuY29uc29sZS5sb2coS2htZXJDaGVzc0JvYXJkLnRpdGxlLCBLaG1lckNoZXNzQm9hcmQudmVyc2lvbik7XG5cbih3aW5kb3cgYXMgYW55KS5LaG1lckNoZXNzQm9hcmQgPSBLaG1lckNoZXNzQm9hcmQ7XG5cbi8qXG4gIOKUj+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUk1xuOCDilIMgICDilIMgICDilIMgICDilIMgICDilIMgayDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG43IOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilKPilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilKtcbjYg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDXG4gIOKUo+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKUq1xuNSDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG40IOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilKPilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilKtcbjMg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDXG4gIOKUo+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKUq1xuMiDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG4xIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyBLIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilJfilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilJtcbiAgICBhICAgYiAgIGMgICBkICAgZSAgIGYgICBnICAgaFxuICDilI/ilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilJNcbiAg4pSDIGIg4pSDIGgg4pSDIGcg4pSDIHEg4pSDIGcg4pSDIGgg4pSDIGIg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEIg4pSDIEgg4pSDIEcg4pSDIFEg4pSDIEcg4pSDIEgg4pSDIEIg4pSDXG4gIOKUl+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUm1xuICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqKi8iXX0=