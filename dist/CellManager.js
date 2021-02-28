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
      var piece = this.piece;

      if (piece) {
        this.removeClassName(_constance.PIECE_CLASS_NAME);
        this.removeClassName("type-".concat(piece.type));
        this.removeClassName("color-".concat(piece.color));
        this.piece = null;
      }

      return piece;
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
    value: function select() {
      if (this.piece) {
        this.addClassName(_constance.SELECTED_CLASS_NAME);
      }

      return this.piece;
    }
  }, {
    key: "deselect",
    value: function deselect() {
      this.removeClassName(_constance.SELECTED_CLASS_NAME);
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
      if (this.piece) {
        this.removeClassName(_constance.TURN_CLASS_NAME);

        if (attacked) {
          this.addClassName(_constance.TURN_CLASS_NAME);
        }
      }

      return this.piece;
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
      var piece = this.removePiece();
      toCell.setPiece(piece);
      this.moved();
      toCell.moved();
    }
  }, {
    key: "movePieceToGraveyard",
    value: function movePieceToGraveyard(toCell) {
      var deadPiece = this.removePiece();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFBpZWNlIiwicmVtb3ZlQ2xhc3NOYW1lIiwiUElFQ0VfQ0xBU1NfTkFNRSIsInR5cGUiLCJjb2xvciIsInJlbW92ZVBpZWNlIiwiYWRkQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29udGFpbnMiLCJTRUxFQ1RFRF9DTEFTU19OQU1FIiwiaGFzQ2xhc3NOYW1lIiwiQ0FOX01PVkVfQ0xBU1NfTkFNRSIsIk1PVkVEX0NMQVNTX05BTUUiLCJUVVJOX0NMQVNTX05BTUUiLCJhdHRhY2tlZCIsIkFUVEFDS0VEX0NMQVNTX05BTUUiLCJwcm9wIiwibGlzdGVuZXIiLCJvbmNsaWNrIiwiaXNVcHNpZGVEb3duIiwiRkxJUFBFRF9DTEFTUyIsImRpdiIsIlBvaW50IiwieCIsInkiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJ0b0NlbGwiLCJtb3ZlZCIsImRlYWRQaWVjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFDQTs7Ozs7Ozs7OztJQVVxQkEsVztBQU1qQix1QkFBWUMsS0FBWixFQUEwQkMsU0FBMUIsRUFDSUMsS0FESixFQUN1QztBQUFBLFFBQXJCQyxXQUFxQix1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBLHlDQUx6QixLQUt5Qjs7QUFBQSx1Q0FKWEMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBSVc7O0FBQUEsbUNBSHhCLElBR3dCOztBQUFBLDBDQUZ4QixLQUV3Qjs7QUFDbkMsU0FBS0wsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLSyxRQUFMLENBQWNKLEtBQWQ7QUFDQSxT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QUtkLGVBQUwsQ0FBcUJjLDJCQUFyQjtBQUNIOzs7V0FDRCxzQkFBYTtBQUNULFdBQUtULFlBQUwsQ0FBa0JRLDhCQUFsQjtBQUNIOzs7V0FDRCx5QkFBZ0I7QUFDWixXQUFLYixlQUFMLENBQXFCYSw4QkFBckI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuaW1wb3J0IHsgUG9pbnQsIFBpZWNlLCBST1dfTlVNQkVSIH0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IHtcbiAgICBTRUxFQ1RFRF9DTEFTU19OQU1FLFxuICAgIFBJRUNFX0NMQVNTX05BTUUsXG4gICAgQVRUQUNLRURfQ0xBU1NfTkFNRSxcbiAgICBGTElQUEVEX0NMQVNTLFxuICAgIE1PVkVEX0NMQVNTX05BTUUsXG4gICAgQ0FOX01PVkVfQ0xBU1NfTkFNRSxcbiAgICBUVVJOX0NMQVNTX05BTUUsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxNYW5hZ2VyIHtcbiAgICBwb2ludDogUG9pbnQ7XG4gICAgaXNHcmF2ZXlhcmQgPSBmYWxzZTtcbiAgICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBwaWVjZTogUGllY2UgPSBudWxsO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludCwgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCxcbiAgICAgICAgcGllY2U6IFBpZWNlLCBpc0dyYXZleWFyZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucG9pbnQgPSBwb2ludDtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB0aGlzLmlzR3JhdmV5YXJkID0gaXNHcmF2ZXlhcmQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2UoKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy5waWVjZTtcbiAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShQSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGB0eXBlLSR7cGllY2UudHlwZX1gKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGBjb2xvci0ke3BpZWNlLmNvbG9yfWApO1xuICAgICAgICAgICAgdGhpcy5waWVjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpZWNlO1xuICAgIH1cblxuICAgIHNldFBpZWNlKHBpZWNlOiBQaWVjZSkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRoaXMucGllY2UgPSBwaWVjZTtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGB0eXBlLSR7dGhpcy5waWVjZS50eXBlfWApO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoYGNvbG9yLSR7dGhpcy5waWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFBJRUNFX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIGhhc0NsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ2FuTW92ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc01vdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ2FuU2VsZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBhdHRhY2soYXR0YWNrZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKEFUVEFDS0VEX0NMQVNTX05BTUUpO1xuICAgICAgICAgICAgaWYgKGF0dGFja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoQVRUQUNLRURfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgdHVybihhdHRhY2tlZDogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFRVUk5fQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQXR0YWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShBVFRBQ0tFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBnZXQgaXNUdXJuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoVFVSTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBzZXRQcm9wZXJ0aWVzKHByb3A6IHsgY2xhc3NOYW1lOiBzdHJpbmc7IH0pIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gcHJvcC5jbGFzc05hbWU7XG4gICAgfVxuXG4gICAgc2V0T25DbGljayhsaXN0ZW5lcjogKHRoaXM6IEdsb2JhbEV2ZW50SGFuZGxlcnMsIGV2OiBNb3VzZUV2ZW50KSA9PiBhbnkpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIub25jbGljayA9IGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHJlbW92ZU9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLm9uY2xpY2sgPSBudWxsO1xuICAgIH1cblxuICAgIHNldEZsaXBwZWQoaXNVcHNpZGVEb3duOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKEZMSVBQRURfQ0xBU1MpO1xuICAgICAgICB0aGlzLmlzVXBzaWRlRG93biA9IGlzVXBzaWRlRG93bjtcbiAgICAgICAgaWYgKGlzVXBzaWRlRG93bikge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoRkxJUFBFRF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBuZXcgQ2VsbE1hbmFnZXIobmV3IFBvaW50KHRoaXMucG9pbnQueCwgdGhpcy5wb2ludC55KVxuICAgICAgICAgICAgLCBkaXYsIHRoaXMucGllY2UpO1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICBibG9jazogJ2VuZCcsXG4gICAgICAgICAgICBpbmxpbmU6ICduZWFyZXN0JyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW92ZVBpZWNlVG8odG9DZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5tb3ZlZCgpO1xuICAgICAgICB0b0NlbGwubW92ZWQoKTtcbiAgICB9XG5cbiAgICBtb3ZlUGllY2VUb0dyYXZleWFyZCh0b0NlbGw6IENlbGxNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IGRlYWRQaWVjZSA9IHRoaXMucmVtb3ZlUGllY2UoKTtcbiAgICAgICAgdG9DZWxsLnNldFBpZWNlKGRlYWRQaWVjZSk7XG4gICAgICAgIHRvQ2VsbC5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cblxuICAgIG1vdmVkKCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShNT1ZFRF9DTEFTU19OQU1FKTtcbiAgICB9XG4gICAgY2xlYXJNb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuICAgIHNldENhbk1vdmUoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cbiAgICBjbGVhckNhbk1vdmVkKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShDQU5fTU9WRV9DTEFTU19OQU1FKTtcbiAgICB9XG59Il19