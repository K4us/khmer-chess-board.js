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
        ATTEMPT_MOVE: BoardManagerEventController.ATTEMPT_MOVE,
        CHANGE_TURN: BoardManagerEventController.CHANGE_TURN
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwiZXZlbnRzIiwiQ0xJQ0siLCJTRUxFQ1RFRCIsIkFUVEVNUFRfTU9WRSIsIkNIQU5HRV9UVVJOIiwiY2VsbE1hbmFnZXIiLCJfYWRkUHJvcEV2ZW50IiwiREVTRUxFQ1RFRCIsImZyb21DZWxsIiwidG9DZWxsIiwibGlzdGVuZXIiLCJfYWRkT25FdmVudExpc3RlbmVyIiwiX3JlbW92ZU9uRXZlbnRMaXN0ZW5lciIsIkV2ZW50SGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBNEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLDJCOzs7OztBQU1qQix5Q0FBYztBQUFBOztBQUFBLDZCQUNKO0FBQ0ZDLE1BQUFBLE1BQU0sRUFBRTtBQUNKQyxRQUFBQSxLQUFLLEVBQUVGLDJCQUEyQixDQUFDRSxLQUQvQjtBQUVKQyxRQUFBQSxRQUFRLEVBQUVILDJCQUEyQixDQUFDRyxRQUZsQztBQUdKQyxRQUFBQSxZQUFZLEVBQUVKLDJCQUEyQixDQUFDSSxZQUh0QztBQUlKQyxRQUFBQSxXQUFXLEVBQUVMLDJCQUEyQixDQUFDSztBQUpyQztBQUROLEtBREk7QUFTYjs7OztXQUNELGVBQU1DLFdBQU4sRUFBZ0M7QUFDNUIsV0FBS0MsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNFLEtBQS9DLEVBQXNESSxXQUF0RDtBQUNIOzs7V0FDRCxrQkFBU0EsV0FBVCxFQUFtQztBQUMvQixXQUFLQyxhQUFMLENBQW1CUCwyQkFBMkIsQ0FBQ0csUUFBL0MsRUFBeURHLFdBQXpEO0FBQ0g7OztXQUNELG9CQUFXQSxXQUFYLEVBQXFDO0FBQ2pDLFdBQUtDLGFBQUwsQ0FBbUJQLDJCQUEyQixDQUFDUSxVQUEvQyxFQUEyREYsV0FBM0Q7QUFDSDs7O1dBQ0QscUJBQVlHLFFBQVosRUFBbUNDLE1BQW5DLEVBQXdEO0FBQ3BELFdBQUtILGFBQUwsQ0FBbUJQLDJCQUEyQixDQUFDSSxZQUEvQyxFQUE2RDtBQUN6REssUUFBQUEsUUFBUSxFQUFSQSxRQUR5RDtBQUV6REMsUUFBQUEsTUFBTSxFQUFOQTtBQUZ5RCxPQUE3RDtBQUlIOzs7V0FDRCxzQkFBYTtBQUNULFdBQUtILGFBQUwsQ0FBbUJQLDJCQUEyQixDQUFDSyxXQUEvQztBQUNIOzs7V0FDRCxxQ0FBNEJNLFFBQTVCLEVBQWlFO0FBQzdELFdBQUtDLG1CQUFMLENBQXlCWiwyQkFBMkIsQ0FBQ0UsS0FBckQsRUFBNERTLFFBQTVEO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBb0U7QUFDaEUsV0FBS0Usc0JBQUwsQ0FBNEJiLDJCQUEyQixDQUFDRSxLQUF4RCxFQUErRFMsUUFBL0Q7QUFDSDs7O1dBQ0Qsd0NBQStCQSxRQUEvQixFQUFvRTtBQUNoRSxXQUFLQyxtQkFBTCxDQUF5QlosMkJBQTJCLENBQUNHLFFBQXJELEVBQStEUSxRQUEvRDtBQUNIOzs7V0FDRCwyQ0FBa0NBLFFBQWxDLEVBQXVFO0FBQ25FLFdBQUtFLHNCQUFMLENBQTRCYiwyQkFBMkIsQ0FBQ0csUUFBeEQsRUFBa0VRLFFBQWxFO0FBQ0g7OztXQUNELDBDQUFpQ0EsUUFBakMsRUFBc0U7QUFDbEUsV0FBS0MsbUJBQUwsQ0FBeUJaLDJCQUEyQixDQUFDUSxVQUFyRCxFQUFpRUcsUUFBakU7QUFDSDs7O1dBQ0QsNkNBQW9DQSxRQUFwQyxFQUF5RTtBQUNyRSxXQUFLRSxzQkFBTCxDQUE0QmIsMkJBQTJCLENBQUNRLFVBQXhELEVBQW9FRyxRQUFwRTtBQUNIOzs7V0FDRCx1Q0FBOEJBLFFBQTlCLEVBQXNHO0FBQ2xHLFdBQUtDLG1CQUFMLENBQXlCWiwyQkFBMkIsQ0FBQ0ksWUFBckQsRUFBbUVPLFFBQW5FO0FBQ0g7OztXQUNELDBDQUFpQ0EsUUFBakMsRUFBeUc7QUFDckcsV0FBS0Usc0JBQUwsQ0FBNEJiLDJCQUEyQixDQUFDSSxZQUF4RCxFQUFzRU8sUUFBdEU7QUFDSDs7O1dBQ0Qsc0NBQTZCQSxRQUE3QixFQUFxRztBQUNqRyxXQUFLQyxtQkFBTCxDQUF5QlosMkJBQTJCLENBQUNLLFdBQXJELEVBQWtFTSxRQUFsRTtBQUNIOzs7V0FDRCx5Q0FBZ0NBLFFBQWhDLEVBQXdHO0FBQ3BHLFdBQUtFLHNCQUFMLENBQTRCYiwyQkFBMkIsQ0FBQ0ssV0FBeEQsRUFBcUVNLFFBQXJFO0FBQ0g7Ozs7RUEvRG9ERyx3Qjs7OztnQkFBcENkLDJCLFdBQ0YsTzs7Z0JBREVBLDJCLGNBRUMsVTs7Z0JBRkRBLDJCLGdCQUdHLFk7O2dCQUhIQSwyQixrQkFJSyxjOztnQkFKTEEsMkIsaUJBS0ksYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IHtcbiAgICBMaXN0ZW5lclR5cGUsXG4gICAgRXZlbnRIYW5kbGVyLFxufSBmcm9tICdraG1lci1jaGVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlciBleHRlbmRzIEV2ZW50SGFuZGxlciB7XG4gICAgc3RhdGljIENMSUNLID0gJ2NsaWNrJztcbiAgICBzdGF0aWMgU0VMRUNURUQgPSAnc2VsZWN0ZWQnO1xuICAgIHN0YXRpYyBERVNFTEVDVEVEID0gJ2Rlc2VsZWN0ZWQnO1xuICAgIHN0YXRpYyBBVFRFTVBUX01PVkUgPSAnYXR0ZW1wdC1tb3ZlJztcbiAgICBzdGF0aWMgQ0hBTkdFX1RVUk4gPSAnY2hhbmdlLXR1cm4nO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBDTElDSzogQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLFxuICAgICAgICAgICAgICAgIFNFTEVDVEVEOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsXG4gICAgICAgICAgICAgICAgQVRURU1QVF9NT1ZFOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLFxuICAgICAgICAgICAgICAgIENIQU5HRV9UVVJOOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0hBTkdFX1RVUk4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xpY2soY2VsbE1hbmFnZXI6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGNlbGxNYW5hZ2VyKTtcbiAgICB9XG4gICAgc2VsZWN0ZWQoY2VsbE1hbmFnZXI6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGNlbGxNYW5hZ2VyKTtcbiAgICB9XG4gICAgZGVzZWxlY3RlZChjZWxsTWFuYWdlcjogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBjZWxsTWFuYWdlcik7XG4gICAgfVxuICAgIGF0dGVtcHRNb3ZlKGZyb21DZWxsOiBDZWxsTWFuYWdlciwgdG9DZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkFUVEVNUFRfTU9WRSwge1xuICAgICAgICAgICAgZnJvbUNlbGwsXG4gICAgICAgICAgICB0b0NlbGwsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGFuZ2VUdXJuKCkge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNIQU5HRV9UVVJOKTtcbiAgICB9XG4gICAgYWRkT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsU2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxDZWxsTWFuYWdlcj4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5ERVNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbERlc2VsZWN0ZWRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8Q2VsbE1hbmFnZXI+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkF0dGVtcHRNb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQXR0ZW1wdE1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8eyBmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIgfT4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0hBTkdFX1RVUk4sIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IENlbGxNYW5hZ2VyLCB0b0NlbGw6IENlbGxNYW5hZ2VyIH0+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0hBTkdFX1RVUk4sIGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=