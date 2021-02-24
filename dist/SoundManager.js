"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _audio = _interopRequireDefault(require("./providers/audio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SoundManager = /*#__PURE__*/function () {
  function SoundManager() {
    _classCallCheck(this, SoundManager);

    _defineProperty(this, "move", null);

    _defineProperty(this, "capture", null);

    _defineProperty(this, "check", null);

    _defineProperty(this, "isEnable", false);
  }

  _createClass(SoundManager, [{
    key: "disable",
    value: function disable() {
      this.isEnable = false;

      if (this.move) {
        this.move.parentElement.removeChild(this.move);
        this.move = null;
      }

      if (this.capture) {
        this.capture.parentElement.removeChild(this.capture);
        this.capture = null;
      }

      if (this.check) {
        this.check.parentElement.removeChild(this.check);
        this.check = null;
      }

      console.log('Sound is disabled');
    }
  }, {
    key: "enable",
    value: function enable() {
      this.isEnable = true;
      this.move = this._addSound(_audio["default"].move);
      this.capture = this._addSound(_audio["default"].capture);
      this.check = this._addSound(_audio["default"].check);
      console.log('Sound is enabled');
    }
  }, {
    key: "_addSound",
    value: function _addSound(src) {
      var sound = document.createElement('audio');
      sound.src = src;
      sound.setAttribute('preload', 'auto');
      sound.setAttribute('controls', 'none');
      sound.style.display = 'none';
      document.body.appendChild(sound);
      return sound;
    }
  }, {
    key: "play",
    value: function play(flag) {
      if (!this.isEnable) {
        console.log('Sound is disable');
        return;
      }

      switch (flag) {
        case SoundManager.MOVE_FLAG:
          this.move && this.move.play();
          break;

        case SoundManager.CAPTURE_FLAG:
          this.capture && this.capture.play();
          break;

        case SoundManager.CHECK_FLAG:
          this.check && this.check.play();
          break;

        default:
          console.log('Invalid sound flag');
      }
    }
  }, {
    key: "playMove",
    value: function playMove() {
      this.play(SoundManager.MOVE_FLAG);
    }
  }, {
    key: "playCapture",
    value: function playCapture() {
      this.play(SoundManager.CAPTURE_FLAG);
    }
  }, {
    key: "playCheck",
    value: function playCheck() {
      this.play(SoundManager.CHECK_FLAG);
    }
  }]);

  return SoundManager;
}();

exports["default"] = SoundManager;

_defineProperty(SoundManager, "MOVE_FLAG", 'm');

_defineProperty(SoundManager, "CAPTURE_FLAG", 'ct');

