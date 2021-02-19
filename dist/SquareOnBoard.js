"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _khmerChess = require("khmer-chess");

var _constance = require("./constance");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SquareOnBoard = /*#__PURE__*/function () {
  function SquareOnBoard(x, y, container, piece) {
    var isGraveyard = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, SquareOnBoard);

    _defineProperty(this, "_x", 0);

    _defineProperty(this, "_y", 0);

    _defineProperty(this, "isGraveyard", false);

    _defineProperty(this, "container", document.createElement('td'));

    _defineProperty(this, "piece", null);

    _defineProperty(this, "isUpsideDown", false);

    this._x = x;
    this._y = y;
    this.container = container;
    this.setPiece(piece);
    this.isGraveyard = isGraveyard;
  }

  _createClass(SquareOnBoard, [{
    key: "x",
    get: function get() {
      return this.isUpsideDown ? _khmerChess.boardHelper.ROW_NUMBER - this._x - 1 : this._x;
    }
  }, {
    key: "y",
    get: function get() {
      return this.isUpsideDown ? _khmerChess.boardHelper.ROW_NUMBER - this._y - 1 : this._y;
    }
  }, {
    key: "index",
    get: function get() {
      return _khmerChess.boardHelper.nerdXyToPos(this.x, this.y);
    }
  }, {
    key: "indexCode",
    get: function get() {
      return _khmerChess.boardHelper.xyToIndexCode(this.x, this.y);
    }
  }, {
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
    key: "unselect",
    value: function unselect() {
      this.removeClassName(_constance.SELECTED_CLASS_NAME);
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.hasClassName(_constance.SELECTED_CLASS_NAME);
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
    value: function isAttacked() {
      return this.hasClassName(_constance.ATTACKED_ID_NAME);
    }
  }, {
    key: "getProperties",
    value: function getProperties() {
      return {
        className: this.container.className
      };
    }
  }, {
    key: "clear",
    value: function clear() {
      this.container.className = '';
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
      return new SquareOnBoard(this.x, this.y, div, this.piece);
    }
  }]);

  return SquareOnBoard;
}();

