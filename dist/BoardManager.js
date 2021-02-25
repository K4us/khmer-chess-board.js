"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

var _khmerChess = require("khmer-chess");

var _BoardManagerEventController = _interopRequireDefault(require("./BoardManagerEventController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoardManager = /*#__PURE__*/function () {
  function BoardManager() {
    _classCallCheck(this, BoardManager);

    _defineProperty(this, "_cellManagers", []);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "khmerChess", void 0);

    _defineProperty(this, "isUpsideDown", false);

    _defineProperty(this, "boaEventController", void 0);

    this.boaEventController = new _BoardManagerEventController["default"]();
  }

  _createClass(BoardManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.khmerChess = khmerChessBoard.khmerChess;
      this.options = khmerChessBoard.options;
    }
  }, {
    key: "enableClick",
    value: function enableClick() {
      var _this = this;

      this._cellManagers.forEach(function (cell) {
        return cell.setOnClick(function () {
          _this.boaEventController.click(cell);

          var selectedList = _this.selectedCells;

          if (selectedList.length) {
            var selectedCell = selectedList[0];

            if (cell === selectedCell) {
              cell.deselect();

              _this.boaEventController.deselected(selectedCell);
            } else {
              _this.boaEventController.attemptMove(selectedCell, cell);
            }
          } else {
            cell.select();

            _this.boaEventController.selected(cell);
          }
        });
      });
    }
  }, {
    key: "put",
    value: function put(i, cellPiece) {
      this._cellManagers[i] = cellPiece;
    }
  }, {
    key: "get",
    value: function get(index) {
      var filtered = this._cellManagers.filter(function (cell) {
        return cell.point.index === index;
      });

      return filtered[0];
    }
  }, {
    key: "getKing",
    value: function getKing(color) {
      var filtered = this._cellManagers.filter(function (cell) {
        return cell.piece && cell.piece.isTypeKing && cell.piece.color === color;
      });

      return filtered[0];
    }
  }, {
    key: "getByIndexCode",
    value: function getByIndexCode(indexCode) {
      var index = _khmerChess.Point.indexCodeToIndex(indexCode);

      return this.get(index);
    }
  }, {
    key: "getByXY",
    value: function getByXY(x, y) {
      var index = _khmerChess.Point.xyToIndex(x, y);

      return this.get(index);
    }
  }, {
    key: "flip",
    value: function flip() {
      var _this2 = this;

      this.isUpsideDown = !this.isUpsideDown; // backup

      var backupPiecesList = this._cellManagers.map(function (cell) {
        return cell.clone();
      });

      var backupSelectedList = this.selectedCells.map(function (cell) {
        return cell.clone();
      }); // clear

      this.clearSelectedCells();
      this.removePiecesFromCells(); // flip

      this.applyFlippingFlag(); // restore

      backupPiecesList.forEach(function (clonedCell) {
        var cell = _this2.getByXY(clonedCell.point.x, clonedCell.point.y);

        cell.setPiece(clonedCell.piece);
      });
      backupSelectedList.forEach(function (clonedCell) {
        var cell = _this2.getByXY(clonedCell.point.x, clonedCell.point.y);

        cell.select();
      });
    }
  }, {
    key: "selectedCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.isSelected;
      });
    }
  }, {
    key: "canMoveCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.isCanMove;
      });
    }
  }, {
    key: "movedCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.isMoved;
      });
    }
  }, {
    key: "attackedCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.isAttacked;
      });
    }
  }, {
    key: "clearSelectedCells",
    value: function clearSelectedCells() {
      var _this3 = this;

      this.selectedCells.forEach(function (cell) {
        cell.deselect();

        _this3.boaEventController.deselected(cell);
      });
    }
  }, {
    key: "clearCanMoveCells",
    value: function clearCanMoveCells() {
      this.canMoveCells.forEach(function (cell) {
        cell.clearCanMoved();
      });
    }
  }, {
    key: "clearMovedCells",
    value: function clearMovedCells() {
      this.movedCells.forEach(function (cell) {
        cell.clearMoved();
      });
    }
  }, {
    key: "clearAttackCells",
    value: function clearAttackCells() {
      this.attackedCells.forEach(function (cell) {
        cell.attack(false);
      });
    }
  }, {
    key: "removePiecesFromCells",
    value: function removePiecesFromCells() {
      this._cellManagers.forEach(function (cell) {
        cell.removePiece();
      });
    }
  }, {
    key: "applyFlippingFlag",
    value: function applyFlippingFlag() {
      var _this4 = this;

      this._cellManagers.forEach(function (cell) {
        cell.setFlipped(_this4.isUpsideDown);
      });
    }
  }, {
    key: "setNote",
    value: function setNote() {
      for (var i = 0; i < _khmerChess.ROW_NUMBER; i++) {
        var cell = this.getByXY(i, 0);
        cell.addClassName("".concat(_constance.BOARD_NOTE_H_PREFIX_CLASS, "-").concat(i + 1));
      }

      for (var j = 0; j < _khmerChess.ROW_NUMBER; j++) {
        var _cell = this.getByXY(0, j);

        _cell.addClassName("".concat(_constance.BOARD_NOTE_V_PREFIX_CLASS, "-").concat(j + 1));
      }
    }
  }, {
    key: "renderKhmerChessPieces",
    value: function renderKhmerChessPieces() {
      var _this5 = this;

      this.removePiecesFromCells();
      this.khmerChess.piecesInBoard.forEach(function (piece, i) {
        var cell = _this5.get(i);

        cell.setPiece(piece);
      });
    }
  }, {
    key: "addOnCellClickEventListener",
    value: function addOnCellClickEventListener(listener) {
      this.boaEventController.addOnCellClickEventListener(listener);
    }
  }, {
    key: "removeOnCellClickEventListener",
    value: function removeOnCellClickEventListener(listener) {
      this.boaEventController.removeOnCellClickEventListener(listener);
    }
  }, {
    key: "addOnCellSelectedEventListener",
    value: function addOnCellSelectedEventListener(listener) {
      this.boaEventController.addOnCellSelectedEventListener(listener);
    }
  }, {
    key: "removeOnCellSelectedEventListener",
    value: function removeOnCellSelectedEventListener(listener) {
      this.boaEventController.removeOnCellSelectedEventListener(listener);
    }
  }, {
    key: "addOnCellDeselectedEventListener",
    value: function addOnCellDeselectedEventListener(listener) {
      this.boaEventController.addOnCellDeselectedEventListener(listener);
    }
  }, {
    key: "removeOnCellDeselectedEventListener",
    value: function removeOnCellDeselectedEventListener(listener) {
      this.boaEventController.removeOnCellDeselectedEventListener(listener);
    }
  }, {
    key: "addOnAttemptMoveEventListener",
    value: function addOnAttemptMoveEventListener(listener) {
      this.boaEventController.addOnAttemptMoveEventListener(listener);
    }
  }, {
    key: "removeOnAttemptMoveEventListener",
    value: function removeOnAttemptMoveEventListener(listener) {
      this.boaEventController.removeOnAttemptMoveEventListener(listener);
    }
  }]);

  return BoardManager;
}();

