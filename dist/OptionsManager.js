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

    _defineProperty(this, "boundingTableRect", null);

    _defineProperty(this, "uniqueClassName", "kcb-".concat((0, _uniqueIdHelper.genId)()));
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
    key: "scaleFit",
    get: function get() {
      var btr = this.boundingTableRect;

      if (this.isFullScreen && btr) {
        return document.documentElement.clientHeight / btr.height;
      }

      return 1;
    }
  }, {
    key: "squareWidth",
    get: function get() {
      var sqWidth = (this.width - (_khmerChess.ROW_NUMBER - 1) * this.borderWidth) / _khmerChess.ROW_NUMBER;
      return sqWidth;
    }
  }, {
    key: "graveyardContainerHeight",
    get: function get() {
      var gyCHeight = this.squareWidth + 10 * this.borderWidth;
      return gyCHeight;
    }
  }, {
    key: "minWidth",
    get: function get() {
      return (_khmerChess.ROW_NUMBER - 1) * this.borderWidth + _khmerChess.ROW_NUMBER * _constance.MIN_SQUARE_WIDTH;
    }
  }, {
    key: "graveyardWidth",
    get: function get() {
      return this.borderWidth * (_constance.TD_GRAVEYARD_NUMBER - 1) + this.squareWidth * _constance.TD_GRAVEYARD_NUMBER;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zTWFuYWdlci50cyJdLCJuYW1lcyI6WyJPcHRpb25zTWFuYWdlciIsIl93aWR0aCIsIndpZHRoIiwiYnRyIiwiYm91bmRpbmdUYWJsZVJlY3QiLCJpc0Z1bGxTY3JlZW4iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsImhlaWdodCIsInNxV2lkdGgiLCJST1dfTlVNQkVSIiwiYm9yZGVyV2lkdGgiLCJneUNIZWlnaHQiLCJzcXVhcmVXaWR0aCIsIk1JTl9TUVVBUkVfV0lEVEgiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiQk9SREVSX1dJRFRIIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBMkJBOztBQUtBOztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxjOzs7O29DQUNSLEc7OzBDQUNNLEs7OytDQUNpQixJOzsyREFDUCw0Qjs7Ozs7U0FDekIsZUFBWTtBQUNSLGFBQU8sS0FBS0MsTUFBWjtBQUNILEs7U0FVRCxhQUFVQyxLQUFWLEVBQWlCO0FBQ2IsV0FBS0QsTUFBTCxHQUFjQyxLQUFkO0FBQ0g7OztTQVZELGVBQWU7QUFDWCxVQUFNQyxHQUFHLEdBQUcsS0FBS0MsaUJBQWpCOztBQUNBLFVBQUksS0FBS0MsWUFBTCxJQUFxQkYsR0FBekIsRUFBOEI7QUFDMUIsZUFBT0csUUFBUSxDQUFDQyxlQUFULENBQXlCQyxZQUF6QixHQUF3Q0wsR0FBRyxDQUFDTSxNQUFuRDtBQUNIOztBQUNELGFBQU8sQ0FBUDtBQUNIOzs7U0FNRCxlQUFrQjtBQUNkLFVBQU1DLE9BQU8sR0FBRyxDQUFDLEtBQUtSLEtBQUwsR0FBYSxDQUFDUyx5QkFBYSxDQUFkLElBQW1CLEtBQUtDLFdBQXRDLElBQXFERCxzQkFBckU7QUFDQSxhQUFPRCxPQUFQO0FBQ0g7OztTQUVELGVBQStCO0FBQzNCLFVBQU1HLFNBQVMsR0FBRyxLQUFLQyxXQUFMLEdBQW1CLEtBQUssS0FBS0YsV0FBL0M7QUFDQSxhQUFPQyxTQUFQO0FBQ0g7OztTQUVELGVBQWU7QUFDWCxhQUFPLENBQUNGLHlCQUFhLENBQWQsSUFBbUIsS0FBS0MsV0FBeEIsR0FBc0NELHlCQUFhSSwyQkFBMUQ7QUFDSDs7O1NBRUQsZUFBcUI7QUFDakIsYUFBTyxLQUFLSCxXQUFMLElBQW9CSSxpQ0FBc0IsQ0FBMUMsSUFBK0MsS0FBS0YsV0FBTCxHQUFtQkUsOEJBQXpFO0FBQ0g7OztTQUVELGVBQWdDO0FBQzVCLGFBQU8sSUFBSSxLQUFLSixXQUFULEdBQXVCLEtBQUtWLEtBQTVCLEdBQW9DLEdBQTNDO0FBQ0g7OztTQUVELGVBQWtCO0FBQ2QsYUFBTyxLQUFLQSxLQUFMLEdBQWFlLHVCQUFiLEdBQTRCLEtBQUtoQixNQUF4QztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7XG4gICAgQk9SREVSX1dJRFRILFxuICAgIE1JTl9TUVVBUkVfV0lEVEgsXG4gICAgVERfR1JBVkVZQVJEX05VTUJFUixcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcbmltcG9ydCB7IGdlbklkIH0gZnJvbSAnLi9oZWxwZXJzL3VuaXF1ZUlkSGVscGVyJztcbmltcG9ydCB7IFJPV19OVU1CRVIgfSBmcm9tICdraG1lci1jaGVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnNNYW5hZ2VyIHtcbiAgICBfd2lkdGggPSA1MDA7XG4gICAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XG4gICAgYm91bmRpbmdUYWJsZVJlY3Q6IENsaWVudFJlY3QgPSBudWxsO1xuICAgIHVuaXF1ZUNsYXNzTmFtZSA9IGBrY2ItJHtnZW5JZCgpfWA7XG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IHNjYWxlRml0KCkge1xuICAgICAgICBjb25zdCBidHIgPSB0aGlzLmJvdW5kaW5nVGFibGVSZWN0O1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gJiYgYnRyKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAvIGJ0ci5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc2V0IHdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IHNxdWFyZVdpZHRoKCkge1xuICAgICAgICBjb25zdCBzcVdpZHRoID0gKHRoaXMud2lkdGggLSAoUk9XX05VTUJFUiAtIDEpICogdGhpcy5ib3JkZXJXaWR0aCkgLyBST1dfTlVNQkVSO1xuICAgICAgICByZXR1cm4gc3FXaWR0aDtcbiAgICB9XG5cbiAgICBnZXQgZ3JhdmV5YXJkQ29udGFpbmVySGVpZ2h0KCkge1xuICAgICAgICBjb25zdCBneUNIZWlnaHQgPSB0aGlzLnNxdWFyZVdpZHRoICsgMTAgKiB0aGlzLmJvcmRlcldpZHRoO1xuICAgICAgICByZXR1cm4gZ3lDSGVpZ2h0O1xuICAgIH1cblxuICAgIGdldCBtaW5XaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIChST1dfTlVNQkVSIC0gMSkgKiB0aGlzLmJvcmRlcldpZHRoICsgUk9XX05VTUJFUiAqIE1JTl9TUVVBUkVfV0lEVEg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3JkZXJXaWR0aCAqIChURF9HUkFWRVlBUkRfTlVNQkVSIC0gMSkgKyB0aGlzLnNxdWFyZVdpZHRoICogVERfR1JBVkVZQVJEX05VTUJFUjtcbiAgICB9XG5cbiAgICBnZXQgZ3JhdmV5YXJkQ29udGFpbmVyUGFkZGluZygpIHtcbiAgICAgICAgcmV0dXJuIDggKiB0aGlzLmJvcmRlcldpZHRoICogdGhpcy53aWR0aCAvIDYwMDtcbiAgICB9XG5cbiAgICBnZXQgYm9yZGVyV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoICogQk9SREVSX1dJRFRIIC8gdGhpcy5fd2lkdGg7XG4gICAgfVxufVxuXG4iXX0=