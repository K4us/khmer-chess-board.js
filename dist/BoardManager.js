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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyIiwiYm9hRXZlbnRDb250cm9sbGVyIiwiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwia2htZXJDaGVzcyIsIm9wdGlvbnMiLCJfY2VsbE1hbmFnZXJzIiwiZm9yRWFjaCIsImNlbGwiLCJzZXRPbkNsaWNrIiwiY2xpY2siLCJzZWxlY3RlZExpc3QiLCJzZWxlY3RlZENlbGxzIiwibGVuZ3RoIiwic2VsZWN0ZWRDZWxsIiwiZGVzZWxlY3QiLCJkZXNlbGVjdGVkIiwiYXR0ZW1wdE1vdmUiLCJzZWxlY3QiLCJzZWxlY3RlZCIsImkiLCJjZWxsUGllY2UiLCJpbmRleCIsImZpbHRlcmVkIiwiZmlsdGVyIiwicG9pbnQiLCJjb2xvciIsInBpZWNlIiwiaXNUeXBlS2luZyIsImluZGV4Q29kZSIsIlBvaW50IiwiaW5kZXhDb2RlVG9JbmRleCIsImdldCIsIngiLCJ5IiwieHlUb0luZGV4IiwiaXNVcHNpZGVEb3duIiwiYmFja3VwUGllY2VzTGlzdCIsIm1hcCIsImNsb25lIiwiYmFja3VwU2VsZWN0ZWRMaXN0IiwiY2xlYXJTZWxlY3RlZENlbGxzIiwicmVtb3ZlUGllY2VzRnJvbUNlbGxzIiwiYXBwbHlGbGlwcGluZ0ZsYWciLCJjbG9uZWRDZWxsIiwiZ2V0QnlYWSIsInNldFBpZWNlIiwiaXNTZWxlY3RlZCIsImlzQ2FuTW92ZSIsImlzTW92ZWQiLCJpc0F0dGFja2VkIiwiY2FuTW92ZUNlbGxzIiwiY2xlYXJDYW5Nb3ZlZCIsIm1vdmVkQ2VsbHMiLCJjbGVhck1vdmVkIiwiYXR0YWNrZWRDZWxscyIsImF0dGFjayIsInJlbW92ZVBpZWNlIiwic2V0RmxpcHBlZCIsIlJPV19OVU1CRVIiLCJhZGRDbGFzc05hbWUiLCJCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTIiwiaXNFbmdsaXNoIiwiZW5DbGFzcyIsImoiLCJCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTIiwicmVtb3ZlQ2xhc3NOYW1lIiwicGllY2VzSW5Cb2FyZCIsImxpc3RlbmVyIiwiYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwicmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwiYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyIiwicmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyIiwiYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsImFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUEyQkE7O0FBT0E7O0FBTUE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTtBQU9qQiwwQkFBYztBQUFBOztBQUFBLDJDQU5pQixFQU1qQjs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSwwQ0FGQyxLQUVEOztBQUFBOztBQUNWLFNBQUtDLGtCQUFMLEdBQTBCLElBQUlDLHVDQUFKLEVBQTFCO0FBQ0g7Ozs7V0FDRCxrQkFBU0MsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0JELGVBQWUsQ0FBQ0MsVUFBbEM7QUFDQSxXQUFLQyxPQUFMLEdBQWVGLGVBQWUsQ0FBQ0UsT0FBL0I7QUFDSDs7O1dBQ0QsdUJBQWM7QUFBQTs7QUFDVixXQUFLQyxhQUFMLENBQW1CQyxPQUFuQixDQUEyQixVQUFDQyxJQUFELEVBQVU7QUFDakMsZUFBT0EsSUFBSSxDQUFDQyxVQUFMLENBQWdCLFlBQU07QUFDekIsVUFBQSxLQUFJLENBQUNSLGtCQUFMLENBQXdCUyxLQUF4QixDQUE4QkYsSUFBOUI7O0FBQ0EsY0FBTUcsWUFBWSxHQUFHLEtBQUksQ0FBQ0MsYUFBMUI7O0FBQ0EsY0FBSUQsWUFBWSxDQUFDRSxNQUFqQixFQUF5QjtBQUNyQixnQkFB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QixDQUF5RFIsUUFBekQ7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHtcbiAgICBCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTLFxuICAgIEJPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1MsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5pbXBvcnQgQ2VsbE1hbmFnZXIgZnJvbSAnLi9DZWxsTWFuYWdlcic7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5pbXBvcnQgS2htZXJDaGVzc0JvYXJkIGZyb20gJy4vS2htZXJDaGVzc0JvYXJkJztcbmltcG9ydCB7XG4gICAgS2htZXJDaGVzcyxcbiAgICBQb2ludCxcbiAgICBST1dfTlVNQkVSLFxuICAgIExpc3RlbmVyVHlwZSxcbn0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlciBmcm9tICcuL0JvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkTWFuYWdlciB7XG4gICAgX2NlbGxNYW5hZ2VyczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgYm9hRXZlbnRDb250cm9sbGVyOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXI7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyID0gbmV3IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBlbmFibGVDbGljaygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnNldE9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmNsaWNrKGNlbGwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IHRoaXMuc2VsZWN0ZWRDZWxscztcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZENlbGwgPSBzZWxlY3RlZExpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsID09PSBzZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoc2VsZWN0ZWRDZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmF0dGVtcHRNb3ZlKHNlbGVjdGVkQ2VsbCwgY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNlbGVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5zZWxlY3RlZChjZWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHV0KGk6IG51bWJlciwgY2VsbFBpZWNlOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnNbaV0gPSBjZWxsUGllY2U7XG4gICAgfVxuXG4gICAgZ2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsOiBDZWxsTWFuYWdlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwucG9pbnQuaW5kZXggPT09IGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkWzBdO1xuICAgIH1cbiAgICBnZXRLaW5nKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsOiBDZWxsTWFuYWdlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwucGllY2UgJiYgY2VsbC5waWVjZS5pc1R5cGVLaW5nICYmIGNlbGwucGllY2UuY29sb3IgPT09IGNvbG9yO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkWzBdO1xuICAgIH1cblxuICAgIGdldEJ5SW5kZXhDb2RlKGluZGV4Q29kZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQuaW5kZXhDb2RlVG9JbmRleChpbmRleENvZGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGdldEJ5WFkoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBQb2ludC54eVRvSW5kZXgoeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCk7XG4gICAgfVxuXG4gICAgZmxpcCgpIHtcbiAgICAgICAgdGhpcy5pc1Vwc2lkZURvd24gPSAhdGhpcy5pc1Vwc2lkZURvd247XG4gICAgICAgIC8vIGJhY2t1cFxuICAgICAgICBjb25zdCBiYWNrdXBQaWVjZXNMaXN0ID0gdGhpcy5fY2VsbE1hbmFnZXJzLm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuY2xvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJhY2t1cFNlbGVjdGVkTGlzdCA9IHRoaXMuc2VsZWN0ZWRDZWxscy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjbGVhclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0ZWRDZWxscygpO1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlc0Zyb21DZWxscygpO1xuICAgICAgICAvLyBmbGlwXG4gICAgICAgIHRoaXMuYXBwbHlGbGlwcGluZ0ZsYWcoKTtcbiAgICAgICAgLy8gcmVzdG9yZVxuICAgICAgICBiYWNrdXBQaWVjZXNMaXN0LmZvckVhY2goKGNsb25lZENlbGwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldEJ5WFkoY2xvbmVkQ2VsbC5wb2ludC54LCBjbG9uZWRDZWxsLnBvaW50LnkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShjbG9uZWRDZWxsLnBpZWNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJhY2t1cFNlbGVjdGVkTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2VsZWN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNTZWxlY3RlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBjYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc0Nhbk1vdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbW92ZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzTW92ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgYXR0YWNrZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzQXR0YWNrZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0ZWRDZWxscygpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmRlc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVDZWxscygpIHtcbiAgICAgICAgdGhpcy5jYW5Nb3ZlQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5jbGVhckNhbk1vdmVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsZWFyTW92ZWRDZWxscygpIHtcbiAgICAgICAgdGhpcy5tb3ZlZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJNb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhckF0dGFja0NlbGxzKCkge1xuICAgICAgICB0aGlzLmF0dGFja2VkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5hdHRhY2soZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5RmxpcHBpbmdGbGFnKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5zZXRGbGlwcGVkKHRoaXMuaXNVcHNpZGVEb3duKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0Q2VsbE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGksIDApO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaXNFbmdsaXNoKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgUk9XX05VTUJFUjsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKDAsIGopO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTU30tJHtqICsgMX1gKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaXNFbmdsaXNoKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyQ2VsbE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGksIDApO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFJPV19OVU1CRVI7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1N9LSR7aiArIDF9YCk7XG4gICAgICAgICAgICBjZWxsLnJlbW92ZUNsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJLaG1lckNoZXNzUGllY2VzKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlc0Zyb21DZWxscygpO1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MucGllY2VzSW5Cb2FyZC5mb3JFYWNoKChwaWVjZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIucmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=