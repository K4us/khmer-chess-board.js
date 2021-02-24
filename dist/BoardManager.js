"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

var _khmerChess = require("khmer-chess");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoardEventController = /*#__PURE__*/function (_EventHandler) {
  _inherits(BoardEventController, _EventHandler);

  var _super = _createSuper(BoardEventController);

  function BoardEventController() {
    _classCallCheck(this, BoardEventController);

    return _super.call(this, {
      events: {
        CLICK: BoardEventController.CLICK,
        ATTEMPT_MOVE: BoardEventController.ATTEMPT_MOVE
      }
    });
  }

  _createClass(BoardEventController, [{
    key: "attemptMove",
    value: function attemptMove(fromCell, toCell) {
      this._addPropEvent(BoardEventController.ATTEMPT_MOVE, {
        fromCell: fromCell,
        toCell: toCell
      });
    }
  }, {
    key: "click",
    value: function click(cellManager) {
      this._addPropEvent(BoardEventController.CLICK, cellManager);
    }
  }, {
    key: "addOnCellClickEventListener",
    value: function addOnCellClickEventListener(listener) {
      this._addOnEventListener(BoardEventController.CLICK, listener);
    }
  }, {
    key: "removeOnCellClickEventListener",
    value: function removeOnCellClickEventListener(listener) {
      this._removeOnEventListener(BoardEventController.CLICK, listener);
    }
  }, {
    key: "addOnAttemptMoveEventListener",
    value: function addOnAttemptMoveEventListener(listener) {
      this._addOnEventListener(BoardEventController.ATTEMPT_MOVE, listener);
    }
  }, {
    key: "removeOnAttemptMoveEventListener",
    value: function removeOnAttemptMoveEventListener(listener) {
      this._removeOnEventListener(BoardEventController.ATTEMPT_MOVE, listener);
    }
  }]);

  return BoardEventController;
}(_khmerChess.EventHandler);

_defineProperty(BoardEventController, "CLICK", 'click');

_defineProperty(BoardEventController, "ATTEMPT_MOVE", 'attempt-move');

