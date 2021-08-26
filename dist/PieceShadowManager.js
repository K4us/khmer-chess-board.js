"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
 *---------------------------------------------------------------------------- */
var PieceShadowManager = /*#__PURE__*/function () {
  function PieceShadowManager() {
    _classCallCheck(this, PieceShadowManager);

    _defineProperty(this, "tdShadowDom", void 0);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "options", void 0);
  }

  _createClass(PieceShadowManager, [{
    key: "setTdShadow",
    value: function setTdShadow(tdShadowDown) {
      this.tdShadowDom = tdShadowDown;
    }
  }, {
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.options = khmerChessBoard.options;
    }
  }, {
    key: "movingPiece",
    value: function movingPiece(fromCell, toCell, callback) {
      var _this = this;

      var div = document.createElement('div');

      if (!div.animate || this.options.isFullScreen) {
        callback();
        return;
      }

      var fromBc = fromCell.containerDom.getBoundingClientRect();
      var toBc = toCell.containerDom.getBoundingClientRect();
      this.tdShadowDom.appendChild(div);
      div.style.top = "".concat(fromBc.top);
      div.style.left = "".concat(fromBc.left);
      div.classList.add("type-".concat(fromCell.piece.type));
      div.classList.add("color-".concat(fromCell.piece.color));
      fromCell.removePieceClasses();
      var anim = div.animate([{
        transform: 'translate(0px)',
        opacity: 1
      }, {
        transform: "translate(".concat(toBc.left - fromBc.left, "px, ").concat(toBc.top - fromBc.top, "px)"),
        opacity: 0
      }], 100);

      anim.onfinish = function () {
        _this.tdShadowDom.removeChild(div);

        callback();
      };
    }
  }]);

  return PieceShadowManager;
}();

