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
    value: function push(cellPiece) {
      this._cells.push(cellPiece);
    }
  }, {
    key: "get",
    value: function get(index) {
      return this._cells[index];
    }
  }, {
    key: "setNote",
    value: function setNote() {
      for (var i = 0; i < _constance.TD_GRAVEYARD_NUMBER; i++) {
        var cell = this.get(i);
        cell.addClassName("".concat(_constance.GRAVEYARD_NOTE_PREFIX_CLASS, "-").concat(i + 1));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmF2ZXlhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkdyYXZleWFyZE1hbmFnZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsImNlbGxQaWVjZSIsIl9jZWxscyIsInB1c2giLCJpbmRleCIsImkiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiY2VsbCIsImdldCIsImFkZENsYXNzTmFtZSIsIkdSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTUyIsInJlbW92ZVBpZWNlIiwicGllY2VzSW5HcmF2ZXlhcmQiLCJmb3JFYWNoIiwicGllY2UiLCJzZXRQaWVjZSIsInJlbW92ZVBpZWNlc0Zyb21DZWxscyIsImFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUE0QkE7Ozs7Ozs7Ozs7SUFPcUJBLGdCOzs7O29DQUNPLEU7Ozs7OztxQ0FHZCxFOzs7OztXQUNWLGtCQUFTQyxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQkQsZUFBZSxDQUFDQyxVQUFsQztBQUNBLFdBQUtDLE9BQUwsR0FBZUYsZUFBZSxDQUFDRSxPQUEvQjtBQUNIOzs7V0FFRCxjQUFLQyxTQUFMLEVBQTZCO0FBQ3pCLFdBQUtDLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkYsU0FBakI7QUFDSDs7O1dBRUQsYUFBSUcsS0FBSixFQUFtQjtBQUNmLGFBQU8sS0FBS0YsTUFBTCxDQUFZRSxLQUFaLENBQVA7QUFDSDs7O1dBRUQsbUJBQVU7QUFDTixXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLDhCQUFwQixFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFNRSxJQUFJLEdBQUcsS0FBS0MsR0FBTCxDQUFTSCxDQUFULENBQWI7QUFDQUUsUUFBQUEsSUFBSSxDQUFDRSxZQUFMLFdBQXFCQyxzQ0FBckIsY0FBb0RMLENBQUMsR0FBRyxDQUF4RDtBQUNIO0FBQ0o7OztXQUVELGlDQUF3QjtBQUNwQixXQUFLLElBQUlBLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLDhCQUFwQixFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFNRSxJQUFJLEdBQUcsS0FBS0MsR0FBTCxDQUFTSCxDQUFULENBQWI7QUFDQUUsUUFBQUEsSUFBSSxDQUFDSSxXQUFMO0FBQ0g7QUFDSjs7O1dBRUQscUNBQTRCO0FBQUE7O0FBQ3hCLFdBQUtaLFVBQUwsQ0FBZ0JhLGlCQUFoQixDQUFrQ0MsT0FBbEMsQ0FBMEMsVUFBQ0MsS0FBRCxFQUFRVCxDQUFSLEVBQWM7QUFDcEQsWUFBTUUsSUFBSSxHQUFHLEtBQUksQ0FBQ0MsR0FBTCxDQUFTSCxDQUFULENBQWI7O0FBQ0FFLFFBQUFBLElBQUksQ0FBQ1EsUUFBTCxDQUFjRCxLQUFkO0FBQ0gsT0FIRDtBQUlIOzs7V0FFRCxrQ0FBeUI7QUFDckIsV0FBS0UscUJBQUw7QUFDQSxXQUFLQyx5QkFBTDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7IEtobWVyQ2hlc3MsIFBpZWNlIH0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IHtcbiAgICBURF9HUkFWRVlBUkRfTlVNQkVSLFxuICAgIEdSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTUyxcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcbmltcG9ydCBDZWxsTWFuYWdlciBmcm9tICcuL0NlbGxNYW5hZ2VyJztcbmltcG9ydCBLaG1lckNoZXNzQm9hcmQgZnJvbSAnLi9LaG1lckNoZXNzQm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmF2ZXlhcmRNYW5hZ2VyIHtcbiAgICBfY2VsbHM6IENlbGxNYW5hZ2VyW10gPSBbXTtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBraG1lckNoZXNzOiBLaG1lckNoZXNzO1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cblxuICAgIHB1c2goY2VsbFBpZWNlOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9jZWxscy5wdXNoKGNlbGxQaWVjZSk7XG4gICAgfVxuXG4gICAgZ2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NlbGxzW2luZGV4XTtcbiAgICB9XG5cbiAgICBzZXROb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7R1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2VzRnJvbUNlbGxzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlQaWVjZXNGcm9tS2htZXJDaGVzcygpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzLnBpZWNlc0luR3JhdmV5YXJkLmZvckVhY2goKHBpZWNlLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXQoaSk7XG4gICAgICAgICAgICBjZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyS2htZXJDaGVzc1BpZWNlcygpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZXNGcm9tQ2VsbHMoKTtcbiAgICAgICAgdGhpcy5hcHBseVBpZWNlc0Zyb21LaG1lckNoZXNzKCk7XG4gICAgfVxufVxuIl19