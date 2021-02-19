"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./constance");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GraveyardManager = /*#__PURE__*/function () {
  function GraveyardManager() {
    _classCallCheck(this, GraveyardManager);

    _defineProperty(this, "_squares", []);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "khmerChess", void 0);

    _defineProperty(this, "options", {});
  }

  _createClass(GraveyardManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.khmerChess = khmerChessBoard.khmerChess;
      this.options = khmerChessBoard.options;
    }
  }, {
    key: "push",
    value: function push(squarePiece) {
      this._squares.push(squarePiece);
    }
  }, {
    key: "get",
    value: function get(index) {
      return this._squares[index];
    }
  }, {
    key: "setNote",
    value: function setNote() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var square = this.get(i);
        square.addClassName("".concat(_constance.GRAVEYARD_NOTE_PREFIX_CLASS, "-").concat(i + 1));
      }
    }
  }, {
    key: "removePiecesFromSquares",
    value: function removePiecesFromSquares() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var square = this.get(i);
        square.removePiece();
      }
    }
  }, {
    key: "applyPiecesFromKhmerChess",
    value: function applyPiecesFromKhmerChess(pieces) {
      var _this = this;

      pieces.forEach(function (piece, i) {
        var square = _this.get(i);

        square.setPiece(piece);
      });
    }
  }, {
    key: "renderKhmerChessPieces",
    value: function renderKhmerChessPieces() {
      this.removePiecesFromSquares();
      this.applyPiecesFromKhmerChess(this.khmerChess.graveyard());
    }
  }]);

  return GraveyardManager;
}();

exports["default"] = GraveyardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmF2ZXlhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkdyYXZleWFyZE1hbmFnZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsInNxdWFyZVBpZWNlIiwiX3NxdWFyZXMiLCJwdXNoIiwiaW5kZXgiLCJpIiwiVERfR1JBVkVZQVJEX05VTUJFUiIsInNxdWFyZSIsImdldCIsImFkZENsYXNzTmFtZSIsIkdSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTUyIsInJlbW92ZVBpZWNlIiwicGllY2VzIiwiZm9yRWFjaCIsInBpZWNlIiwic2V0UGllY2UiLCJyZW1vdmVQaWVjZXNGcm9tU3F1YXJlcyIsImFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3MiLCJncmF2ZXlhcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUE0QkE7Ozs7Ozs7Ozs7SUFPcUJBLGdCOzs7O3NDQUNXLEU7Ozs7OztxQ0FHbEIsRTs7Ozs7V0FDVixrQkFBU0MsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0JELGVBQWUsQ0FBQ0MsVUFBbEM7QUFDQSxXQUFLQyxPQUFMLEdBQWVGLGVBQWUsQ0FBQ0UsT0FBL0I7QUFDSDs7O1dBRUQsY0FBS0MsV0FBTCxFQUFpQztBQUM3QixXQUFLQyxRQUFMLENBQWNDLElBQWQsQ0FBbUJGLFdBQW5CO0FBQ0g7OztXQUVELGFBQUlHLEtBQUosRUFBbUI7QUFDZixhQUFPLEtBQUtGLFFBQUwsQ0FBY0UsS0FBZCxDQUFQO0FBQ0g7OztXQUVELG1CQUFVO0FBQ04sV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyw4QkFBcEIsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBTUUsTUFBTSxHQUFHLEtBQUtDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFmO0FBQ0FFLFFBQUFBLE1BQU0sQ0FBQ0UsWUFBUCxXQUF1QkMsc0NBQXZCLGNBQXNETCxDQUFDLEdBQUcsQ0FBMUQ7QUFDSDtBQUNKOzs7V0FFRCxtQ0FBMEI7QUFDdEIsV0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyw4QkFBcEIsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBTUUsTUFBTSxHQUFHLEtBQUtDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFmO0FBQ0FFLFFBQUFBLE1BQU0sQ0FBQ0ksV0FBUDtBQUNIO0FBQ0o7OztXQUVELG1DQUEwQkMsTUFBMUIsRUFBMkM7QUFBQTs7QUFDdkNBLE1BQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLFVBQUNDLEtBQUQsRUFBUVQsQ0FBUixFQUFjO0FBQ3pCLFlBQU1FLE1BQU0sR0FBRyxLQUFJLENBQUNDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFmOztBQUNBRSxRQUFBQSxNQUFNLENBQUNRLFFBQVAsQ0FBZ0JELEtBQWhCO0FBQ0gsT0FIRDtBQUlIOzs7V0FFRCxrQ0FBeUI7QUFDckIsV0FBS0UsdUJBQUw7QUFDQSxXQUFLQyx5QkFBTCxDQUErQixLQUFLbEIsVUFBTCxDQUFnQm1CLFNBQWhCLEVBQS9CO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHsgS2htZXJDaGVzcywgUGllY2UgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFREX0dSQVZFWUFSRF9OVU1CRVIsXG4gICAgR1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL2NvbnN0YW5jZSc7XG5pbXBvcnQgU3F1YXJlT25Cb2FyZCBmcm9tICcuL1NxdWFyZU9uQm9hcmQnO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3Nib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZleWFyZE1hbmFnZXIge1xuICAgIF9zcXVhcmVzOiBTcXVhcmVPbkJvYXJkW10gPSBbXTtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBraG1lckNoZXNzOiBLaG1lckNoZXNzO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cblxuICAgIHB1c2goc3F1YXJlUGllY2U6IFNxdWFyZU9uQm9hcmQpIHtcbiAgICAgICAgdGhpcy5fc3F1YXJlcy5wdXNoKHNxdWFyZVBpZWNlKTtcbiAgICB9XG5cbiAgICBnZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3F1YXJlc1tpbmRleF07XG4gICAgfVxuXG4gICAgc2V0Tm90ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgc3F1YXJlLmFkZENsYXNzTmFtZShgJHtHUkFWRVlBUkRfTk9URV9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVQaWVjZXNGcm9tU3F1YXJlcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseVBpZWNlc0Zyb21LaG1lckNoZXNzKHBpZWNlczogUGllY2VbXSkge1xuICAgICAgICBwaWVjZXMuZm9yRWFjaCgocGllY2UsIGkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgc3F1YXJlLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyS2htZXJDaGVzc1BpZWNlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tU3F1YXJlcygpO1xuICAgICAgICB0aGlzLmFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3ModGhpcy5raG1lckNoZXNzLmdyYXZleWFyZCgpKTtcbiAgICB9XG59XG4iXX0=