exports["default"] = PieceShadowManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QaWVjZVNoYWRvd01hbmFnZXIudHMiXSwibmFtZXMiOlsiUGllY2VTaGFkb3dNYW5hZ2VyIiwidGRTaGFkb3dEb3duIiwidGRTaGFkb3dEb20iLCJraG1lckNoZXNzQm9hcmQiLCJvcHRpb25zIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJjYWxsYmFjayIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFuaW1hdGUiLCJpc0Z1bGxTY3JlZW4iLCJmcm9tQmMiLCJjb250YWluZXJEb20iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b0JjIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwaWVjZSIsInR5cGUiLCJjb2xvciIsInJlbW92ZVBpZWNlQ2xhc3NlcyIsImFuaW0iLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwib25maW5pc2giLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBS3FCQSxrQjs7Ozs7Ozs7Ozs7OztXQUlqQixxQkFBWUMsWUFBWixFQUF1QztBQUNuQyxXQUFLQyxXQUFMLEdBQW1CRCxZQUFuQjtBQUNIOzs7V0FDRCxrQkFBU0UsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLE9BQUwsR0FBZUQsZUFBZSxDQUFDQyxPQUEvQjtBQUNIOzs7V0FDRCxxQkFBWUMsUUFBWixFQUFtQ0MsTUFBbkMsRUFBd0RDLFFBQXhELEVBQTRFO0FBQUE7O0FBQ3hFLFVBQU1DLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQVo7O0FBQ0EsVUFBSSxDQUFDRixHQUFHLENBQUNHLE9BQUwsSUFBZ0IsS0FBS1AsT0FBTCxDQUFhUSxZQUFqQyxFQUErQztBQUMzQ0wsUUFBQUEsUUFBUTtBQUNSO0FBQ0g7O0FBQ0QsVUFBTU0sTUFBTSxHQUFHUixRQUFRLENBQUNTLFlBQVQsQ0FBc0JDLHFCQUF0QixFQUFmO0FBQ0EsVUFBTUMsSUFBSSxHQUFHVixNQUFNLENBQUNRLFlBQVAsQ0FBb0JDLHFCQUFwQixFQUFiO0FBQ0EsV0FBS2IsV0FBTCxDQUFpQmUsV0FBakIsQ0FBNkJULEdBQTdCO0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ1UsS0FBSixDQUFVQyxHQUFWLGFBQW1CTixNQUFNLENBQUNNLEdBQTFCO0FBQ0FYLE1BQUFBLEdBQUcsQ0FBQ1UsS0FBSixDQUFVRSxJQUFWLGFBQW9CUCxNQUFNLENBQUNPLElBQTNCO0FBQ0FaLE1BQUFBLEdBQUcsQ0FBQ2EsU0FBSixDQUFjQyxHQUFkLGdCQUEwQmpCLFFBQVEsQ0FBQ2tCLEtBQVQsQ0FBZUMsSUFBekM7QUFDQWhCLE1BQUFBLEdBQUcsQ0FBQ2EsU0FBSixDQUFjQyxHQUFkLGlCQUEyQmpCLFFBQVEsQ0FBQ2tCLEtBQVQsQ0FBZUUsS0FBMUM7QUFFQXBCLE1BQUFBLFFBQVEsQ0FBQ3FCLGtCQUFUO0FBQ0EsVUFBTUMsSUFBSSxHQUFHbkIsR0FBRyxDQUFDRyxPQUFKLENBQVksQ0FDckI7QUFDSWlCLFFBQUFBLFNBQVMsRUFBRSxnQkFEZjtBQUVJQyxRQUFBQSxPQUFPLEVBQUU7QUFGYixPQURxQixFQUtyQjtBQUNJRCxRQUFBQSxTQUFTLHNCQUFlWixJQUFJLENBQUNJLElBQUwsR0FBWVAsTUFBTSxDQUFDTyxJQUFsQyxpQkFBNkNKLElBQUksQ0FBQ0csR0FBTCxHQUFXTixNQUFNLENBQUNNLEdBQS9ELFFBRGI7QUFFSVUsUUFBQUEsT0FBTyxFQUFFO0FBRmIsT0FMcUIsQ0FBWixFQVNWLEdBVFUsQ0FBYjs7QUFVQUYsTUFBQUEsSUFBSSxDQUFDRyxRQUFMLEdBQWdCLFlBQU07QUFDbEIsUUFBQSxLQUFJLENBQUM1QixXQUFMLENBQWlCNkIsV0FBakIsQ0FBNkJ2QixHQUE3Qjs7QUFDQUQsUUFBQUEsUUFBUTtBQUNYLE9BSEQ7QUFJSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpZWNlU2hhZG93TWFuYWdlciB7XG4gICAgdGRTaGFkb3dEb206IEhUTUxFbGVtZW50O1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIHNldFRkU2hhZG93KHRkU2hhZG93RG93bjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy50ZFNoYWRvd0RvbSA9IHRkU2hhZG93RG93bjtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBtb3ZpbmdQaWVjZShmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaWYgKCFkaXYuYW5pbWF0ZSB8fCB0aGlzLm9wdGlvbnMuaXNGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyb21CYyA9IGZyb21DZWxsLmNvbnRhaW5lckRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgdG9CYyA9IHRvQ2VsbC5jb250YWluZXJEb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMudGRTaGFkb3dEb20uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgZGl2LnN0eWxlLnRvcCA9IGAke2Zyb21CYy50b3B9YDtcbiAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBgJHtmcm9tQmMubGVmdH1gO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChgdHlwZS0ke2Zyb21DZWxsLnBpZWNlLnR5cGV9YCk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKGBjb2xvci0ke2Zyb21DZWxsLnBpZWNlLmNvbG9yfWApO1xuXG4gICAgICAgIGZyb21DZWxsLnJlbW92ZVBpZWNlQ2xhc3NlcygpO1xuICAgICAgICBjb25zdCBhbmltID0gZGl2LmFuaW1hdGUoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHt0b0JjLmxlZnQgLSBmcm9tQmMubGVmdH1weCwgJHt0b0JjLnRvcCAtIGZyb21CYy50b3B9cHgpYCxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSwgMTAwKTtcbiAgICAgICAgYW5pbS5vbmZpbmlzaCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGRTaGFkb3dEb20ucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH07XG4gICAgfVxufVxuIl19