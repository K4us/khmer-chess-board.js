"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

var _khmerChess = require("khmer-chess");

var _BoardManagerEventController = _interopRequireDefault(require("./event/BoardManagerEventController"));

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

    _defineProperty(this, "boardEventController", void 0);

    this.boardEventController = new _BoardManagerEventController["default"]();
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
          _this.boardEventController.click(cell);

          var selectedList = _this.selectedCells;
          var selectedCell = selectedList[0];

          if (selectedCell) {
            if (cell === selectedCell) {
              cell.select(false);
              return _this.boardEventController.deselected(selectedCell);
            } else {
              if (cell.isCanMove) {
                return _this.boardEventController.attemptMove(selectedCell, cell);
              }
            }
          }

          if (cell.isCanSelect) {
            if (selectedCell) {
              selectedCell.select(false);

              _this.boardEventController.deselected(selectedCell);
            }

            cell.select(true);
            return _this.boardEventController.selected(cell);
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

        _this3.boardEventController.deselected(cell);
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
      this.boardEventController.changeTurn();
    }
  }]);

  return BoardManager;
}();

exports["default"] = BoardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyIiwiYm9hcmRFdmVudENvbnRyb2xsZXIiLCJCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsIl9jZWxsTWFuYWdlcnMiLCJmb3JFYWNoIiwiY2VsbCIsInNldE9uQ2xpY2siLCJjbGljayIsInNlbGVjdGVkTGlzdCIsInNlbGVjdGVkQ2VsbHMiLCJzZWxlY3RlZENlbGwiLCJzZWxlY3QiLCJkZXNlbGVjdGVkIiwiaXNDYW5Nb3ZlIiwiYXR0ZW1wdE1vdmUiLCJpc0NhblNlbGVjdCIsInNlbGVjdGVkIiwiaSIsImNlbGxQaWVjZSIsImluZGV4IiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJwb2ludCIsImNvbG9yIiwicGllY2UiLCJpc1R5cGVLaW5nIiwiaW5kZXhDb2RlIiwiUG9pbnQiLCJpbmRleENvZGVUb0luZGV4IiwiZ2V0IiwieCIsInkiLCJ4eVRvSW5kZXgiLCJpc1Vwc2lkZURvd24iLCJiYWNrdXBQaWVjZXNMaXN0IiwibWFwIiwiY2xvbmUiLCJiYWNrdXBTZWxlY3RlZExpc3QiLCJjbGVhclNlbGVjdGVkQ2VsbHMiLCJyZW1vdmVQaWVjZXNGcm9tQ2VsbHMiLCJhcHBseUZsaXBwaW5nRmxhZyIsImNsb25lZENlbGwiLCJnZXRCeVhZIiwic2V0UGllY2UiLCJ0dXJuIiwiaXNTZWxlY3RlZCIsImlzTW92ZWQiLCJpc0F0dGFja2VkIiwiaXNUdXJuIiwiY2FuTW92ZUNlbGxzIiwiY2xlYXJDYW5Nb3ZlZCIsIm1vdmVkQ2VsbHMiLCJjbGVhck1vdmVkIiwiYXR0YWNrZWRDZWxscyIsImF0dGFjayIsInR1cm5DZWxscyIsInJlbW92ZVBpZWNlIiwic2V0RmxpcHBlZCIsIlJPV19OVU1CRVIiLCJhZGRDbGFzc05hbWUiLCJCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTIiwiaXNFbmdsaXNoIiwiZW5DbGFzcyIsImoiLCJCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTIiwicmVtb3ZlQ2xhc3NOYW1lIiwicGllY2VzSW5Cb2FyZCIsInBpZWNlSW5UdXJuQ2VsbHMiLCJjaGFuZ2VUdXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBMkJBOztBQU9BOztBQUtBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7QUFPakIsMEJBQWM7QUFBQTs7QUFBQSwyQ0FOaUIsRUFNakI7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsMENBRkMsS0FFRDs7QUFBQTs7QUFDVixTQUFLQyxvQkFBTCxHQUE0QixJQUFJQyx1Q0FBSixFQUE1QjtBQUNIOzs7O1dBQ0Qsa0JBQVNDLGVBQVQsRUFBMkM7QUFDdkMsV0FBS0EsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCRCxlQUFlLENBQUNDLFVBQWxDO0FBQ0EsV0FBS0MsT0FBTCxHQUFlRixlQUFlLENBQUNFLE9BQS9CO0FBQ0g7OztXQUNELHVCQUFjO0FBQUE7O0FBQ1YsV0FBS0MsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGVBQU9BLElBQUksQ0FBQ0MsVUFBTCxDQUFnQixZQUFNO0FBQ3pCLFVBQUEsS0FBSSxDQUFDUixvQkFBTCxDQUEwQlMsS0FBMUIsQ0FBZ0NGLElBQWhDOztBQUNBLGNBQU1HLFlBQVksR0FBRyxLQUFJLENBQUNDLGFBQTFCO0FBQ0EsY0FBTUMsWUFBWSxHQUFHRixZQUFZLENBQUMsQ0FBRCxDQUFqQzs7QUFDQSxjQUFJRSxZQUFKLEVBQWtCO0FBQ2QsZ0JBQUlMLElBQUksS0FBS0ssWUFBYixFQUEyQjtBQUN2QkwsY0FBQUEsSUFBSSxDQUFDTSxNQUFMLENBQVksS0FBWjtBQUNBLHFCQUFPLEtBQUksQ0FBQ2Isb0JBQUwsQ0FBMEJjLFVBQTFCLENBQXFDRixZQUFyQyxDQUFQO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsa0JBQUlMLElBQUksQ0FBQ1EsU0FBVCxFQUFvQjtBQUNoQix1QkFBTyxLQUFJLENBQUNmLG9C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WCxFQUF5QjtBQUNyQixXQUFLM0MsVUFBTCxDQUFnQjJDLElBQWhCLEdBQXVCQSxJQUF2Qjs7QUFDQSxXQUFLekMsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDQSxRQUFBQSxJQUFJLENBQUN1QyxJQUFMLENBQVUsS0FBVjtBQUNILE9BRkQ7O0FBR0EsV0FBS3VCLGdCQUFMLENBQXNCL0QsT0FBdEIsQ0FBOEIsVUFBQ0MsSUFBRCxFQUFVO0FBQ3BDQSxRQUFBQSxJQUFJLENBQUN1QyxJQUFMLENBQVUsSUFBVjtBQUNILE9BRkQ7QUFHQSxXQUFLOUMsb0JBQUwsQ0FBMEJzRSxVQUExQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQge1xuICAgIEJPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1MsXG4gICAgQk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTUyxcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcbmltcG9ydCBDZWxsTWFuYWdlciBmcm9tICcuL0NlbGxNYW5hZ2VyJztcbmltcG9ydCBPcHRpb25zTWFuYWdlciBmcm9tICcuL09wdGlvbnNNYW5hZ2VyJztcbmltcG9ydCBLaG1lckNoZXNzQm9hcmQgZnJvbSAnLi9LaG1lckNoZXNzQm9hcmQnO1xuaW1wb3J0IHtcbiAgICBLaG1lckNoZXNzLFxuICAgIFBvaW50LFxuICAgIFJPV19OVU1CRVIsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIgZnJvbSAnLi9ldmVudC9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZE1hbmFnZXIge1xuICAgIF9jZWxsTWFuYWdlcnM6IENlbGxNYW5hZ2VyW10gPSBbXTtcbiAgICBvcHRpb25zOiBPcHRpb25zTWFuYWdlcjtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBraG1lckNoZXNzOiBLaG1lckNoZXNzO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGJvYXJkRXZlbnRDb250cm9sbGVyOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXI8Q2VsbE1hbmFnZXI+O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkRXZlbnRDb250cm9sbGVyID0gbmV3IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBlbmFibGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnNldE9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRFdmVudENvbnRyb2xsZXIuY2xpY2soY2VsbCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gdGhpcy5zZWxlY3RlZENlbGxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2VsbCA9IHNlbGVjdGVkTGlzdFswXTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsID09PSBzZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuc2VsZWN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJvYXJkRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoc2VsZWN0ZWRDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmlzQ2FuTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJvYXJkRXZlbnRDb250cm9sbGVyLmF0dGVtcHRNb3ZlKHNlbGVjdGVkQ2VsbCwgY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNDYW5TZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDZWxsLnNlbGVjdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoc2VsZWN0ZWRDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjZWxsLnNlbGVjdCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmRFdmVudENvbnRyb2xsZXIuc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzW2ldID0gY2VsbFBpZWNlO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBvaW50LmluZGV4ID09PSBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG4gICAgZ2V0S2luZyhjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBpZWNlICYmIGNlbGwucGllY2UuaXNUeXBlS2luZyAmJiBjZWxsLnBpZWNlLmNvbG9yID09PSBjb2xvcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG5cbiAgICBnZXRCeUluZGV4Q29kZShpbmRleENvZGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBvaW50LmluZGV4Q29kZVRvSW5kZXgoaW5kZXhDb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRCeVhZKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQueHlUb0luZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGZsaXAoKSB7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gIXRoaXMuaXNVcHNpZGVEb3duO1xuICAgICAgICAvLyBiYWNrdXBcbiAgICAgICAgY29uc3QgYmFja3VwUGllY2VzTGlzdCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jbG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UoY2xvbmVkQ2VsbC5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkQ2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShjbG9uZWRDZWxsLnBvaW50LngsIGNsb25lZENlbGwucG9pbnQueSk7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdCh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHBpZWNlQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5waWVjZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBwaWVjZUluVHVybkNlbGxzKCkge1xuICAgICAgICBjb25zdCB0dXJuID0gdGhpcy5raG1lckNoZXNzLnR1cm47XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAvLyBpZihjZWxsLnBvaW50LmluZGV4ID09IDQ2KXtcbiAgICAgICAgICAgIC8vICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgcmV0dXJuIGNlbGwucGllY2UgJiYgY2VsbC5waWVjZS5jb2xvciA9PT0gdHVybjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBzZWxlY3RlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNTZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBjYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc0Nhbk1vdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbW92ZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzTW92ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgYXR0YWNrZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzQXR0YWNrZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgdHVybkNlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNUdXJuO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVDZWxscygpIHtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5jbGVhckNhbk1vdmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyTW92ZWRDZWxscygpIHtcbiAgICAgICAgdGhpcy5tb3ZlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJNb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhckF0dGFja0NlbGxzKCkge1xuICAgICAgICB0aGlzLmF0dGFja2VkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hdHRhY2soZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclR1cm5DZWxscygpIHtcbiAgICAgICAgdGhpcy50dXJuQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC50dXJuKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUZsaXBwaW5nRmxhZygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuc2V0RmxpcHBlZCh0aGlzLmlzVXBzaWRlRG93bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV19OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShpLCAwKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzRW5nbGlzaCkge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFJPV19OVU1CRVI7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1N9LSR7aiArIDF9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzRW5nbGlzaCkge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckNlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV19OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShpLCAwKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBST1dfTlVNQkVSOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoMCwgaik7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZShgJHtCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTfS0ke2ogKyAxfWApO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyS2htZXJDaGVzc1BpZWNlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLnBpZWNlc0luQm9hcmQuZm9yRWFjaCgocGllY2UsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VUdXJuKHR1cm46IHN0cmluZykge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MudHVybiA9IHR1cm47XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnR1cm4oZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5waWVjZUluVHVybkNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwudHVybih0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYm9hcmRFdmVudENvbnRyb2xsZXIuY2hhbmdlVHVybigpO1xuICAgIH1cbn1cbiJdfQ==