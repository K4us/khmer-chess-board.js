"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _khmerChess = require("khmer-chess");

var _constance = require("./providers/constance");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CellManager = /*#__PURE__*/function () {
  function CellManager(point, container, piece) {
    var isGraveyard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, CellManager);

    _defineProperty(this, "point", void 0);

    _defineProperty(this, "isGraveyard", false);

    _defineProperty(this, "container", document.createElement('td'));

    _defineProperty(this, "piece", null);

    _defineProperty(this, "isUpsideDown", false);

    this.point = point;
    this.container = container;
    this.setPiece(piece);
    this.isGraveyard = isGraveyard;
  }

  _createClass(CellManager, [{
    key: "removePiece",
    value: function removePiece() {
      var _this = this;

      this.removeClassName(_constance.PIECE_CLASS_NAME);

      _khmerChess.Piece.colorChars.forEach(function (color) {
        _this.removeClassName("color-".concat(color));
      });

      _khmerChess.Piece.pieceChars.forEach(function (type) {
        _this.removeClassName("type-".concat(type));
      });

      this.piece = null;
    }
  }, {
    key: "setPiece",
    value: function setPiece(piece) {
      this.removePiece();
      this.piece = piece;

      if (this.piece) {
        this.addClassName("type-".concat(this.piece.type));
        this.addClassName("color-".concat(this.piece.color));
        this.addClassName(_constance.PIECE_CLASS_NAME);
      }
    }
  }, {
    key: "addClassName",
    value: function addClassName(className) {
      this.container.classList.add(className);
    }
  }, {
    key: "removeClassName",
    value: function removeClassName(className) {
      this.container.classList.remove(className);
    }
  }, {
    key: "hasClassName",
    value: function hasClassName(className) {
      return this.container.classList.contains(className);
    }
  }, {
    key: "select",
    value: function select(selected) {
      this.removeClassName(_constance.SELECTED_CLASS_NAME);

      if (selected && this.piece) {
        this.addClassName(_constance.SELECTED_CLASS_NAME);
      }
    }
  }, {
    key: "isSelected",
    get: function get() {
      return this.hasClassName(_constance.SELECTED_CLASS_NAME);
    }
  }, {
    key: "isCanMove",
    get: function get() {
      return this.hasClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }, {
    key: "isMoved",
    get: function get() {
      return this.hasClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "isCanSelect",
    get: function get() {
      return this.hasClassName(_constance.TURN_CLASS_NAME);
    }
  }, {
    key: "attack",
    value: function attack(attacked) {
      if (this.piece) {
        this.removeClassName(_constance.ATTACKED_CLASS_NAME);

        if (attacked) {
          this.addClassName(_constance.ATTACKED_CLASS_NAME);
        }
      }

      return this.piece;
    }
  }, {
    key: "turn",
    value: function turn(attacked) {
      this.removeClassName(_constance.TURN_CLASS_NAME);

      if (attacked) {
        this.addClassName(_constance.TURN_CLASS_NAME);
      }
    }
  }, {
    key: "isAttacked",
    get: function get() {
      return this.hasClassName(_constance.ATTACKED_CLASS_NAME);
    }
  }, {
    key: "isTurn",
    get: function get() {
      return this.hasClassName(_constance.TURN_CLASS_NAME);
    }
  }, {
    key: "setProperties",
    value: function setProperties(prop) {
      this.container.className = prop.className;
    }
  }, {
    key: "setOnClick",
    value: function setOnClick(listener) {
      this.container.onclick = listener;
    }
  }, {
    key: "removeOnClick",
    value: function removeOnClick() {
      this.container.onclick = null;
    }
  }, {
    key: "setFlipped",
    value: function setFlipped(isUpsideDown) {
      this.removeClassName(_constance.FLIPPED_CLASS);

      if (this.isUpsideDown !== isUpsideDown) {
        var xy = _khmerChess.Point.indexToXY(_khmerChess.CELL_COUNT - 1 - this.point.index);

        this.point.x = xy.x;
        this.point.y = xy.y;
      }

      this.isUpsideDown = isUpsideDown;

      if (isUpsideDown) {
        this.addClassName(_constance.FLIPPED_CLASS);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var div = document.createElement('div');
      return new CellManager(new _khmerChess.Point(this.point.x, this.point.y), div, this.piece);
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      this.container.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, {
    key: "movePieceTo",
    value: function movePieceTo(toCell) {
      var piece = this.piece;
      this.removePiece();
      toCell.setPiece(piece);
      this.moved();
      toCell.moved();
    }
  }, {
    key: "movePieceToGraveyard",
    value: function movePieceToGraveyard(toCell) {
      var deadPiece = this.piece;
      this.removePiece();
      toCell.setPiece(deadPiece);
      toCell.scrollIntoView();
    }
  }, {
    key: "moved",
    value: function moved() {
      this.addClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "clearMoved",
    value: function clearMoved() {
      this.removeClassName(_constance.MOVED_CLASS_NAME);
    }
  }, {
    key: "setCanMove",
    value: function setCanMove() {
      this.addClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }, {
    key: "clearCanMoved",
    value: function clearCanMoved() {
      this.removeClassName(_constance.CAN_MOVE_CLASS_NAME);
    }
  }]);

  return CellManager;
}();

exports["default"] = CellManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFBpZWNlIiwicmVtb3ZlQ2xhc3NOYW1lIiwiUElFQ0VfQ0xBU1NfTkFNRSIsIlBpZWNlIiwiY29sb3JDaGFycyIsImZvckVhY2giLCJjb2xvciIsInBpZWNlQ2hhcnMiLCJ0eXBlIiwicmVtb3ZlUGllY2UiLCJhZGRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjb250YWlucyIsInNlbGVjdGVkIiwiU0VMRUNURURfQ0xBU1NfTkFNRSIsImhhc0NsYXNzTmFtZSIsIkNBTl9NT1ZFX0NMQVNTX05BTUUiLCJNT1ZFRF9DTEFTU19OQU1FIiwiVFVSTl9DTEFTU19OQU1FIiwiYXR0YWNrZWQiLCJBVFRBQ0tFRF9DTEFTU19OQU1FIiwicHJvcCIsImxpc3RlbmVyIiwib25jbGljayIsImlzVXBzaWRlRG93biIsIkZMSVBQRURfQ0xBU1MiLCJ4eSIsIlBvaW50IiwiaW5kZXhUb1hZIiwiQ0VMTF9DT1VOVCIsImluZGV4IiwieCIsInkiLCJkaXYiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJ0b0NlbGwiLCJtb3ZlZCIsImRlYWRQaWVjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFDQTs7Ozs7Ozs7OztJQVVxQkEsVztBQU1qQix1QkFBWUMsS0FBWixFQUEwQkMsU0FBMUIsRUFDSUMsS0FESixFQUN1QztBQUFBLFFBQXJCQyxXQUFxQix1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBLHlDQUx6QixLQUt5Qjs7QUFBQSx1Q0FKWEMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBSVc7O0FBQUEsbUNBSHhCLElBR3dCOztBQUFBLDBDQUZ4QixLQUV3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S0FBSyxHQUFHLEtBQUtBLEtBQW5CO0FBQ0EsV0FBS2EsV0FBTDtBQUNBZ0MsTUFBQUEsTUFBTSxDQUFDekMsUUFBUCxDQUFnQkosS0FBaEI7QUFDQSxXQUFLOEMsS0FBTDtBQUNBRCxNQUFBQSxNQUFNLENBQUNDLEtBQVA7QUFDSDs7O1dBRUQsOEJBQXFCRCxNQUFyQixFQUEwQztBQUN0QyxVQUFNRSxTQUFTLEdBQUcsS0FBSy9DLEtBQXZCO0FBQ0EsV0FBS2EsV0FBTDtBQUNBZ0MsTUFBQUEsTUFBTSxDQUFDekMsUUFBUCxDQUFnQjJDLFNBQWhCO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ0osY0FBUDtBQUNIOzs7V0FFRCxpQkFBUTtBQUNKLFdBQUszQixZQUFMLENBQWtCVSwyQkFBbEI7QUFDSDs7O1dBQ0Qsc0JBQWE7QUFDVCxXQUFLbkIsZUFBTCxDQUFxQm1CLDJCQUFyQjtBQUNIOzs7V0FDRCxzQkFBYTtBQUNULFdBQUtWLFlBQUwsQ0FBa0JTLDhCQUFsQjtBQUNIOzs7V0FDRCx5QkFBZ0I7QUFDWixXQUFLbEIsZUFBTCxDQUFxQmtCLDhCQUFyQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgeyBQb2ludCwgUGllY2UsIFJPV19OVU1CRVIsIENFTExfQ09VTlQgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFNFTEVDVEVEX0NMQVNTX05BTUUsXG4gICAgUElFQ0VfQ0xBU1NfTkFNRSxcbiAgICBBVFRBQ0tFRF9DTEFTU19OQU1FLFxuICAgIEZMSVBQRURfQ0xBU1MsXG4gICAgTU9WRURfQ0xBU1NfTkFNRSxcbiAgICBDQU5fTU9WRV9DTEFTU19OQU1FLFxuICAgIFRVUk5fQ0xBU1NfTkFNRSxcbn0gZnJvbSAnLi9wcm92aWRlcnMvY29uc3RhbmNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbE1hbmFnZXIge1xuICAgIHBvaW50OiBQb2ludDtcbiAgICBpc0dyYXZleWFyZCA9IGZhbHNlO1xuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIHBpZWNlOiBQaWVjZSA9IG51bGw7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50LCBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50LFxuICAgICAgICBwaWVjZTogUGllY2UsIGlzR3JhdmV5YXJkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wb2ludCA9IHBvaW50O1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIHRoaXMuaXNHcmF2ZXlhcmQgPSBpc0dyYXZleWFyZDtcbiAgICB9XG5cbiAgICByZW1vdmVQaWVjZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoUElFQ0VfQ0xBU1NfTkFNRSk7XG4gICAgICAgIFBpZWNlLmNvbG9yQ2hhcnMuZm9yRWFjaCgoY29sb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGBjb2xvci0ke2NvbG9yfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgUGllY2UucGllY2VDaGFycy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShgdHlwZS0ke3R5cGV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBpZWNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRQaWVjZShwaWVjZTogUGllY2UpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB0aGlzLnBpZWNlID0gcGllY2U7XG4gICAgICAgIGlmICh0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShgdHlwZS0ke3RoaXMucGllY2UudHlwZX1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGBjb2xvci0ke3RoaXMucGllY2UuY29sb3J9YCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShQSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBoYXNDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHNlbGVjdChzZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkICYmIHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDYW5Nb3ZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoQ0FOX01PVkVfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzTW92ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNDYW5TZWxlY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShUVVJOX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGF0dGFjayhhdHRhY2tlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoQVRUQUNLRURfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICBpZiAoYXR0YWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShBVFRBQ0tFRF9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5waWVjZTtcbiAgICB9XG5cbiAgICB0dXJuKGF0dGFja2VkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0F0dGFja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoQVRUQUNLRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzVHVybigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgc2V0UHJvcGVydGllcyhwcm9wOiB7IGNsYXNzTmFtZTogc3RyaW5nOyB9KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9IHByb3AuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHNldE9uQ2xpY2sobGlzdGVuZXI6ICh0aGlzOiBHbG9iYWxFdmVudEhhbmRsZXJzLCBldjogTW91c2VFdmVudCkgPT4gYW55KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLm9uY2xpY2sgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICByZW1vdmVPbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5vbmNsaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRGbGlwcGVkKGlzVXBzaWRlRG93bjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgaWYgKHRoaXMuaXNVcHNpZGVEb3duICE9PSBpc1Vwc2lkZURvd24pIHtcbiAgICAgICAgICAgIGNvbnN0IHh5ID0gUG9pbnQuaW5kZXhUb1hZKENFTExfQ09VTlQgLSAxIC0gdGhpcy5wb2ludC5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLnBvaW50LnggPSB4eS54O1xuICAgICAgICAgICAgdGhpcy5wb2ludC55ID0geHkueTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVXBzaWRlRG93biA9IGlzVXBzaWRlRG93bjtcbiAgICAgICAgaWYgKGlzVXBzaWRlRG93bikge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoRkxJUFBFRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBuZXcgQ2VsbE1hbmFnZXIobmV3IFBvaW50KHRoaXMucG9pbnQueCwgdGhpcy5wb2ludC55KVxuICAgICAgICAgICAgLCBkaXYsIHRoaXMucGllY2UpO1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICBibG9jazogJ2VuZCcsXG4gICAgICAgICAgICBpbmxpbmU6ICduZWFyZXN0JyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZVBpZWNlVG8odG9DZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMucGllY2U7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5tb3ZlZCgpO1xuICAgICAgICB0b0NlbGwubW92ZWQoKTtcbiAgICB9XG5cbiAgICBtb3ZlUGllY2VUb0dyYXZleWFyZCh0b0NlbGw6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IGRlYWRQaWVjZSA9IHRoaXMucGllY2U7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKGRlYWRQaWVjZSk7XG4gICAgICAgIHRvQ2VsbC5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cblxuICAgIG1vdmVkKCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG4gICAgY2xlYXJNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuICAgIHNldENhbk1vdmUoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVkKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShDQU5fTU9WRV9DTEFTU19OQU1FKTtcbiAgICB9XG59Il19