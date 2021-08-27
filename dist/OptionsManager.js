"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

var _uniqueIdHelper = require("./helpers/uniqueIdHelper");

var _khmerChess = require("khmer-chess");

var _KhmerChessBoard = _interopRequireDefault(require("./KhmerChessBoard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OptionsManager = /*#__PURE__*/function () {
  function OptionsManager() {
    _classCallCheck(this, OptionsManager);

    _defineProperty(this, "_width", 500);

    _defineProperty(this, "isFullScreen", false);

    _defineProperty(this, "uniqueClassName", '');

    _defineProperty(this, "isEnglish", false);

    this.uniqueClassName = "kcb-".concat((0, _uniqueIdHelper.genId)());
  }

  _createClass(OptionsManager, [{
    key: "width",
    get: function get() {
      return this._width;
    },
    set: function set(width) {
      this._width = width;
    }
  }, {
    key: "enClass",
    get: function get() {
      return _KhmerChessBoard["default"].LOCALE_ENGLISH;
    }
  }, {
    key: "getScaleFit",
    value: function getScaleFit(btr) {
      if (this.isFullScreen && btr) {
        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        if (vw < vh) {
          return vw / btr.width;
        }

        return vh / btr.height;
      }

      return 1;
    }
  }, {
    key: "cellWidth",
    get: function get() {
      var sqWidth = (this.width - (_khmerChess.ROW_NUMBER - 1) * this.borderWidth) / _khmerChess.ROW_NUMBER;
      return sqWidth;
    }
  }, {
    key: "graveyardContainerHeight",
    get: function get() {
      var gyCHeight = this.cellWidth + 10 * this.borderWidth;
      return gyCHeight;
    }
  }, {
    key: "minWidth",
    get: function get() {
      return (_khmerChess.ROW_NUMBER - 1) * this.borderWidth + _khmerChess.ROW_NUMBER * _constance.MIN_CELL_WIDTH;
    }
  }, {
    key: "graveyardWidth",
    get: function get() {
      return this.borderWidth * (_constance.TD_GRAVEYARD_NUMBER - 1) + this.cellWidth * _constance.TD_GRAVEYARD_NUMBER;
    }
  }, {
    key: "graveyardContainerPadding",
    get: function get() {
      return 8 * this.borderWidth * this.width / 600;
    }
  }, {
    key: "borderWidth",
    get: function get() {
      return this.width * _constance.BORDER_WIDTH / this._width;
    }
  }]);

  return OptionsManager;
}();
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


exports["default"] = OptionsManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zTWFuYWdlci50cyJdLCJuYW1lcyI6WyJPcHRpb25zTWFuYWdlciIsInVuaXF1ZUNsYXNzTmFtZSIsIl93aWR0aCIsIndpZHRoIiwiS2htZXJDaGVzc0JvYXJkIiwiTE9DQUxFX0VOR0xJU0giLCJidHIiLCJpc0Z1bGxTY3JlZW4iLCJ2dyIsIk1hdGgiLCJtYXgiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInZoIiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJzcVdpZHRoIiwiUk9XX05VTUJFUiIsImJvcmRlcldpZHRoIiwiZ3lDSGVpZ2h0IiwiY2VsbFdpZHRoIiwiTUlOX0NFTExfV0lEVEgiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiQk9SREVSX1dJRFRIIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYztBQUtqQiw0QkFBYztBQUFBOztBQUFBLG9DQUpMLEdBSUs7O0FBQUEsMENBSEMsS0FHRDs7QUFBQSw2Q0FGSSxFQUVKOztBQUFBLHVDQURGLEtBQ0U7O0FBQ1YsU0FBS0MsZUFBTCxpQkFBOEIsNEJBQTlCO0FBQ0g7Ozs7U0FDRCxlQUFZO0FBQ1IsYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQWlCRCxhQUFVQyxLQUFWLEVBQWlCO0FBQ2IsV0FBS0QsTUFBTCxHQUFjQyxLQUFkO0FBQ0g7OztTQWxCRCxlQUFjO0FBQ1YsYUFBT0MsNEJBQWdCQyxjQUF2QjtBQUNIOzs7V0FFRCxxQkFBWUMsR0FBWixFQUE2QjtBQUN6QixVQUFJLEtBQUtDLFlBQUwsSUFBcUJELEdBQXpCLEVBQThCO0FBQzFCLFlBQU1FLEVBQUUsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNDLFFBQVEsQ0FBQ0MsZUFBVCxDQUF5QkMsV0FBekIsSUFBd0MsQ0FBakQsRUFBb0RDLE1BQU0sQ0FBQ0MsVUFBUCxJQUFxQixDQUF6RSxDQUFYO0FBQ0EsWUFBTUMsRUFBRSxHQUFHUCxJQUFJLENBQUNDLEdBQUwsQ0FBU0MsUUFBUSxDQUFDQyxlQUFULENBQXlCSyxZQUF6QixJQUF5QyxDQUFsRCxFQUFxREgsTUFBTSxDQUFDSSxXQUFQLElBQXNCLENBQTNFLENBQVg7O0FBQ0EsWUFBSVYsRUFBRSxHQUFHUSxFQUFULEVBQWE7QUFDVCxpQkFBT1IsRUFBRSxHQUFHRixHQUFHLENBQUNILEtBQWhCO0FBQ0g7O0FBQ0QsZUFBT2EsRUFBRSxHQUFHVixHQUFHLENBQUNhLE1BQWhCO0FBQ0g7O0FBQ0QsYUFBTyxDQUFQO0FBQ0g7OztTQU1ELGVBQWdCO0FBQ1osVUFBTUMsT0FBTyxHQUFHLENBQUMsS0FBS2pCLEtBQUwsR0FBYSxDQUFDa0IseUJBQWEsQ0FBZCxJQUFtQixLQUFLQyxXQUF0QyxJQUFxREQsc0JBQXJFO0FBQ0EsYUFBT0QsT0FBUDtBQUNIOzs7U0FFRCxlQUErQjtBQUMzQixVQUFNRyxTQUFTLEdBQUcsS0FBS0MsU0FBTCxHQUFpQixLQUFLLEtBQUtGLFdBQTdDO0FBQ0EsYUFBT0MsU0FBUDtBQUNIOzs7U0FFRCxlQUFlO0FBQ1gsYUFBTyxDQUFDRix5QkFBYSxDQUFkLElBQW1CLEtBQUtDLFdBQXhCLEdBQXNDRCx5QkFBYUkseUJBQTFEO0FBQ0g7OztTQUVELGVBQXFCO0FBQ2pCLGFBQU8sS0FBS0gsV0FBTCxJQUFvQkksaUNBQXNCLENBQTFDLElBQStDLEtBQUtGLFNBQUwsR0FBaUJFLDhCQUF2RTtBQUNIOzs7U0FFRCxlQUFnQztBQUM1QixhQUFPLElBQUksS0FBS0osV0FBVCxHQUF1QixLQUFLbkIsS0FBNUIsR0FBb0MsR0FBM0M7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtBLEtBQUwsR0FBYXdCLHVCQUFiLEdBQTRCLEtBQUt6QixNQUF4QztBQUNIOzs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQk9SREVSX1dJRFRILFxuICAgIE1JTl9DRUxMX1dJRFRILFxuICAgIFREX0dSQVZFWUFSRF9OVU1CRVIsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5pbXBvcnQgeyBnZW5JZCB9IGZyb20gJy4vaGVscGVycy91bmlxdWVJZEhlbHBlcic7XG5pbXBvcnQgeyBST1dfTlVNQkVSIH0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnNNYW5hZ2VyIHtcbiAgICBfd2lkdGggPSA1MDA7XG4gICAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XG4gICAgdW5pcXVlQ2xhc3NOYW1lID0gJyc7XG4gICAgaXNFbmdsaXNoID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudW5pcXVlQ2xhc3NOYW1lID0gYGtjYi0ke2dlbklkKCl9YDtcbiAgICB9XG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuICAgIGdldCBlbkNsYXNzKCkge1xuICAgICAgICByZXR1cm4gS2htZXJDaGVzc0JvYXJkLkxPQ0FMRV9FTkdMSVNIO1xuICAgIH1cblxuICAgIGdldFNjYWxlRml0KGJ0cjogQ2xpZW50UmVjdCkge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gJiYgYnRyKSB7XG4gICAgICAgICAgICBjb25zdCB2dyA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHZoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG4gICAgICAgICAgICBpZiAodncgPCB2aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2dyAvIGJ0ci53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2aCAvIGJ0ci5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc2V0IHdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGNlbGxXaWR0aCgpIHtcbiAgICAgICAgY29uc3Qgc3FXaWR0aCA9ICh0aGlzLndpZHRoIC0gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGgpIC8gUk9XX05VTUJFUjtcbiAgICAgICAgcmV0dXJuIHNxV2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgY29uc3QgZ3lDSGVpZ2h0ID0gdGhpcy5jZWxsV2lkdGggKyAxMCAqIHRoaXMuYm9yZGVyV2lkdGg7XG4gICAgICAgIHJldHVybiBneUNIZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IG1pbldpZHRoKCkge1xuICAgICAgICByZXR1cm4gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGggKyBST1dfTlVNQkVSICogTUlOX0NFTExfV0lEVEg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3JkZXJXaWR0aCAqIChURF9HUkFWRVlBUkRfTlVNQkVSIC0gMSkgKyB0aGlzLmNlbGxXaWR0aCAqIFREX0dSQVZFWUFSRF9OVU1CRVI7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lclBhZGRpbmcoKSB7XG4gICAgICAgIHJldHVybiA4ICogdGhpcy5ib3JkZXJXaWR0aCAqIHRoaXMud2lkdGggLyA2MDA7XG4gICAgfVxuXG4gICAgZ2V0IGJvcmRlcldpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIEJPUkRFUl9XSURUSCAvIHRoaXMuX3dpZHRoO1xuICAgIH1cbn1cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICoqLyJdfQ==