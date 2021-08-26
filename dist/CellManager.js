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

    _defineProperty(this, "containerDom", document.createElement('td'));

    _defineProperty(this, "piece", null);

    _defineProperty(this, "isUpsideDown", false);

    this.point = point;
    this.containerDom = container;
    this.setPiece(piece);
    this.isGraveyard = isGraveyard;
  }

  _createClass(CellManager, [{
    key: "removePieceClasses",
    value: function removePieceClasses() {
      var _this = this;

      this.removeClassName(_constance.PIECE_CLASS_NAME);

      _khmerChess.Piece.colorChars.forEach(function (color) {
        _this.removeClassName("color-".concat(color));
      });

      _khmerChess.Piece.pieceChars.forEach(function (type) {
        _this.removeClassName("type-".concat(type));
      });
    }
  }, {
    key: "removePiece",
    value: function removePiece() {
      this.removePieceClasses();
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
      this.containerDom.classList.add(className);
    }
  }, {
    key: "removeClassName",
    value: function removeClassName(className) {
      this.containerDom.classList.remove(className);
    }
  }, {
    key: "hasClassName",
    value: function hasClassName(className) {
      return this.containerDom.classList.contains(className);
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
      this.containerDom.className = prop.className;
    }
  }, {
    key: "setOnClick",
    value: function setOnClick(listener) {
      this.containerDom.onclick = listener;
    }
  }, {
    key: "removeOnClick",
    value: function removeOnClick() {
      this.containerDom.onclick = null;
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
      this.containerDom.scrollIntoView({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRhaW5lckRvbSIsInNldFBpZWNlIiwicmVtb3ZlQ2xhc3NOYW1lIiwiUElFQ0VfQ0xBU1NfTkFNRSIsIlBpZWNlIiwiY29sb3JDaGFycyIsImZvckVhY2giLCJjb2xvciIsInBpZWNlQ2hhcnMiLCJ0eXBlIiwicmVtb3ZlUGllY2VDbGFzc2VzIiwicmVtb3ZlUGllY2UiLCJhZGRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjb250YWlucyIsInNlbGVjdGVkIiwiU0VMRUNURURfQ0xBU1NfTkFNRSIsImhhc0NsYXNzTmFtZSIsIkNBTl9NT1ZFX0NMQVNTX05BTUUiLCJNT1ZFRF9DTEFTU19OQU1FIiwiVFVSTl9DTEFTU19OQU1FIiwiYXR0YWNrZWQiLCJBVFRBQ0tFRF9DTEFTU19OQU1FIiwicHJvcCIsImxpc3RlbmVyIiwib25jbGljayIsImlzVXBzaWRlRG93biIsIkZMSVBQRURfQ0xBU1MiLCJ4eSIsIlBvaW50IiwiaW5kZXhUb1hZIiwiQ0VMTF9DT1VOVCIsImluZGV4IiwieCIsInkiLCJkaXYiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJ0b0NlbGwiLCJtb3ZlZCIsImRlYWRQaWVjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFLQTs7Ozs7Ozs7OztJQVVxQkEsVztBQU1qQix1QkFBWUMsS0FBWixFQUEwQkMsU0FBMUIsRUFDSUMsS0FESixFQUN1QztBQUFBLFFBQXJCQyxXQUFxQix1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBLHlDQUx6QixLQUt5Qjs7QUFBQSwwQ0FKUkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBSVE7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S0FGc0I7QUFHN0JDLFFBQUFBLE1BQU0sRUFBRTtBQUhxQixPQUFqQztBQUtIOzs7V0FFRCxxQkFBWUMsTUFBWixFQUFpQztBQUM3QixVQUFNL0MsS0FBSyxHQUFHLEtBQUtBLEtBQW5CO0FBQ0EsV0FBS2UsV0FBTDtBQUNBZ0MsTUFBQUEsTUFBTSxDQUFDMUMsUUFBUCxDQUFnQkwsS0FBaEI7QUFDQSxXQUFLZ0QsS0FBTDtBQUNBRCxNQUFBQSxNQUFNLENBQUNDLEtBQVA7QUFDSDs7O1dBRUQsOEJBQXFCRCxNQUFyQixFQUEwQztBQUN0QyxVQUFNRSxTQUFTLEdBQUcsS0FBS2pELEtBQXZCO0FBQ0EsV0FBS2UsV0FBTDtBQUNBZ0MsTUFBQUEsTUFBTSxDQUFDMUMsUUFBUCxDQUFnQjRDLFNBQWhCO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ0osY0FBUDtBQUNIOzs7V0FFRCxpQkFBUTtBQUNKLFdBQUszQixZQUFMLENBQWtCVSwyQkFBbEI7QUFDSDs7O1dBQ0Qsc0JBQWE7QUFDVCxXQUFLcEIsZUFBTCxDQUFxQm9CLDJCQUFyQjtBQUNIOzs7V0FDRCxzQkFBYTtBQUNULFdBQUtWLFlBQUwsQ0FBa0JTLDhCQUFsQjtBQUNIOzs7V0FDRCx5QkFBZ0I7QUFDWixXQUFLbkIsZUFBTCxDQUFxQm1CLDhCQUFyQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQge1xuICAgIFBvaW50LFxuICAgIFBpZWNlLFxuICAgIENFTExfQ09VTlQsXG59IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCB7XG4gICAgU0VMRUNURURfQ0xBU1NfTkFNRSxcbiAgICBQSUVDRV9DTEFTU19OQU1FLFxuICAgIEFUVEFDS0VEX0NMQVNTX05BTUUsXG4gICAgRkxJUFBFRF9DTEFTUyxcbiAgICBNT1ZFRF9DTEFTU19OQU1FLFxuICAgIENBTl9NT1ZFX0NMQVNTX05BTUUsXG4gICAgVFVSTl9DTEFTU19OQU1FLFxufSBmcm9tICcuL3Byb3ZpZGVycy9jb25zdGFuY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsTWFuYWdlciB7XG4gICAgcG9pbnQ6IFBvaW50O1xuICAgIGlzR3JhdmV5YXJkID0gZmFsc2U7XG4gICAgY29udGFpbmVyRG9tOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgcGllY2U6IFBpZWNlID0gbnVsbDtcbiAgICBpc1Vwc2lkZURvd24gPSBmYWxzZTtcbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQsXG4gICAgICAgIHBpZWNlOiBQaWVjZSwgaXNHcmF2ZXlhcmQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5pc0dyYXZleWFyZCA9IGlzR3JhdmV5YXJkO1xuICAgIH1cbiAgICByZW1vdmVQaWVjZUNsYXNzZXMoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFBJRUNFX0NMQVNTX05BTUUpO1xuICAgICAgICBQaWVjZS5jb2xvckNoYXJzLmZvckVhY2goKGNvbG9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShgY29sb3ItJHtjb2xvcn1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFBpZWNlLnBpZWNlQ2hhcnMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoYHR5cGUtJHt0eXBlfWApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVtb3ZlUGllY2UoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUGllY2VDbGFzc2VzKCk7XG4gICAgICAgIHRoaXMucGllY2UgPSBudWxsO1xuICAgIH1cblxuICAgIHNldFBpZWNlKHBpZWNlOiBQaWVjZSkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRoaXMucGllY2UgPSBwaWVjZTtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGB0eXBlLSR7dGhpcy5waWVjZS50eXBlfWApO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoYGNvbG9yLSR7dGhpcy5waWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFBJRUNFX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIGhhc0NsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXJEb20uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgdGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaXNTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc0Nhbk1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShDQU5fTU9WRV9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNNb3ZlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKE1PVkVEX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc0NhblNlbGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgYXR0YWNrKGF0dGFja2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShBVFRBQ0tFRF9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKEFUVEFDS0VEX0NMQVNTX05BTUUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlO1xuICAgIH1cblxuICAgIHR1cm4oYXR0YWNrZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICAgICAgaWYgKGF0dGFja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShUVVJOX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlzQXR0YWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShBVFRBQ0tFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNUdXJuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBzZXRQcm9wZXJ0aWVzKHByb3A6IHsgY2xhc3NOYW1lOiBzdHJpbmc7IH0pIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20uY2xhc3NOYW1lID0gcHJvcC5jbGFzc05hbWU7XG4gICAgfVxuXG4gICAgc2V0T25DbGljayhsaXN0ZW5lcjogKHRoaXM6IEdsb2JhbEV2ZW50SGFuZGxlcnMsIGV2OiBNb3VzZUV2ZW50KSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20ub25jbGljayA9IGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHJlbW92ZU9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tLm9uY2xpY2sgPSBudWxsO1xuICAgIH1cblxuICAgIHNldEZsaXBwZWQoaXNVcHNpZGVEb3duOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKEZMSVBQRURfQ0xBU1MpO1xuICAgICAgICBpZiAodGhpcy5pc1Vwc2lkZURvd24gIT09IGlzVXBzaWRlRG93bikge1xuICAgICAgICAgICAgY29uc3QgeHkgPSBQb2ludC5pbmRleFRvWFkoQ0VMTF9DT1VOVCAtIDEgLSB0aGlzLnBvaW50LmluZGV4KTtcbiAgICAgICAgICAgIHRoaXMucG9pbnQueCA9IHh5Lng7XG4gICAgICAgICAgICB0aGlzLnBvaW50LnkgPSB4eS55O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gaXNVcHNpZGVEb3duO1xuICAgICAgICBpZiAoaXNVcHNpZGVEb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDZWxsTWFuYWdlcihuZXcgUG9pbnQodGhpcy5wb2ludC54LCB0aGlzLnBvaW50LnkpXG4gICAgICAgICAgICAsIGRpdiwgdGhpcy5waWVjZSk7XG4gICAgfVxuXG4gICAgc2Nyb2xsSW50b1ZpZXcoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRG9tLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgIGJsb2NrOiAnZW5kJyxcbiAgICAgICAgICAgIGlubGluZTogJ25lYXJlc3QnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlUGllY2VUbyh0b0NlbGw6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy5waWVjZTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB0b0NlbGwuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB0aGlzLm1vdmVkKCk7XG4gICAgICAgIHRvQ2VsbC5tb3ZlZCgpO1xuICAgIH1cblxuICAgIG1vdmVQaWVjZVRvR3JhdmV5YXJkKHRvQ2VsbDogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgY29uc3QgZGVhZFBpZWNlID0gdGhpcy5waWVjZTtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB0b0NlbGwuc2V0UGllY2UoZGVhZFBpZWNlKTtcbiAgICAgICAgdG9DZWxsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgfVxuXG4gICAgbW92ZWQoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKE1PVkVEX0NMQVNTX05BTUUpO1xuICAgIH1cbiAgICBjbGVhck1vdmVkKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG4gICAgc2V0Q2FuTW92ZSgpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoQ0FOX01PVkVfQ0xBU1NfTkFNRSk7XG4gICAgfVxuICAgIGNsZWFyQ2FuTW92ZWQoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cbn0iXX0=