"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constance = require("./providers/constance");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GraveyardManager = /*#__PURE__*/function () {
  function GraveyardManager() {
    _classCallCheck(this, GraveyardManager);

    _defineProperty(this, "_cells", []);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "khmerChess", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "domGraveyard", void 0);
  }

  _createClass(GraveyardManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.khmerChess = khmerChessBoard.khmerChess;
      this.options = khmerChessBoard.options;
    }
  }, {
    key: "setDom",
    value: function setDom(domGraveyard) {
      this.domGraveyard = domGraveyard;
    }
  }, {
    key: "push",
    value: function push(cellPiece) {
      this._cells.push(cellPiece);
    }
  }, {
    key: "get",
    value: function get(index) {
      return this._cells[index];
    }
  }, {
    key: "setCellNote",
    value: function setCellNote() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var cell = this.get(i);
        cell.addClassName("".concat(_constance.GRAVEYARD_NOTE_PREFIX_CLASS, "-").concat(i + 1));

        if (this.options.isEnglish) {
          cell.addClassName(this.options.enClass);
        }
      }
    }
  }, {
    key: "clearCellNote",
    value: function clearCellNote() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var cell = this.get(i);
        cell.removeClassName("".concat(_constance.GRAVEYARD_NOTE_PREFIX_CLASS, "-").concat(i + 1));
        cell.removeClassName(this.options.enClass);
      }
    }
  }, {
    key: "removePiecesFromCells",
    value: function removePiecesFromCells() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var cell = this.get(i);
        cell.removePiece();
      }
    }
  }, {
    key: "applyPiecesFromKhmerChess",
    value: function applyPiecesFromKhmerChess() {
      var _this = this;

      this.khmerChess.piecesInGraveyard.forEach(function (piece, i) {
        var cell = _this.get(i);

        cell.setPiece(piece);
      });
    }
  }, {
    key: "renderKhmerChessPieces",
    value: function renderKhmerChessPieces() {
      this.removePiecesFromCells();
      this.applyPiecesFromKhmerChess();
    }
  }]);

  return GraveyardManager;
}();