exports["default"] = SquareOnBoard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TcXVhcmVPbkJvYXJkLnRzIl0sIm5hbWVzIjpbIlNxdWFyZU9uQm9hcmQiLCJ4IiwieSIsImNvbnRhaW5lciIsInBpZWNlIiwiaXNHcmF2ZXlhcmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJfeCIsIl95Iiwic2V0UGllY2UiLCJpc1Vwc2lkZURvd24iLCJib2FyZEhlbHBlciIsIlJPV19OVU1CRVIiLCJuZXJkWHlUb1BvcyIsInh5VG9JbmRleENvZGUiLCJyZW1vdmVDbGFzc05hbWUiLCJQSUVDRV9DTEFTU19OQU1FIiwidHlwZSIsImNvbG9yIiwicmVtb3ZlUGllY2UiLCJhZGRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjb250YWlucyIsIlNFTEVDVEVEX0NMQVNTX05BTUUiLCJoYXNDbGFzc05hbWUiLCJhdHRhY2tlZCIsIkFUVEFDS0VEX0lEX05BTUUiLCJwcm9wIiwibGlzdGVuZXIiLCJvbmNsaWNrIiwiRkxJUFBFRF9DTEFTUyIsImRpdiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQTJCQTs7QUFDQTs7Ozs7Ozs7OztJQU9xQkEsYTtBQXVCakIseUJBQVlDLENBQVosRUFBdUJDLENBQXZCLEVBQWtDQyxTQUFsQyxFQUNJQyxLQURKLEVBQ3VDO0FBQUEsUUFBckJDLFdBQXFCLHVFQUFQLEtBQU87O0FBQUE7O0FBQUEsZ0NBdkJsQyxDQXVCa0M7O0FBQUEsZ0NBdEJsQyxDQXNCa0M7O0FBQUEseUNBTHpCLEtBS3lCOztBQUFBLHVDQUpYQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FJVzs7QUFBQSxtQ0FIeEIsSUFHd0I7O0FBQUEsMENBRnhCLEtBRXdCOztBQUNuQyxTQUFLQyxFQUFMLEdBQVVQLENBQVY7QUFDQSxTQUFLUSxFQUFMLEdBQVVQLENBQVY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtPLFFBQUwsQ0FBY04sS0FBZDtBQUNBLFNBQUtD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QWhDO0FBQ0g7OztXQUVELG9CQUFXVSxRQUFYLEVBQXlFO0FBQ3JFLFdBQUs3QixTQUFMLENBQWU4QixPQUFmLEdBQXlCRCxRQUF6QjtBQUNIOzs7V0FFRCx5QkFBZ0I7QUFDWixXQUFLN0IsU0FBTCxDQUFlOEIsT0FBZixHQUF5QixJQUF6QjtBQUNIOzs7V0FFRCxvQkFBV3RCLFlBQVgsRUFBa0M7QUFDOUIsV0FBS0ssZUFBTCxDQUFxQmtCLHdCQUFyQjtBQUNBLFdBQUt2QixZQUFMLEdBQW9CQSxZQUFwQjs7QUFDQSxVQUFJQSxZQUFKLEVBQWtCO0FBQ2QsYUFBS1UsWUFBTCxDQUFrQmEsd0JBQWxCO0FBQ0g7QUFDSjs7O1dBRUQsaUJBQVE7QUFDSixVQUFNQyxHQUFHLEdBQUc3QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLGFBQU8sSUFBSVAsYUFBSixDQUFrQixLQUFLQyxDQUF2QixFQUEwQixLQUFLQyxDQUEvQixFQUFrQ2lDLEdBQWxDLEVBQXVDLEtBQUsvQixLQUE1QyxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7IGJvYXJkSGVscGVyLCBQaWVjZSB9IGZyb20gJ2tobWVyLWNoZXNzJztcbmltcG9ydCB7XG4gICAgU0VMRUNURURfQ0xBU1NfTkFNRSxcbiAgICBQSUVDRV9DTEFTU19OQU1FLFxuICAgIEFUVEFDS0VEX0lEX05BTUUsXG4gICAgRkxJUFBFRF9DTEFTUyxcbn0gZnJvbSAnLi9jb25zdGFuY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcXVhcmVPbkJvYXJkIHtcbiAgICBfeCA9IDA7XG4gICAgX3kgPSAwO1xuICAgIGdldCB4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVXBzaWRlRG93biA/IGJvYXJkSGVscGVyLlJPV19OVU1CRVIgLSB0aGlzLl94IC0gMSA6IHRoaXMuX3g7XG4gICAgfVxuXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNVcHNpZGVEb3duID8gYm9hcmRIZWxwZXIuUk9XX05VTUJFUiAtIHRoaXMuX3kgLSAxIDogdGhpcy5feTtcbiAgICB9XG5cbiAgICBnZXQgaW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGJvYXJkSGVscGVyLm5lcmRYeVRvUG9zKHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG5cbiAgICBnZXQgaW5kZXhDb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBib2FyZEhlbHBlci54eVRvSW5kZXhDb2RlKHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG5cbiAgICBpc0dyYXZleWFyZCA9IGZhbHNlO1xuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIHBpZWNlOiBQaWVjZSA9IG51bGw7XG4gICAgaXNVcHNpZGVEb3duID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQsXG4gICAgICAgIHBpZWNlOiBQaWVjZSwgaXNHcmF2ZXlhcmQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLnNldFBpZWNlKHBpZWNlKTtcbiAgICAgICAgdGhpcy5pc0dyYXZleWFyZCA9IGlzR3JhdmV5YXJkO1xuICAgIH1cblxuICAgIHJlbW92ZVBpZWNlKCkge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMucGllY2U7XG4gICAgICAgIGlmIChwaWVjZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoUElFQ0VfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShgdHlwZS0ke3BpZWNlLnR5cGV9YCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShgY29sb3ItJHtwaWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIHRoaXMucGllY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaWVjZTtcbiAgICB9XG5cbiAgICBzZXRQaWVjZShwaWVjZTogUGllY2UpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQaWVjZSgpO1xuICAgICAgICB0aGlzLnBpZWNlID0gcGllY2U7XG4gICAgICAgIGlmICh0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShgdHlwZS0ke3RoaXMucGllY2UudHlwZX1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGBjb2xvci0ke3RoaXMucGllY2UuY29sb3J9YCk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShQSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBoYXNDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHNlbGVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlO1xuICAgIH1cblxuICAgIHVuc2VsZWN0KCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgfVxuXG4gICAgYXR0YWNrKGF0dGFja2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLnBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShBVFRBQ0tFRF9JRF9OQU1FKTtcbiAgICAgICAgICAgIGlmIChhdHRhY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKEFUVEFDS0VEX0lEX05BTUUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlO1xuICAgIH1cblxuICAgIGlzQXR0YWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShBVFRBQ0tFRF9JRF9OQU1FKTtcbiAgICB9XG5cbiAgICBnZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9ICcnO1xuICAgIH1cblxuICAgIHNldFByb3BlcnRpZXMocHJvcDogeyBjbGFzc05hbWU6IHN0cmluZzsgfSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSBwcm9wLmNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBzZXRPbkNsaWNrKGxpc3RlbmVyOiAodGhpczogR2xvYmFsRXZlbnRIYW5kbGVycywgZXY6IE1vdXNlRXZlbnQpID0+IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5vbmNsaWNrID0gbGlzdGVuZXI7XG4gICAgfVxuXG4gICAgcmVtb3ZlT25DbGljaygpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIub25jbGljayA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0RmxpcHBlZChpc1Vwc2lkZURvd246IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzc05hbWUoRkxJUFBFRF9DTEFTUyk7XG4gICAgICAgIHRoaXMuaXNVcHNpZGVEb3duID0gaXNVcHNpZGVEb3duO1xuICAgICAgICBpZiAoaXNVcHNpZGVEb3duKSB7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBTcXVhcmVPbkJvYXJkKHRoaXMueCwgdGhpcy55LCBkaXYsIHRoaXMucGllY2UpO1xuICAgIH1cbn0iXX0=