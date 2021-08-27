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
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 **/


exports["default"] = PlayManagerEventController;

_defineProperty(PlayManagerEventController, "CLICK", 'click');

_defineProperty(PlayManagerEventController, "BLACK", 'back');

_defineProperty(PlayManagerEventController, "PLAY", 'play');

_defineProperty(PlayManagerEventController, "PAUSE", 'pause');

_defineProperty(PlayManagerEventController, "NEXT", 'next');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC9QbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlciIsImV2ZW50cyIsIkNMSUNLIiwiU0VMRUNURUQiLCJCTEFDSyIsIkFUVEVNUFRfTU9WRSIsIlBBVVNFIiwiQ0hBTkdFX1RVUk4iLCJORVhUIiwiZGF0YSIsIl9hZGRQcm9wRXZlbnQiLCJQTEFZIiwibGlzdGVuZXIiLCJfYWRkT25FdmVudExpc3RlbmVyIiwiX3JlbW92ZU9uRXZlbnRMaXN0ZW5lciIsIkV2ZW50SGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsMEI7Ozs7O0FBTWpCLHdDQUFjO0FBQUE7O0FBQUEsNkJBQ0o7QUFDRkMsTUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFFBQUFBLEtBQUssRUFBRUYsMEJBQTBCLENBQUNFLEtBRDlCO0FBRUpDLFFBQUFBLFFBQVEsRUFBRUgsMEJBQTBCLENBQUNJLEtBRmpDO0FBR0pDLFFBQUFBLFlBQVksRUFBRUwsMEJBQTBCLENBQUNNLEtBSHJDO0FBSUpDLFFBQUFBLFdBQVcsRUFBRVAsMEJBQTBCLENBQUNRO0FBSnBDO0FBRE4sS0FESTtBQVNiOzs7O1dBQ0QsZUFBTUMsSUFBTixFQUFlO0FBQ1gsV0FBS0MsYUFBTCxDQUFtQlYsMEJBQTBCLENBQUNFLEtBQTlDLEVBQXFETyxJQUFyRDtBQUNIOzs7V0FDRCxnQkFBTztBQUNILFdBQUtDLGFBQUwsQ0FBbUJWLDBCQUEwQixDQUFDSSxLQUE5QztBQUNIOzs7V0FDRCxnQkFBTztBQUNILFdBQUtNLGFBQUwsQ0FBbUJWLDBCQUEwQixDQUFDVyxJQUE5QztBQUNIOzs7V0FDRCxpQkFBUTtBQUNKLFdBQUtELGFBQUwsQ0FBbUJWLDBCQUEwQixDQUFDTSxLQUE5QztBQUNIOzs7V0FDRCxnQkFBTztBQUNILFdBQUtJLGFBQUwsQ0FBbUJWLDBCQUEwQixDQUFDUSxJQUE5QztBQUNIOzs7V0FDRCxxQ0FBNEJJLFFBQTVCLEVBQXVEO0FBQ25ELFdBQUtDLG1CQUFMLENBQXlCYiwwQkFBMEIsQ0FBQ0UsS0FBcEQsRUFBMkRVLFFBQTNEO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBMEQ7QUFDdEQsV0FBS0Usc0JBQUwsQ0FBNEJkLDBCQUEwQixDQUFDRSxLQUF2RCxFQUE4RFUsUUFBOUQ7QUFDSDs7O1dBQ0QsZ0NBQXVCQSxRQUF2QixFQUFrRDtBQUM5QyxXQUFLQyxtQkFBTCxDQUF5QmIsMEJBQTBCLENBQUNJLEtBQXBELEVBQTJEUSxRQUEzRDtBQUNIOzs7V0FDRCxtQ0FBMEJBLFFBQTFCLEVBQXFEO0FBQ2pELFdBQUtFLHNCQUFMLENBQTRCZCwwQkFBMEIsQ0FBQ0ksS0FBdkQsRUFBOERRLFFBQTlEO0FBQ0g7OztXQUNELGdDQUF1QkEsUUFBdkIsRUFBa0Q7QUFDOUMsV0FBS0MsbUJBQUwsQ0FBeUJiLDBCQUEwQixDQUFDVyxJQUFwRCxFQUEwREMsUUFBMUQ7QUFDSDs7O1dBQ0QsbUNBQTBCQSxRQUExQixFQUFxRDtBQUNqRCxXQUFLRSxzQkFBTCxDQUE0QmQsMEJBQTBCLENBQUNXLElBQXZELEVBQTZEQyxRQUE3RDtBQUNIOzs7V0FDRCxpQ0FBd0JBLFFBQXhCLEVBQW1EO0FBQy9DLFdBQUtDLG1CQUFMLENBQXlCYiwwQkFBMEIsQ0FBQ00sS0FBcEQsRUFBMkRNLFFBQTNEO0FBQ0g7OztXQUNELG9DQUEyQkEsUUFBM0IsRUFBc0Q7QUFDbEQsV0FBS0Usc0JBQUwsQ0FBNEJkLDBCQUEwQixDQUFDTSxLQUF2RCxFQUE4RE0sUUFBOUQ7QUFDSDs7O1dBQ0QsZ0NBQXVCQSxRQUF2QixFQUFrRDtBQUM5QyxXQUFLQyxtQkFBTCxDQUF5QmIsMEJBQTBCLENBQUNRLElBQXBELEVBQTBESSxRQUExRDtBQUNIOzs7V0FDRCxtQ0FBMEJBLFFBQTFCLEVBQXFEO0FBQ2pELFdBQUtFLHNCQUFMLENBQTRCZCwwQkFBMEIsQ0FBQ1EsSUFBdkQsRUFBNkRJLFFBQTdEO0FBQ0g7Ozs7RUE1RHNERyx3QjtBQStEM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztnQkF6RnFCZiwwQixXQUNGLE87O2dCQURFQSwwQixXQUVGLE07O2dCQUZFQSwwQixVQUdILE07O2dCQUhHQSwwQixXQUlGLE87O2dCQUpFQSwwQixVQUtILE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIExpc3RlbmVyVHlwZSxcbiAgICBFdmVudEhhbmRsZXIsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXI8VD4gZXh0ZW5kcyBFdmVudEhhbmRsZXIge1xuICAgIHN0YXRpYyBDTElDSyA9ICdjbGljayc7XG4gICAgc3RhdGljIEJMQUNLID0gJ2JhY2snO1xuICAgIHN0YXRpYyBQTEFZID0gJ3BsYXknO1xuICAgIHN0YXRpYyBQQVVTRSA9ICdwYXVzZSc7XG4gICAgc3RhdGljIE5FWFQgPSAnbmV4dCc7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIENMSUNLOiBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5DTElDSyxcbiAgICAgICAgICAgICAgICBTRUxFQ1RFRDogUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuQkxBQ0ssXG4gICAgICAgICAgICAgICAgQVRURU1QVF9NT1ZFOiBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QQVVTRSxcbiAgICAgICAgICAgICAgICBDSEFOR0VfVFVSTjogUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuTkVYVCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGljayhkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5DTElDSywgZGF0YSk7XG4gICAgfVxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5CTEFDSyk7XG4gICAgfVxuICAgIHBsYXkoKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QTEFZKTtcbiAgICB9XG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QQVVTRSk7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5ORVhUKTtcbiAgICB9XG4gICAgYWRkT25EYXRhQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uRGF0YUNsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5DTElDSywgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkJhY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkJMQUNLLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQmFja0V2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuQkxBQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25QbGF5RXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QTEFZLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uUGxheUV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIuUExBWSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPblBhdXNlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QQVVTRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVPblBhdXNlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5QQVVTRSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbk5leHRFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyLk5FWFQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25OZXh0RXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlci5ORVhULCBsaXN0ZW5lcik7XG4gICAgfVxufVxuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiovIl19