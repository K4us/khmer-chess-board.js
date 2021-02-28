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
              cell.deselect();
              return _this.boaEventController.deselected(selectedCell);
            } else {
              if (cell.isCanMove) {
                return _this.boaEventController.attemptMove(selectedCell, cell);
              }
            }
          }

          if (cell.isCanSelect) {
            if (selectedCell) {
              selectedCell.deselect();

              _this.boaEventController.deselected(selectedCell);
            }

            cell.select();
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

        cell.select();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyIiwiYm9hRXZlbnRDb250cm9sbGVyIiwiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwia2htZXJDaGVzcyIsIm9wdGlvbnMiLCJfY2VsbE1hbmFnZXJzIiwiZm9yRWFjaCIsImNlbGwiLCJzZXRPbkNsaWNrIiwiY2xpY2siLCJzZWxlY3RlZExpc3QiLCJzZWxlY3RlZENlbGxzIiwic2VsZWN0ZWRDZWxsIiwiZGVzZWxlY3QiLCJkZXNlbGVjdGVkIiwiaXNDYW5Nb3ZlIiwiYXR0ZW1wdE1vdmUiLCJpc0NhblNlbGVjdCIsInNlbGVjdCIsInNlbGVjdGVkIiwiaSIsImNlbGxQaWVjZSIsImluZGV4IiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJwb2ludCIsImNvbG9yIiwicGllY2UiLCJpc1R5cGVLaW5nIiwiaW5kZXhDb2RlIiwiUG9pbnQiLCJpbmRleENvZGVUb0luZGV4IiwiZ2V0IiwieCIsInkiLCJ4eVRvSW5kZXgiLCJpc1Vwc2lkZURvd24iLCJiYWNrdXBQaWVjZXNMaXN0IiwibWFwIiwiY2xvbmUiLCJiYWNrdXBTZWxlY3RlZExpc3QiLCJjbGVhclNlbGVjdGVkQ2VsbHMiLCJyZW1vdmVQaWVjZXNGcm9tQ2VsbHMiLCJhcHBseUZsaXBwaW5nRmxhZyIsImNsb25lZENlbGwiLCJnZXRCeVhZIiwic2V0UGllY2UiLCJ0dXJuIiwiaXNTZWxlY3RlZCIsImlzTW92ZWQiLCJpc0F0dGFja2VkIiwiaXNUdXJuIiwiY2FuTW92ZUNlbGxzIiwiY2xlYXJDYW5Nb3ZlZCIsIm1vdmVkQ2VsbHMiLCJjbGVhck1vdmVkIiwiYXR0YWNrZWRDZWxscyIsImF0dGFjayIsInR1cm5DZWxscyIsInJlbW92ZVBpZWNlIiwic2V0RmxpcHBlZCIsIlJPV19OVU1CRVIiLCJhZGRDbGFzc05hbWUiLCJCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTIiwiaXNFbmdsaXNoIiwiZW5DbGFzcyIsImoiLCJCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTIiwicmVtb3ZlQ2xhc3NOYW1lIiwicGllY2VzSW5Cb2FyZCIsInBpZWNlSW5UdXJuQ2VsbHMiLCJjaGFuZ2VUdXJuIiwibGlzdGVuZXIiLCJhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsInJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyIiwiYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lciIsImFkZE9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNoYW5nZVR1cm5FdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBMkJBOztBQU9BOztBQU1BOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7QUFPakIsMEJBQWM7QUFBQTs7QUFBQSwyQ0FOaUIsRUFNakI7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsMENBRkMsS0FFRDs7QUFBQTs7QUFDVixTQUFLQyxrQkFBTCxHQUEwQixJQUFJQyx1Q0FBSixFQUExQjtBQUNIOzs7O1dBQ0Qsa0JBQVNDLGVBQVQsRUFBMkM7QUFDdkMsV0FBS0EsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCRCxlQUFlLENBQUNDLFVBQWxDO0FBQ0EsV0FBS0MsT0FBTCxHQUFlRixlQUFlLENBQUNFLE9BQS9CO0FBQ0g7OztXQUNELHVCQUFjO0FBQUE7O0FBQ1YsV0FBS0MsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGVBQU9BLElBQUksQ0FBQ0MsVUFBTCxDQUFnQixZQUFNO0FBQ3pCLFVB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QXhCLENBQTBESixRQUExRDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXNFO0FBQ2xFLFdBQUt4RSxrQkFBTCxDQUF3QjZFLGdDQUF4QixDQUF5REwsUUFBekQ7QUFDSDs7O1dBQ0QsNkNBQW9DQSxRQUFwQyxFQUF5RTtBQUNyRSxXQUFLeEUsa0JBQUwsQ0FBd0I4RSxtQ0FBeEIsQ0FBNEROLFFBQTVEO0FBQ0g7OztXQUNELHVDQUE4QkEsUUFBOUIsRUFBc0c7QUFDbEcsV0FBS3hFLGtCQUFMLENBQXdCK0UsNkJBQXhCLENBQXNEUCxRQUF0RDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXlHO0FBQ3JHLFdBQUt4RSxrQkFBTCxDQUF3QmdGLGdDQUF4QixDQUF5RFIsUUFBekQ7QUFDSDs7O1dBQ0Qsc0NBQTZCQSxRQUE3QixFQUEwRDtBQUN0RCxXQUFLeEUsa0JBQUwsQ0FBd0JpRiw0QkFBeEIsQ0FBcURULFFBQXJEO0FBQ0g7OztXQUNELHlDQUFnQ0EsUUFBaEMsRUFBNkQ7QUFDekQsV0FBS3hFLGtCQUFMLENBQXdCa0YsK0JBQXhCLENBQXdEVixRQUF4RDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQge1xuICAgIEJPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1MsXG4gICAgQk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTUyxcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcbmltcG9ydCBDZWxsTWFuYWdlciBmcm9tICcuL0NlbGxNYW5hZ2VyJztcbmltcG9ydCBPcHRpb25zTWFuYWdlciBmcm9tICcuL09wdGlvbnNNYW5hZ2VyJztcbmltcG9ydCBLaG1lckNoZXNzQm9hcmQgZnJvbSAnLi9LaG1lckNoZXNzQm9hcmQnO1xuaW1wb3J0IHtcbiAgICBLaG1lckNoZXNzLFxuICAgIFBvaW50LFxuICAgIFJPV19OVU1CRVIsXG4gICAgTGlzdGVuZXJUeXBlLFxufSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQgQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIGZyb20gJy4vQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmRNYW5hZ2VyIHtcbiAgICBfY2VsbE1hbmFnZXJzOiBDZWxsTWFuYWdlcltdID0gW107XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAga2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQ7XG4gICAga2htZXJDaGVzczogS2htZXJDaGVzcztcbiAgICBpc1Vwc2lkZURvd24gPSBmYWxzZTtcbiAgICBib2FFdmVudENvbnRyb2xsZXI6IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlcjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIgPSBuZXcgQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyKCk7XG4gICAgfVxuICAgIHNldFByb3BzKGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkKSB7XG4gICAgICAgIHRoaXMua2htZXJDaGVzc0JvYXJkID0ga2htZXJDaGVzc0JvYXJkO1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MgPSBraG1lckNoZXNzQm9hcmQua2htZXJDaGVzcztcbiAgICAgICAgdGhpcy5vcHRpb25zID0ga2htZXJDaGVzc0JvYXJkLm9wdGlvbnM7XG4gICAgfVxuICAgIGVuYWJsZUNsaWNrKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuc2V0T25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuY2xpY2soY2VsbCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gdGhpcy5zZWxlY3RlZENlbGxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2VsbCA9IHNlbGVjdGVkTGlzdFswXTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsID09PSBzZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKHNlbGVjdGVkQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc0Nhbk1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYXR0ZW1wdE1vdmUoc2VsZWN0ZWRDZWxsLCBjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc0NhblNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENlbGwuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoc2VsZWN0ZWRDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjZWxsLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzW2ldID0gY2VsbFBpZWNlO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBvaW50LmluZGV4ID09PSBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG4gICAgZ2V0S2luZyhjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBpZWNlICYmIGNlbGwucGllY2UuaXNUeXBlS2luZyAmJiBjZWxsLnBpZWNlLmNvbG9yID09PSBjb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG5cbiAgICBnZXRCeUluZGV4Q29kZShpbmRleENvZGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBvaW50LmluZGV4Q29kZVRvSW5kZXgoaW5kZXhDb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRCeVhZKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQueHlUb0luZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGZsaXAoKSB7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gIXRoaXMuaXNVcHNpZGVEb3duO1xuICAgICAgICAvLyBiYWNrdXBcbiAgICAgICAgY29uc3QgYmFja3VwUGllY2VzTGlzdCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jbG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UoY2xvbmVkQ2VsbC5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkQ2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShjbG9uZWRDZWxsLnBvaW50LngsIGNsb25lZENlbGwucG9pbnQueSk7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgcGllY2VDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBpZWNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHBpZWNlSW5UdXJuQ2VsbHMoKSB7XG4gICAgICAgIGNvbnN0IHR1cm4gPSB0aGlzLmtobWVyQ2hlc3MudHVybjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIC8vIGlmKGNlbGwucG9pbnQuaW5kZXggPT0gNDYpe1xuICAgICAgICAgICAgLy8gICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5waWVjZSAmJiBjZWxsLnBpZWNlLmNvbG9yID09PSB0dXJuO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc1NlbGVjdGVkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IGNhbk1vdmVDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzQ2FuTW92ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBtb3ZlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNNb3ZlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBhdHRhY2tlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNBdHRhY2tlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCB0dXJuQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc1R1cm47XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0ZWRDZWxscygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVDZWxscygpIHtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5jbGVhckNhbk1vdmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyTW92ZWRDZWxscygpIHtcbiAgICAgICAgdGhpcy5tb3ZlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJNb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhckF0dGFja0NlbGxzKCkge1xuICAgICAgICB0aGlzLmF0dGFja2VkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hdHRhY2soZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclR1cm5DZWxscygpIHtcbiAgICAgICAgdGhpcy50dXJuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC50dXJuKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUZsaXBwaW5nRmxhZygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuc2V0RmxpcHBlZCh0aGlzLmlzVXBzaWRlRG93bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV19OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShpLCAwKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzRW5nbGlzaCkge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFJPV19OVU1CRVI7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1N9LSR7aiArIDF9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzRW5nbGlzaCkge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckNlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV19OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShpLCAwKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBST1dfTlVNQkVSOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoMCwgaik7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZShgJHtCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTfS0ke2ogKyAxfWApO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyS2htZXJDaGVzc1BpZWNlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLnBpZWNlc0luQm9hcmQuZm9yRWFjaCgocGllY2UsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VUdXJuKHR1cm46IHN0cmluZykge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MudHVybiA9IHR1cm47XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnR1cm4oZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5waWVjZUluVHVybkNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwudHVybih0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmNoYW5nZVR1cm4oKTtcbiAgICB9XG5cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIucmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPGFueT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxhbnk+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbn1cbiJdfQ==