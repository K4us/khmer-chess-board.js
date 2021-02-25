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

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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
        ATTEMPT_MOVE: BoardManagerEventController.ATTEMPT_MOVE
      }
    });
  }

  _createClass(BoardManagerEventController, [{
    key: "click",
    value: function click(cellManager) {
      this._addPropEvent(BoardManagerEventController.CLICK, cellManager);
    }
  }, {
    key: "selected",
    value: function selected(cellManager) {
      this._addPropEvent(BoardManagerEventController.SELECTED, cellManager);
    }
  }, {
    key: "deselected",
    value: function deselected(cellManager) {
      this._addPropEvent(BoardManagerEventController.DESELECTED, cellManager);
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
  }]);

  return BoardManagerEventController;
}(_khmerChess.EventHandler);

exports["default"] = BoardManagerEventController;

_defineProperty(BoardManagerEventController, "CLICK", 'click');

_defineProperty(BoardManagerEventController, "SELECTED", 'selected');

_defineProperty(BoardManagerEventController, "DESELECTED", 'deselected');

_defineProperty(BoardManagerEventController, "ATTEMPT_MOVE", 'attempt-move');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwiZXZlbnRzIiwiQ0xJQ0siLCJTRUxFQ1RFRCIsIkFUVEVNUFRfTU9WRSIsImNlbGxNYW5hZ2VyIiwiX2FkZFByb3BFdmVudCIsIkRFU0VMRUNURUQiLCJmcm9tQ2VsbCIsInRvQ2VsbCIsImxpc3RlbmVyIiwiX2FkZE9uRXZlbnRMaXN0ZW5lciIsIl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIiLCJFdmVudEhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSwyQjs7Ozs7QUFLakIseUNBQWM7QUFBQTs7QUFBQSw2QkFDSjtBQUNGQyxNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsS0FBSyxFQUFFRiwyQkFBMkIsQ0FBQ0UsS0FEL0I7QUFFSkMsUUFBQUEsUUFBUSxFQUFFSCwyQkFBMkIsQ0FBQ0csUUFGbEM7QUFHSkMsUUFBQUEsWUFBWSxFQUFFSiwyQkFBMkIsQ0FBQ0k7QUFIdEM7QUFETixLQURJO0FBUWI7Ozs7V0FDRCxlQUFNQyxXQUFOLEVBQWdDO0FBQzVCLFdBQUtDLGFBQUwsQ0FBbUJOLDJCQUEyQixDQUFDRSxLQUEvQyxFQUFzREcsV0FBdEQ7QUFDSDs7O1dBQ0Qsa0JBQVNBLFdBQVQsRUFBbUM7QUFDL0IsV0FBS0MsYUFBTCxDQUFtQk4sMkJBQTJCLENBQUNHLFFBQS9DLEVBQXlERSxXQUF6RDtBQUNIOzs7V0FDRCxvQkFBV0EsV0FBWCxFQUFxQztBQUNqQyxXQUFLQyxhQUFMLENBQW1CTiwyQkFBMkIsQ0FBQ08sVUFBL0MsRUFBMkRGLFdBQTNEO0FBQ0g7OztXQUNELHFCQUFZRyxRQUFaLEVBQW1DQyxNQUFuQyxFQUF3RDtBQUNwRCxXQUFLSCxhQUFMLENBQW1CTiwyQkFBMkIsQ0FBQ0ksWUFBL0MsRUFBNkQ7QUFDekRJLFFBQUFBLFFBQVEsRUFBUkEsUUFEeUQ7QUFFekRDLFFBQUFBLE1BQU0sRUFBTkE7QUFGeUQsT0FBN0Q7QUFJSDs7O1dBQ0QscUNBQTRCQyxRQUE1QixFQUFpRTtBQUM3RCxXQUFLQyxtQkFBTCxDQUF5QlgsMkJBQTJCLENBQUNFLEtBQXJELEVBQTREUSxRQUE1RDtBQUNIOzs7V0FDRCx3Q0FBK0JBLFFBQS9CLEVBQW9FO0FBQ2hFLFdBQUtFLHNCQUFMLENBQTRCWiwyQkFBMkIsQ0FBQ0UsS0FBeEQsRUFBK0RRLFFBQS9EO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBb0U7QUFDaEUsV0FBS0MsbUJBQUwsQ0FBeUJYLDJCQUEyQixDQUFDRyxRQUFyRCxFQUErRE8sUUFBL0Q7QUFDSDs7O1dBQ0QsMkNBQWtDQSxRQUFsQyxFQUF1RTtBQUNuRSxXQUFLRSxzQkFBTCxDQUE0QlosMkJBQTJCLENBQUNHLFFBQXhELEVBQWtFTyxRQUFsRTtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXNFO0FBQ2xFLFdBQUtDLG1CQUFMLENBQXlCWCwyQkFBMkIsQ0FBQ08sVUFBckQsRUFBaUVHLFFBQWpFO0FBQ0g7OztXQUNELDZDQUFvQ0EsUUFBcEMsRUFBeUU7QUFDckUsV0FBS0Usc0JBQUwsQ0FBNEJaLDJCQUEyQixDQUFDTyxVQUF4RCxFQUFvRUcsUUFBcEU7QUFDSDs7O1dBQ0QsdUNBQThCQSxRQUE5QixFQUFzRztBQUNsRyxXQUFLQyxtQkFBTCxDQUF5QlgsMkJBQTJCLENBQUNJLFlBQXJELEVBQW1FTSxRQUFuRTtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXlHO0FBQ3JHLFdBQUtFLHNCQUFMLENBQTRCWiwyQkFBMkIsQ0FBQ0ksWUFBeEQsRUFBc0VNLFFBQXRFO0FBQ0g7Ozs7RUFwRG9ERyx3Qjs7OztnQkFBcENiLDJCLFdBQ0YsTzs7Z0JBREVBLDJCLGNBRUMsVTs7Z0JBRkRBLDJCLGdCQUdHLFk7O2dCQUhIQSwyQixrQkFJSyxjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgQ2VsbE1hbmFnZXIgZnJvbSAnLi9DZWxsTWFuYWdlcic7XG5pbXBvcnQge1xuICAgIExpc3RlbmVyVHlwZSxcbiAgICBFdmVudEhhbmRsZXIsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIGV4dGVuZHMgRXZlbnRIYW5kbGVyIHtcbiAgICBzdGF0aWMgQ0xJQ0sgPSAnY2xpY2snO1xuICAgIHN0YXRpYyBTRUxFQ1RFRCA9ICdzZWxlY3RlZCc7XG4gICAgc3RhdGljIERFU0VMRUNURUQgPSAnZGVzZWxlY3RlZCc7XG4gICAgc3RhdGljIEFUVEVNUFRfTU9WRSA9ICdhdHRlbXB0LW1vdmUnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBDTElDSzogQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLFxuICAgICAgICAgICAgICAgIFNFTEVDVEVEOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsXG4gICAgICAgICAgICAgICAgQVRURU1QVF9NT1ZFOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrKGNlbGxNYW5hZ2VyOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBjZWxsTWFuYWdlcik7XG4gICAgfVxuICAgIHNlbGVjdGVkKGNlbGxNYW5hZ2VyOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlNFTEVDVEVELCBjZWxsTWFuYWdlcik7XG4gICAgfVxuICAgIGRlc2VsZWN0ZWQoY2VsbE1hbmFnZXI6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgY2VsbE1hbmFnZXIpO1xuICAgIH1cbiAgICBhdHRlbXB0TW92ZShmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIHtcbiAgICAgICAgICAgIGZyb21DZWxsLFxuICAgICAgICAgICAgdG9DZWxsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=