var BoardManager = /*#__PURE__*/function () {
  function BoardManager() {
    _classCallCheck(this, BoardManager);

    _defineProperty(this, "_cellManagers", []);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "khmerChess", void 0);

    _defineProperty(this, "isUpsideDown", false);

    _defineProperty(this, "boaEventController", void 0);

    this.boaEventController = new BoardEventController();
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

          var selectedList = _this.getSelectedSquares();

          if (selectedList.length) {
            var selectedSquare = selectedList[0];

            if (cell === selectedSquare) {
              cell.unselect();
            } else {
              _this.boaEventController.attemptMove(selectedSquare, cell);
            }
          } else {
            cell.select();
          }
        });
      });
    }
  }, {
    key: "put",
    value: function put(i, squarePiece) {
      this._cellManagers[i] = squarePiece;
    }
  }, {
    key: "get",
    value: function get(index) {
      var filtered = this._cellManagers.filter(function (square) {
        return square.point.index === index;
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

      var backupPiecesList = this._cellManagers.map(function (square) {
        return square.clone();
      });

      var backupSelectedList = this.getSelectedSquares().map(function (square) {
        return square.clone();
      }); // clear

      this.clearSelectedSquares();
      this.removePiecesFromSquares(); // flip

      this.applyFlippingFlag(); // restore

      backupPiecesList.forEach(function (clonedSquare) {
        var square = _this2.getByXY(clonedSquare.point.x, clonedSquare.point.y);

        square.setPiece(clonedSquare.piece);
      });
      backupSelectedList.forEach(function (clonedSquare) {
        var square = _this2.getByXY(clonedSquare.point.x, clonedSquare.point.y);

        square.select();
      });
    }
  }, {
    key: "getSelectedSquares",
    value: function getSelectedSquares() {
      return this._cellManagers.filter(function (square) {
        return square.isSelected();
      });
    }
  }, {
    key: "clearSelectedSquares",
    value: function clearSelectedSquares() {
      this._cellManagers.forEach(function (s) {
        return s.unselect();
      });
    }
  }, {
    key: "removePiecesFromSquares",
    value: function removePiecesFromSquares() {
      this._cellManagers.forEach(function (s) {
        return s.removePiece();
      });
    }
  }, {
    key: "applyFlippingFlag",
    value: function applyFlippingFlag() {
      var _this3 = this;

      this._cellManagers.forEach(function (square) {
        square.setFlipped(_this3.isUpsideDown);
      });
    }
  }, {
    key: "setNote",
    value: function setNote() {
      for (var i = 0; i < _khmerChess.ROW_NUMBER; i++) {
        var square = this.getByXY(i, 0);
        square.addClassName("".concat(_constance.BOARD_NOTE_H_PREFIX_CLASS, "-").concat(i + 1));
      }

      for (var j = 0; j < _khmerChess.ROW_NUMBER; j++) {
        var _square = this.getByXY(0, j);

        _square.addClassName("".concat(_constance.BOARD_NOTE_V_PREFIX_CLASS, "-").concat(j + 1));
      }
    }
  }, {
    key: "renderKhmerChessPieces",
    value: function renderKhmerChessPieces() {
      var _this4 = this;

      this.removePiecesFromSquares();
      this.khmerChess.board().forEach(function (arr, i) {
        arr.forEach(function (piece, j) {
          var square = _this4.getByXY(j, i);

          if (piece) {
            square.setPiece(piece);
          }
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRFdmVudENvbnRyb2xsZXIiLCJldmVudHMiLCJDTElDSyIsIkFUVEVNUFRfTU9WRSIsImZyb21DZWxsIiwidG9DZWxsIiwiX2FkZFByb3BFdmVudCIsImNlbGxNYW5hZ2VyIiwibGlzdGVuZXIiLCJfYWRkT25FdmVudExpc3RlbmVyIiwiX3JlbW92ZU9uRXZlbnRMaXN0ZW5lciIsIkV2ZW50SGFuZGxlciIsIkJvYXJkTWFuYWdlciIsImJvYUV2ZW50Q29udHJvbGxlciIsImtobWVyQ2hlc3NCb2FyZCIsImtobWVyQ2hlc3MiLCJvcHRpb25zIiwiX2NlbGxNYW5hZ2VycyIsImZvckVhY2giLCJjZWxsIiwic2V0T25DbGljayIsImNsaWNrIiwic2VsZWN0ZWRMaXN0IiwiZ2V0U2VsZWN0ZWRTcXVhcmVzIiwibGVuZ3RoIiwic2VsZWN0ZWRTcXVhcmUiLCJ1bnNlbGVjdCIsImF0dGVtcHRNb3ZlIiwic2VsZWN0IiwiaSIsInNxdWFyZVBpZWNlIiwiaW5kZXgiLCJmaWx0ZXJlZCIsImZpbHRlciIsInNxdWFyZSIsInBvaW50IiwiaW5kZXhDb2RlIiwiUG9pbnQiLCJpbmRleENvZGVUb0luZGV4IiwiZ2V0IiwieCIsInkiLCJ4eVRvSW5kZXgiLCJpc1Vwc2lkZURvd24iLCJiYWNrdXBQaWVjZXNMaXN0IiwibWFwIiwiY2xvbmUiLCJiYWNrdXBTZWxlY3RlZExpc3QiLCJjbGVhclNlbGVjdGVkU3F1YXJlcyIsInJlbW92ZVBpZWNlc0Zyb21TcXVhcmVzIiwiYXBwbHlGbGlwcGluZ0ZsYWciLCJjbG9uZWRTcXVhcmUiLCJnZXRCeVhZIiwic2V0UGllY2UiLCJwaWVjZSIsImlzU2VsZWN0ZWQiLCJzIiwicmVtb3ZlUGllY2UiLCJzZXRGbGlwcGVkIiwiUk9XX05VTUJFUiIsImFkZENsYXNzTmFtZSIsIkJPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1MiLCJqIiwiQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyIsImJvYXJkIiwiYXJyIiwiYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwicmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyIiwiYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBMkJBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRTUEsb0I7Ozs7O0FBR0Ysa0NBQWM7QUFBQTs7QUFBQSw2QkFDSjtBQUNGQyxNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsS0FBSyxFQUFFRixvQkFBb0IsQ0FBQ0UsS0FEeEI7QUFFSkMsUUFBQUEsWUFBWSxFQUFFSCxvQkFBb0IsQ0FBQ0c7QUFGL0I7QUFETixLQURJO0FBT2I7Ozs7V0FDRCxxQkFBWUMsUUFBWixFQUFtQ0MsTUFBbkMsRUFBd0Q7QUFDcEQsV0FBS0MsYUFBTCxDQUFtQk4sb0JBQW9CLENBQUNHLFlBQXhDLEVBQTBEO0FBQ3REQyxRQUFBQSxRQUFRLEVBQVJBLFFBRHNEO0FBRXREQyxRQUFBQSxNQUFNLEVBQU5BO0FBRnNELE9BQTFEO0FBSUg7OztXQUNELGVBQU1FLFdBQU4sRUFBZ0M7QUFDNUIsV0FBS0QsYUFBTCxDQUFtQk4sb0JBQW9CLENBQUNFLEtBQXhDLEVBQStDSyxXQUEvQztBQUNIOzs7V0FDRCxxQ0FBNEJDLFFBQTVCLEVBQWlFO0FBQzdELFdBQUtDLG1CQUFMLENBQXlCVCxvQkFBb0IsQ0FBQ0UsS0FBOUMsRUFBcURNLFFBQXJEO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBb0U7QUFDaEUsV0FBS0Usc0JBQUwsQ0FBNEJWLG9CQUFvQixDQUFDRSxLQUFqRCxFQUF3RE0sUUFBeEQ7QUFDSDs7O1dBQ0QsdUNBQThCQSxRQUE5QixFQUFzRztBQUNsRyxXQUFLQyxtQkFBTCxDQUF5QlQsb0JBQW9CLENBQUNHLFlBQTlDLEVBQTRESyxRQUE1RDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpD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TEQ7QUFNSCxPQVBEO0FBUUg7OztXQUNELHFDQUE0QjlDLFFBQTVCLEVBQWlFO0FBQzdELFdBQUtLLGtCQUFMLENBQXdCcUQsMkJBQXhCLENBQW9EMUQsUUFBcEQ7QUFDSDs7O1dBQ0Qsd0NBQStCQSxRQUEvQixFQUFvRTtBQUNoRSxXQUFLSyxrQkFBTCxDQUF3QnNELDhCQUF4QixDQUF1RDNELFFBQXZEO0FBQ0g7OztXQUNELHVDQUE4QkEsUUFBOUIsRUFBc0c7QUFDbEcsV0FBS0ssa0JBQUwsQ0FBd0J1RCw2QkFBeEIsQ0FBc0Q1RCxRQUF0RDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXlHO0FBQ3JHLFdBQUtLLGtCQUFMLENBQXdCd0QsZ0NBQXhCLENBQXlEN0QsUUFBekQ7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHtcbiAgICBCT0FSRF9OT1RFX1ZfUFJFRklYX0NMQVNTLFxuICAgIEJPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1MsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5pbXBvcnQgQ2VsbE1hbmFnZXIgZnJvbSAnLi9DZWxsTWFuYWdlcic7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5pbXBvcnQgS2htZXJDaGVzc0JvYXJkIGZyb20gJy4vS2htZXJDaGVzc0JvYXJkJztcbmltcG9ydCB7XG4gICAgS2htZXJDaGVzcyxcbiAgICBQb2ludCxcbiAgICBST1dfTlVNQkVSLFxuICAgIExpc3RlbmVyVHlwZSxcbiAgICBFdmVudEhhbmRsZXIsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcblxuY2xhc3MgQm9hcmRFdmVudENvbnRyb2xsZXIgZXh0ZW5kcyBFdmVudEhhbmRsZXIge1xuICAgIHN0YXRpYyBDTElDSyA9ICdjbGljayc7XG4gICAgc3RhdGljIEFUVEVNUFRfTU9WRSA9ICdhdHRlbXB0LW1vdmUnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBDTElDSzogQm9hcmRFdmVudENvbnRyb2xsZXIuQ0xJQ0ssXG4gICAgICAgICAgICAgICAgQVRURU1QVF9NT1ZFOiBCb2FyZEV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXR0ZW1wdE1vdmUoZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZEV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUgICAgLCB7XG4gICAgICAgICAgICBmcm9tQ2VsbCxcbiAgICAgICAgICAgIHRvQ2VsbCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrKGNlbGxNYW5hZ2VyOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGNlbGxNYW5hZ2VyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5DTElDSywgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkRXZlbnRDb250cm9sbGVyLkNMSUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkTWFuYWdlciB7XG4gICAgX2NlbGxNYW5hZ2VyczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgYm9hRXZlbnRDb250cm9sbGVyOiBCb2FyZEV2ZW50Q29udHJvbGxlcjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIgPSBuZXcgQm9hcmRFdmVudENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcyA9IGtobWVyQ2hlc3NCb2FyZC5raG1lckNoZXNzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBraG1lckNoZXNzQm9hcmQub3B0aW9ucztcbiAgICB9XG4gICAgZW5hYmxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5zZXRPbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5jbGljayhjZWxsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExpc3QgPSB0aGlzLmdldFNlbGVjdGVkU3F1YXJlcygpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkU3F1YXJlID0gc2VsZWN0ZWRMaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCA9PT0gc2VsZWN0ZWRTcXVhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwudW5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLmF0dGVtcHRNb3ZlKHNlbGVjdGVkU3F1YXJlLCBjZWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIHNxdWFyZVBpZWNlOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnNbaV0gPSBzcXVhcmVQaWVjZTtcbiAgICB9XG5cbiAgICBnZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKHNxdWFyZTogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzcXVhcmUucG9pbnQuaW5kZXggPT09IGluZGV4O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkWzBdO1xuICAgIH1cblxuICAgIGdldEJ5SW5kZXhDb2RlKGluZGV4Q29kZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQuaW5kZXhDb2RlVG9JbmRleChpbmRleENvZGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGdldEJ5WFkoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBQb2ludC54eVRvSW5kZXgoeCwgeSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldChpbmRleCk7XG4gICAgfVxuXG4gICAgZmxpcCgpIHtcbiAgICAgICAgdGhpcy5pc1Vwc2lkZURvd24gPSAhdGhpcy5pc1Vwc2lkZURvd247XG4gICAgICAgIC8vIGJhY2t1cFxuICAgICAgICBjb25zdCBiYWNrdXBQaWVjZXNMaXN0ID0gdGhpcy5fY2VsbE1hbmFnZXJzLm1hcCgoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3F1YXJlLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLmdldFNlbGVjdGVkU3F1YXJlcygpLm1hcCgoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3F1YXJlLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjbGVhclxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0ZWRTcXVhcmVzKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VzRnJvbVNxdWFyZXMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRTcXVhcmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZ2V0QnlYWShjbG9uZWRTcXVhcmUucG9pbnQueCwgY2xvbmVkU3F1YXJlLnBvaW50LnkpO1xuICAgICAgICAgICAgc3F1YXJlLnNldFBpZWNlKGNsb25lZFNxdWFyZS5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkU3F1YXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmdldEJ5WFkoY2xvbmVkU3F1YXJlLnBvaW50LngsIGNsb25lZFNxdWFyZS5wb2ludC55KTtcbiAgICAgICAgICAgIHNxdWFyZS5zZWxlY3QoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRTcXVhcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3F1YXJlLmlzU2VsZWN0ZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3RlZFNxdWFyZXMoKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcy51bnNlbGVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVQaWVjZXNGcm9tU3F1YXJlcygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5RmxpcHBpbmdGbGFnKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuc2V0RmxpcHBlZCh0aGlzLmlzVXBzaWRlRG93bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmdldEJ5WFkoaSwgMCk7XG4gICAgICAgICAgICBzcXVhcmUuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBST1dfTlVNQkVSOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTU30tJHtqICsgMX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VzRnJvbVNxdWFyZXMoKTtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLmJvYXJkKCkuZm9yRWFjaCgoYXJyLCBpKSA9PiB7XG4gICAgICAgICAgICBhcnIuZm9yRWFjaCgocGllY2UsIGopID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLmdldEJ5WFkoaiwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=