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

var PlayManagerEventController = /*#__PURE__*/function (_EventHandler) {
  _inherits(PlayManagerEventController, _EventHandler);

  var _super = _createSuper(PlayManagerEventController);

  function PlayManagerEventController() {
    _classCallCheck(this, PlayManagerEventController);

    return _super.call(this, {
      events: {
        CLICK: PlayManagerEventController.CLICK,
        SELECTED: PlayManagerEventController.BLACK,
        ATTEMPT_MOVE: PlayManagerEventController.PAUSE,
        CHANGE_TURN: PlayManagerEventController.NEXT
      }
    });
  }

  _createClass(PlayManagerEventController, [{
    key: "click",
    value: function click(data) {
      this._addPropEvent(PlayManagerEventController.CLICK, data);
    }
  }, {
    key: "back",
    value: function back() {
      this._addPropEvent(PlayManagerEventController.BLACK);
    }
  }, {
    key: "play",
    value: function play() {
      this._addPropEvent(PlayManagerEventController.PLAY);
    }
  }, {
    key: "pause",
    value: function pause() {
      this._addPropEvent(PlayManagerEventController.PAUSE);
    }
  }, {
    key: "next",
    value: function next() {
      this._addPropEvent(PlayManagerEventController.NEXT);
    }
  }, {
    key: "addOnDataClickEventListener",
    value: function addOnDataClickEventListener(listener) {
      this._addOnEventListener(PlayManagerEventController.CLICK, listener);
    }
  }, {
    key: "removeOnDataClickEventListener",
    value: function removeOnDataClickEventListener(listener) {
      this._removeOnEventListener(PlayManagerEventController.CLICK, listener);
    }
  }, {
    key: "addOnBackEventListener",
    value: function addOnBackEventListener(listener) {
      this._addOnEventListener(PlayManagerEventController.BLACK, listener);
    }
  }, {
    key: "removeOnBackEventListener",
    value: function removeOnBackEventListener(listener) {
      this._removeOnEventListener(PlayManagerEventController.BLACK, listener);
    }
  }, {
    key: "addOnPlayEventListener",
    value: function addOnPlayEventListener(listener) {
      this._addOnEventListener(PlayManagerEventController.PLAY, listener);
    }
  }, {
    key: "removeOnPlayEventListener",
    value: function removeOnPlayEventListener(listener) {
      this._removeOnEventListener(PlayManagerEventController.PLAY, listener);
    }
  }, {
    key: "addOnPauseEventListener",
    value: function addOnPauseEventListener(listener) {
      this._addOnEventListener(PlayManagerEventController.PAUSE, listener);
    }
  }, {
    key: "removeOnPauseEventListener",
    value: function removeOnPauseEventListener(listener) {
      this._removeOnEventListener(PlayManagerEventController.PAUSE, listener);
    }
  }, {
    key: "addOnNextEventListener",
    value: function addOnNextEventListener(listener) {
      this._addOnEventListener(PlayManagerEventController.NEXT, listener);
    }
  }, {
    key: "removeOnNextEventListener",
    value: function removeOnNextEventListener(listener) {
      this._removeOnEventListener(PlayManagerEventController.NEXT, listener);
    }
  }]);

  return PlayManagerEventController;
}(_khmerChess.EventHandler);

exports["default"] = PlayManagerEventController;

_defineProperty(PlayManagerEventController, "CLICK", 'click');

_defineProperty(PlayManagerEventController, "BLACK", 'back');

_defineProperty(PlayManagerEventController, "PLAY", 'play');

_defineProperty(PlayManagerEventController, "PAUSE", 'pause');