_defineProperty(SoundManager, "CHECK_FLAG", 'c');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Tb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiU291bmRNYW5hZ2VyIiwiaXNFbmFibGUiLCJtb3ZlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiY2FwdHVyZSIsImNoZWNrIiwiY29uc29sZSIsImxvZyIsIl9hZGRTb3VuZCIsIkFVRElPIiwic3JjIiwic291bmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmbGFnIiwiTU9WRV9GTEFHIiwicGxheSIsIkNBUFRVUkVfRkxBRyIsIkNIRUNLX0ZMQUciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUEyQkE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7OztrQ0FJUSxJOztxQ0FDRyxJOzttQ0FDRixJOztzQ0FDZixLOzs7OztXQUNYLG1CQUFVO0FBQ04sV0FBS0MsUUFBTCxHQUFnQixLQUFoQjs7QUFDQSxVQUFJLEtBQUtDLElBQVQsRUFBZTtBQUNYLGFBQUtBLElBQUwsQ0FBVUMsYUFBVixDQUF3QkMsV0FBeEIsQ0FBb0MsS0FBS0YsSUFBekM7QUFDQSxhQUFLQSxJQUFMLEdBQVksSUFBWjtBQUNIOztBQUNELFVBQUksS0FBS0csT0FBVCxFQUFrQjtBQUNkLGFBQUtBLE9BQUwsQ0FBYUYsYUFBYixDQUEyQkMsV0FBM0IsQ0FBdUMsS0FBS0MsT0FBNUM7QUFDQSxhQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUNIOztBQUNELFVBQUksS0FBS0MsS0FBVCxFQUFnQjtBQUNaLGFBQUtBLEtBQUwsQ0FBV0gsYUFBWCxDQUF5QkMsV0FBekIsQ0FBcUMsS0FBS0UsS0FBMUM7QUFDQSxhQUFLQSxLQUFMLEdBQWEsSUFBYjtBQUNIOztBQUNEQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNIOzs7V0FFRCxrQkFBUztBQUNMLFdBQUtQLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLQyxJQUFMLEdBQVksS0FBS08sU0FBTCxDQUFlQyxrQkFBTVIsSUFBckIsQ0FBWjtBQUNBLFdBQUtHLE9BQUwsR0FBZSxLQUFLSSxTQUFMLENBQWVDLGtCQUFNTCxPQUFyQixDQUFmO0FBQ0EsV0FBS0MsS0FBTCxHQUFhLEtBQUtHLFNBQUwsQ0FBZUMsa0JBQU1KLEtBQXJCLENBQWI7QUFDQUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDSDs7O1dBRUQsbUJBQVVHLEdBQVYsRUFBdUI7QUFDbkIsVUFBTUMsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDtBQUNBRixNQUFBQSxLQUFLLENBQUNELEdBQU4sR0FBWUEsR0FBWjtBQUNBQyxNQUFBQSxLQUFLLENBQUNHLFlBQU4sQ0FBbUIsU0FBbkIsRUFBOEIsTUFBOUI7QUFDQUgsTUFBQUEsS0FBSyxDQUFDRyxZQUFOLENBQW1CLFVBQW5CLEVBQStCLE1BQS9CO0FBQ0FILE1BQUFBLEtBQUssQ0FBQ0ksS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0FKLE1BQUFBLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjQyxXQUFkLENBQTBCUCxLQUExQjtBQUNBLGFBQU9BLEtBQVA7QUFDSDs7O1dBRUQsY0FBS1EsSUFBTCxFQUFtQjtBQUNmLFVBQUksQ0FBQyxLQUFLbkIsUUFBVixFQUFvQjtBQUNoQk0sUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNIOztBQUNELGNBQVFZLElBQVI7QUFDSSxhQUFLcEIsWUFBWSxDQUFDcUIsU0FBbEI7QUFDSSxlQUFLbkIsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVW9CLElBQVYsRUFBYjtBQUNBOztBQUNKLGFBQUt0QixZQUFZLENBQUN1QixZQUFsQjtBQUNJLGVBQUtsQixPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYWlCLElBQWIsRUFBaEI7QUFDQTs7QUFDSixhQUFLdEIsWUFBWSxDQUFDd0IsVUFBbEI7QUFDSSxlQUFLbEIsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV2dCLElBQVgsRUFBZDtBQUNBOztBQUNKO0FBQ0lmLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBWFI7QUFhSDs7O1dBRUQsb0JBQVc7QUFDUCxXQUFLYyxJQUFMLENBQVV0QixZQUFZLENBQUNxQixTQUF2QjtBQUNIOzs7V0FFRCx1QkFBYztBQUNWLFdBQUtDLElBQUwsQ0FBVXRCLFlBQVksQ0FBQ3VCLFlBQXZCO0FBQ0g7OztXQUVELHFCQUFZO0FBQ1IsV0FBS0QsSUFBTCxDQUFVdEIsWUFBWSxDQUFDd0IsVUFBdkI7QUFDSDs7Ozs7Ozs7Z0JBekVnQnhCLFksZUFDRSxHOztnQkFERkEsWSxrQkFFSyxJOztnQkFGTEEsWSxnQkFHRyxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCBBVURJTyBmcm9tICcuL3Byb3ZpZGVycy9hdWRpbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdW5kTWFuYWdlciB7XG4gICAgc3RhdGljIE1PVkVfRkxBRyA9ICdtJztcbiAgICBzdGF0aWMgQ0FQVFVSRV9GTEFHID0gJ2N0JztcbiAgICBzdGF0aWMgQ0hFQ0tfRkxBRyA9ICdjJztcbiAgICBtb3ZlOiBIVE1MQXVkaW9FbGVtZW50ID0gbnVsbDtcbiAgICBjYXB0dXJlOiBIVE1MQXVkaW9FbGVtZW50ID0gbnVsbDtcbiAgICBjaGVjazogSFRNTEF1ZGlvRWxlbWVudCA9IG51bGw7XG4gICAgaXNFbmFibGUgPSBmYWxzZTtcbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmlzRW5hYmxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm1vdmUpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMubW92ZSk7XG4gICAgICAgICAgICB0aGlzLm1vdmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhcHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY2FwdHVyZSk7XG4gICAgICAgICAgICB0aGlzLmNhcHR1cmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNoZWNrKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jaGVjayk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnU291bmQgaXMgZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuaXNFbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1vdmUgPSB0aGlzLl9hZGRTb3VuZChBVURJTy5tb3ZlKTtcbiAgICAgICAgdGhpcy5jYXB0dXJlID0gdGhpcy5fYWRkU291bmQoQVVESU8uY2FwdHVyZSk7XG4gICAgICAgIHRoaXMuY2hlY2sgPSB0aGlzLl9hZGRTb3VuZChBVURJTy5jaGVjayk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZCBpcyBlbmFibGVkJyk7XG4gICAgfVxuXG4gICAgX2FkZFNvdW5kKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbiAgICAgICAgc291bmQuc3JjID0gc3JjO1xuICAgICAgICBzb3VuZC5zZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnLCAnYXV0bycpO1xuICAgICAgICBzb3VuZC5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJ25vbmUnKTtcbiAgICAgICAgc291bmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzb3VuZCk7XG4gICAgICAgIHJldHVybiBzb3VuZDtcbiAgICB9XG5cbiAgICBwbGF5KGZsYWc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZCBpcyBkaXNhYmxlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChmbGFnKSB7XG4gICAgICAgICAgICBjYXNlIFNvdW5kTWFuYWdlci5NT1ZFX0ZMQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlICYmIHRoaXMubW92ZS5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvdW5kTWFuYWdlci5DQVBUVVJFX0ZMQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlICYmIHRoaXMuY2FwdHVyZS5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNvdW5kTWFuYWdlci5DSEVDS19GTEFHOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2sgJiYgdGhpcy5jaGVjay5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbnZhbGlkIHNvdW5kIGZsYWcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBsYXlNb3ZlKCkge1xuICAgICAgICB0aGlzLnBsYXkoU291bmRNYW5hZ2VyLk1PVkVfRkxBRyk7XG4gICAgfVxuXG4gICAgcGxheUNhcHR1cmUoKSB7XG4gICAgICAgIHRoaXMucGxheShTb3VuZE1hbmFnZXIuQ0FQVFVSRV9GTEFHKTtcbiAgICB9XG5cbiAgICBwbGF5Q2hlY2soKSB7XG4gICAgICAgIHRoaXMucGxheShTb3VuZE1hbmFnZXIuQ0hFQ0tfRkxBRyk7XG4gICAgfVxufVxuIl19