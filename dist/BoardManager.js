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
        SELECTED: BoardEventController.SELECTED,
        ATTEMPT_MOVE: BoardEventController.ATTEMPT_MOVE
      }
    });
  }

  _createClass(BoardEventController, [{
    key: "click",
    value: function click(cellManager) {
      this._addPropEvent(BoardEventController.CLICK, cellManager);
    }
  }, {
    key: "selected",
    value: function selected(cellManager) {
      this._addPropEvent(BoardEventController.SELECTED, cellManager);
    }
  }, {
    key: "deselected",
    value: function deselected(cellManager) {
      this._addPropEvent(BoardEventController.DESELECTED, cellManager);
    }
  }, {
    key: "attemptMove",
    value: function attemptMove(fromCell, toCell) {
      this._addPropEvent(BoardEventController.ATTEMPT_MOVE, {
        fromCell: fromCell,
        toCell: toCell
      });
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
    key: "addOnCellSelectedEventListener",
    value: function addOnCellSelectedEventListener(listener) {
      this._addOnEventListener(BoardEventController.SELECTED, listener);
    }
  }, {
    key: "removeOnCellSelectedEventListener",
    value: function removeOnCellSelectedEventListener(listener) {
      this._removeOnEventListener(BoardEventController.SELECTED, listener);
    }
  }, {
    key: "addOnCellDeselectedEventListener",
    value: function addOnCellDeselectedEventListener(listener) {
      this._addOnEventListener(BoardEventController.DESELECTED, listener);
    }
  }, {
    key: "removeOnCellDeselectedEventListener",
    value: function removeOnCellDeselectedEventListener(listener) {
      this._removeOnEventListener(BoardEventController.DESELECTED, listener);
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

_defineProperty(BoardEventController, "SELECTED", 'selected');

_defineProperty(BoardEventController, "DESELECTED", 'deselected');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiQm9hcmRFdmVudENvbnRyb2xsZXIiLCJldmVudHMiLCJDTElDSyIsIlNFTEVDVEVEIiwiQVRURU1QVF9NT1ZFIiwiY2VsbE1hbmFnZXIiLCJfYWRkUHJvcEV2ZW50IiwiREVTRUxFQ1RFRCIsImZyb21DZWxsIiwidG9DZWxsIiwibGlzdGVuZXIiLCJfYWRkT25FdmVudExpc3RlbmVyIiwiX3JlbW92ZU9uRXZlbnRMaXN0ZW5lciIsIkV2ZW50SGFuZGxlciIsIkJvYXJkTWFuYWdlciIsImJvYUV2ZW50Q29udHJvbGxlciIsImtobWVyQ2hlc3NCb2FyZCIsImtobWVyQ2hlc3MiLCJvcHRpb25zIiwiX2NlbGxNYW5hZ2VycyIsImZvckVhY2giLCJjZWxsIiwic2V0T25DbGljayIsImNsaWNrIiwic2VsZWN0ZWRMaXN0Iiwic2VsZWN0ZWRDZWxscyIsImxlbmd0aCIsInNlbGVjdGVkQ2VsbCIsImRlc2VsZWN0IiwiZGVzZWxlY3RlZCIsImF0dGVtcHRNb3ZlIiwic2VsZWN0Iiwic2VsZWN0ZWQiLCJpIiwiY2VsbFBpZWNlIiwiaW5kZXgiLCJmaWx0ZXJlZCIsImZpbHRlciIsInBvaW50IiwiaW5kZXhDb2RlIiwiUG9pbnQiLCJpbmRleENvZGVUb0luZGV4IiwiZ2V0IiwieCIsInkiLCJ4eVRvSW5kZXgiLCJpc1Vwc2lkZURvd24iLCJiYWNrdXBQaWVjZXNMaXN0IiwibWFwIiwiY2xvbmUiLCJiYWNrdXBTZWxlY3RlZExpc3QiLCJjbGVhclNlbGVjdGVkQ2VsbHMiLCJyZW1vdmVQaWVjZXNGcm9tQ2VsbHMiLCJhcHBseUZsaXBwaW5nRmxhZyIsImNsb25lZENlbGwiLCJnZXRCeVhZIiwic2V0UGllY2UiLCJwaWVjZSIsImlzU2VsZWN0ZWQiLCJpc0Nhbk1vdmUiLCJpc01vdmVkIiwiY2FuTW92ZUNlbGxzIiwiY2xlYXJDYW5Nb3ZlZCIsIm1vdmVkQ2VsbHMiLCJjbGVhck1vdmVkIiwicmVtb3ZlUGllY2UiLCJzZXRGbGlwcGVkIiwiUk9XX05VTUJFUiIsImFkZENsYXNzTmFtZSIsIkJPQVJEX05PVEVfSF9QUkVGSVhfQ0xBU1MiLCJqIiwiQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyIsInBpZWNlc0luQm9hcmQiLCJhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIiLCJhZGRPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lciIsInJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyIiwiYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBMkJBOztBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRTUEsb0I7Ozs7O0FBS0Ysa0NBQWM7QUFBQTs7QUFBQSw2QkFDSjtBQUNGQyxNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsS0FBSyxFQUFFRixvQkFBb0IsQ0FBQ0UsS0FEeEI7QUFFSkMsUUFBQUEsUUFBUSxFQUFFSCxvQkFBb0IsQ0FBQ0csUUFGM0I7QUFHSkMsUUFBQUEsWUFBWSxFQUFFSixvQkFBb0IsQ0FBQ0k7QUFIL0I7QUFETixLQURJO0FBUWI7Ozs7V0FDRCxlQUFNQyxXQUFOLEVBQWdDO0FBQzVCLFdBQUtDLGFBQUwsQ0FBbUJOLG9CQUFvQixDQUFDRSxLQUF4QyxFQUErQ0csV0FBL0M7QUFDSDs7O1dBQ0Qsa0JBQVNBLFdBQVQsRUFBbUM7QUFDL0IsV0FBS0MsYUFBTCxDQUFtQk4sb0JBQW9CLENBQUNHLFFBQXhDLEVBQWtERSxXQUFsRDtBQUNIOzs7V0FDRCxvQkFBV0EsV0FBWCxFQUFxQztBQUNqQyxXQUFLQyxhQUFMLENBQW1CTixvQkFBb0IsQ0FBQ08sVUFBeEMsRUFBb0RGLFdBQXBEO0FBQ0g7OztXQUNELHFCQUFZRyxRQUFaLEVBQW1DQyxNQUFuQyxFQUF3RDtBQUNwRCxXQUFLSCxhQUFMLENBQW1CTixvQkFBb0IsQ0FBQ0ksWUFBeEMsRUFBc0Q7QUFDbERJLFFBQUFBLFFBQVEsRUFBUkEsUUFEa0Q7QUFFbERDLFFBQUFBLE1BQU0sRUFBTkE7QUFGa0QsT0FBdEQ7QUFJSDs7O1dBQ0QscUNBQTRCQyxRQUE1QixFQUFpRTtBQUM3RCxXQUFLQyxtQkFBTCxDQUF5Qlgsb0JBQW9CLENBQUNFLEtBQTlDLEVBQXFEUSxRQUFyRDtBQUNIOzs7V0FDRCx3Q0FBK0JBLFFBQS9CLEVBQW9FO0FBQ2hFLFdBQUtFLHNCQUFMLENBQTRCWixvQkFBb0IsQ0FBQ0UsS0FBakQsRUFBd0RRLFFBQXhEO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBb0U7QUFDaEUsV0FBS0MsbUJBQUwsQ0FBeUJYLG9CQUFvQixDQUFDRyxRQUE5QyxFQUF3RE8sUUFBeEQ7QUFDSDs7O1dBQ0QsMkNBQWtDQSxRQUFsQyxFQUF1RTtBQUNuRSxXQUFLRSxzQkFBTCxDQUE0Qlosb0JBQW9CLENBQUNHLFFBQWpELEVBQTJETyxRQUEzRDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXNFO0FBQ2xFLFdBQUtDLG1CQUFMLENBQXlCWCxvQkFBb0IsQ0FBQ08sVUFBOUMsRUFBMERHLFFBQTFEO0FBQ0g7OztXQUNELDZDQUFvQ0EsUUFBcEMsRUFBeUU7QUFDckUsV0FBS0Usc0JBQUwsQ0FBNEJaLG9CQUFvQixDQUFDTyxVQUFqRCxFQUE2REcsUUFBN0Q7QUFDSDs7O1dBQ0QsdUNBQThCQSxRQUE5QixFQUFzRztBQUNsRyxXQUFLQyxtQkFBTCxDQUF5Qlgsb0JBQW9CLENBQUNJLFlBQTlDLEVBQTRETSxRQUE1RDtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXlHO0FBQ3JHLFdBQUtFLHNCQUFMLENBQTRCWixvQkFBb0IsQ0FBQ0ksWUFBakQsRUFBK0RNLFFBQS9EO0FBQ0g7Ozs7RUFwRDhCRyx3Qjs7Z0JBQTdCYixvQixXQUNhLE87O2dCQURiQSxvQixjQUVnQixVOztnQkFGaEJBLG9CLGdCQUdrQixZOztnQkFIbEJBLG9CLGtCQUlvQixjOztJQW1ETGMsWTtBQU9qQiwwQkFBYztBQUFBOztBQUFBLDJDQU5pQixFQU1qQjs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSwwQ0FGQyxLQUVEOztBQUFBOztBQUNWLFNBQUtDLGtCQUFMLEdBQTBCLElBQUlmLG9CQUFKLEVBQTFCO0FBQ0g7Ozs7V0FDRCxrQkFBU2dCLGVBQVQsRUFBMkM7QUFDdkMsV0FBS0EsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCRCxlQUFlLENBQUNDLFVBQWxDO0FBQ0EsV0FBS0MsT0FBTCxHQUFlRixlQUFlLENBQUNFLE9BQS9CO0FBQ0g7OztXQUNELHVCQUFjO0FBQUE7O0FBQ1YsV0FBS0MsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDLGVBQU9BLElBQUksQ0FBQ0MsVUFBTCxDQUFnQixZQUFNO0FBQ3pCLFVBQUEsS0FBSSxDQUFDUCxrQkFBTCxDQUF3QlEsS0FBeEIsQ0FBOEJGLElBQTlCOztBQUNBLGNBQU1HLFlBQVksR0FBRyxLQUFJLENBQUNDLGFBQTFCOztBQUNBLGNBQUlELFlBQVksQ0FBQ0UsTUFBakIsRUFBeUI7QUFDckIsZ0JBQU1DLFlBQVksR0FBR0gsWUFBWSxDQUFDLENBQUQsQ0FBakM7O0FBQ0EsZ0JBQUlILElBQUksS0FBS00sWUFBYixFQUEyQjtBQUN2Qk4sY0FBQUEsSUFBSSxDQUFDTyxRQUFMOztBQUNBLGNBQUEsS0FBSSxDQUFDYixrQkFBTCxDQUF3QmMsVUFBeEIsQ0FBbUNGLFlBQW5DO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsY0FBQSxLQUFJLENBQUNaLGtCQUFMLENBQXdCZSxXQUF4QixDQUFvQ0gsWUFBcEMsRUFBa0ROLElBQWxEO0FBQ0g7QUFDSixXQVJELE1BUU87QUFDSEEsWUFBQUEsSUFBSSxDQUFDVSxNQUFMOztBQUNBLFlBQUEsS0FBSSxDQUFDaEIsa0JBQUwsQ0FBd0JpQixRQUF4QixDQUFpQ1gsSUFBakM7QUFDSDtBQUNKLFNBZk0sQ0FBUDtBQWdCSCxPQWpCRDtBQWtCSDs7O1dBRUQsYUFBSVksQ0FBSixFQUFlQyxTQUFmLEVBQXVDO0FBQ25DLFdBQUtmLGFBQUwsQ0FBbUJjLENBQW5CLElBQXdCQyxTQUF4QjtBQUNIOzs7V0FFRCxhQUFJQyxLQUFKLEVBQW1CO0FBQ2YsVUFBTUMsUUFBUSxHQUFHLEtBQUtqQixhQUFMLENBQW1Ca0IsTUFBbkIsQ0FBMEIsVUFBQ2hCLElBQUQsRUFBdUI7QUFDOUQsZUFBT0EsSUFBSSxDQUFDaUIsS0FBTCxDQUFXSCxLQUFYLEtBQXFCQSxLQUE1QjtBQUNILE9BRmdCLENBQWpCOztBQUdBLGFBQU9DLFFBQVEsQ0FBQyxDQUFELENBQWY7QUFDSDs7O1dBRUQsd0JBQWVHLFNBQWYsRUFBa0M7QUFDOUIsVUFBTUosS0FBSyxHQUFHSyxrQkFBTUMsZ0JBQU4sQ0FBdUJGLFNBQXZCLENBQWQ7O0FBQ0EsYUFBTyxLQUFLRyxHQUFMLENBQVNQLEtBQVQsQ0FBUDtBQUNIOzs7V0FFRCxpQkFBUVEsQ0FBUixFQUFtQkMsQ0FBbkIsRUFBOEI7QUFDMUIsVUFBTVQsS0FBSyxHQUFHSyxrQkFBTUssU0FBTixDQUFnQkYsQ0FBaEIsRUFBbUJDLENBQW5CLENBQWQ7O0FBQ0EsYUFBTyxLQUFLRixHQUFMLENBQVNQLEtBQVQsQ0FBUDtBQUNIOzs7V0FFRCxnQkFBTztBQUFBOztBQUNILFdBQUtXLFlBQUwsR0FBb0IsQ0FBQyxLQUFLQSxZQUExQixDQURHLENBRUg7O0FBQ0EsVUFBTUMsZ0JBQWdCLEdBQUcsS0FBSzVCLGFBQUwsQ0FBbUI2QixHQUFuQixDQUF1QixVQUFDM0IsSUFBRCxFQUFVO0FBQ3RELGVBQU9BLElBQUksQ0FBQzRCLEtBQUwsRUFBUDtBQUNILE9BRndCLENBQXpCOztBQUdBLFVBQU1DLGtCQUFrQixHQUFHLEtBQUt6QixhQUFMLENBQW1CdUIsR0FBbkIsQ0FBdUIsVUFBQzNCLElBQUQsRUFBVTtBQUN4RCxlQUFPQSxJQUFJLENBQUM0QixLQUFMLEVBQVA7QUFDSCxPQUYwQixDQUEzQixDQU5HLENBU0g7O0FBQ0EsV0FBS0Usa0JBQUw7QUFDQSxXQUFLQyxxQkFBTCxHQVhHLENBWUg7O0FBQ0EsV0FBS0MsaUJBQUwsR0FiRyxDQWNIOztBQUNBTixNQUFBQSxnQkFBZ0IsQ0FBQzNCLE9BQWpCLENBQXlCLFVBQUNrQyxVQUFELEVBQWdCO0FBQ3JDLFlBQU1qQyxJQUFJLEdBQUcsTUFBSSxDQUFDa0MsT0FBTCxDQUFhRCxVQUFVLENBQUNoQixLQUFYLENBQWlCSyxDQUE5QixFQUFpQ1csVUFBVSxDQUFDaEIsS0FBWCxDQUFpQk0sQ0FBbEQsQ0FBYjs7QUFDQXZCLFFBQUFBLElBQUksQ0FBQ21DLFFBQUwsQ0FBY0YsVUFBVSxDQUFDRyxLQUF6QjtBQUNILE9BSEQ7QUFJQVAsTUFBQUEsa0JBQWtCLENBQUM5QixPQUFuQixDQUEyQixVQUFDa0MsVUFBRCxFQUFnQjtBQUN2QyxZQUFNakMsSUFBSSxHQUFHLE1BQUksQ0FBQ2tDLE9BQUwsQ0FBYUQsVUFBVSxDQUFDaEIsS0FBWCxDQUFpQkssQ0FBOUIsRUFBaUNXLFVBQVUsQ0FBQ2hCLEtBQVgsQ0FBaUJNLENBQWxELENBQWI7O0FBQ0F2QixRQUFBQSxJQUFJLENBQUNVLE1BQUw7QUFDSCxPQUhEO0FBSUg7OztTQUVELGVBQW9CO0FBQ2hCLGFBQU8sS0FBS1osYUFBTCxDQUFtQmtCLE1BQW5CLENBQTBCLFVBQUNoQixJQUFELEVBQVU7QUFDdkMsZUFBT0EsSUFBSSxDQUFDcUMsVUFBWjtBQUNILE9BRk0sQ0FBUDtBQUdIOzs7U0FDRCxlQUFtQjtBQUNmLGFBQU8sS0FBS3ZDLGFBQUwsQ0FBbUJrQixNQUFuQixDQUEwQixVQUFDaEIsSUFBRCxFQUFVO0FBQ3ZDLGVBQU9BLElBQUksQ0FBQ3NDLFNBQVo7QUFDSCxPQUZNLENBQVA7QUFHSDs7O1NBQ0QsZUFBaUI7QUFDYixhQUFPLEtBQUt4QyxhQUFMLENBQW1Ca0IsTUFBbkIsQ0FBMEIsVUFBQ2hCLElBQUQsRUFBVTtBQUN2QyxlQUFPQSxJQUFJLENBQUN1QyxPQUFaO0FBQ0gsT0FGTSxDQUFQO0FBR0g7OztXQUVELDhCQUFxQjtBQUFBOztBQUNqQixXQUFLbkMsYUFBTCxDQUFtQkwsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDQSxRQUFBQSxJQUFJLENBQUNPLFFBQUw7O0FBQ0EsUUFBQSxNQUFJLENBQUNiLGtCQUFMLENBQXdCYyxVQUF4QixDQUFtQ1IsSUFBbkM7QUFDSCxPQUhEO0FBSUg7OztXQUNELDZCQUFvQjtBQUNoQixXQUFLd0MsWUFBTCxDQUFrQnpDLE9BQWxCLENBQTBCLFVBQUNDLElBQUQsRUFBVTtBQUNoQ0EsUUFBQUEsSUFBSSxDQUFDeUMsYUFBTDtBQUNILE9BRkQ7QUFHSDs7O1dBRUQsMkJBQWtCO0FBQ2QsV0FBS0MsVUFBTCxDQUFnQjNDLE9BQWhCLENBQXdCLFVBQUNDLElBQUQsRUFBVTtBQUM5QkEsUUFBQUEsSUFBSSxDQUFDMkMsVUFBTDtBQUNILE9BRkQ7QUFHSDs7O1dBRUQsaUNBQXdCO0FBQ3BCLFdBQUs3QyxhQUFMLENBQW1CQyxPQUFuQixDQUEyQixVQUFDQyxJQUFELEVBQVU7QUFDakNBLFFBQUFBLElBQUksQ0FBQzRDLFdBQUw7QUFDSCxPQUZEO0FBR0g7OztXQUVELDZCQUFvQjtBQUFBOztBQUNoQixXQUFLOUMsYUFBTCxDQUFtQkMsT0FBbkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQ2pDQSxRQUFBQSxJQUFJLENBQUM2QyxVQUFMLENBQWdCLE1BQUksQ0FBQ3BCLFlBQXJCO0FBQ0gsT0FGRDtBQUdIOzs7V0FFRCxtQkFBVTtBQUNOLFdBQUssSUFBSWIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2tDLHNCQUFwQixFQUFnQ2xDLENBQUMsRUFBakMsRUFBcUM7QUFDakMsWUFBTVosSUFBSSxHQUFHLEtBQUtrQyxPQUFMLENBQWF0QixDQUFiLEVBQWdCLENBQWhCLENBQWI7QUFDQVosUUFBQUEsSUFBSSxDQUFDK0MsWUFBTCxXQUFxQkMsb0NBQXJCLGNBQWtEcEMsQ0FBQyxHQUFHLENBQXREO0FBQ0g7O0FBQ0QsV0FBSyxJQUFJcUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsc0JBQXBCLEVBQWdDRyxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFlBQU1qRCxLQUFJLEdBQUcsS0FBS2tDLE9BQUwsQ0FBYSxDQUFiLEVBQWdCZSxDQUFoQixDQUFiOztBQUNBakQsUUFBQUEsS0FBSSxDQUFDK0MsWUFBTCxXQUFxQkcsb0NBQXJCLGNBQWtERCxDQUFDLEdBQUcsQ0FBdEQ7QUFDSDtBQUNKOzs7V0FFRCxrQ0FBeUI7QUFBQTs7QUFDckIsV0FBS2xCLHFCQUFMO0FBQ0EsV0FBS25DLFVBQUwsQ0FBZ0J1RCxhQUFoQixDQUE4QnBELE9BQTlCLENBQXNDLFVBQUNxQyxLQUFELEVBQVF4QixDQUFSLEVBQWM7QUFDaEQsWUFBTVosSUFBSSxHQUFHLE1BQUksQ0FBQ3FCLEdBQUwsQ0FBU1QsQ0FBVCxDQUFiOztBQUNBWixRQUFBQSxJQUFJLENBQUNtQyxRQUFMLENBQWNDLEtBQWQ7QUFDSCxPQUhEO0FBSUg7OztXQUNELHFDQUE0Qi9DLFFBQTVCLEVBQWlFO0FBQzdELFdBQUtLLGtCQUFMLENBQXdCMEQsMkJBQXhCLENBQW9EL0QsUUFBcEQ7QUFDSDs7O1dBQ0Qsd0NBQStCQSxRQUEvQixFQUFvRTtBQUNoRSxXQUFLSyxrQkFBTCxDQUF3QjJELDhCQUF4QixDQUF1RGhFLFFBQXZEO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBb0U7QUFDaEUsV0FBS0ssa0JBQUwsQ0FBd0I0RCw4QkFBeEIsQ0FBdURqRSxRQUF2RDtBQUNIOzs7V0FDRCwyQ0FBa0NBLFFBQWxDLEVBQXVFO0FBQ25FLFdBQUtLLGtCQUFMLENBQXdCNkQsaUNBQXhCLENBQTBEbEUsUUFBMUQ7QUFDSDs7O1dBQ0QsMENBQWlDQSxRQUFqQyxFQUFzRTtBQUNsRSxXQUFLSyxrQkFBTCxDQUF3QjhELGdDQUF4QixDQUF5RG5FLFFBQXpEO0FBQ0g7OztXQUNELDZDQUFvQ0EsUUFBcEMsRUFBeUU7QUFDckUsV0FBS0ssa0JBQUwsQ0FBd0IrRCxtQ0FBeEIsQ0FBNERwRSxRQUE1RDtBQUNIOzs7V0FDRCx1Q0FBOEJBLFFBQTlCLEVBQXNHO0FBQ2xHLFdBQUtLLGtCQUFMLENBQXdCZ0UsNkJBQXhCLENBQXNEckUsUUFBdEQ7QUFDSDs7O1dBQ0QsMENBQWlDQSxRQUFqQyxFQUF5RztBQUNyRyxXQUFLSyxrQkFBTCxDQUF3QmlFLGdDQUF4QixDQUF5RHRFLFFBQXpEO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7XG4gICAgQk9BUkRfTk9URV9WX1BSRUZJWF9DTEFTUyxcbiAgICBCT0FSRF9OT1RFX0hfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IE9wdGlvbnNNYW5hZ2VyIGZyb20gJy4vT3B0aW9uc01hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQge1xuICAgIEtobWVyQ2hlc3MsXG4gICAgUG9pbnQsXG4gICAgUk9XX05VTUJFUixcbiAgICBMaXN0ZW5lclR5cGUsXG4gICAgRXZlbnRIYW5kbGVyLFxufSBmcm9tICdraG1lci1jaGVzcyc7XG5cbmNsYXNzIEJvYXJkRXZlbnRDb250cm9sbGVyIGV4dGVuZHMgRXZlbnRIYW5kbGVyIHtcbiAgICBzdGF0aWMgQ0xJQ0sgPSAnY2xpY2snO1xuICAgIHN0YXRpYyBTRUxFQ1RFRCA9ICdzZWxlY3RlZCc7XG4gICAgc3RhdGljIERFU0VMRUNURUQgPSAnZGVzZWxlY3RlZCc7XG4gICAgc3RhdGljIEFUVEVNUFRfTU9WRSA9ICdhdHRlbXB0LW1vdmUnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBDTElDSzogQm9hcmRFdmVudENvbnRyb2xsZXIuQ0xJQ0ssXG4gICAgICAgICAgICAgICAgU0VMRUNURUQ6IEJvYXJkRXZlbnRDb250cm9sbGVyLlNFTEVDVEVELFxuICAgICAgICAgICAgICAgIEFUVEVNUFRfTU9WRTogQm9hcmRFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrKGNlbGxNYW5hZ2VyOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGNlbGxNYW5hZ2VyKTtcbiAgICB9XG4gICAgc2VsZWN0ZWQoY2VsbE1hbmFnZXI6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZEV2ZW50Q29udHJvbGxlci5TRUxFQ1RFRCwgY2VsbE1hbmFnZXIpO1xuICAgIH1cbiAgICBkZXNlbGVjdGVkKGNlbGxNYW5hZ2VyOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgY2VsbE1hbmFnZXIpO1xuICAgIH1cbiAgICBhdHRlbXB0TW92ZShmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwge1xuICAgICAgICAgICAgZnJvbUNlbGwsXG4gICAgICAgICAgICB0b0NlbGwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkRXZlbnRDb250cm9sbGVyLkNMSUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoQm9hcmRFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5TRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkRXZlbnRDb250cm9sbGVyLlNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZEV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkTWFuYWdlciB7XG4gICAgX2NlbGxNYW5hZ2VyczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgYm9hRXZlbnRDb250cm9sbGVyOiBCb2FyZEV2ZW50Q29udHJvbGxlcjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIgPSBuZXcgQm9hcmRFdmVudENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcyA9IGtobWVyQ2hlc3NCb2FyZC5raG1lckNoZXNzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBraG1lckNoZXNzQm9hcmQub3B0aW9ucztcbiAgICB9XG4gICAgZW5hYmxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2NlbGxNYW5hZ2Vycy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5zZXRPbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5jbGljayhjZWxsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHM7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gc2VsZWN0ZWRMaXN0WzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCA9PT0gc2VsZWN0ZWRDZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKHNlbGVjdGVkQ2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hdHRlbXB0TW92ZShzZWxlY3RlZENlbGwsIGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZWxlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuc2VsZWN0ZWQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1dChpOiBudW1iZXIsIGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzW2ldID0gY2VsbFBpZWNlO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbDogQ2VsbE1hbmFnZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLnBvaW50LmluZGV4ID09PSBpbmRleDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZFswXTtcbiAgICB9XG5cbiAgICBnZXRCeUluZGV4Q29kZShpbmRleENvZGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IFBvaW50LmluZGV4Q29kZVRvSW5kZXgoaW5kZXhDb2RlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRCeVhZKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUG9pbnQueHlUb0luZGV4KHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoaW5kZXgpO1xuICAgIH1cblxuICAgIGZsaXAoKSB7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gIXRoaXMuaXNVcHNpZGVEb3duO1xuICAgICAgICAvLyBiYWNrdXBcbiAgICAgICAgY29uc3QgYmFja3VwUGllY2VzTGlzdCA9IHRoaXMuX2NlbGxNYW5hZ2Vycy5tYXAoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmNsb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBiYWNrdXBTZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkQ2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jbG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgLy8gZmxpcFxuICAgICAgICB0aGlzLmFwcGx5RmxpcHBpbmdGbGFnKCk7XG4gICAgICAgIC8vIHJlc3RvcmVcbiAgICAgICAgYmFja3VwUGllY2VzTGlzdC5mb3JFYWNoKChjbG9uZWRDZWxsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGNsb25lZENlbGwucG9pbnQueCwgY2xvbmVkQ2VsbC5wb2ludC55KTtcbiAgICAgICAgICAgIGNlbGwuc2V0UGllY2UoY2xvbmVkQ2VsbC5waWVjZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrdXBTZWxlY3RlZExpc3QuZm9yRWFjaCgoY2xvbmVkQ2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWShjbG9uZWRDZWxsLnBvaW50LngsIGNsb25lZENlbGwucG9pbnQueSk7XG4gICAgICAgICAgICBjZWxsLnNlbGVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRDZWxscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxNYW5hZ2Vycy5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmlzU2VsZWN0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgY2FuTW92ZUNlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbE1hbmFnZXJzLmZpbHRlcigoY2VsbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuaXNDYW5Nb3ZlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IG1vdmVkQ2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsTWFuYWdlcnMuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5pc01vdmVkO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmRlc2VsZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5kZXNlbGVjdGVkKGNlbGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xlYXJDYW5Nb3ZlQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMuY2FuTW92ZUNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuY2xlYXJDYW5Nb3ZlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhck1vdmVkQ2VsbHMoKSB7XG4gICAgICAgIHRoaXMubW92ZWRDZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmNsZWFyTW92ZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICB0aGlzLl9jZWxsTWFuYWdlcnMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHBseUZsaXBwaW5nRmxhZygpIHtcbiAgICAgICAgdGhpcy5fY2VsbE1hbmFnZXJzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgIGNlbGwuc2V0RmxpcHBlZCh0aGlzLmlzVXBzaWRlRG93bik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRCeVhZKGksIDApO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7Qk9BUkRfTk9URV9IX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IFJPV19OVU1CRVI7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0QnlYWSgwLCBqKTtcbiAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKGAke0JPQVJEX05PVEVfVl9QUkVGSVhfQ0xBU1N9LSR7aiArIDF9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJLaG1lckNoZXNzUGllY2VzKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlc0Zyb21DZWxscygpO1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MucGllY2VzSW5Cb2FyZC5mb3JFYWNoKChwaWVjZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5hZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIucmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPENlbGxNYW5hZ2VyPikge1xuICAgICAgICB0aGlzLmJvYUV2ZW50Q29udHJvbGxlci5yZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5ib2FFdmVudENvbnRyb2xsZXIuYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuYm9hRXZlbnRDb250cm9sbGVyLnJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=