_defineProperty(PlayManagerEventController, "NEXT", 'next');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC9QbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlciIsImV2ZW50cyIsIkNMSUNLIiwiU0VMRUNURUQiLCJCTEFDSyIsIkFUVEVNUFRfTU9WRSIsIlBBVVNFIiwiQ0hBTkdFX1RVUk4iLCJORVhUIiwiZGF0YSIsIl9hZGRQcm9wRXZlbnQiLCJQTEFZIiwibGlzdGVuZXIiLCJfYWRkT25FdmVudExpc3RlbmVyIiwiX3JlbW92ZU9uRXZlbnRMaXN0ZW5lciIsIkV2ZW50SGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLDBCOzs7OztBQU1qQix3Q0FBYztBQUFBOztBQUFBLDZCQUNKO0FBQ0ZDLE1BQUFBLE1BQU0sRUFBRTtBQUNKQyxRQUFBQSxLQUFLLEVBQUVGLDBCQUEwQixDQUFDRSxLQUQ5QjtBQUVKQyxRQUFBQSxRQUFRLEVBQUVILDBCQUEwQixDQUFDSSxLQUZqQztBQUdKQyxRQUFBQSxZQUFZLEVBQUVMLDBCQUEwQixDQUFDTSxLQUhyQztBQUlKQyxRQUFBQSxXQUFXLEVBQUVQLDBCQUEwQixDQUFDUTtBQUpwQztBQUROLEtBREk7QUFTYjs7OztXQUNELGVBQU1DLElBQU4sRUFBZTtBQUNYLFdBQUtDLGFBQUwsQ0FBbUJWLDBCQUEwQixDQUFDRSxLQUE5QyxFQUFxRE8sSUFBckQ7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxXQUFLQyxhQUFMLENBQW1CViwwQkFBMEIsQ0FBQ0ksS0FBOUM7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxXQUFLTSxhQUFMLENBQW1CViwwQkFBMEIsQ0FBQ1csSUFBOUM7QUFDSDs7O1dBQ0QsaUJBQVE7QUFDSixXQUFLRCxhQUFMLENBQW1CViwwQkFBMEIsQ0FBQ00sS0FBOUM7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxXQUFLSSxhQUFMLENBQW1CViwwQkFBMEIsQ0FBQ1EsSUFBOUM7QUFDSDs7O1dBQ0QscUNBQTRCSSxRQUE1QixFQUF1RDtBQUNuRCxXQUFLQyxtQkFBTCxDQUF5QmIsMEJBQTBCLENBQUNFLEtBQXBELEVBQTJEVSxRQUEzRDtBQUNIOzs7V0FDRCx3Q0FBK0JBLFFBQS9CLEVBQTBEO0FBQ3RELFdBQUtFLHNCQUFMLENBQTRCZCwwQkFBMEIsQ0FBQ0UsS0FBdkQsRUFBOERVLFFBQTlEO0FBQ0g7OztXQUNELGdDQUF1QkEsUUFBdkIsRUFBa0Q7QUFDOUMsV0FBS0MsbUJBQUwsQ0FBeUJiLDBCQUEwQixDQUFDSSxLQUFwRCxFQUEyRFEsUUFBM0Q7QUFDSDs7O1dBQ0QsbUNBQTBCQSxRQUExQixFQUFxRDtBQUNqRCxXQUFLRSxzQkFBTCxDQUE0QmQsMEJBQTBCLENBQUNJLEtBQXZELEVBQThEUSxRQUE5RDtBQUNIOzs7V0FDRCxnQ0FBdUJBLFFBQXZCLEVBQWtEO0FBQzlDLFdBQUtDLG1CQUFMLENBQXlCYiwwQkFBMEIsQ0FBQ1csSUFBcEQsRUFBMERDLFFBQTFEO0FBQ0g7OztXQUNELG1DQUEwQkEsUUFBMUIsRUFBcUQ7QUFDakQsV0FBS0Usc0JBQUwsQ0FBNEJkLDBCQUEwQixDQUFDVyxJQUF2RCxFQUE2REMsUUFBN0Q7QUFDSDs7O1dBQ0QsaUNBQXdCQSxRQUF4QixFQUFtRDtBQUMvQyxXQUFLQyxtQkFBTCxDQUF5QmIsMEJBQTBCLENBQUNNLEtBQXBELEVBQTJETSxRQUEzRDtBQUNIOzs7V0FDRCxvQ0FBMkJBLFFBQTNCLEVBQXNEO0FBQ2xELFdBQUtFLHNCQUFMLENBQTRCZCwwQkFBMEIsQ0FBQ00sS0FBdkQsRUFBOERNLFFBQTlEO0FBQ0g7OztXQUNELGdDQUF1QkEsUUFBdkIsRUFBa0Q7QUFDOUMsV0FBS0MsbUJBQUwsQ0FBeUJiLDBCQUEwQixDQUFDUSxJQUFwRCxFQUEwREksUUFBMUQ7QUFDSDs7O1dBQ0QsbUNBQTBCQSxRQUExQixFQUFxRDtBQUNqRCxXQUFLRSxzQkFBTCxDQUE0QmQsMEJBQTBCLENBQUNRLElBQXZELEVBQTZESSxRQUE3RDtBQUNIOzs7O0VBNURzREcsd0I7Ozs7Z0JBQXRDZiwwQixXQUNGLE87O2dCQURFQSwwQixXQUVGLE07O2dCQUZFQSwwQixVQUdILE07O2dCQUhHQSwwQixXQUlGLE87O2dCQUpFQSwwQixVQUtILE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7XG4gICAgTGlzdGVuZXJUeXBlLFxuICAgIEV2ZW50SGFuZGxlcixcbn0gZnJvbSAna2htZXItY2hlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlcjxUPiBleHRlbmRzIEV2ZW50SGFuZGxlciB7XG4gICAgc3RhdGljIENMSUNLID0gJ2NsaWNrJztcbiAgICBzdGF0aWMgQkxBQ0sgPSAnYmFjayc7XG4gICAgc3RhdGljIFBMQVkgPSAncGxheSc7XG4gICAgc3RhdGljIFBBVVNFID0gJ3BhdXNlJztcbiAgICBzdGF0aWMgTkVYVCA9ICduZXh0JztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgQ0xJQ0s6IFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLFxuICAgICAgICAgICAgICAgIFNFTEVDVEVEOiBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5CTEFDSyxcbiAgICAgICAgICAgICAgICBBVFRFTVBUX01PVkU6IFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBBVVNFLFxuICAgICAgICAgICAgICAgIENIQU5HRV9UVVJOOiBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5ORVhULFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsaWNrKGRhdGE6IFQpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBkYXRhKTtcbiAgICB9XG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkJMQUNLKTtcbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBMQVkpO1xuICAgIH1cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBBVVNFKTtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLk5FWFQpO1xuICAgIH1cbiAgICBhZGRPbkRhdGFDbGlja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25EYXRhQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uQmFja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuQkxBQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25CYWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5CTEFDSywgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPblBsYXlFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBMQVksIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25QbGF5RXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QTEFZLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uUGF1c2VFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBBVVNFLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uUGF1c2VFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlBBVVNFLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIGFkZE9uTmV4dEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuTkVYVCwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPbk5leHRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLk5FWFQsIGxpc3RlbmVyKTtcbiAgICB9XG59XG4iXX0=