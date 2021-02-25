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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zTWFuYWdlci50cyJdLCJuYW1lcyI6WyJPcHRpb25zTWFuYWdlciIsIl93aWR0aCIsIndpZHRoIiwiYnRyIiwiYm91bmRpbmdUYWJsZVJlY3QiLCJpc0Z1bGxTY3JlZW4iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsImhlaWdodCIsInNxV2lkdGgiLCJST1dfTlVNQkVSIiwiYm9yZGVyV2lkdGgiLCJneUNIZWlnaHQiLCJjZWxsV2lkdGgiLCJNSU5fQ0VMTF9XSURUSCIsIlREX0dSQVZFWUFSRF9OVU1CRVIiLCJCT1JERVJfV0lEVEgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUEyQkE7O0FBS0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7b0NBQ1IsRzs7MENBQ00sSzs7K0NBQ2lCLEk7OzJEQUNQLDRCOzs7OztTQUN6QixlQUFZO0FBQ1IsYUFBTyxLQUFLQyxNQUFaO0FBQ0gsSztTQVVELGFBQVVDLEtBQVYsRUFBaUI7QUFDYixXQUFLRCxNQUFMLEdBQWNDLEtBQWQ7QUFDSDs7O1NBVkQsZUFBZTtBQUNYLFVBQU1DLEdBQUcsR0FBRyxLQUFLQyxpQkFBakI7O0FBQ0EsVUFBSSxLQUFLQyxZQUFMLElBQXFCRixHQUF6QixFQUE4QjtBQUMxQixlQUFPRyxRQUFRLENBQUNDLGVBQVQsQ0FBeUJDLFlBQXpCLEdBQXdDTCxHQUFHLENBQUNNLE1BQW5EO0FBQ0g7O0FBQ0QsYUFBTyxDQUFQO0FBQ0g7OztTQU1ELGVBQWdCO0FBQ1osVUFBTUMsT0FBTyxHQUFHLENBQUMsS0FBS1IsS0FBTCxHQUFhLENBQUNTLHlCQUFhLENBQWQsSUFBbUIsS0FBS0MsV0FBdEMsSUFBcURELHNCQUFyRTtBQUNBLGFBQU9ELE9BQVA7QUFDSDs7O1NBRUQsZUFBK0I7QUFDM0IsVUFBTUcsU0FBUyxHQUFHLEtBQUtDLFNBQUwsR0FBaUIsS0FBSyxLQUFLRixXQUE3QztBQUNBLGFBQU9DLFNBQVA7QUFDSDs7O1NBRUQsZUFBZTtBQUNYLGFBQU8sQ0FBQ0YseUJBQWEsQ0FBZCxJQUFtQixLQUFLQyxXQUF4QixHQUFzQ0QseUJBQWFJLHlCQUExRDtBQUNIOzs7U0FFRCxlQUFxQjtBQUNqQixhQUFPLEtBQUtILFdBQUwsSUFBb0JJLGlDQUFzQixDQUExQyxJQUErQyxLQUFLRixTQUFMLEdBQWlCRSw4QkFBdkU7QUFDSDs7O1NBRUQsZUFBZ0M7QUFDNUIsYUFBTyxJQUFJLEtBQUtKLFdBQVQsR0FBdUIsS0FBS1YsS0FBNUIsR0FBb0MsR0FBM0M7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtBLEtBQUwsR0FBYWUsdUJBQWIsR0FBNEIsS0FBS2hCLE1BQXhDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHtcbiAgICBCT1JERVJfV0lEVEgsXG4gICAgTUlOX0NFTExfV0lEVEgsXG4gICAgVERfR1JBVkVZQVJEX05VTUJFUixcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcbmltcG9ydCB7IGdlbklkIH0gZnJvbSAnLi9oZWxwZXJzL3VuaXF1ZUlkSGVscGVyJztcbmltcG9ydCB7IFJPV19OVU1CRVIgfSBmcm9tICdraG1lci1jaGVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnNNYW5hZ2VyIHtcbiAgICBfd2lkdGggPSA1MDA7XG4gICAgaXNGdWxsU2NyZWVuID0gZmFsc2U7XG4gICAgYm91bmRpbmdUYWJsZVJlY3Q6IENsaWVudFJlY3QgPSBudWxsO1xuICAgIHVuaXF1ZUNsYXNzTmFtZSA9IGBrY2ItJHtnZW5JZCgpfWA7XG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IHNjYWxlRml0KCkge1xuICAgICAgICBjb25zdCBidHIgPSB0aGlzLmJvdW5kaW5nVGFibGVSZWN0O1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gJiYgYnRyKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAvIGJ0ci5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgc2V0IHdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGNlbGxXaWR0aCgpIHtcbiAgICAgICAgY29uc3Qgc3FXaWR0aCA9ICh0aGlzLndpZHRoIC0gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGgpIC8gUk9XX05VTUJFUjtcbiAgICAgICAgcmV0dXJuIHNxV2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lckhlaWdodCgpIHtcbiAgICAgICAgY29uc3QgZ3lDSGVpZ2h0ID0gdGhpcy5jZWxsV2lkdGggKyAxMCAqIHRoaXMuYm9yZGVyV2lkdGg7XG4gICAgICAgIHJldHVybiBneUNIZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0IG1pbldpZHRoKCkge1xuICAgICAgICByZXR1cm4gKFJPV19OVU1CRVIgLSAxKSAqIHRoaXMuYm9yZGVyV2lkdGggKyBST1dfTlVNQkVSICogTUlOX0NFTExfV0lEVEg7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3JkZXJXaWR0aCAqIChURF9HUkFWRVlBUkRfTlVNQkVSIC0gMSkgKyB0aGlzLmNlbGxXaWR0aCAqIFREX0dSQVZFWUFSRF9OVU1CRVI7XG4gICAgfVxuXG4gICAgZ2V0IGdyYXZleWFyZENvbnRhaW5lclBhZGRpbmcoKSB7XG4gICAgICAgIHJldHVybiA4ICogdGhpcy5ib3JkZXJXaWR0aCAqIHRoaXMud2lkdGggLyA2MDA7XG4gICAgfVxuXG4gICAgZ2V0IGJvcmRlcldpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIEJPUkRFUl9XSURUSCAvIHRoaXMuX3dpZHRoO1xuICAgIH1cbn1cblxuIl19