"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _audio = _interopRequireDefault(require("./audio"));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Tb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiU291bmRNYW5hZ2VyIiwiaXNFbmFibGUiLCJtb3ZlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiY2FwdHVyZSIsImNoZWNrIiwiY29uc29sZSIsImxvZyIsIl9hZGRTb3VuZCIsIkFVRElPIiwic3JjIiwic291bmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmbGFnIiwiTU9WRV9GTEFHIiwicGxheSIsIkNBUFRVUkVfRkxBRyIsIkNIRUNLX0ZMQUciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUEyQkE7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7OztrQ0FJUSxJOztxQ0FDRyxJOzttQ0FDRixJOztzQ0FDZixLOzs7OztXQUNYLG1CQUFVO0FBQ04sV0FBS0MsUUFBTCxHQUFnQixLQUFoQjs7QUFDQSxVQUFJLEtBQUtDLElBQVQsRUFBZTtBQUNYLGFBQUtBLElBQUwsQ0FBVUMsYUFBVixDQUF3QkMsV0FBeEIsQ0FBb0MsS0FBS0YsSUFBekM7QUFDQSxhQUFLQSxJQUFMLEdBQVksSUFBWjtBQUNIOztBQUNELFVBQUksS0FBS0csT0FBVCxFQUFrQjtBQUNkLGFBQUtBLE9BQUwsQ0FBYUYsYUFBYixDQUEyQkMsV0FBM0IsQ0FBdUMsS0FBS0MsT0FBNUM7QUFDQSxhQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUNIOztBQUNELFVBQUksS0FBS0MsS0FBVCxFQUFnQjtBQUNaLGFBQUtBLEtBQUwsQ0FBV0gsYUFBWCxDQUF5QkMsV0FBekIsQ0FBcUMsS0FBS0UsS0FBMUM7QUFDQSxhQUFLQSxLQUFMLEdBQWEsSUFBYjtBQUNIOztBQUNEQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWjtBQUNIOzs7V0FFRCxrQkFBUztBQUNMLFdBQUtQLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLQyxJQUFMLEdBQVksS0FBS08sU0FBTCxDQUFlQyxrQkFBTVIsSUFBckIsQ0FBWjtBQUNBLFdBQUtHLE9BQUwsR0FBZSxLQUFLSSxTQUFMLENBQWVDLGtCQUFNTCxPQUFyQixDQUFmO0FBQ0EsV0FBS0MsS0FBTCxHQUFhLEtBQUtHLFNBQUwsQ0FBZUMsa0JBQU1KLEtBQXJCLENBQWI7QUFDQUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDSDs7O1dBRUQsbUJBQVVHLEdBQVYsRUFBdUI7QUFDbkIsVUFBTUMsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDtBQUNBRixNQUFBQSxLQUFLLENBQUNELEdBQU4sR0FBWUEsR0FBWjtBQUNBQyxNQUFBQSxLQUFLLENBQUNHLFlBQU4sQ0FBbUIsU0FBbkIsRUFBOEIsTUFBOUI7QUFDQUgsTUFBQUEsS0FBSyxDQUFDRyxZQUFOLENBQW1CLFVBQW5CLEVBQStCLE1BQS9CO0FBQ0FILE1BQUFBLEtBQUssQ0FBQ0ksS0FBTixDQUFZQyxPQUFaLEdBQXNCLE1BQXRCO0FBQ0FKLE1BQUFBLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjQyxXQUFkLENBQTBCUCxLQUExQjtBQUNBLGFBQU9BLEtBQVA7QUFDSDs7O1dBRUQsY0FBS1EsSUFBTCxFQUFtQjtBQUNmLFVBQUksQ0FBQyxLQUFLbkIsUUFBVixFQUFvQjtBQUNoQk0sUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNIOztBQUNELGNBQVFZLElBQVI7QUFDSSxhQUFLcEIsWUFBWSxDQUFDcUIsU0FBbEI7QUFDSSxlQUFLbkIsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVW9CLElBQVYsRUFBYjtBQUNBOztBQUNKLGFBQUt0QixZQUFZLENBQUN1QixZQUFsQjtBQUNJLGVBQUtsQixPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYWlCLElBQWIsRUFBaEI7QUFDQTs7QUFDSixhQUFLdEIsWUFBWSxDQUFDd0IsVUFBbEI7QUFDSSxlQUFLbEIsS0FBTCxJQUFjLEtBQUtBLEtBQUwsQ0FBV2dCLElBQVgsRUFBZDtBQUNBOztBQUNKO0FBQ0lmLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBWFI7QUFhSDs7O1dBRUQsb0JBQVc7QUFDUCxXQUFLYyxJQUFMLENBQVV0QixZQUFZLENBQUNxQixTQUF2QjtBQUNIOzs7V0FFRCx1QkFBYztBQUNWLFdBQUtDLElBQUwsQ0FBVXRCLFlBQVksQ0FBQ3VCLFlBQXZCO0FBQ0g7OztXQUVELHFCQUFZO0FBQ1IsV0FBS0QsSUFBTCxDQUFVdEIsWUFBWSxDQUFDd0IsVUFBdkI7QUFDSDs7Ozs7Ozs7Z0JBekVnQnhCLFksZUFDRSxHOztnQkFERkEsWSxrQkFFSyxJOztnQkFGTEEsWSxnQkFHRyxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCBBVURJTyBmcm9tICcuL2F1ZGlvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmRNYW5hZ2VyIHtcbiAgICBzdGF0aWMgTU9WRV9GTEFHID0gJ20nO1xuICAgIHN0YXRpYyBDQVBUVVJFX0ZMQUcgPSAnY3QnO1xuICAgIHN0YXRpYyBDSEVDS19GTEFHID0gJ2MnO1xuICAgIG1vdmU6IEhUTUxBdWRpb0VsZW1lbnQgPSBudWxsO1xuICAgIGNhcHR1cmU6IEhUTUxBdWRpb0VsZW1lbnQgPSBudWxsO1xuICAgIGNoZWNrOiBIVE1MQXVkaW9FbGVtZW50ID0gbnVsbDtcbiAgICBpc0VuYWJsZSA9IGZhbHNlO1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuaXNFbmFibGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubW92ZSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5tb3ZlKTtcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2FwdHVyZSkge1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYXB0dXJlKTtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hlY2spIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2sucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZCBpcyBkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5pc0VuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubW92ZSA9IHRoaXMuX2FkZFNvdW5kKEFVRElPLm1vdmUpO1xuICAgICAgICB0aGlzLmNhcHR1cmUgPSB0aGlzLl9hZGRTb3VuZChBVURJTy5jYXB0dXJlKTtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRoaXMuX2FkZFNvdW5kKEFVRElPLmNoZWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kIGlzIGVuYWJsZWQnKTtcbiAgICB9XG5cbiAgICBfYWRkU291bmQoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuICAgICAgICBzb3VuZC5zcmMgPSBzcmM7XG4gICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZSgncHJlbG9hZCcsICdhdXRvJyk7XG4gICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnbm9uZScpO1xuICAgICAgICBzb3VuZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNvdW5kKTtcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgIH1cblxuICAgIHBsYXkoZmxhZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kIGlzIGRpc2FibGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGZsYWcpIHtcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLk1PVkVfRkxBRzpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUgJiYgdGhpcy5tb3ZlLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLkNBUFRVUkVfRkxBRzpcbiAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmUgJiYgdGhpcy5jYXB0dXJlLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLkNIRUNLX0ZMQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVjayAmJiB0aGlzLmNoZWNrLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgc291bmQgZmxhZycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheU1vdmUoKSB7XG4gICAgICAgIHRoaXMucGxheShTb3VuZE1hbmFnZXIuTU9WRV9GTEFHKTtcbiAgICB9XG5cbiAgICBwbGF5Q2FwdHVyZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5KFNvdW5kTWFuYWdlci5DQVBUVVJFX0ZMQUcpO1xuICAgIH1cblxuICAgIHBsYXlDaGVjaygpIHtcbiAgICAgICAgdGhpcy5wbGF5KFNvdW5kTWFuYWdlci5DSEVDS19GTEFHKTtcbiAgICB9XG59XG4iXX0=