exports["default"] = GraveyardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmF2ZXlhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkdyYXZleWFyZE1hbmFnZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsImRvbUdyYXZleWFyZCIsImNlbGxQaWVjZSIsIl9jZWxscyIsInB1c2giLCJpbmRleCIsImkiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiY2VsbCIsImdldCIsImFkZENsYXNzTmFtZSIsIkdSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTUyIsImlzRW5nbGlzaCIsImVuQ2xhc3MiLCJyZW1vdmVDbGFzc05hbWUiLCJyZW1vdmVQaWVjZSIsInBpZWNlc0luR3JhdmV5YXJkIiwiZm9yRWFjaCIsInBpZWNlIiwic2V0UGllY2UiLCJyZW1vdmVQaWVjZXNGcm9tQ2VsbHMiLCJhcHBseVBpZWNlc0Zyb21LaG1lckNoZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBNEJBOzs7Ozs7Ozs7O0lBUXFCQSxnQjs7OztvQ0FDTyxFOzs7Ozs7Ozs7Ozs7O1dBS3hCLGtCQUFTQyxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQkQsZUFBZSxDQUFDQyxVQUFsQztBQUNBLFdBQUtDLE9BQUwsR0FBZUYsZUFBZSxDQUFDRSxPQUEvQjtBQUNIOzs7V0FDRCxnQkFBT0MsWUFBUCxFQUFrQztBQUM5QixXQUFLQSxZQUFMLEdBQW9CQSxZQUFwQjtBQUNIOzs7V0FDRCxjQUFLQyxTQUFMLEVBQTZCO0FBQ3pCLFdBQUtDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkYsU0FBakI7QUFDSDs7O1dBRUQsYUFBSUcsS0FBSixFQUFtQjtBQUNmLGFBQU8sS0FBS0YsTUFBTCxDQUFZRSxLQUFaLENBQVA7QUFDSDs7O1dBRUQsdUJBQWM7QUFDVixXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLDhCQUFwQixFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFNRSxJQUFJLEdBQUcsS0FBS0MsR0FBTCxDQUFTSCxDQUFULENBQWI7QUFDQUUsUUFBQUEsSUFBSSxDQUFDRSxZQUFMLFdBQXFCQyxzQ0FBckIsY0FBb0RMLENBQUMsR0FBRyxDQUF4RDs7QUFDQSxZQUFJLEtBQUtOLE9BQUwsQ0FBYVksU0FBakIsRUFBNEI7QUFDeEJKLFVBQUFBLElBQUksQ0FBQ0UsWUFBTCxDQUFrQixLQUFLVixPQUFMLENBQWFhLE9BQS9CO0FBQ0g7QUFDSjtBQUNKOzs7V0FDRCx5QkFBZ0I7QUFDWixXQUFLLElBQUlQLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLDhCQUFwQixFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFNRSxJQUFJLEdBQUcsS0FBS0MsR0FBTCxDQUFTSCxDQUFULENBQWI7QUFDQUUsUUFBQUEsSUFBSSxDQUFDTSxlQUFMLFdBQXdCSCxzQ0FBeEIsY0FBdURMLENBQUMsR0FBRyxDQUEzRDtBQUNBRSxRQUFBQSxJQUFJLENBQUNNLGVBQUwsQ0FBcUIsS0FBS2QsT0FBTCxDQUFhYSxPQUFsQztBQUNIO0FBQ0o7OztXQUVELGlDQUF3QjtBQUNwQixXQUFLLElBQUlQLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLDhCQUFwQixFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFNRSxJQUFJLEdBQUcsS0FBS0MsR0FBTCxDQUFTSCxDQUFULENBQWI7QUFDQUUsUUFBQUEsSUFBSSxDQUFDTyxXQUFMO0FBQ0g7QUFDSjs7O1dBRUQscUNBQTRCO0FBQUE7O0FBQ3hCLFdBQUtoQixVQUFMLENBQWdCaUIsaUJBQWhCLENBQWtDQyxPQUFsQyxDQUEwQyxVQUFDQyxLQUFELEVBQVFaLENBQVIsRUFBYztBQUNwRCxZQUFNRSxJQUFJLEdBQUcsS0FBSSxDQUFDQyxHQUFMLENBQVNILENBQVQsQ0FBYjs7QUFDQUUsUUFBQUEsSUFBSSxDQUFDVyxRQUFMLENBQWNELEtBQWQ7QUFDSCxPQUhEO0FBSUg7OztXQUVELGtDQUF5QjtBQUNyQixXQUFLRSxxQkFBTDtBQUNBLFdBQUtDLHlCQUFMO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHsgS2htZXJDaGVzcywgUGllY2UgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFREX0dSQVZFWUFSRF9OVU1CRVIsXG4gICAgR1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZleWFyZE1hbmFnZXIge1xuICAgIF9jZWxsczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAgZG9tR3JhdmV5YXJkOiBIVE1MRWxlbWVudDtcbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBzZXREb20oZG9tR3JhdmV5YXJkOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRvbUdyYXZleWFyZCA9IGRvbUdyYXZleWFyZDtcbiAgICB9XG4gICAgcHVzaChjZWxsUGllY2U6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX2NlbGxzLnB1c2goY2VsbFBpZWNlKTtcbiAgICB9XG5cbiAgICBnZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbHNbaW5kZXhdO1xuICAgIH1cblxuICAgIHNldENlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7R1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc0VuZ2xpc2gpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJDZWxsTm90ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKGAke0dSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVBpZWNlc0Zyb21DZWxscygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3MoKSB7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcy5waWVjZXNJbkdyYXZleWFyZC5mb3JFYWNoKChwaWVjZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VzRnJvbUNlbGxzKCk7XG4gICAgICAgIHRoaXMuYXBwbHlQaWVjZXNGcm9tS2htZXJDaGVzcygpO1xuICAgIH1cbn1cbiJdfQ==