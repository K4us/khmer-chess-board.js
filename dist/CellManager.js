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
    key: "attack",
    value: function attack(attacked) {
      if (this.piece) {
        this.removeClassName(_constance.ATTACKED_ID_NAME);

        if (attacked) {
          this.addClassName(_constance.ATTACKED_ID_NAME);
        }
      }

      return this.piece;
    }
  }, {
    key: "isAttacked",
    get: function get() {
      return this.hasClassName(_constance.ATTACKED_ID_NAME);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFBpZWNlIiwicmVtb3ZlQ2xhc3NOYW1lIiwiUElFQ0VfQ0xBU1NfTkFNRSIsInR5cGUiLCJjb2xvciIsInJlbW92ZVBpZWNlIiwiYWRkQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29udGFpbnMiLCJTRUxFQ1RFRF9DTEFTU19OQU1FIiwiaGFzQ2xhc3NOYW1lIiwiQ0FOX01PVkVfQ0xBU1NfTkFNRSIsIk1PVkVEX0NMQVNTX05BTUUiLCJhdHRhY2tlZCIsIkFUVEFDS0VEX0lEX05BTUUiLCJwcm9wIiwibGlzdGVuZXIiLCJvbmNsaWNrIiwiaXNVcHNpZGVEb3duIiwiRkxJUFBFRF9DTEFTUyIsImRpdiIsIlBvaW50IiwieCIsInkiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJ0b0NlbGwiLCJtb3ZlZCIsImRlYWRQaWVjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFDQTs7Ozs7Ozs7OztJQVNxQkEsVztBQU1qQix1QkFBWUMsS0FBWixFQUEwQkMsU0FBMUIsRUFDSUMsS0FESixFQUN1QztBQUFBLFFBQXJCQyxXQUFxQix1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUFBLHlDQUx6QixLQUt5Qjs7QUFBQSx1Q0FKWEMsUUFBUSxDQUFDQyxhQUFULENBQXVCLElBQXZCLENBSVc7O0FBQUEsbUNBSHhCLElBR3dCOztBQUFBLDBDQUZ4QixLQUV3Qjs7QUFDbkMsU0FBS0wsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFLSyxRQUFMLENBQWNKLEtBQWQ7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNIOzs7O1dBRUQsdUJBQWM7QUFDVixVQUFNRCxLQUFLLEdBQUcsS0FBS0EsS0FBbkI7O0FBQ0EsVUFBSUEsS0FBSixFQUFXO0FBQ1AsYUFBS0ssZUFBTCxDQUFxQkMsMkJBQXJCO0FBQ0EsYUFBS0QsZUFBTCxnQkFBNkJMLEtBQUssQ0FBQ08sSUFBbkM7QUFDQSxhQUFLRixlQUFMLGlCQUE4QkwsS0FBSyxDQUFDUSxLQUFwQztBQUNBLGFBQUtSLEtBQUwsR0FBYSxJQUFiO0FBQ0g7O0FBQ0QsYUFBT0EsS0FBUDtBQUNIOzs7V0FFRCxrQkFBU0EsS0FBVCxFQUF1QjtBQUNuQixXQUFLUyxXQUFMO0FBQ0EsV0FBS1QsS0FBTCxHQUFhQSxLQUFiOztBQUNBLFVBQUksS0FBS0EsS0FBVCxFQUFnQjtBQUNaLGFBQUtVLFlBQUwsZ0JBQTBCLEtBQUtWLEtBQUwsQ0FBV08sSUFBckM7QUFDQSxhQUFLRyxZQUFMLGlCQUEyQixLQUFLVixLQUFMLENBQVdRLEtBQXRDO0FBQ0EsYUFBS0UsWUFBTCxDQUFrQkosMkJBQWxCO0FBQ0g7QUFDSjs7O1dBRUQsc0JBQWFLLFNBQWIsRUFBZ0M7QUFDNUIsV0FBS1osU0FBTCxDQUFlYSxTQUFmLENBQXlCQyxHQUF6QixDQUE2QkYsU0FBN0I7QUFDSDs7O1dBRUQseUJBQWdCQSxTQUFoQixFQUFtQztBQUMvQixXQUFLWixTQUFMLENBQWVhLFNBQWYsQ0FBeUJFLE1BQXpCLENBQWdDSCxTQUFoQztBQUNIOzs7V0FFRCxzQkFBYUEsU0FBYixFQUFnQztBQUM1QixhQUFPLEtBQUtaLFNBQUwsQ0FBZWEsU0FBZixDQUF5QkcsUUFBekIsQ0FBa0NKLFNBQWxDLENBQVA7QUFDSDs7O1dBRUQsa0JBQVM7QUFDTCxVQUFJLEtBQUtYLEtBQVQsRUFBZ0I7QUFDWixhQUFLVSxZQUFMLENBQWtCTSw4QkFBbEI7QUFDSDs7QUFDRCxhQUFPLEtBQUtoQixLQUFaO0FBQ0g7OztXQUVELG9CQUFXO0FBQ1AsV0FBS0ssZUFBTCxDQUFxQlcsOEJBQXJCO0FBQ0g7OztTQUVELGVBQWlCO0FBQ2IsYUFBTyxLQUFLQyxZQUFMLENBQWtCRCw4QkFBbEIsQ0FBUDtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsWUFBTCxDQUFrQkMsOEJBQWxCLENBQVA7QUFDSDs7O1NBRUQsZUFBYztBQUNWLGFBQU8sS0FBS0QsWUFBTCxDQUFrQkUsMkJBQWxCLENBQVA7QUFDSDs7O1dBRUQsZ0JBQU9DLFFBQVAsRUFBMEI7QUFDdEIsVUFBSSxLQUFLcEIsS0FBVCxFQUFnQjtBQUNaLGFBQUtLLGVBQUwsQ0FBcUJnQiwyQkFBckI7O0FBQ0EsWUFBSUQsUUFBSixFQUFjO0FBQ1YsZUFBS1YsWUFBTCxDQUFrQlcsMkJBQWxCO0FBQ0g7QUFDSjs7QUFDRCxhQUFPLEtBQUtyQixLQUFaO0FBQ0g7OztTQUVELGVBQWlCO0FBQ2IsYUFBTyxLQUFLaUIsWUFBTCxDQUFrQkksMkJBQWxCLENBQVA7QUFDSDs7O1dBRUQsdUJBQWNDLElBQWQsRUFBNEM7QUFDeEMsV0FBS3ZCLFNBQUwsQ0FBZVksU0FBZixHQUEyQlcsSUFBSSxDQUFDWCxTQUFoQztBQUNIOzs7V0FFRCxvQkFBV1ksUUFBWCxFQUF5RTtBQUNyRSxXQUFLeEIsU0FBTCxDQUFleUIsT0FBZixHQUF5QkQsUUFBekI7QUFDSDs7O1dBRUQseUJBQWdCO0FBQ1osV0FBS3hCLFNBQUwsQ0FBZXlCLE9BQWYsR0FBeUIsSUFBekI7QUFDSDs7O1dBRUQsb0JBQVdDLFlBQVgsRUFBa0M7QUFDOUIsV0FBS3BCLGVBQUwsQ0FBcUJxQix3QkFBckI7QUFDQSxXQUFLRCxZQUFMLEdBQW9CQSxZQUFwQjs7QUFDQSxVQUFJQSxZQUFKLEVBQWtCO0FBQ2QsYUFBS2YsWUFBTCxDQUFrQmdCLHdCQUFsQjtBQUNIO0FBQ0o7OztXQUVELGlCQUFRO0FBQ0osVUFBTUMsR0FBRyxHQUFHekIsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxhQUFPLElBQUlOLFdBQUosQ0FBZ0IsSUFBSStCLGlCQUFKLENBQVUsS0FBSzlCLEtBQUwsQ0FBVytCLENBQXJCLEVBQXdCLEtBQUsvQixLQUFMLENBQVdnQyxDQUFuQyxDQUFoQixFQUNESCxHQURDLEVBQ0ksS0FBSzNCLEtBRFQsQ0FBUDtBQUVIOzs7V0FFRCwwQkFBaUI7QUFDYixXQUFLRCxTQUFMLENBQWVnQyxjQUFmLENBQThCO0FBQzFCQyxRQUFBQSxRQUFRLEVBQUUsUUFEZ0I7QUFFMUJDLFFBQUFBLEtBQUssRUFBRSxLQUZtQjtBQUcxQkMsUUFBQUEsTUFBTSxFQUFFO0FBSGtCLE9BQTlCO0FBS0g7OztXQUVELHFCQUFZQyxNQUFaLEVBQWlDO0FBQzdCLFVBQU1uQyxLQUFLLEdBQUcsS0FBS1MsV0FBTCxFQUFkO0FBQ0EwQixNQUFBQSxNQUFNLENBQUMvQixRQUFQLENBQWdCSixLQUFoQjtBQUNBLFdBQUtvQyxLQUFMO0FBQ0FELE1BQUFBLE1BQU0sQ0FBQ0MsS0FBUDtBQUNIOzs7V0FFRCw4QkFBcUJELE1BQXJCLEVBQTBDO0FBQ3RDLFVBQU1FLFNBQVMsR0FBRyxLQUFLNUIsV0FBTCxFQUFsQjtBQUNBMEIsTUFBQUEsTUFBTSxDQUFDL0IsUUFBUCxDQUFnQmlDLFNBQWhCO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ0osY0FBUDtBQUNIOzs7V0FFRCxpQkFBUTtBQUNKLFdBQUtyQixZQUFMLENBQWtCUywyQkFBbEI7QUFDSDs7O1dBQ0Qsc0JBQWE7QUFDVCxXQUFLZCxlQUFMLENBQXFCYywyQkFBckI7QUFDSDs7O1dBQ0Qsc0JBQWE7QUFDVCxXQUFLVCxZQUFMLENBQWtCUSw4QkFBbEI7QUFDSDs7O1dBQ0QseUJBQWdCO0FBQ1osV0FBS2IsZUFBTCxDQUFxQmEsOEJBQXJCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7IFBvaW50LCBQaWVjZSwgUk9XX05VTUJFUiB9IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCB7XG4gICAgU0VMRUNURURfQ0xBU1NfTkFNRSxcbiAgICBQSUVDRV9DTEFTU19OQU1FLFxuICAgIEFUVEFDS0VEX0lEX05BTUUsXG4gICAgRkxJUFBFRF9DTEFTUyxcbiAgICBNT1ZFRF9DTEFTU19OQU1FLFxuICAgIENBTl9NT1ZFX0NMQVNTX05BTUUsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxNYW5hZ2VyIHtcbiAgICBwb2ludDogUG9pbnQ7XG4gICAgaXNHcmF2ZXlhcmQgPSBmYWxzZTtcbiAgICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBwaWVjZTogUGllY2UgPSBudWxsO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludCwgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCxcbiAgICAgICAgcGllY2U6IFBpZWNlLCBpc0dyYXZleWFyZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucG9pbnQgPSBwb2ludDtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB0aGlzLmlzR3JhdmV5YXJkID0gaXNHcmF2ZXlhcmQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2UoKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy5waWVjZTtcbiAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShQSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGB0eXBlLSR7cGllY2UudHlwZX1gKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGBjb2xvci0ke3BpZWNlLmNvbG9yfWApO1xuICAgICAgICAgICAgdGhpcy5waWVjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpZWNlO1xuICAgIH1cblxuICAgIHNldFBpZWNlKHBpZWNlOiBQaWVjZSkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRoaXMucGllY2UgPSBwaWVjZTtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGB0eXBlLSR7dGhpcy5waWVjZS50eXBlfWApO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoYGNvbG9yLSR7dGhpcy5waWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFBJRUNFX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIGhhc0NsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgZGVzZWxlY3QoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ2FuTW92ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKENBTl9NT1ZFX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGdldCBpc01vdmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgYXR0YWNrKGF0dGFja2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShBVFRBQ0tFRF9JRF9OQU1FKTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKEFUVEFDS0VEX0lEX05BTUUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlO1xuICAgIH1cblxuICAgIGdldCBpc0F0dGFja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoQVRUQUNLRURfSURfTkFNRSk7XG4gICAgfVxuXG4gICAgc2V0UHJvcGVydGllcyhwcm9wOiB7IGNsYXNzTmFtZTogc3RyaW5nOyB9KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9IHByb3AuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHNldE9uQ2xpY2sobGlzdGVuZXI6ICh0aGlzOiBHbG9iYWxFdmVudEhhbmRsZXJzLCBldjogTW91c2VFdmVudCkgPT4gYW55KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLm9uY2xpY2sgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICByZW1vdmVPbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5vbmNsaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRGbGlwcGVkKGlzVXBzaWRlRG93bjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pc1Vwc2lkZURvd24gPSBpc1Vwc2lkZURvd247XG4gICAgICAgIGlmIChpc1Vwc2lkZURvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKEZMSVBQRURfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZXR1cm4gbmV3IENlbGxNYW5hZ2VyKG5ldyBQb2ludCh0aGlzLnBvaW50LngsIHRoaXMucG9pbnQueSlcbiAgICAgICAgICAgICwgZGl2LCB0aGlzLnBpZWNlKTtcbiAgICB9XG5cbiAgICBzY3JvbGxJbnRvVmlldygpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgYmxvY2s6ICdlbmQnLFxuICAgICAgICAgICAgaW5saW5lOiAnbmVhcmVzdCcsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVQaWVjZVRvKHRvQ2VsbDogQ2VsbE1hbmFnZXIpIHtcbiAgICAgICAgY29uc3QgcGllY2UgPSB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRvQ2VsbC5zZXRQaWVjZShwaWVjZSk7XG4gICAgICAgIHRoaXMubW92ZWQoKTtcbiAgICAgICAgdG9DZWxsLm1vdmVkKCk7XG4gICAgfVxuXG4gICAgbW92ZVBpZWNlVG9HcmF2ZXlhcmQodG9DZWxsOiBDZWxsTWFuYWdlcikge1xuICAgICAgICBjb25zdCBkZWFkUGllY2UgPSB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRvQ2VsbC5zZXRQaWVjZShkZWFkUGllY2UpO1xuICAgICAgICB0b0NlbGwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9XG5cbiAgICBtb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoTU9WRURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuICAgIGNsZWFyTW92ZWQoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKE1PVkVEX0NMQVNTX05BTUUpO1xuICAgIH1cbiAgICBzZXRDYW5Nb3ZlKCkge1xuICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShDQU5fTU9WRV9DTEFTU19OQU1FKTtcbiAgICB9XG4gICAgY2xlYXJDYW5Nb3ZlZCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoQ0FOX01PVkVfQ0xBU1NfTkFNRSk7XG4gICAgfVxufSJdfQ==