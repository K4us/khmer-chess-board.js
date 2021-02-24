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
      return new CellManager(new _khmerChess.Point(this.point.x, this.point.y), div, this.piece);
    }
  }]);

  return CellManager;
}();

exports["default"] = CellManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsTWFuYWdlci50cyJdLCJuYW1lcyI6WyJDZWxsTWFuYWdlciIsInBvaW50IiwiY29udGFpbmVyIiwicGllY2UiLCJpc0dyYXZleWFyZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldFBpZWNlIiwicmVtb3ZlQ2xhc3NOYW1lIiwiUElFQ0VfQ0xBU1NfTkFNRSIsInR5cGUiLCJjb2xvciIsInJlbW92ZVBpZWNlIiwiYWRkQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29udGFpbnMiLCJTRUxFQ1RFRF9DTEFTU19OQU1FIiwiaGFzQ2xhc3NOYW1lIiwiYXR0YWNrZWQiLCJBVFRBQ0tFRF9JRF9OQU1FIiwicHJvcCIsImxpc3RlbmVyIiwib25jbGljayIsImlzVXBzaWRlRG93biIsIkZMSVBQRURfQ0xBU1MiLCJkaXYiLCJQb2ludCIsIngiLCJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBMkJBOztBQUNBOzs7Ozs7Ozs7O0lBT3FCQSxXO0FBTWpCLHVCQUFZQyxLQUFaLEVBQTBCQyxTQUExQixFQUNJQyxLQURKLEVBQ3VDO0FBQUEsUUFBckJDLFdBQXFCLHVFQUFQLEtBQU87O0FBQUE7O0FBQUE7O0FBQUEseUNBTHpCLEtBS3lCOztBQUFBLHVDQUpYQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FJVzs7QUFBQSxtQ0FIeEIsSUFHd0I7O0FBQUEsMENBRnhCLEtBRXdCOztBQUNuQyxTQUFLTCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtLLFFBQUwsQ0FBY0osS0FBZDtBQUNBLFNBQUtDLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0g7Ozs7V0FFRCx1QkFBYztBQUNWLFVBQU1ELEtBQUssR0FBRyxLQUFLQSxLQUFuQjs7QUFDQSxVQUFJQSxLQUFKLEVBQVc7QUFDUCxhQUFLSyxlQUFMLENBQXFCQywyQkFBckI7QUFDQSxhQUFL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biAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgeyBQb2ludCwgUGllY2UsIFJPV19OVU1CRVIgfSBmcm9tICdraG1lci1jaGVzcyc7XG5pbXBvcnQge1xuICAgIFNFTEVDVEVEX0NMQVNTX05BTUUsXG4gICAgUElFQ0VfQ0xBU1NfTkFNRSxcbiAgICBBVFRBQ0tFRF9JRF9OQU1FLFxuICAgIEZMSVBQRURfQ0xBU1MsXG59IGZyb20gJy4vcHJvdmlkZXJzL2NvbnN0YW5jZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxNYW5hZ2VyIHtcbiAgICBwb2ludDogUG9pbnQ7XG4gICAgaXNHcmF2ZXlhcmQgPSBmYWxzZTtcbiAgICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBwaWVjZTogUGllY2UgPSBudWxsO1xuICAgIGlzVXBzaWRlRG93biA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludCwgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCxcbiAgICAgICAgcGllY2U6IFBpZWNlLCBpc0dyYXZleWFyZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucG9pbnQgPSBwb2ludDtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuc2V0UGllY2UocGllY2UpO1xuICAgICAgICB0aGlzLmlzR3JhdmV5YXJkID0gaXNHcmF2ZXlhcmQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGllY2UoKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy5waWVjZTtcbiAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShQSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGB0eXBlLSR7cGllY2UudHlwZX1gKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKGBjb2xvci0ke3BpZWNlLmNvbG9yfWApO1xuICAgICAgICAgICAgdGhpcy5waWVjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpZWNlO1xuICAgIH1cblxuICAgIHNldFBpZWNlKHBpZWNlOiBQaWVjZSkge1xuICAgICAgICB0aGlzLnJlbW92ZVBpZWNlKCk7XG4gICAgICAgIHRoaXMucGllY2UgPSBwaWVjZTtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKGB0eXBlLSR7dGhpcy5waWVjZS50eXBlfWApO1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoYGNvbG9yLSR7dGhpcy5waWVjZS5jb2xvcn1gKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKFBJRUNFX0NMQVNTX05BTUUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQ2xhc3NOYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzc05hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIGhhc0NsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5waWVjZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoU0VMRUNURURfQ0xBU1NfTkFNRSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgdW5zZWxlY3QoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKFNFTEVDVEVEX0NMQVNTX05BTUUpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0NsYXNzTmFtZShTRUxFQ1RFRF9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBhdHRhY2soYXR0YWNrZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucGllY2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3NOYW1lKEFUVEFDS0VEX0lEX05BTUUpO1xuICAgICAgICAgICAgaWYgKGF0dGFja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc05hbWUoQVRUQUNLRURfSURfTkFNRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGllY2U7XG4gICAgfVxuXG4gICAgaXNBdHRhY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3NOYW1lKEFUVEFDS0VEX0lEX05BTUUpO1xuICAgIH1cblxuICAgIGdldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gJyc7XG4gICAgfVxuXG4gICAgc2V0UHJvcGVydGllcyhwcm9wOiB7IGNsYXNzTmFtZTogc3RyaW5nOyB9KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9IHByb3AuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHNldE9uQ2xpY2sobGlzdGVuZXI6ICh0aGlzOiBHbG9iYWxFdmVudEhhbmRsZXJzLCBldjogTW91c2VFdmVudCkgPT4gYW55KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLm9uY2xpY2sgPSBsaXN0ZW5lcjtcbiAgICB9XG5cbiAgICByZW1vdmVPbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5vbmNsaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRGbGlwcGVkKGlzVXBzaWRlRG93bjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzTmFtZShGTElQUEVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pc1Vwc2lkZURvd24gPSBpc1Vwc2lkZURvd247XG4gICAgICAgIGlmIChpc1Vwc2lkZURvd24pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NOYW1lKEZMSVBQRURfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZXR1cm4gbmV3IENlbGxNYW5hZ2VyKG5ldyBQb2ludCh0aGlzLnBvaW50LngsIHRoaXMucG9pbnQueSlcbiAgICAgICAgICAgICwgZGl2LCB0aGlzLnBpZWNlKTtcbiAgICB9XG59Il19