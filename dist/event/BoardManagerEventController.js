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


exports["default"] = BoardManagerEventController;

_defineProperty(BoardManagerEventController, "CLICK", 'click');

_defineProperty(BoardManagerEventController, "SELECTED", 'selected');

_defineProperty(BoardManagerEventController, "DESELECTED", 'deselected');

_defineProperty(BoardManagerEventController, "ATTEMPT_MOVE", 'attempt-move');

_defineProperty(BoardManagerEventController, "CHANGE_TURN", 'change-turn');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudC9Cb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwiZXZlbnRzIiwiQ0xJQ0siLCJTRUxFQ1RFRCIsIkFUVEVNUFRfTU9WRSIsIkNIQU5HRV9UVVJOIiwiZGF0YSIsIl9hZGRQcm9wRXZlbnQiLCJERVNFTEVDVEVEIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJsaXN0ZW5lciIsIl9hZGRPbkV2ZW50TGlzdGVuZXIiLCJfcmVtb3ZlT25FdmVudExpc3RlbmVyIiwiRXZlbnRIYW5kbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSwyQjs7Ozs7QUFNakIseUNBQWM7QUFBQTs7QUFBQSw2QkFDSjtBQUNGQyxNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsS0FBSyxFQUFFRiwyQkFBMkIsQ0FBQ0UsS0FEL0I7QUFFSkMsUUFBQUEsUUFBUSxFQUFFSCwyQkFBMkIsQ0FBQ0csUUFGbEM7QUFHSkMsUUFBQUEsWUFBWSxFQUFFSiwyQkFBMkIsQ0FBQ0ksWUFIdEM7QUFJSkMsUUFBQUEsV0FBVyxFQUFFTCwyQkFBMkIsQ0FBQ0s7QUFKckM7QUFETixLQURJO0FBU2I7Ozs7V0FDRCxlQUFNQyxJQUFOLEVBQWU7QUFDWCxXQUFLQyxhQUFMLENBQW1CUCwyQkFBMkIsQ0FBQ0UsS0FBL0MsRUFBc0RJLElBQXREO0FBQ0g7OztXQUNELGtCQUFTQSxJQUFULEVBQWtCO0FBQ2QsV0FBS0MsYUFBTCxDQUFtQlAsMkJBQTJCLENBQUNHLFFBQS9DLEVBQXlERyxJQUF6RDtBQUNIOzs7V0FDRCxvQkFBV0EsSUFBWCxFQUFvQjtBQUNoQixXQUFLQyxhQUFMLENBQW1CUCwyQkFBMkIsQ0FBQ1EsVUFBL0MsRUFBMkRGLElBQTNEO0FBQ0g7OztXQUNELHFCQUFZRyxRQUFaLEVBQXlCQyxNQUF6QixFQUFvQztBQUNoQyxXQUFLSCxhQUFMLENBQW1CUCwyQkFBMkIsQ0FBQ0ksWUFBL0MsRUFBNkQ7QUFDekRLLFFBQUFBLFFBQVEsRUFBUkEsUUFEeUQ7QUFFekRDLFFBQUFBLE1BQU0sRUFBTkE7QUFGeUQsT0FBN0Q7QUFJSDs7O1dBQ0Qsc0JBQWE7QUFDVCxXQUFLSCxhQUFMLENBQW1CUCwyQkFBMkIsQ0FBQ0ssV0FBL0M7QUFDSDs7O1dBQ0QscUNBQTRCTSxRQUE1QixFQUF1RDtBQUNuRCxXQUFLQyxtQkFBTCxDQUF5QlosMkJBQTJCLENBQUNFLEtBQXJELEVBQTREUyxRQUE1RDtBQUNIOzs7V0FDRCx3Q0FBK0JBLFFBQS9CLEVBQTBEO0FBQ3RELFdBQUtFLHNCQUFMLENBQTRCYiwyQkFBMkIsQ0FBQ0UsS0FBeEQsRUFBK0RTLFFBQS9EO0FBQ0g7OztXQUNELHdDQUErQkEsUUFBL0IsRUFBMEQ7QUFDdEQsV0FBS0MsbUJBQUwsQ0FBeUJaLDJCQUEyQixDQUFDRyxRQUFyRCxFQUErRFEsUUFBL0Q7QUFDSDs7O1dBQ0QsMkNBQWtDQSxRQUFsQyxFQUE2RDtBQUN6RCxXQUFLRSxzQkFBTCxDQUE0QmIsMkJBQTJCLENBQUNHLFFBQXhELEVBQWtFUSxRQUFsRTtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQTREO0FBQ3hELFdBQUtDLG1CQUFMLENBQXlCWiwyQkFBMkIsQ0FBQ1EsVUFBckQsRUFBaUVHLFFBQWpFO0FBQ0g7OztXQUNELDZDQUFvQ0EsUUFBcEMsRUFBK0Q7QUFDM0QsV0FBS0Usc0JBQUwsQ0FBNEJiLDJCQUEyQixDQUFDUSxVQUF4RCxFQUFvRUcsUUFBcEU7QUFDSDs7O1dBQ0QsdUNBQThCQSxRQUE5QixFQUFrRjtBQUM5RSxXQUFLQyxtQkFBTCxDQUF5QlosMkJBQTJCLENBQUNJLFlBQXJELEVBQW1FTyxRQUFuRTtBQUNIOzs7V0FDRCwwQ0FBaUNBLFFBQWpDLEVBQXFGO0FBQ2pGLFdBQUtFLHNCQUFMLENBQTRCYiwyQkFBMkIsQ0FBQ0ksWUFBeEQsRUFBc0VPLFFBQXRFO0FBQ0g7OztXQUNELHNDQUE2QkEsUUFBN0IsRUFBaUY7QUFDN0UsV0FBS0MsbUJBQUwsQ0FBeUJaLDJCQUEyQixDQUFDSyxXQUFyRCxFQUFrRU0sUUFBbEU7QUFDSDs7O1dBQ0QseUNBQWdDQSxRQUFoQyxFQUFvRjtBQUNoRixXQUFLRSxzQkFBTCxDQUE0QmIsMkJBQTJCLENBQUNLLFdBQXhELEVBQXFFTSxRQUFyRTtBQUNIOzs7O0VBL0R1REcsd0I7QUFrRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Z0JBNUZxQmQsMkIsV0FDRixPOztnQkFERUEsMkIsY0FFQyxVOztnQkFGREEsMkIsZ0JBR0csWTs7Z0JBSEhBLDJCLGtCQUlLLGM7O2dCQUpMQSwyQixpQkFLSSxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBMaXN0ZW5lclR5cGUsXG4gICAgRXZlbnRIYW5kbGVyLFxufSBmcm9tICdraG1lci1jaGVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlcjxUPiBleHRlbmRzIEV2ZW50SGFuZGxlciB7XG4gICAgc3RhdGljIENMSUNLID0gJ2NsaWNrJztcbiAgICBzdGF0aWMgU0VMRUNURUQgPSAnc2VsZWN0ZWQnO1xuICAgIHN0YXRpYyBERVNFTEVDVEVEID0gJ2Rlc2VsZWN0ZWQnO1xuICAgIHN0YXRpYyBBVFRFTVBUX01PVkUgPSAnYXR0ZW1wdC1tb3ZlJztcbiAgICBzdGF0aWMgQ0hBTkdFX1RVUk4gPSAnY2hhbmdlLXR1cm4nO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICBDTElDSzogQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLFxuICAgICAgICAgICAgICAgIFNFTEVDVEVEOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsXG4gICAgICAgICAgICAgICAgQVRURU1QVF9NT1ZFOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQVRURU1QVF9NT1ZFLFxuICAgICAgICAgICAgICAgIENIQU5HRV9UVVJOOiBCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0hBTkdFX1RVUk4sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2xpY2soZGF0YTogVCkge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNMSUNLLCBkYXRhKTtcbiAgICB9XG4gICAgc2VsZWN0ZWQoZGF0YTogVCkge1xuICAgICAgICB0aGlzLl9hZGRQcm9wRXZlbnQoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlNFTEVDVEVELCBkYXRhKTtcbiAgICB9XG4gICAgZGVzZWxlY3RlZChkYXRhOiBUKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BFdmVudChCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuREVTRUxFQ1RFRCwgZGF0YSk7XG4gICAgfVxuICAgIGF0dGVtcHRNb3ZlKGZyb21DZWxsOiBULCB0b0NlbGw6IFQpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIHtcbiAgICAgICAgICAgIGZyb21DZWxsLFxuICAgICAgICAgICAgdG9DZWxsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlVHVybigpIHtcbiAgICAgICAgdGhpcy5fYWRkUHJvcEV2ZW50KEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5DSEFOR0VfVFVSTik7XG4gICAgfVxuICAgIGFkZE9uQ2VsbENsaWNrRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX2FkZE9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsQ2xpY2tFdmVudExpc3RlbmVyKGxpc3RlbmVyOiBMaXN0ZW5lclR5cGU8VD4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5DTElDSywgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBhZGRPbkNlbGxTZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLlNFTEVDVEVELCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2VsbFNlbGVjdGVkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPFQ+KSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU9uRXZlbnRMaXN0ZW5lcihCb2FyZE1hbmFnZXJFdmVudENvbnRyb2xsZXIuU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkRFU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25DZWxsRGVzZWxlY3RlZEV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTxUPikge1xuICAgICAgICB0aGlzLl9yZW1vdmVPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkRFU0VMRUNURUQsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTx7IGZyb21DZWxsOiBULCB0b0NlbGw6IFQgfT4pIHtcbiAgICAgICAgdGhpcy5fYWRkT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlT25BdHRlbXB0TW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTx7IGZyb21DZWxsOiBULCB0b0NlbGw6IFQgfT4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5BVFRFTVBUX01PVkUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgYWRkT25DaGFuZ2VUdXJuRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcjogTGlzdGVuZXJUeXBlPHsgZnJvbUNlbGw6IFQsIHRvQ2VsbDogVCB9Pikge1xuICAgICAgICB0aGlzLl9hZGRPbkV2ZW50TGlzdGVuZXIoQm9hcmRNYW5hZ2VyRXZlbnRDb250cm9sbGVyLkNIQU5HRV9UVVJOLCBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZU9uQ2hhbmdlVHVybkV2ZW50TGlzdGVuZXIobGlzdGVuZXI6IExpc3RlbmVyVHlwZTx7IGZyb21DZWxsOiBULCB0b0NlbGw6IFQgfT4pIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlT25FdmVudExpc3RlbmVyKEJvYXJkTWFuYWdlckV2ZW50Q29udHJvbGxlci5DSEFOR0VfVFVSTiwgbGlzdGVuZXIpO1xuICAgIH1cbn1cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICoqLyJdfQ==