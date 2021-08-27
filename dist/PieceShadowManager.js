"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PieceShadowManager = /*#__PURE__*/function () {
  function PieceShadowManager() {
    _classCallCheck(this, PieceShadowManager);

    _defineProperty(this, "tdShadowDom", void 0);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "quickMove", false);
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

      if (this.quickMove) {
        fromCell.removePieceClasses();
        callback();
      } else {
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
    }
  }]);

  return PieceShadowManager;
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


exports["default"] = PieceShadowManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QaWVjZVNoYWRvd01hbmFnZXIudHMiXSwibmFtZXMiOlsiUGllY2VTaGFkb3dNYW5hZ2VyIiwidGRTaGFkb3dEb3duIiwidGRTaGFkb3dEb20iLCJraG1lckNoZXNzQm9hcmQiLCJvcHRpb25zIiwiZnJvbUNlbGwiLCJ0b0NlbGwiLCJjYWxsYmFjayIsInF1aWNrTW92ZSIsInJlbW92ZVBpZWNlQ2xhc3NlcyIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFuaW1hdGUiLCJpc0Z1bGxTY3JlZW4iLCJmcm9tQmMiLCJjb250YWluZXJEb20iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b0JjIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJwaWVjZSIsInR5cGUiLCJjb2xvciIsImFuaW0iLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5Iiwib25maW5pc2giLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBSXFCQSxrQjs7Ozs7Ozs7Ozt1Q0FJTCxLOzs7OztXQUNaLHFCQUFZQyxZQUFaLEVBQXVDO0FBQ25DLFdBQUtDLFdBQUwsR0FBbUJELFlBQW5CO0FBQ0g7OztXQUNELGtCQUFTRSxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlRCxlQUFlLENBQUNDLE9BQS9CO0FBQ0g7OztXQUNELHFCQUFZQyxRQUFaLEVBQW1DQyxNQUFuQyxFQUF3REMsUUFBeEQsRUFBNEU7QUFBQTs7QUFDeEUsVUFBSSxLQUFLQyxTQUFULEVBQW9CO0FBQ2hCSCxRQUFBQSxRQUFRLENBQUNJLGtCQUFUO0FBQ0FGLFFBQUFBLFFBQVE7QUFDWCxPQUhELE1BR087QUFDSCxZQUFNRyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaOztBQUNBLFlBQUksQ0FBQ0YsR0FBRyxDQUFDRyxPQUFMLElBQWdCLEtBQUtULE9BQUwsQ0FBYVUsWUFBakMsRUFBK0M7QUFDM0NQLFVBQUFBLFFBQVE7QUFDUjtBQUNIOztBQUNELFlBQU1RLE1BQU0sR0FBR1YsUUFBUSxDQUFDVyxZQUFULENBQXNCQyxxQkFBdEIsRUFBZjtBQUNBLFlBQU1DLElBQUksR0FBR1osTUFBTSxDQUFDVSxZQUFQLENBQW9CQyxxQkFBcEIsRUFBYjtBQUNBLGFBQUtmLFdBQUwsQ0FBaUJpQixXQUFqQixDQUE2QlQsR0FBN0I7QUFDQUEsUUFBQUEsR0FBRyxDQUFDVSxLQUFKLENBQVVDLEdBQVYsYUFBbUJOLE1BQU0sQ0FBQ00sR0FBMUI7QUFDQVgsUUFBQUEsR0FBRyxDQUFDVSxLQUFKLENBQVVFLElBQVYsYUFBb0JQLE1BQU0sQ0FBQ08sSUFBM0I7QUFDQVosUUFBQUEsR0FBRyxDQUFDYSxTQUFKLENBQWNDLEdBQWQsZ0JBQTBCbkIsUUFBUSxDQUFDb0IsS0FBVCxDQUFlQyxJQUF6QztBQUNBaEIsUUFBQUEsR0FBRyxDQUFDYSxTQUFKLENBQWNDLEdBQWQsaUJBQTJCbkIsUUFBUSxDQUFDb0IsS0FBVCxDQUFlRSxLQUExQztBQUNBdEIsUUFBQUEsUUFBUSxDQUFDSSxrQkFBVDtBQUNBLFlBQU1tQixJQUFJLEdBQUdsQixHQUFHLENBQUNHLE9BQUosQ0FBWSxDQUNyQjtBQUNJZ0IsVUFBQUEsU0FBUyxFQUFFLGdCQURmO0FBRUlDLFVBQUFBLE9BQU8sRUFBRTtBQUZiLFNBRHFCLEVBS3JCO0FBQ0lELFVBQUFBLFNBQVMsc0JBQWVYLElBQUksQ0FBQ0ksSUFBTCxHQUFZUCxNQUFNLENBQUNPLElBQWxDLGlCQUE2Q0osSUFBSSxDQUFDRyxHQUFMLEdBQVdOLE1BQU0sQ0FBQ00sR0FBL0QsUUFEYjtBQUVJUyxVQUFBQSxPQUFPLEVBQUU7QUFGYixTQUxxQixDQUFaLEVBU1YsR0FUVSxDQUFiOztBQVVBRixRQUFBQSxJQUFJLENBQUNHLFFBQUwsR0FBZ0IsWUFBTTtBQUNsQixVQUFBLEtBQUksQ0FBQzdCLFdBQUwsQ0FBaUI4QixXQUFqQixDQUE2QnRCLEdBQTdCOztBQUNBSCxVQUFBQSxRQUFRO0FBQ1gsU0FIRDtBQUlIO0FBQ0o7Ozs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpZWNlU2hhZG93TWFuYWdlciB7XG4gICAgdGRTaGFkb3dEb206IEhUTUxFbGVtZW50O1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIHF1aWNrTW92ZSA9IGZhbHNlO1xuICAgIHNldFRkU2hhZG93KHRkU2hhZG93RG93bjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy50ZFNoYWRvd0RvbSA9IHRkU2hhZG93RG93bjtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBtb3ZpbmdQaWVjZShmcm9tQ2VsbDogQ2VsbE1hbmFnZXIsIHRvQ2VsbDogQ2VsbE1hbmFnZXIsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5xdWlja01vdmUpIHtcbiAgICAgICAgICAgIGZyb21DZWxsLnJlbW92ZVBpZWNlQ2xhc3NlcygpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaWYgKCFkaXYuYW5pbWF0ZSB8fCB0aGlzLm9wdGlvbnMuaXNGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmcm9tQmMgPSBmcm9tQ2VsbC5jb250YWluZXJEb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCB0b0JjID0gdG9DZWxsLmNvbnRhaW5lckRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHRoaXMudGRTaGFkb3dEb20uYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgICAgIGRpdi5zdHlsZS50b3AgPSBgJHtmcm9tQmMudG9wfWA7XG4gICAgICAgICAgICBkaXYuc3R5bGUubGVmdCA9IGAke2Zyb21CYy5sZWZ0fWA7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChgdHlwZS0ke2Zyb21DZWxsLnBpZWNlLnR5cGV9YCk7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZChgY29sb3ItJHtmcm9tQ2VsbC5waWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIGZyb21DZWxsLnJlbW92ZVBpZWNlQ2xhc3NlcygpO1xuICAgICAgICAgICAgY29uc3QgYW5pbSA9IGRpdi5hbmltYXRlKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgpJyxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7dG9CYy5sZWZ0IC0gZnJvbUJjLmxlZnR9cHgsICR7dG9CYy50b3AgLSBmcm9tQmMudG9wfXB4KWAsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sIDEwMCk7XG4gICAgICAgICAgICBhbmltLm9uZmluaXNoID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGRTaGFkb3dEb20ucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICoqLyJdfQ==