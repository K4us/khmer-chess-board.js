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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmF2ZXlhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkdyYXZleWFyZE1hbmFnZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsImNlbGxQaWVjZSIsIl9jZWxscyIsInB1c2giLCJpbmRleCIsImkiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiY2VsbCIsImdldCIsImFkZENsYXNzTmFtZSIsIkdSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTUyIsImlzRW5nbGlzaCIsImVuQ2xhc3MiLCJyZW1vdmVDbGFzc05hbWUiLCJyZW1vdmVQaWVjZSIsInBpZWNlc0luR3JhdmV5YXJkIiwiZm9yRWFjaCIsInBpZWNlIiwic2V0UGllY2UiLCJyZW1vdmVQaWVjZXNGcm9tQ2VsbHMiLCJhcHBseVBpZWNlc0Zyb21LaG1lckNoZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBNEJBOzs7Ozs7Ozs7O0lBUXFCQSxnQjs7OztvQ0FDTyxFOzs7Ozs7Ozs7OztXQUl4QixrQkFBU0MsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0JELGVBQWUsQ0FBQ0MsVUFBbEM7QUFDQSxXQUFLQyxPQUFMLEdBQWVGLGVBQWUsQ0FBQ0UsT0FBL0I7QUFDSDs7O1dBRUQsY0FBS0MsU0FBTCxFQUE2QjtBQUN6QixXQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUJGLFNBQWpCO0FBQ0g7OztXQUVELGFBQUlHLEtBQUosRUFBbUI7QUFDZixhQUFPLEtBQUtGLE1BQUwsQ0FBWUUsS0FBWixDQUFQO0FBQ0g7OztXQUVELHVCQUFjO0FBQ1YsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyw4QkFBcEIsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBTUUsSUFBSSxHQUFHLEtBQUtDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFiO0FBQ0FFLFFBQUFBLElBQUksQ0FBQ0UsWUFBTCxXQUFxQkMsc0NBQXJCLGNBQW9ETCxDQUFDLEdBQUcsQ0FBeEQ7O0FBQ0EsWUFBSSxLQUFLTCxPQUFMLENBQWFXLFNBQWpCLEVBQTRCO0FBQ3hCSixVQUFBQSxJQUFJLENBQUNFLFlBQUwsQ0FBa0IsS0FBS1QsT0FBTCxDQUFhWSxPQUEvQjtBQUNIO0FBQ0o7QUFDSjs7O1dBQ0QseUJBQWdCO0FBQ1osV0FBSyxJQUFJUCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyw4QkFBcEIsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBTUUsSUFBSSxHQUFHLEtBQUtDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFiO0FBQ0FFLFFBQUFBLElBQUksQ0FBQ00sZUFBTCxXQUF3Qkgsc0NBQXhCLGNBQXVETCxDQUFDLEdBQUcsQ0FBM0Q7QUFDQUUsUUFBQUEsSUFBSSxDQUFDTSxlQUFMLENBQXFCLEtBQUtiLE9BQUwsQ0FBYVksT0FBbEM7QUFDSDtBQUNKOzs7V0FFRCxpQ0FBd0I7QUFDcEIsV0FBSyxJQUFJUCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyw4QkFBcEIsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsWUFBTUUsSUFBSSxHQUFHLEtBQUtDLEdBQUwsQ0FBU0gsQ0FBVCxDQUFiO0FBQ0FFLFFBQUFBLElBQUksQ0FBQ08sV0FBTDtBQUNIO0FBQ0o7OztXQUVELHFDQUE0QjtBQUFBOztBQUN4QixXQUFLZixVQUFMLENBQWdCZ0IsaUJBQWhCLENBQWtDQyxPQUFsQyxDQUEwQyxVQUFDQyxLQUFELEVBQVFaLENBQVIsRUFBYztBQUNwRCxZQUFNRSxJQUFJLEdBQUcsS0FBSSxDQUFDQyxHQUFMLENBQVNILENBQVQsQ0FBYjs7QUFDQUUsUUFBQUEsSUFBSSxDQUFDVyxRQUFMLENBQWNELEtBQWQ7QUFDSCxPQUhEO0FBSUg7OztXQUVELGtDQUF5QjtBQUNyQixXQUFLRSxxQkFBTDtBQUNBLFdBQUtDLHlCQUFMO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHsgS2htZXJDaGVzcywgUGllY2UgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFREX0dSQVZFWUFSRF9OVU1CRVIsXG4gICAgR1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZleWFyZE1hbmFnZXIge1xuICAgIF9jZWxsczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcyA9IGtobWVyQ2hlc3NCb2FyZC5raG1lckNoZXNzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBraG1lckNoZXNzQm9hcmQub3B0aW9ucztcbiAgICB9XG5cbiAgICBwdXNoKGNlbGxQaWVjZTogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fY2VsbHMucHVzaChjZWxsUGllY2UpO1xuICAgIH1cblxuICAgIGdldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxsc1tpbmRleF07XG4gICAgfVxuXG4gICAgc2V0Q2VsbE5vdGUoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVERfR1JBVkVZQVJEX05VTUJFUjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXQoaSk7XG4gICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZShgJHtHUkFWRVlBUkRfTk9URV9QUkVGSVhfQ0xBU1N9LSR7aSArIDF9YCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmlzRW5nbGlzaCkge1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckNlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUoYCR7R1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVDbGFzc05hbWUodGhpcy5vcHRpb25zLmVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlQaWVjZXNGcm9tS2htZXJDaGVzcygpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLnBpZWNlc0luR3JhdmV5YXJkLmZvckVhY2goKHBpZWNlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXQoaSk7XG4gICAgICAgICAgICBjZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyS2htZXJDaGVzc1BpZWNlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5hcHBseVBpZWNlc0Zyb21LaG1lckNoZXNzKCk7XG4gICAgfVxufVxuIl19