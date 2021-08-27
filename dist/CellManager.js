"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _khmerChess = require("khmer-chess");

var _constance = require("./providers/constance");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CellManager = /*#__PURE__*/function () {
  function CellManager(point, container, piece) {
    var isGraveyard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, CellManager);

    _defineProperty(this, "point", void 0);

    _defineProperty(this, "isGraveyard", false);

    _defineProperty(this, "containerDom", document.createElement('td'));

    _defineProperty(this, "piece", null);

    _defineProperty(this, "isUpsideDown", false);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "khmerChess", void 0);

    this.point = point;
    this.containerDom = container;
    this.setPiece(piece);
    this.isGraveyard = isGraveyard;
  }

  _createClass(CellManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      if (khmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.khmerChess = khmerChessBoard.khmerChess;
        this.options = khmerChessBoard.options;
      }
    }
  }, {
    key: "removePieceClasses",
    value: function removePieceClasses() {
      var _this = this;

      this.removeClassName(_constance.PIECE_CLASS_NAME);

      _khmerChess.Piece.colorChars.forEach(function (color) {
        _this.removeClassName("color-".concat(color));
      });

      _khmerChess.Piece.pieceChars.forEach(function (type) {
        _this.removeClassName("type-".concat(type));
      });
    }
  }, {
    key: "removePiece",
    value: function removePiece() {
      this.removePieceClasses();
      this.piece = null;
    }
  }, {
    key: "setPiece",
    value: function setPiece(piece) {
      this.removePiece();
      this.piece = piece;

      if (this.piece) {
        this.addClassName("type-".concat(this.piece.type));
        this.addClassName("color-".concat(this.piece.color));
        this.addClassName(_constance.PIECE_CLASS_NAME);
      }
    }
  }, {
    key: "addClassName",
    value: function addClassName(className) {
      this.containerDom.classList.add(className);
    }
  }, {
    key: "removeClassName",
    value: function removeClassName(className) {
      this.containerDom.classList.remove(className);
    }
  }, {
    key: "hasClassName",
    value: function hasClassName(className) {
      return this.containerDom.classList.contains(className);
    }
  }, {
    key: "select",
    value: function select(selected) {
      this.removeClassName(_constance.SELECTED_CLASS_NAME);

      if (selected && this.piece) {
        this.addClassName(_constance.SELECTED_CLASS_NAME);
      }
    }
  }, {
    key: "canMovePoints",
    get: function get() {
      var points = this.khmerChess.getCanMovePointsByPoint(this.point);
      return points;
    }
  }, {
    key: "isSelected",
    get: function get() {
      return this.hasClassName(_constance.SELECTED_CLASS_NAME);
    }
  }, {
    key: "isCanMove",
    get: function get() {
      return this.hasClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }, {
    key: "isMoved",
    get: function get() {
      return this.hasClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "isCanSelect",
    get: function get() {
      return this.hasClassName(_constance.TURN_CLASS_NAME);
    }
  }, {
    key: "attack",
    value: function attack(attacked) {
      if (this.piece) {
        this.removeClassName(_constance.ATTACKED_CLASS_NAME);

        if (attacked) {
          this.addClassName(_constance.ATTACKED_CLASS_NAME);
        }
      }

      return this.piece;
    }
  }, {
    key: "turn",
    value: function turn(attacked) {
      this.removeClassName(_constance.TURN_CLASS_NAME);

      if (attacked) {
        this.addClassName(_constance.TURN_CLASS_NAME);
      }
    }
  }, {
    key: "isAttacked",
    get: function get() {
      return this.hasClassName(_constance.ATTACKED_CLASS_NAME);
    }
  }, {
    key: "isTurn",
    get: function get() {
      return this.hasClassName(_constance.TURN_CLASS_NAME);
    }
  }, {
    key: "setProperties",
    value: function setProperties(prop) {
      this.containerDom.className = prop.className;
    }
  }, {
    key: "setOnClick",
    value: function setOnClick(listener) {
      this.containerDom.onclick = listener;
    }
  }, {
    key: "removeOnClick",
    value: function removeOnClick() {
      this.containerDom.onclick = null;
    }
  }, {
    key: "setFlipped",
    value: function setFlipped(isUpsideDown) {
      this.removeClassName(_constance.FLIPPED_CLASS);

      if (this.isUpsideDown !== isUpsideDown) {
        var xy = _khmerChess.Point.indexToXY(_khmerChess.CELL_COUNT - 1 - this.point.index);

        this.point.x = xy.x;
        this.point.y = xy.y;
      }

      this.isUpsideDown = isUpsideDown;

      if (isUpsideDown) {
        this.addClassName(_constance.FLIPPED_CLASS);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var div = document.createElement('div');
      return new CellManager(new _khmerChess.Point(this.point.x, this.point.y), div, this.piece);
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      this.containerDom.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, {
    key: "movePieceTo",
    value: function movePieceTo(toCell) {
      var piece = this.piece;
      this.removePiece();
      toCell.setPiece(piece);
      this.moved();
      toCell.moved();
    }
  }, {
    key: "movePieceToGraveyard",
    value: function movePieceToGraveyard(toCell) {
      var deadPiece = this.piece;
      this.removePiece();
      toCell.setPiece(deadPiece);
      toCell.scrollIntoView();
    }
  }, {
    key: "moved",
    value: function moved() {
      this.addClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "clearMoved",
    value: function clearMoved() {
      this.removeClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "setCanMove",
    value: function setCanMove() {
      this.addClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }, {
    key: "clearCanMoved",
    value: function clearCanMoved() {
      this.removeClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }]);

  return CellManager;
}();
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


exports["default"] = CellManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRhaW5lckRvbSIsInNldFBpZWNlIiwia2htZXJDaGVzc0JvYXJkIiwia2htZXJDaGVzcyIsIm9wdGlvbnMiLCJyZW1vdmVDbGFzc05hbWUiLCJQSUVDRV9DTEFTU19OQU1FIiwiUGllY2UiLCJjb2xvckNoYXJzIiwiZm9yRWFjaCIsImNvbG9yIiwicGllY2VDaGFycyIsInR5cGUiLCJyZW1vdmVQaWVjZUNsYXNzZXMiLCJyZW1vdmVQaWVjZSIsImFkZENsYXNzTmFtZSIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImNvbnRhaW5zIiwic2VsZWN0ZWQiLCJTRUxFQ1RFRF9DTEFTU19OQU1FIiwicG9pbnRzIiwiZ2V0Q2FuTW92ZVBvaW50c0J5UG9pbnQiLCJoYXNDbGFzc05hbWUiLCJDQU5fTU9WRV9DTEFTU19OQU1FIiwiTU9WRURfQ0xBU1NfTkFNRSIsIlRVUk5fQ0xBU1NfTkFNRSIsImF0dGFja2VkIiwiQVRUQUNLRURfQ0xBU1NfTkFNRSIsInByb3AiLCJsaXN0ZW5lciIsIm9uY2xpY2siLCJpc1Vwc2lkZURvd24iLCJGTElQUEVEX0NMQVNTIiwieHkiLCJQb2ludCIsImluZGV4VG9YWSIsIkNFTExfQ09VTlQiLCJpbmRleCIsIngiLCJ5IiwiZGl2Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiaW5saW5lIiwidG9DZWxsIiwibW92ZWQiLCJkZWFkUGllY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFRQTs7Ozs7Ozs7OztJQVVxQkEsVztBQVNqQix1QkFBWUMsS0FBWixFQUEwQkMsU0FBMUIsRUFDSUMsS0FESixFQUN1QztBQUFBLFFBQXJCQyxXQUFxQix1RUFBUCxLQUFPOztB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O1dBQ0QseUJBQWdCO0FBQ1osV0FBS3JCLGVBQUwsQ0FBcUJxQiw4QkFBckI7QUFDSDs7Ozs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIFBvaW50LFxuICAgIFBpZWNlLFxuICAgIENFTExfQ09VTlQsXG4gICAgS2htZXJDaGVzcyxcbn0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5pbXBvcnQge1xuICAgIFNFTEVDVEVEX0NMQVNTX05BTUUsXG4gICAgUElFQ0VfQ0xBU1NfTkFNRSxcbiAgICBBVFRBQ0tFRF9DTEFTU19OQU1FLFxuICAgIEZMSVBQRURfQ0xBU1MsXG4gICAgTU9WRURfQ0xBU1NfTkFNRSxcbiAgICBDQU5fTU9WRV9DTEFTU19OQU1FLFxuICAgIFRVUk5fQ0xBU1NfTkFNRSxcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbE1hbmFnZXIge1xuICAgIHBvaW50OiBQb2ludDtcbiAgICBpc0dyYXZleWFyZCA9IGZhbHNlO1xuICAgIGNvbnRhaW5lckRvbTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIHBpZWNlOiBQaWVjZSA9IG51bGw7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAga2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQ7XG4gICAga2htZXJDaGVzczogS2htZXJDaGVzcztcbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQsXG4gICAgICAgIHBpZWNlOiBQaWVjZSwgaXNHcmF2ZXlhcmQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5pc0dyYXZleWFyZCA9IGlzR3JhdmV5YXJkO1xuICAgIH1cbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ/OiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgaWYgKGtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgICAgICB0aGlzLmtobWVyQ2hlc3MgPSBraG1lckNoZXNzQm9hcmQua2htZXJDaGVzcztcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZVBpZWNlQ2xhc3NlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoUElFQ0VfQ0xBU1NfTkFNRSk7XG4gICAgICAgIFBpZWNlLmNvbG9yQ2hhcnMuZm9yRWFjaCgoY29sb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGBjb2xvci0ke2NvbG9yfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgUGllY2UucGllY2VDaGFycy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShgdHlwZS0ke3R5cGV9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVQaWVjZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZUNsYXNzZXMoKTtcbiAgICAgICAgdGhpcy5waWVjZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0UGllY2UocGllY2U6IFBpZWNlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdGhpcy5waWVjZSA9IHBpZWNlO1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoYHR5cGUtJHt0aGlzLnBpZWNlLnR5cGV9YCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShgY29sb3ItJHt0aGlzLnBpZWNlLmNvbG9yfWApO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoUElFQ0VfQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHJlbW92ZUNsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRvbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgaGFzQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lckRvbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBzZWxlY3Qoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgICAgIGlmIChzZWxlY3RlZCAmJiB0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjYW5Nb3ZlUG9pbnRzKCkge1xuICAgICAgICBjb25zdCBwb2ludHMgPSB0aGlzLmtobWVyQ2hlc3MuZ2V0Q2FuTW92ZVBvaW50c0J5UG9pbnQodGhpcy5wb2ludCk7XG4gICAgICAgIHJldHVybiBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDYW5Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoQ0FOX01PVkVfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzTW92ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDYW5TZWxlY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShUVVJOX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGF0dGFjayhhdHRhY2tlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoQVRUQUNLRURfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICBpZiAoYXR0YWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShBVFRBQ0tFRF9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5waWVjZTtcbiAgICB9XG5cbiAgICB0dXJuKGF0dGFja2VkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0F0dGFja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoQVRUQUNLRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzVHVybigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgc2V0UHJvcGVydGllcyhwcm9wOiB7IGNsYXNzTmFtZTogc3RyaW5nOyB9KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tLmNsYXNzTmFtZSA9IHByb3AuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHNldE9uQ2xpY2sobGlzdGVuZXI6ICh0aGlzOiBHbG9iYWxFdmVudEhhbmRsZXJzLCBldjogTW91c2VFdmVudCkgPT4gYW55KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tLm9uY2xpY2sgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICByZW1vdmVPbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRvbS5vbmNsaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRGbGlwcGVkKGlzVXBzaWRlRG93bjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgaWYgKHRoaXMuaXNVcHNpZGVEb3duICE9PSBpc1Vwc2lkZURvd24pIHtcbiAgICAgICAgICAgIGNvbnN0IHh5ID0gUG9pbnQuaW5kZXhUb1hZKENFTExfQ09VTlQgLSAxIC0gdGhpcy5wb2ludC5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLnBvaW50LnggPSB4eS54O1xuICAgICAgICAgICAgdGhpcy5wb2ludC55ID0geHkueTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVXBzaWRlRG93biA9IGlzVXBzaWRlRG93bjtcbiAgICAgICAgaWYgKGlzVXBzaWRlRG93bikge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoRkxJUFBFRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBuZXcgQ2VsbE1hbmFnZXIobmV3IFBvaW50KHRoaXMucG9pbnQueCwgdGhpcy5wb2ludC55KVxuICAgICAgICAgICAgLCBkaXYsIHRoaXMucGllY2UpO1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRvbS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICBibG9jazogJ2VuZCcsXG4gICAgICAgICAgICBpbmxpbmU6ICduZWFyZXN0JyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZVBpZWNlVG8odG9DZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMucGllY2U7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5tb3ZlZCgpO1xuICAgICAgICB0b0NlbGwubW92ZWQoKTtcbiAgICB9XG5cbiAgICBtb3ZlUGllY2VUb0dyYXZleWFyZCh0b0NlbGw6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IGRlYWRQaWVjZSA9IHRoaXMucGllY2U7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKGRlYWRQaWVjZSk7XG4gICAgICAgIHRvQ2VsbC5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cblxuICAgIG1vdmVkKCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG4gICAgY2xlYXJNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuICAgIHNldENhbk1vdmUoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVkKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShDQU5fTU9WRV9DTEFTU19OQU1FKTtcbiAgICB9XG59XG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqKi8iXX0=