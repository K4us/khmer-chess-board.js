"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _khmerChess = require("khmer-chess");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BoardManagerEventController = /*#__PURE__*/function (_EventHandler) {
  _inherits(BoardManagerEventController, _EventHandler);

  var _super = _createSuper(BoardManagerEventController);

  function BoardManagerEventController() {
    _classCallCheck(this, BoardManagerEventController);

    return _super.call(this, {
      events: {
        CLICK: BoardManagerEventController.CLICK,
        SELECTED: BoardManagerEventController.SELECTED,
        ATTEMPT_MOVE: BoardManagerEventController.ATTEMPT_MOVE,
        CHANGE_TURN: BoardManagerEventController.CHANGE_TURN
      }
    });
  }

  _createClass(BoardManagerEventController, [{
    key: "click",
    value: function click(data) {
      this._addPropEvent(BoardManagerEventController.CLICK, data);
    }
  }, {
    key: "selected",
    value: function selected(data) {
      this._addPropEvent(BoardManagerEventController.SELECTED, data);
    }
  }, {
    key: "deselected",
    value: function deselected(data) {
      this._addPropEvent(BoardManagerEventController.DESELECTED, data);
    }
  }, {
    key: "attemptMove",
    value: function attemptMove(fromCell, toCell) {
      this._addPropEvent(BoardManagerEventController.ATTEMPT_MOVE, {
        fromCell: fromCell,
        toCell: toCell
      });
    }
  }, {
    key: "changeTurn",
    value: function changeTurn() {
      this._addPropEvent(BoardManagerEventController.CHANGE_TURN);
    }
  }, {
    key: "addOnCellClickEventListener",
    value: function addOnCellClickEventListener(listener) {
      this._addOnEventListener(BoardManagerEventController.CLICK, listener);
    }
  }, {
    key: "removeOnCellClickEventListener",
    value: function removeOnCellClickEventListener(listener) {
      this._removeOnEventListener(BoardManagerEventController.CLICK, listener);
    }
  }, {
    key: "addOnCellSelectedEventListener",
    value: function addOnCellSelectedEventListener(listener) {
      this._addOnEventListener(BoardManagerEventController.SELECTED, listener);
    }
  }, {
    key: "removeOnCellSelectedEventListener",
    value: function removeOnCellSelectedEventListener(listener) {
      this._removeOnEventListener(BoardManagerEventController.SELECTED, listener);
    }
  }, {
    key: "addOnCellDeselectedEventListener",
    value: function addOnCellDeselectedEventListener(listener) {
      this._addOnEventListener(BoardManagerEventController.DESELECTED, listener);
    }
  }, {
    key: "removeOnCellDeselectedEventListener",
    value: function removeOnCellDeselectedEventListener(listener) {
      this._removeOnEventListener(BoardManagerEventController.DESELECTED, listener);
    }
  }, {
    key: "addOnAttemptMoveEventListener",
    value: function addOnAttemptMoveEventListener(listener) {
      this._addOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    }
  }, {
    key: "removeOnAttemptMoveEventListener",
    value: function removeOnAttemptMoveEventListener(listener) {
      this._removeOnEventListener(BoardManagerEventController.ATTEMPT_MOVE, listener);
    }
  }, {
    key: "addOnChangeTurnEventListener",
    value: function addOnChangeTurnEventListener(listener) {
      this._addOnEventListener(BoardManagerEventController.CHANGE_TURN, listener);
    }
  }, {
    key: "removeOnChangeTurnEventListener",
    value: function removeOnChangeTurnEventListener(listener) {
      this._removeOnEventListener(BoardManagerEventController.CHANGE_TURN, listener);
    }
  }]);

  return BoardManagerEventController;
}(_khmerChess.EventHandler);

exports["default"] = BoardManagerEventController;

_defineProperty(BoardManagerEventController, "CLICK", 'click');

_defineProperty(BoardManagerEventController, "SELECTED", 'selected');

_defineProperty(BoardManagerEventController, "DESELECTED", 'deselected');

_defineProperty(BoardManagerEventController, "ATTEMPT_MOVE", 'attempt-move');

