"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _GraveyardManager = _interopRequireDefault(require("./GraveyardManager"));

var _khmerChess = _interopRequireDefault(require("khmer-chess"));

var _SoundManager = _interopRequireDefault(require("./SoundManager"));

var _BoardManager = _interopRequireDefault(require("./BoardManager"));

var _constance = require("./constance");

var _addCss = _interopRequireDefault(require("./addCss"));

var _addCssNote = _interopRequireDefault(require("./addCssNote"));

var _drawBoardAndGraveyard = _interopRequireDefault(require("./drawBoardAndGraveyard"));

var _Options = _interopRequireDefault(require("./Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
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
 *---------------------------------------------------------------------------- */

/*
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
8 ┃   ┃   ┃   ┃   ┃ k ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
7 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
6 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
5 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
4 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
3 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
2 ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃   ┃
  ┣━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━╋━━━┫
1 ┃   ┃   ┃   ┃ K ┃   ┃   ┃   ┃   ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
    a   b   c   d   e   f   g   h
  ┏━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┳━━━┓
  ┃ b ┃ h ┃ g ┃ q ┃ g ┃ h ┃ b ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ f ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ F ┃ B ┃ H ┃ G ┃ Q ┃ G ┃ H ┃ B ┃
  ┗━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┻━━━┛
 */
var config = require('../package.json');

var KhmerChess = _khmerChess["default"].KhmerChess;

var KhmerChessBoard = /*#__PURE__*/function () {
  function KhmerChessBoard() {
    _classCallCheck(this, KhmerChessBoard);

    _defineProperty(this, "options", new _Options["default"]());

    _defineProperty(this, "container", document.createElement('div'));

    _defineProperty(this, "graveyardManager", new _GraveyardManager["default"]());

    _defineProperty(this, "boardManager", new _BoardManager["default"]());

    _defineProperty(this, "soundManager", new _SoundManager["default"]());

    _defineProperty(this, "khmerChess", new KhmerChess());
  }

  _createClass(KhmerChessBoard, [{
    key: "setOptions",
    value: function setOptions(options) {
      if (!options.container) {
        throw new Error('Container is required!');
      }

      this.container = options.container;

      if (options.width < this.options.minWidth) {
        throw new Error("Board width must more than ".concat(this.options.minWidth, " "));
      }

      if (options.width) {
        this.options.width = options.width;
      }

      if (options.width) {
        this.options.width = options.width;
      }

      this.graveyardManager.setProps(this);
      this.boardManager.setProps(this);
      this.render();
    }
  }, {
    key: "setFullScreen",
    value: function setFullScreen(isFullScreen) {
      var _this = this;

      this.options.isFullScreen = isFullScreen;
      var elements = document.querySelectorAll("table.".concat(this.options.uniqueClassName, " "));
      elements.forEach(function (element) {
        element.classList.remove(_constance.POPUP_CLASS_NAME);
        element.style.top = '0';
        element.style.left = '0';
        element.style.transform = '';

        if (isFullScreen) {
          element.classList.add(_constance.POPUP_CLASS_NAME);
          element.style.top = '50%';
          element.style.left = '50%';
          element.style.transform = "translate(-50%,-50%) scale(".concat(_this.options.scaleFit, ")");
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.addAllDomCss();
      (0, _drawBoardAndGraveyard["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options,
        container: this.container,
        boardManager: this.boardManager,
        graveyardManager: this.graveyardManager
      });
      this.boardManager.setNote();
      this.graveyardManager.setNote();
      this.applyPieces();
    }
  }, {
    key: "addAllDomCss",
    value: function addAllDomCss() {
      (0, _addCss["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options
      });
      (0, _addCssNote["default"])({
        uniqueClassName: this.options.uniqueClassName,
        options: this.options
      });
    }
  }, {
    key: "loadRen",
    value: function loadRen(renStr) {
      this.khmerChess.load(renStr);
      this.applyPieces();
    }
  }, {
    key: "applyPieces",
    value: function applyPieces() {
      this.graveyardManager.renderKhmerChessPieces();
      this.boardManager.renderKhmerChessPieces();
    }
  }, {
    key: "removeAllDomElements",
    value: function removeAllDomElements() {
      var elements = document.querySelectorAll("table.".concat(this.options.uniqueClassName, " "));
      elements.forEach(function (element) {
        element.parentElement.removeChild(element);
      });
      this.removeAllDomCss();
    }
  }, {
    key: "removeAllDomCss",
    value: function removeAllDomCss() {
      var elements = document.querySelectorAll("style.".concat(this.options.uniqueClassName, " "));
      elements.forEach(function (element) {
        element.parentElement.removeChild(element);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllDomElements();
      this.container = null;
      this.graveyardManager = null;
      this.boardManager = null;
      this.soundManager = null;
      this.khmerChess = null;
    }
  }]);

  return KhmerChessBoard;
}();

exports["default"] = KhmerChessBoard;

_defineProperty(KhmerChessBoard, "title", config.name);

_defineProperty(KhmerChessBoard, "version", config.version);

console.log(KhmerChess.title, KhmerChess.version);
console.log(KhmerChessBoard.title, KhmerChessBoard.version);
window.KhmerChessBoard = KhmerChessBoard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9LaG1lckNoZXNzYm9hcmQudHMiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSIsIktobWVyQ2hlc3MiLCJraG1lckNoZXNzIiwiS2htZXJDaGVzc0JvYXJkIiwiT3B0aW9ucyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIkdyYXZleWFyZE1hbmFnZXIiLCJCb2FyZE1hbmFnZXIiLCJTb3VuZE1hbmFnZXIiLCJvcHRpb25zIiwiY29udGFpbmVyIiwiRXJyb3IiLCJ3aWR0aCIsIm1pbldpZHRoIiwiZ3JhdmV5YXJkTWFuYWdlciIsInNldFByb3BzIiwiYm9hcmRNYW5hZ2VyIiwicmVuZGVyIiwiaXNGdWxsU2NyZWVuIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidW5pcXVlQ2xhc3NOYW1lIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJQT1BVUF9DTEFTU19OQU1FIiwic3R5bGUiLCJ0b3AiLCJsZWZ0IiwidHJhbnNmb3JtIiwiYWRkIiwic2NhbGVGaXQiLCJhZGRBbGxEb21Dc3MiLCJzZXROb3RlIiwiYXBwbHlQaWVjZXMiLCJyZW5TdHIiLCJsb2FkIiwicmVuZGVyS2htZXJDaGVzc1BpZWNlcyIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUFsbERvbUNzcyIsInJlbW92ZUFsbERvbUVsZW1lbnRzIiwic291bmRNYW5hZ2VyIiwibmFtZSIsInZlcnNpb24iLCJjb25zb2xlIiwibG9nIiwidGl0bGUiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFvREE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQTVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQXNCQyxXQUF0QixDQUFrQ2pCLE9BQWxDO0FBQ0gsT0FGRDtBQUdIOzs7V0FFRCxtQkFBVTtBQUNOLFdBQUttQixvQkFBTDtBQUNBLFdBQUtoQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsV0FBS0ksZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxXQUFLRSxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsV0FBSzJCLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxXQUFLMUMsVUFBTCxHQUFrQixJQUFsQjtBQUNIOzs7Ozs7OztnQkEzR2dCQyxlLFdBQ0ZKLE1BQU0sQ0FBQzhDLEk7O2dCQURMMUMsZSxhQUVBSixNQUFNLENBQUMrQyxPOztBQTRHNUJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZL0MsVUFBVSxDQUFDZ0QsS0FBdkIsRUFBOEJoRCxVQUFVLENBQUM2QyxPQUF6QztBQUNBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWTdDLGVBQWUsQ0FBQzhDLEtBQTVCLEVBQW1DOUMsZUFBZSxDQUFDMkMsT0FBbkQ7QUFFQ0ksTUFBRCxDQUFnQi9DLGVBQWhCLEdBQWtDQSxlQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbi8qXG4gIOKUj+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUs+KUgeKUgeKUgeKUk1xuOCDilIMgICDilIMgICDilIMgICDilIMgICDilIMgayDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG43IOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilKPilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilKtcbjYg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDXG4gIOKUo+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKUq1xuNSDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG40IOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilKPilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilYvilIHilIHilIHilKtcbjMg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDICAg4pSDXG4gIOKUo+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKVi+KUgeKUgeKUgeKUq1xuMiDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilIMgICDilINcbiAg4pSj4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pWL4pSB4pSB4pSB4pSrXG4xIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyBLIOKUgyAgIOKUgyAgIOKUgyAgIOKUgyAgIOKUg1xuICDilJfilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilLvilIHilIHilIHilJtcbiAgICBhICAgYiAgIGMgICBkICAgZSAgIGYgICBnICAgaFxuICDilI/ilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilLPilIHilIHilIHilJNcbiAg4pSDIGIg4pSDIGgg4pSDIGcg4pSDIHEg4pSDIGcg4pSDIGgg4pSDIGIg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIGYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEYg4pSDIEIg4pSDIEgg4pSDIEcg4pSDIFEg4pSDIEcg4pSDIEgg4pSDIEIg4pSDXG4gIOKUl+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUu+KUgeKUgeKUgeKUm1xuICovXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbmltcG9ydCBHcmF2ZXlhcmRNYW5hZ2VyIGZyb20gJy4vR3JhdmV5YXJkTWFuYWdlcic7XG5pbXBvcnQga2htZXJDaGVzcyBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQgU291bmRNYW5hZ2VyIGZyb20gJy4vU291bmRNYW5hZ2VyJztcbmltcG9ydCBCb2FyZE1hbmFnZXIgZnJvbSAnLi9Cb2FyZE1hbmFnZXInO1xuaW1wb3J0IHsgUE9QVVBfQ0xBU1NfTkFNRSB9IGZyb20gJy4vY29uc3RhbmNlJztcbmltcG9ydCBhZGRDc3MgZnJvbSAnLi9hZGRDc3MnO1xuaW1wb3J0IGFkZENzc05vdGUgZnJvbSAnLi9hZGRDc3NOb3RlJztcbmltcG9ydCBkcmF3Qm9hcmRBbmRHcmF2ZXlhcmQgZnJvbSAnLi9kcmF3Qm9hcmRBbmRHcmF2ZXlhcmQnO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9PcHRpb25zJztcblxuY29uc3QgeyBLaG1lckNoZXNzIH0gPSBraG1lckNoZXNzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLaG1lckNoZXNzQm9hcmQge1xuICAgIHN0YXRpYyB0aXRsZSA9IGNvbmZpZy5uYW1lO1xuICAgIHN0YXRpYyB2ZXJzaW9uID0gY29uZmlnLnZlcnNpb247XG4gICAgb3B0aW9ucyA9IG5ldyBPcHRpb25zKCk7XG4gICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ3JhdmV5YXJkTWFuYWdlciA9IG5ldyBHcmF2ZXlhcmRNYW5hZ2VyKCk7XG4gICAgYm9hcmRNYW5hZ2VyID0gbmV3IEJvYXJkTWFuYWdlcigpO1xuICAgIHNvdW5kTWFuYWdlciA9IG5ldyBTb3VuZE1hbmFnZXIoKTtcbiAgICBraG1lckNoZXNzID0gbmV3IEtobWVyQ2hlc3MoKTtcbiAgICBzZXRPcHRpb25zKG9wdGlvbnM6IHtcbiAgICAgICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICB9KSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGlzIHJlcXVpcmVkIScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggPCB0aGlzLm9wdGlvbnMubWluV2lkdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQm9hcmQgd2lkdGggbXVzdCBtb3JlIHRoYW4gJHt0aGlzLm9wdGlvbnMubWluV2lkdGh9IGApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ncmF2ZXlhcmRNYW5hZ2VyLnNldFByb3BzKHRoaXMpO1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5zZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBzZXRGdWxsU2NyZWVuKGlzRnVsbFNjcmVlbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9wdGlvbnMuaXNGdWxsU2NyZWVuID0gaXNGdWxsU2NyZWVuO1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHRhYmxlLiR7dGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZX0gYCk7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxUYWJsZUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShQT1BVUF9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJzAnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAnJztcbiAgICAgICAgICAgIGlmIChpc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoUE9QVVBfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnNTAlJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoLTUwJSwtNTAlKSBzY2FsZSgke3RoaXMub3B0aW9ucy5zY2FsZUZpdH0pYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmFkZEFsbERvbUNzcygpO1xuICAgICAgICBkcmF3Qm9hcmRBbmRHcmF2ZXlhcmQoe1xuICAgICAgICAgICAgdW5pcXVlQ2xhc3NOYW1lOiB0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgICAgIGJvYXJkTWFuYWdlcjogdGhpcy5ib2FyZE1hbmFnZXIsXG4gICAgICAgICAgICBncmF2ZXlhcmRNYW5hZ2VyOiB0aGlzLmdyYXZleWFyZE1hbmFnZXIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5zZXROb3RlKCk7XG4gICAgICAgIHRoaXMuZ3JhdmV5YXJkTWFuYWdlci5zZXROb3RlKCk7XG4gICAgICAgIHRoaXMuYXBwbHlQaWVjZXMoKTtcbiAgICB9XG5cbiAgICBhZGRBbGxEb21Dc3MoKSB7XG4gICAgICAgIGFkZENzcyh7XG4gICAgICAgICAgICB1bmlxdWVDbGFzc05hbWU6IHRoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWUsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICBhZGRDc3NOb3RlKHtcbiAgICAgICAgICAgIHVuaXF1ZUNsYXNzTmFtZTogdGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFJlbihyZW5TdHI6IHN0cmluZykge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3MubG9hZChyZW5TdHIpO1xuICAgICAgICB0aGlzLmFwcGx5UGllY2VzKCk7XG4gICAgfVxuXG4gICAgYXBwbHlQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMuZ3JhdmV5YXJkTWFuYWdlci5yZW5kZXJLaG1lckNoZXNzUGllY2VzKCk7XG4gICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyLnJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKTtcbiAgICB9XG5cbiAgICByZW1vdmVBbGxEb21FbGVtZW50cygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGB0YWJsZS4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9IGApO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbW92ZUFsbERvbUNzcygpO1xuICAgIH1cblxuICAgIHJlbW92ZUFsbERvbUNzcygpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBzdHlsZS4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9IGApO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRG9tRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmdyYXZleWFyZE1hbmFnZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlciA9IG51bGw7XG4gICAgICAgIHRoaXMuc291bmRNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0gbnVsbDtcbiAgICB9XG59XG5cbmNvbnNvbGUubG9nKEtobWVyQ2hlc3MudGl0bGUsIEtobWVyQ2hlc3MudmVyc2lvbik7XG5jb25zb2xlLmxvZyhLaG1lckNoZXNzQm9hcmQudGl0bGUsIEtobWVyQ2hlc3NCb2FyZC52ZXJzaW9uKTtcblxuKHdpbmRvdyBhcyBhbnkpLktobWVyQ2hlc3NCb2FyZCA9IEtobWVyQ2hlc3NCb2FyZDsiXX0=