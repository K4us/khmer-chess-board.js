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
    value: function push(cell) {
      this._cells.push(cell);

      cell.setProps(this.khmerChessBoard);
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


exports["default"] = GraveyardManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmF2ZXlhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkdyYXZleWFyZE1hbmFnZXIiLCJraG1lckNoZXNzQm9hcmQiLCJraG1lckNoZXNzIiwib3B0aW9ucyIsImRvbUdyYXZleWFyZCIsImNlbGwiLCJfY2VsbHMiLCJwdXNoIiwic2V0UHJvcHMiLCJpbmRleCIsImkiLCJURF9HUkFWRVlBUkRfTlVNQkVSIiwiZ2V0IiwiYWRkQ2xhc3NOYW1lIiwiR1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTIiwiaXNFbmdsaXNoIiwiZW5DbGFzcyIsInJlbW92ZUNsYXNzTmFtZSIsInJlbW92ZVBpZWNlIiwicGllY2VzSW5HcmF2ZXlhcmQiLCJmb3JFYWNoIiwicGllY2UiLCJzZXRQaWVjZSIsInJlbW92ZVBpZWNlc0Zyb21DZWxscyIsImFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7OztJQVFxQkEsZ0I7Ozs7b0NBQ08sRTs7Ozs7Ozs7Ozs7OztXQUt4QixrQkFBU0MsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0JELGVBQWUsQ0FBQ0MsVUFBbEM7QUFDQSxXQUFLQyxPQUFMLEdBQWVGLGVBQWUsQ0FBQ0UsT0FBL0I7QUFDSDs7O1dBQ0QsZ0JBQU9DLFlBQVAsRUFBa0M7QUFDOUIsV0FBS0EsWUFBTCxHQUFvQkEsWUFBcEI7QUFDSDs7O1dBQ0QsY0FBS0MsSUFBTCxFQUF3QjtBQUNwQixXQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUJGLElBQWpCOztBQUNBQSxNQUFBQSxJQUFJLENBQUNHLFFBQUwsQ0FBYyxLQUFLUCxlQUFuQjtBQUNIOzs7V0FFRCxhQUFJUSxLQUFKLEVBQW1CO0FBQ2YsYUFBTyxLQUFLSCxNQUFMLENBQVlHLEtBQVosQ0FBUDtBQUNIOzs7V0FFRCx1QkFBYztBQUNWLFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0MsOEJBQXBCLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLFlBQU1MLElBQUksR0FBRyxLQUFLTyxHQUFMLENBQVNGLENBQVQsQ0FBYjtBQUNBTCxRQUFBQSxJQUFJLENBQUNRLFlBQUwsV0FBcUJDLHNDQUFyQixjQUFvREosQ0FBQyxHQUFHLENBQXhEOztBQUNBLFlBQUksS0FBS1AsT0FBTCxDQUFhWSxTQUFqQixFQUE0QjtBQUN4QlYsVUFBQUEsSUFBSSxDQUFDUSxZQUFMLENBQWtCLEtBQUtWLE9BQUwsQ0FBYWEsT0FBL0I7QUFDSDtBQUNKO0FBQ0o7OztXQUNELHlCQUFnQjtBQUNaLFdBQUssSUFBSU4sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0MsOEJBQXBCLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLFlBQU1MLElBQUksR0FBRyxLQUFLTyxHQUFMLENBQVNGLENBQVQsQ0FBYjtBQUNBTCxRQUFBQSxJQUFJLENBQUNZLGVBQUwsV0FBd0JILHNDQUF4QixjQUF1REosQ0FBQyxHQUFHLENBQTNEO0FBQ0FMLFFBQUFBLElBQUksQ0FBQ1ksZUFBTCxDQUFxQixLQUFLZCxPQUFMLENBQWFhLE9BQWxDO0FBQ0g7QUFDSjs7O1dBRUQsaUNBQXdCO0FBQ3BCLFdBQUssSUFBSU4sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0MsOEJBQXBCLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLFlBQU1MLElBQUksR0FBRyxLQUFLTyxHQUFMLENBQVNGLENBQVQsQ0FBYjtBQUNBTCxRQUFBQSxJQUFJLENBQUNhLFdBQUw7QUFDSDtBQUNKOzs7V0FFRCxxQ0FBNEI7QUFBQTs7QUFDeEIsV0FBS2hCLFVBQUwsQ0FBZ0JpQixpQkFBaEIsQ0FBa0NDLE9BQWxDLENBQTBDLFVBQUNDLEtBQUQsRUFBUVgsQ0FBUixFQUFjO0FBQ3BELFlBQU1MLElBQUksR0FBRyxLQUFJLENBQUNPLEdBQUwsQ0FBU0YsQ0FBVCxDQUFiOztBQUNBTCxRQUFBQSxJQUFJLENBQUNpQixRQUFMLENBQWNELEtBQWQ7QUFDSCxPQUhEO0FBSUg7OztXQUVELGtDQUF5QjtBQUNyQixXQUFLRSxxQkFBTDtBQUNBLFdBQUtDLHlCQUFMO0FBQ0g7Ozs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2htZXJDaGVzcywgUGllY2UgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFREX0dSQVZFWUFSRF9OVU1CRVIsXG4gICAgR1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4vQ2VsbE1hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXZleWFyZE1hbmFnZXIge1xuICAgIF9jZWxsczogQ2VsbE1hbmFnZXJbXSA9IFtdO1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIGtobWVyQ2hlc3M6IEtobWVyQ2hlc3M7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAgZG9tR3JhdmV5YXJkOiBIVE1MRWxlbWVudDtcbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzID0ga2htZXJDaGVzc0JvYXJkLmtobWVyQ2hlc3M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgIH1cbiAgICBzZXREb20oZG9tR3JhdmV5YXJkOiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLmRvbUdyYXZleWFyZCA9IGRvbUdyYXZleWFyZDtcbiAgICB9XG4gICAgcHVzaChjZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9jZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICBjZWxsLnNldFByb3BzKHRoaXMua2htZXJDaGVzc0JvYXJkKTtcbiAgICB9XG5cbiAgICBnZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VsbHNbaW5kZXhdO1xuICAgIH1cblxuICAgIHNldENlbGxOb3RlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFREX0dSQVZFWUFSRF9OVU1CRVI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5hZGRDbGFzc05hbWUoYCR7R1JBVkVZQVJEX05PVEVfUFJFRklYX0NMQVNTfS0ke2kgKyAxfWApO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5pc0VuZ2xpc2gpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzTmFtZSh0aGlzLm9wdGlvbnMuZW5DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJDZWxsTm90ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKGAke0dSQVZFWUFSRF9OT1RFX1BSRUZJWF9DTEFTU30tJHtpICsgMX1gKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlQ2xhc3NOYW1lKHRoaXMub3B0aW9ucy5lbkNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVBpZWNlc0Zyb21DZWxscygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldChpKTtcbiAgICAgICAgICAgIGNlbGwucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UGllY2VzRnJvbUtobWVyQ2hlc3MoKSB7XG4gICAgICAgIHRoaXMua2htZXJDaGVzcy5waWVjZXNJbkdyYXZleWFyZC5mb3JFYWNoKChwaWVjZSwgaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICAgICAgY2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcktobWVyQ2hlc3NQaWVjZXMoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VzRnJvbUNlbGxzKCk7XG4gICAgICAgIHRoaXMuYXBwbHlQaWVjZXNGcm9tS2htZXJDaGVzcygpO1xuICAgIH1cbn1cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICoqLyJdfQ==