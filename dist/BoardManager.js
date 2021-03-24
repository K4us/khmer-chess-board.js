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
          var selectedCell = selectedList[0];

          if (selectedCell) {
            if (cell === selectedCell) {
              cell.select(false);
              return _this.boaEventController.deselected(selectedCell);
            } else {
              if (cell.isCanMove) {
                return _this.boaEventController.attemptMove(selectedCell, cell);
              }
            }
          }

          if (cell.isCanSelect) {
            if (selectedCell) {
              selectedCell.select(false);

              _this.boaEventController.deselected(selectedCell);
            }

            cell.select(true);
            return _this.boaEventController.selected(cell);
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

        cell.select(true);
      });
    }
  }, {
    key: "pieceCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.piece;
      });
    }
  }, {
    key: "pieceInTurnCells",
    get: function get() {
      var turn = this.khmerChess.turn;
      return this._cellManagers.filter(function (cell) {
        // if(cell.point.index == 46){
        //     debugger
        // }
        return cell.piece && cell.piece.color === turn;
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
    key: "turnCells",
    get: function get() {
      return this._cellManagers.filter(function (cell) {
        return cell.isTurn;
      });
    }
  }, {
    key: "clearSelectedCells",
    value: function clearSelectedCells() {
      var _this3 = this;

      this.selectedCells.forEach(function (cell) {
        cell.select(false);

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
    key: "clearTurnCells",
    value: function clearTurnCells() {
      this.turnCells.forEach(function (cell) {
        cell.turn(false);
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
    key: "setCellNote",
    value: function setCellNote() {
      for (var i = 0; i < _khmerChess.ROW_NUMBER; i++) {
        var cell = this.getByXY(i, 0);
        cell.addClassName("".concat(_constance.BOARD_NOTE_H_PREFIX_CLASS, "-").concat(i + 1));

        if (this.options.isEnglish) {
          cell.addClassName(this.options.enClass);
        }
      }

      for (var j = 0; j < _khmerChess.ROW_NUMBER; j++) {
        var _cell = this.getByXY(0, j);

        _cell.addClassName("".concat(_constance.BOARD_NOTE_V_PREFIX_CLASS, "-").concat(j + 1));

        if (this.options.isEnglish) {
          _cell.addClassName(this.options.enClass);
        }
      }
    }
  }, {
    key: "clearCellNote",
    value: function clearCellNote() {
      for (var i = 0; i < _khmerChess.ROW_NUMBER; i++) {
        var cell = this.getByXY(i, 0);
        cell.removeClassName("".concat(_constance.BOARD_NOTE_H_PREFIX_CLASS, "-").concat(i + 1));
        cell.removeClassName(this.options.enClass);
      }

      for (var j = 0; j < _khmerChess.ROW_NUMBER; j++) {
        var _cell2 = this.getByXY(0, j);

        _cell2.removeClassName("".concat(_constance.BOARD_NOTE_V_PREFIX_CLASS, "-").concat(j + 1));

        _cell2.removeClassName(this.options.enClass);
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
    key: "changeTurn",
    value: function changeTurn(turn) {
      this.khmerChess.turn = turn;

      this._cellManagers.forEach(function (cell) {
        cell.turn(false);
      });

      this.pieceInTurnCells.forEach(function (cell) {
        cell.turn(true);
      });
      this.boaEventController.changeTurn();
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
  }, {
    key: "addOnChangeTurnEventListener",
    value: function addOnChangeTurnEventListener(listener) {
      this.boaEventController.addOnChangeTurnEventListener(listener);
    }
  }, {
    key: "removeOnChangeTurnEventListener",
    value: function removeOnChangeTurnEventListener(listener) {
      this.boaEventController.removeOnChangeTurnEventListener(listener);
    }
  }]);

  return BoardManager;
}();

exports["default"] = BoardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyIiwiYm9hRXZlbnRDb250cm9sbGVyIiwiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwia2htZXJDaGVzcyIsIm9wdGlvbnMiLCJfY2VsbE1hbmFnZXJzIiwiZm9yRWFjaCIsImNlbGwiLCJzZXRPbkNsaWNrIiwiY2xpY2siLCJzZWxlY3RlZExpc3QiLCJzZWxlY3RlZENlbGxzIiwic2VsZWN0ZWRDZWxsIiwic2VsZWN0IiwiZGVzZWxlY3RlZCIsImlzQ2FuTW92ZSIsImF0dGVtcHRNb3ZlIiwiaXNDYW5TZWxlY3QiLCJzZWxlY3RlZCIsImkiLCJjZWxsUGllY2UiLCJpbmRleCIsImZpbHRlcmVkIiwiZmlsdGVyIiwicG9pbnQiLCJjb2xvciIsInBpZWNlIiwiaXNUeXBlS2luZyIsImluZGV4Q29kZSIsIlBvaW50IiwiaW5kZXhDb2RlVG9JbmRleCIsImdldCIsIngiLCJ5IiwieHlUb0luZGV4IiwiaXNVcHNpZGVEb3duIiwiYmFja3VwUGllY2VzTGlzdCIsIm1hcCIsImNsb25lIiwiYmFja3VwU2VsZWN0ZWRMaXN0IiwiY2xlYXJTZWxlY3RlZENlbGxzIiwicmVtb3ZlUGllY2VzRnJvbUNlbGxzIiwiYXBwbHlGbGlwcGluZ0ZsYWciLCJjbG9uZWRDZWxsIiwiZ2V0QnlYWSIsInNldFBpZWNlIiwidHVybiIsImlzU2VsZWN0ZWQiLCJpc01vdmVkIiwiaXNBdHRhY2tlZCIsImlzVHVybiIsImNhbk1vdmVDZWxscyIsImNsZWFyQ2FuTW92ZWQiLCJtb3ZlZENlbGxzIiwiY2xlYXJNb3ZlZCIsImF0dGFja2VkQ2VsbHMiLCJhdHRhY2siLCJ0dXJuQ2VsbHMiLCJyZW1vdmVQaWVjZSIsInNldEZsaXBwZWQiLCJST1dfTlVNQkVSIiwiYWRkQ2xhc3NOYW1lIiwiQk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTUyIsImlzRW5nbGlzaCIsImVuQ2xhc3MiLCJqIiwiQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyIsInJlbW92ZUNsYXNzTmFtZSIsInBpZWNlc0luQm9hcmQiLCJwaWVjZUluVHVybkNlbGxzIiwiY2hhbmdlVHVybiIsImxpc3RlbmVyIiwiYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwicmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwiYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyIiwicmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyIiwiYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsImFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRPbkNoYW5nZVR1cm5FdmVudExpc3RlbmVyIiwicmVtb3ZlT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFPQTs7QUFNQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZO0FBT2pCLDBCQUFjO0FBQUE7O0FBQUEsMkNBTmlCLEVBTWpCOztBQUFBOztBQUFBOztBQUFBOztBQUFBLDBDQUZDLEtBRUQ7O0FBQUE7O0FBQ1YsU0FBS0Msa0JBQUwsR0FBMEIsSUFBSUMsdUNBQUosRUFBMUI7QUFDSDs7OztXQUNELGtCQUFTQyxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQkQsZUFBZSxDQUFDQyxVQUFsQztBQUNBLFdBQUtDLE9BQUwsR0FBZUYsZUFBZSxDQUFDRSxPQUEvQjtBQUNIOzs7V0FDRCx1QkFBYztBQUFBOztBQUNWLFdBQUtDLGFBQUwsQ0FBbUJDLE9BQW5CLENBQTJCLFVBQUNDLElBQUQsRUFBVTtBQUNqQyxlQUFPQSxJQUFJLENBQUNDLFVBQUwsQ0FBZ0IsWUFBTTtBQUN6QixVQUFBLEtBQUksQ0FB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QyxFQUF1RTtBQUNuRSxXQUFLdkUsa0JBQUwsQ0FBd0IyRSxpQ0FBeEIsQ0FBMERKLFFBQTFEO0FBQ0g7OztXQUNELDBDQUFpQ0EsUUFBakMsRUFBc0U7QUFDbEUsV0FBS3ZFLGtCQUFMLENBQXdCNEUsZ0NBQXhCLENBQXlETCxRQUF6RDtBQUNIOzs7V0FDRCw2Q0FBb0NBLFFBQXBDLEVBQXlFO0FBQ3JFLFdBQUt2RSxrQkFBTCxDQUF3QjZFLG1DQUF4QixDQUE0RE4sUUFBNUQ7QUFDSDs7O1dBQ0QsdUNBQThCQSxRQUE5QixFQUFzRztBQUNsRyxXQUFLdkUsa0JBQUwsQ0FBd0I4RSw2QkFBeEIsQ0FBc0RQLFFBQXREO0FBQ0g7OztXQUNELDBDQUFpQ0EsUUFBakMsRUFBeUc7QUFDckcsV0FBS3ZFLGtCQUFMLENBQXdCK0UsZ0NBQXhCLENBQXlEUixRQUF6RDtBQUNIOzs7V0FDRCxzQ0FBNkJBLFFBQTdCLEVBQTBEO0FBQ3RELFdBQUt2RSxrQkFBTCxDQUF3QmdGLDRCQUF4QixDQUFxRFQsUUFBckQ7QUFDSDs7O1dBQ0QseUNBQWdDQSxRQUFoQyxFQUE2RDtBQUN6RCxXQUFLdkUsa0JBQUwsQ0FBd0JpRiwrQkFBeEIsQ0FBd0RWLFFBQXhEO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7XG4gICAgQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyxcbiAgICBCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IE9wdGlvbnNNYW5hZ2VyIGZyb20gJy4vT3B0aW9uc01hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQge1xuICAgIEtobWVyQ2hlc3MsXG4gICAgUG9pbnQsXG4gICAgUk9XX05VTUJFUixcbiAgICBMaXN0ZW5lclR5cGUsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIgZnJvbSAnLi9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZE1hbmFnZXIge1xuICAgIF9jZWxsTWFuYWdlcnM6IENlbGxNYW5hZ2VyW10gPSBbXTtcbiAgICBvcHRpb25zOiBPcHRpb25zTWFuYWdlcjtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBraG1lckNoZXNzOiBLaG1lckNoZXNzO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGJvYUV2ZW50Q29udHJvbGxlcjogQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlciA9IG5ldyBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcyA9IGtobWVyQ2hlc3NCb2FyZC5raG1lckNoZXNzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBraG1lckNoZXNzQm9hcmQub3B0aW9ucztcbiAgICB9XG4gICAgZW5hYmxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5zZXRPbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5jbGljayhjZWxsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHM7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gc2VsZWN0ZWRMaXN0WzBdO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwgPT09IHNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5zZWxlY3QoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoc2VsZWN0ZWRDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzQ2FuTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hdHRlbXB0TW92ZShzZWxlY3RlZENlbGwsIGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzQ2FuU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2VsbC5zZWxlY3QoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuZGVzZWxlY3RlZChzZWxlY3RlZENlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2VsZWN0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzW2ldID0gY2VsbFBpZWNlO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBvaW50LmluZGV4ID09PSBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG4gICAgZ2V0S2luZyhjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBpZWNlICYmIGNlbGwucGllY2UuaXNUeXBlS2luZyAmJiBjZWxsLnBpZWNlLmNvbG9yID09PSBjb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG5cbiAgICBnZXRCeUluZGV4Q29kZShpbmRleENvZGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBvaW50LmluZGV4Q29kZVRvSW5kZXgoaW5kZXhDb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRCeVhZKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQueHlUb0luZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGZsaXAoKSB7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gIXRoaXMuaXNVcHNpZGVEb3duO1xuICAgICAgICAvLyBiYWNrdXBcbiAgICAgICAgY29uc3QgYmFja3VwUGllY2VzTGlzdCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jbG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UoY2xvbmVkQ2VsbC5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkQ2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShjbG9uZWRDZWxsLnBvaW50LngsIGNsb25lZENlbGwucG9pbnQueSk7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHBpZWNlQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5waWVjZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBwaWVjZUluVHVybkNlbGxzKCkge1xuICAgICAgICBjb25zdCB0dXJuID0gdGhpcy5raG1lckNoZXNzLnR1cm47XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAvLyBpZihjZWxsLnBvaW50LmluZGV4ID09IDQ2KXtcbiAgICAgICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIGNlbGwucGllY2UgJiYgY2VsbC5waWVjZS5jb2xvciA9PT0gdHVybjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNTZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBjYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc0Nhbk1vdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbW92ZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzTW92ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgYXR0YWNrZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzQXR0YWNrZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgdHVybkNlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNUdXJuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYXJDYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuY2FuTW92ZUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJDYW5Nb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhck1vdmVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMubW92ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmNsZWFyTW92ZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJBdHRhY2tDZWxscygpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuYXR0YWNrKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJUdXJuQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMudHVybkNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwudHVybihmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZVBpZWNlc0Zyb21DZWxscygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXBwbHlGbGlwcGluZ0ZsYWcoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnNldEZsaXBwZWQodGhpcy5pc1Vwc2lkZURvd24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDZWxsTm90ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBST1dfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoaSwgMCk7XG4gICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZShgJHtCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc0VuZ2xpc2gpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBST1dfTlVNQkVSOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoMCwgaik7XG4gICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZShgJHtCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTfS0ke2ogKyAxfWApO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc0VuZ2xpc2gpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJDZWxsTm90ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBST1dfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoaSwgMCk7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZShgJHtCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgUk9XX05VTUJFUjsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKDAsIGopO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTU30tJHtqICsgMX1gKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VzRnJvbUNlbGxzKCk7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcy5waWVjZXNJbkJvYXJkLmZvckVhY2goKHBpZWNlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXQoaSk7XG4gICAgICAgICAgICBjZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlVHVybih0dXJuOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLnR1cm4gPSB0dXJuO1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC50dXJuKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGllY2VJblR1cm5DZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnR1cm4odHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5jaGFuZ2VUdXJuKCk7XG4gICAgfVxuXG4gICAgYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmFkZE9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmFkZE9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIucmVtb3ZlT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTx7IGZyb21DZWxsOiBDZWxsTWFuYWdlciwgdG9DZWxsOiBDZWxsTWFuYWdlciB9Pikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxhbnk+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmFkZE9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNoYW5nZVR1cm5FdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8YW55Pikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNoYW5nZVR1cm5FdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=