_defineProperty(BoardManagerEventController, "CHANGE_TURN", 'change-turn');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwiZXZlbnRzIiwiQ0xJQ0siLCJTRUxFQ1RFRCIsIkFUVEVNUFRfTU9WRSIsIkNIQU5HRV9UVVJOIiwiZGF0YSIsIl9hZGRQcm9wRXZlbnQiLCJERVNFTEVDVEVEIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJsaXN0ZW5lciIsIl9hZGRPbkV2ZW50TGlzdGVuZXIiLCJfcmVtb3ZlT25FdmVudExpc3RlbmVyIiwiRXZlbnRIYW5kbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUEyQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsMkI7Ozs7O0FBTWpCLHlDQUFjO0FBQUE7O0FBQUEsNkJBQ0o7QUFDRkMsTUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFFBQUFBLEtBQUssRUFBRUYsMkJBQTJCLENBQUNFLEtBRC9CO0FBRUpDLFFBQUFBLFFBQVEsRUFBRUgsMkJBQTJCLENBQUNHLFFBRmxDO0FBR0pDLFFBQUFBLFlBQVksRUFBRUosMkJBQTJCLENBQUNJLFlBSHRDO0FBSUpDLFFBQUFBLFdBQVcsRUFBRUwsMkJBQTJCLENBQUNLO0FBSnJDO0FBRE4sS0FESTtBQVNiOzs7O1dBQ0QsZUFBTUMsSUFBTixFQUFlO0FBQ1gsV0FBS0MsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNFLEtBQS9DLEVBQXNESSxJQUF0RDtBQUNIOzs7V0FDRCxrQkFBU0EsSUFBVCxFQUFrQjtBQUNkLFdBQUtDLGFBQUwsQ0FBbUJQLDJCQUEyQixDQUFDRyxRQUEvQyxFQUF5REcsSUFBekQ7QUFDSDs7O1dBQ0Qsb0JBQVdBLElBQVgsRUFBb0I7QUFDaEIsV0FBS0MsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNRLFVBQS9DLEVBQTJERixJQUEzRDtBQUNIOzs7V0FDRCxxQkFBWUcsUUFBWixFQUF5QkMsTUFBekIsRUFBb0M7QUFDaEMsV0FBS0gsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNJLFlBQS9DLEVBQTZEO0FBQ3pESyxRQUFBQSxRQUFRLEVBQVJBLFFBRHlEO0FBRXpEQyxRQUFBQSxNQUFNLEVBQU5BO0FBRnlELE9BQTdEO0FBSUg7OztXQUNELHNCQUFhO0FBQ1QsV0FBS0gsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNLLFdBQS9DO0FBQ0g7OztXQUNELHFDQUE0Qk0sUUFBNUIsRUFBdUQ7QUFDbkQsV0FBS0MsbUJBQUwsQ0FBeUJaLDJCQUEyQixDQUFDRSxLQUFyRCxFQUE0RFMsUUFBNUQ7QUFDSDs7O1dBQ0Qsd0NBQStCQSxRQUEvQixFQUEwRDtBQUN0RCxXQUFLRSxzQkFBTCxDQUE0QmIsMkJBQTJCLENBQUNFLEtBQXhELEVBQStEUyxRQUEvRDtBQUNIOzs7V0FDRCx3Q0FBK0JBLFFBQS9CLEVBQTBEO0FBQ3RELFdBQUtDLG1CQUFMLENBQXlCWiwyQkFBMkIsQ0FBQ0csUUFBckQsRUFBK0RRLFFBQS9EO0FBQ0g7OztXQUNELDJDQUFrQ0EsUUFBbEMsRUFBNkQ7QUFDekQsV0FBS0Usc0JBQUwsQ0FBNEJiLDJCQUEyQixDQUFDRyxRQUF4RCxFQUFrRVEsUUFBbEU7QUFDSDs7O1dBQ0QsMENBQWlDQSxRQUFqQyxFQUE0RDtBQUN4RCxXQUFLQyxtQkFBTCxDQUF5QlosMkJBQTJCLENBQUNRLFVBQXJELEVBQWlFRyxRQUFqRTtBQUNIOzs7V0FDRCw2Q0FBb0NBLFFBQXBDLEVBQStEO0FBQzNELFdBQUtFLHNCQUFMLENBQTRCYiwyQkFBMkIsQ0FBQ1EsVUFBeEQsRUFBb0VHLFFBQXBFO0FBQ0g7OztXQUNELHVDQUE4QkEsUUFBOUIsRUFBa0Y7QUFDOUUsV0FBS0MsbUJBQUwsQ0FBeUJaLDJCQUEyQixDQUFDSSxZQUFyRCxFQUFtRU8sUUFBbkU7QUFDSDs7O1dBQ0QsMENBQWlDQSxRQUFqQyxFQUFxRjtBQUNqRixXQUFLRSxzQkFBTCxDQUE0QmIsMkJBQTJCLENBQUNJLFlBQXhELEVBQXNFTyxRQUF0RTtBQUNIOzs7V0FDRCxzQ0FBNkJBLFFBQTdCLEVBQWlGO0FBQzdFLFdBQUtDLG1CQUFMLENBQXlCWiwyQkFBMkIsQ0FBQ0ssV0FBckQsRUFBa0VNLFFBQWxFO0FBQ0g7OztXQUNELHlDQUFnQ0EsUUFBaEMsRUFBb0Y7QUFDaEYsV0FBS0Usc0JBQUwsQ0FBNEJiLDJCQUEyQixDQUFDSyxXQUF4RCxFQUFxRU0sUUFBckU7QUFDSDs7OztFQS9EdURHLHdCOzs7O2dCQUF2Q2QsMkIsV0FDRixPOztnQkFERUEsMkIsY0FFQyxVOztnQkFGREEsMkIsZ0JBR0csWTs7Z0JBSEhBLDJCLGtCQUlLLGM7O2dCQUpMQSwyQixpQkFLSSxhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQge1xuICAgIExpc3RlbmVyVHlwZSxcbiAgICBFdmVudEhhbmRsZXIsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyPFQ+IGV4dGVuZHMgRXZlbnRIYW5kbGVyIHtcbiAgICBzdGF0aWMgQ0xJQ0sgPSAnY2xpY2snO1xuICAgIHN0YXRpYyBTRUxFQ1RFRCA9ICdzZWxlY3RlZCc7XG4gICAgc3RhdGljIERFU0VMRUNURUQgPSAnZGVzZWxlY3RlZCc7XG4gICAgc3RhdGljIEFUVEVNUFRfTU9WRSA9ICdhdHRlbXB0LW1vdmUnO1xuICAgIHN0YXRpYyBDSEFOR0VfVFVSTiA9ICdjaGFuZ2UtdHVybic7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIENMSUNLOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssXG4gICAgICAgICAgICAgICAgU0VMRUNURUQ6IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5TRUxFQ1RFRCxcbiAgICAgICAgICAgICAgICBBVFRFTVBUX01PVkU6IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsXG4gICAgICAgICAgICAgICAgQ0hBTkdFX1RVUk46IEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5DSEFOR0VfVFVSTixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGljayhkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGRhdGEpO1xuICAgIH1cbiAgICBzZWxlY3RlZChkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGRhdGEpO1xuICAgIH1cbiAgICBkZXNlbGVjdGVkKGRhdGE6IFQpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBkYXRhKTtcbiAgICB9XG4gICAgYXR0ZW1wdE1vdmUoZnJvbUNlbGw6IFQsIHRvQ2VsbDogVCkge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwge1xuICAgICAgICAgICAgZnJvbUNlbGwsXG4gICAgICAgICAgICB0b0NlbGwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGFuZ2VUdXJuKCkge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNIQU5HRV9UVVJOKTtcbiAgICB9XG4gICAgYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5DTElDSywgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5TRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkNlbGxEZXNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IFQsIHRvQ2VsbDogVCB9Pikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IFQsIHRvQ2VsbDogVCB9Pikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkNoYW5nZVR1cm5FdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogVCwgdG9DZWxsOiBUIH0+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0hBTkdFX1RVUk4sIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IFQsIHRvQ2VsbDogVCB9Pikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNIQU5HRV9UVVJOLCBsaXN0ZW5lcik7XG4gICAgfVxufVxuIl19