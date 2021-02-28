"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

var _uniqueIdHelper = require("./helpers/uniqueIdHelper");

var _khmerChess = require("khmer-chess");

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
      return 'en';
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

exports["default"] = OptionsManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zTWFuYWdlci50cyJdLCJuYW1lcyI6WyJPcHRpb25zTWFuYWdlciIsInVuaXF1ZUNsYXNzTmFtZSIsIl93aWR0aCIsIndpZHRoIiwiYnRyIiwiaXNGdWxsU2NyZWVuIiwidnciLCJNYXRoIiwibWF4IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ2aCIsImNsaWVudEhlaWdodCIsImlubmVySGVpZ2h0IiwiaGVpZ2h0Iiwic3FXaWR0aCIsIlJPV19OVU1CRVIiLCJib3JkZXJXaWR0aCIsImd5Q0hlaWdodCIsImNlbGxXaWR0aCIsIk1JTl9DRUxMX1dJRFRIIiwiVERfR1JBVkVZQVJEX05VTUJFUiIsIkJPUkRFUl9XSURUSCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFLQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsYztBQUtqQiw0QkFBYztBQUFBOztBQUFBLG9DQUpMLEdBSUs7O0FBQUEsMENBSEMsS0FHRDs7QUFBQSw2Q0FGSSxFQUVKOztBQUFBLHVDQURGLEtBQ0U7O0FBQ1YsU0FBS0MsZUFBTCxpQkFBOEIsNEJBQTlCO0FBQ0g7Ozs7U0FDRCxlQUFZO0FBQ1IsYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQWlCRCxhQUFVQyxLQUFWLEVBQWlCO0FBQ2IsV0FBS0QsTUFBTCxHQUFjQyxLQUFkO0FBQ0g7OztTQWxCRCxlQUFjO0FBQ1YsYUFBTyxJQUFQO0FBQ0g7OztXQUVELHFCQUFZQyxHQUFaLEVBQTZCO0FBQ3pCLFVBQUksS0FBS0MsWUFBTCxJQUFxQkQsR0FBekIsRUFBOEI7QUFDMUIsWUFBTUUsRUFBRSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0MsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxXQUF6QixJQUF3QyxDQUFqRCxFQUFvREMsTUFBTSxDQUFDQyxVQUFQLElBQXFCLENBQXpFLENBQVg7QUFDQSxZQUFNQyxFQUFFLEdBQUdQLElBQUksQ0FBQ0MsR0FBTCxDQUFTQyxRQUFRLENBQUNDLGVBQVQsQ0FBeUJLLFlBQXpCLElBQXlDLENBQWxELEVBQXFESCxNQUFNLENBQUNJLFdBQVAsSUFBc0IsQ0FBM0UsQ0FBWDs7QUFDQSxZQUFJVixFQUFFLEdBQUdRLEVBQVQsRUFBYTtBQUNULGlCQUFPUixFQUFFLEdBQUdGLEdBQUcsQ0FBQ0QsS0FBaEI7QUFDSDs7QUFDRCxlQUFPVyxFQUFFLEdBQUdWLEdBQUcsQ0FBQ2EsTUFBaEI7QUFDSDs7QUFDRCxhQUFPLENBQVA7QUFDSDs7O1NBTUQsZUFBZ0I7QUFDWixVQUFNQyxPQUFPLEdBQUcsQ0FBQyxLQUFLZixLQUFMLEdBQWEsQ0FBQ2dCLHlCQUFhLENBQWQsSUFBbUIsS0FBS0MsV0FBdEMsSUFBcURELHNCQUFyRTtBQUNBLGFBQU9ELE9BQVA7QUFDSDs7O1NBRUQsZUFBK0I7QUFDM0IsVUFBTUcsU0FBUyxHQUFHLEtBQUtDLFNBQUwsR0FBaUIsS0FBSyxLQUFLRixXQUE3QztBQUNBLGFBQU9DLFNBQVA7QUFDSDs7O1NBRUQsZUFBZTtBQUNYLGFBQU8sQ0FBQ0YseUJBQWEsQ0FBZCxJQUFtQixLQUFLQyxXQUF4QixHQUFzQ0QseUJBQWFJLHlCQUExRDtBQUNIOzs7U0FFRCxlQUFxQjtBQUNqQixhQUFPLEtBQUtILFdBQUwsSUFBb0JJLGlDQUFzQixDQUExQyxJQUErQyxLQUFLRixTQUFMLEdBQWlCRSw4QkFBdkU7QUFDSDs7O1NBRUQsZUFBZ0M7QUFDNUIsYUFBTyxJQUFJLEtBQUtKLFdBQVQsR0FBdUIsS0FBS2pCLEtBQTVCLEdBQW9DLEdBQTNDO0FBQ0g7OztTQUVELGVBQWtCO0FBQ2QsYUFBTyxLQUFLQSxLQUFMLEdBQWFzQix1QkFBYixHQUE0QixLQUFLdkIsTUFBeEM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIlxuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQge1xuICAgIEJPUkRFUl9XSURUSCxcbiAgICBNSU5fQ0VMTF9XSURUSCxcbiAgICBURF9HUkFWRVlBUkRfTlVNQkVSLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IHsgZ2VuSWQgfSBmcm9tICcuL2hlbHBlcnMvdW5pcXVlSWRIZWxwZXInO1xuaW1wb3J0IHsgUk9XX05VTUJFUiB9IGZyb20gJ2tobWVyLWNoZXNzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uc01hbmFnZXIge1xuICAgIF93aWR0aCA9IDUwMDtcbiAgICBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcbiAgICB1bmlxdWVDbGFzc05hbWUgPSAnJztcbiAgICBpc0VuZ2xpc2ggPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51bmlxdWVDbGFzc05hbWUgPSBga2NiLSR7Z2VuSWQoKX1gO1xuICAgIH1cbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG4gICAgZ2V0IGVuQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiAnZW4nO1xuICAgIH1cblxuICAgIGdldFNjYWxlRml0KGJ0cjogQ2xpZW50UmVjdCkge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gJiYgYnRyKSB7XG4gICAgICAgICAgICBjb25zdCB2dyA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHZoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG4gICAgICAgICAgICBpZiAodncgPCB2aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2dyAvIGJ0ci53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2aCAvIGJ0ci5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc2V0IHdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGNlbGxXaWR0aCgpIHtcbiAgICAgICAgY29uc3Qgc3FXaWR0aCA9ICh0aGlzLndpZHRoIC0gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGgpIC8gUk9XX05VTUJFUjtcbiAgICAgICAgcmV0dXJuIHNxV2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgY29uc3QgZ3lDSGVpZ2h0ID0gdGhpcy5jZWxsV2lkdGggKyAxMCAqIHRoaXMuYm9yZGVyV2lkdGg7XG4gICAgICAgIHJldHVybiBneUNIZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IG1pbldpZHRoKCkge1xuICAgICAgICByZXR1cm4gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGggKyBST1dfTlVNQkVSICogTUlOX0NFTExfV0lEVEg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3JkZXJXaWR0aCAqIChURF9HUkFWRVlBUkRfTlVNQkVSIC0gMSkgKyB0aGlzLmNlbGxXaWR0aCAqIFREX0dSQVZFWUFSRF9OVU1CRVI7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lclBhZGRpbmcoKSB7XG4gICAgICAgIHJldHVybiA4ICogdGhpcy5ib3JkZXJXaWR0aCAqIHRoaXMud2lkdGggLyA2MDA7XG4gICAgfVxuXG4gICAgZ2V0IGJvcmRlcldpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIEJPUkRFUl9XSURUSCAvIHRoaXMuX3dpZHRoO1xuICAgIH1cbn1cblxuIl19