exports["default"] = BoardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyIiwiYm9hRXZlbnRDb250cm9sbGVyIiwiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwia2htZXJDaGVzcyIsIm9wdGlvbnMiLCJfY2VsbE1hbmFnZXJzIiwiZm9yRWFjaCIsImNlbGwiLCJzZXRPbkNsaWNrIiwiY2xpY2siLCJzZWxlY3RlZExpc3QiLCJzZWxlY3RlZENlbGxzIiwibGVuZ3RoIiwic2VsZWN0ZWRDZWxsIiwiZGVzZWxlY3QiLCJkZXNlbGVjdGVkIiwiYXR0ZW1wdE1vdmUiLCJzZWxlY3QiLCJzZWxlY3RlZCIsImkiLCJjZWxsUGllY2UiLCJpbmRleCIsImZpbHRlcmVkIiwiZmlsdGVyIiwicG9pbnQiLCJjb2xvciIsInBpZWNlIiwiaXNUeXBlS2luZyIsImluZGV4Q29kZSIsIlBvaW50IiwiaW5kZXhDb2RlVG9JbmRleCIsImdldCIsIngiLCJ5IiwieHlUb0luZGV4IiwiaXNVcHNpZGVEb3duIiwiYmFja3VwUGllY2VzTGlzdCIsIm1hcCIsImNsb25lIiwiYmFja3VwU2VsZWN0ZWRMaXN0IiwiY2xlYXJTZWxlY3RlZENlbGxzIiwicmVtb3ZlUGllY2VzRnJvbUNlbGxzIiwiYXBwbHlGbGlwcGluZ0ZsYWciLCJjbG9uZWRDZWxsIiwiZ2V0QnlYWSIsInNldFBpZWNlIiwiaXNTZWxlY3RlZCIsImlzQ2FuTW92ZSIsImlzTW92ZWQiLCJpc0F0dGFja2VkIiwiY2FuTW92ZUNlbGxzIiwiY2xlYXJDYW5Nb3ZlZCIsIm1vdmVkQ2VsbHMiLCJjbGVhck1vdmVkIiwiYXR0YWNrZWRDZWxscyIsImF0dGFjayIsInJlbW92ZVBpZWNlIiwic2V0RmxpcHBlZCIsIlJPV19OVU1CRVIiLCJhZGRDbGFzc05hbWUiLCJCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTIiwiaiIsIkJPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1MiLCJwaWVjZXNJbkJvYXJkIiwibGlzdGVuZXIiLCJhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsInJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyIiwiYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFPQTs7QUFNQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZO0FBT2pCLDBCQUFjO0FBQUE7O0FBQUEsMkNBTmlCLEVBTWpCOztBQUFBOztBQUFBOztBQUFBOztBQUFBLDBDQUZDLEtBRUQ7O0FBQUE7O0FBQ1YsU0FBS0Msa0JBQUwsR0FBMEIsSUFBSUMsdUNBQUosRUFBMUI7QUFDSDs7OztXQUNELGtCQUFTQyxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQkQsZUFBZSxDQUFDQyxVQUFsQztBQUNBLFdBQUtDLE9BQUwsR0FBZUYsZUFBZSxDQUFDRSxPQUEvQjtBQUNIOzs7V0FDRCx1QkFBYztBQUFBOztBQUNWLFdBQUtDLGFBQUwsQ0FBbUJDLE9BQW5CLENBQTJCLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxlQUFPQSxJQUFJLENBQUNDLFVBQUwsQ0FBZ0IsWUFBTTtBQUN6QixVQUFBLEtBQUksQ0FBQ1Isa0JBQUwsQ0FBd0JTLEtBQXhCLENBQThCRixJQUE5Qjs7QUFDQSxjQUFNRyxZQUFZLEdBQUcsS0FBSSxDQUFDQyxhQUExQjs7QUFDQSxjQUFJRCxZQUFZLENBQUNFLE1BQWpCLEVBQXlCO0FBQ3JCLGdCQUFNQyxZQUFZLEdBQUdILFlBQVksQ0FBQyxDQUFELENBQWpDOztBQUNB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dEQ7QUFDSDs7O1dBQ0QsMENBQWlDQSxRQUFqQyxFQUF5RztBQUNyRyxXQUFLaEUsa0JBQUwsQ0FBd0J3RSxnQ0FBeEIsQ0FBeURSLFFBQXpEO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7XG4gICAgQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyxcbiAgICBCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IE9wdGlvbnNNYW5hZ2VyIGZyb20gJy4vT3B0aW9uc01hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQge1xuICAgIEtobWVyQ2hlc3MsXG4gICAgUG9pbnQsXG4gICAgUk9XX05VTUJFUixcbiAgICBMaXN0ZW5lclR5cGUsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIgZnJvbSAnLi9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZE1hbmFnZXIge1xuICAgIF9jZWxsTWFuYWdlcnM6IENlbGxNYW5hZ2VyW10gPSBbXTtcbiAgICBvcHRpb25zOiBPcHRpb25zTWFuYWdlcjtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBraG1lckNoZXNzOiBLaG1lckNoZXNzO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGJvYUV2ZW50Q29udHJvbGxlcjogQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlciA9IG5ldyBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcyA9IGtobWVyQ2hlc3NCb2FyZC5raG1lckNoZXNzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBraG1lckNoZXNzQm9hcmQub3B0aW9ucztcbiAgICB9XG4gICAgZW5hYmxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5zZXRPbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5jbGljayhjZWxsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHM7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gc2VsZWN0ZWRMaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCA9PT0gc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKHNlbGVjdGVkQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hdHRlbXB0TW92ZShzZWxlY3RlZENlbGwsIGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzW2ldID0gY2VsbFBpZWNlO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBvaW50LmluZGV4ID09PSBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG4gICAgZ2V0S2luZyhjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBpZWNlICYmIGNlbGwucGllY2UuaXNUeXBlS2luZyAmJiBjZWxsLnBpZWNlLmNvbG9yID09PSBjb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG5cbiAgICBnZXRCeUluZGV4Q29kZShpbmRleENvZGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBvaW50LmluZGV4Q29kZVRvSW5kZXgoaW5kZXhDb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRCeVhZKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQueHlUb0luZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGZsaXAoKSB7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gIXRoaXMuaXNVcHNpZGVEb3duO1xuICAgICAgICAvLyBiYWNrdXBcbiAgICAgICAgY29uc3QgYmFja3VwUGllY2VzTGlzdCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jbG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UoY2xvbmVkQ2VsbC5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkQ2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShjbG9uZWRDZWxsLnBvaW50LngsIGNsb25lZENlbGwucG9pbnQueSk7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzU2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZUNlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNDYW5Nb3ZlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IG1vdmVkQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc01vdmVkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGF0dGFja2VkQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc0F0dGFja2VkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYXJDYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuY2FuTW92ZUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJDYW5Nb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhck1vdmVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMubW92ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmNsZWFyTW92ZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJBdHRhY2tDZWxscygpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYXR0YWNrKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUZsaXBwaW5nRmxhZygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuc2V0RmxpcHBlZCh0aGlzLmlzVXBzaWRlRG93bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGksIDApO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFJPV19OVU1CRVI7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1N9LSR7aiArIDF9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJLaG1lckNoZXNzUGllY2VzKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlc0Zyb21DZWxscygpO1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MucGllY2VzSW5Cb2FyZC5mb3JFYWNoKChwaWVjZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIucmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=