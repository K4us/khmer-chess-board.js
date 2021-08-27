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


exports["default"] = SoundManager;

_defineProperty(SoundManager, "MOVE_FLAG", 'm');

_defineProperty(SoundManager, "CAPTURE_FLAG", 'ct');

_defineProperty(SoundManager, "CHECK_FLAG", 'c');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Tb3VuZE1hbmFnZXIudHMiXSwibmFtZXMiOlsiU291bmRNYW5hZ2VyIiwiaXNFbmFibGUiLCJtb3ZlIiwicGFyZW50RWxlbWVudCIsInJlbW92ZUNoaWxkIiwiY2FwdHVyZSIsImNoZWNrIiwiY29uc29sZSIsImxvZyIsIl9hZGRTb3VuZCIsIkFVRElPIiwic3JjIiwic291bmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmbGFnIiwiTU9WRV9GTEFHIiwicGxheSIsIkNBUFRVUkVfRkxBRyIsIkNIRUNLX0ZMQUciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7O2tDQUlRLEk7O3FDQUNHLEk7O21DQUNGLEk7O3NDQUNmLEs7Ozs7O1dBQ1gsbUJBQVU7QUFDTixXQUFLQyxRQUFMLEdBQWdCLEtBQWhCOztBQUNBLFVBQUksS0FBS0MsSUFBVCxFQUFlO0FBQ1gsYUFBS0EsSUFBTCxDQUFVQyxhQUFWLENBQXdCQyxXQUF4QixDQUFvQyxLQUFLRixJQUF6QztBQUNBLGFBQUtBLElBQUwsR0FBWSxJQUFaO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLRyxPQUFULEVBQWtCO0FBQ2QsYUFBS0EsT0FBTCxDQUFhRixhQUFiLENBQTJCQyxXQUEzQixDQUF1QyxLQUFLQyxPQUE1QztBQUNBLGFBQUtBLE9BQUwsR0FBZSxJQUFmO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLQyxLQUFULEVBQWdCO0FBQ1osYUFBS0EsS0FBTCxDQUFXSCxhQUFYLENBQXlCQyxXQUF6QixDQUFxQyxLQUFLRSxLQUExQztBQUNBLGFBQUtBLEtBQUwsR0FBYSxJQUFiO0FBQ0g7O0FBQ0RDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaO0FBQ0g7OztXQUVELGtCQUFTO0FBQ0wsV0FBS1AsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUtDLElBQUwsR0FBWSxLQUFLTyxTQUFMLENBQWVDLGtCQUFNUixJQUFyQixDQUFaO0FBQ0EsV0FBS0csT0FBTCxHQUFlLEtBQUtJLFNBQUwsQ0FBZUMsa0JBQU1MLE9BQXJCLENBQWY7QUFDQSxXQUFLQyxLQUFMLEdBQWEsS0FBS0csU0FBTCxDQUFlQyxrQkFBTUosS0FBckIsQ0FBYjtBQUNBQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNIOzs7V0FFRCxtQkFBVUcsR0FBVixFQUF1QjtBQUNuQixVQUFNQyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFkO0FBQ0FGLE1BQUFBLEtBQUssQ0FBQ0QsR0FBTixHQUFZQSxHQUFaO0FBQ0FDLE1BQUFBLEtBQUssQ0FBQ0csWUFBTixDQUFtQixTQUFuQixFQUE4QixNQUE5QjtBQUNBSCxNQUFBQSxLQUFLLENBQUNHLFlBQU4sQ0FBbUIsVUFBbkIsRUFBK0IsTUFBL0I7QUFDQUgsTUFBQUEsS0FBSyxDQUFDSSxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7QUFDQUosTUFBQUEsUUFBUSxDQUFDSyxJQUFULENBQWNDLFdBQWQsQ0FBMEJQLEtBQTFCO0FBQ0EsYUFBT0EsS0FBUDtBQUNIOzs7V0FFRCxjQUFLUSxJQUFMLEVBQW1CO0FBQ2YsVUFBSSxDQUFDLEtBQUtuQixRQUFWLEVBQW9CO0FBQ2hCTSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBO0FBQ0g7O0FBQ0QsY0FBUVksSUFBUjtBQUNJLGFBQUtwQixZQUFZLENBQUNxQixTQUFsQjtBQUNJLGVBQUtuQixJQUFMLElBQWEsS0FBS0EsSUFBTCxDQUFVb0IsSUFBVixFQUFiO0FBQ0E7O0FBQ0osYUFBS3RCLFlBQVksQ0FBQ3VCLFlBQWxCO0FBQ0ksZUFBS2xCLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFhaUIsSUFBYixFQUFoQjtBQUNBOztBQUNKLGFBQUt0QixZQUFZLENBQUN3QixVQUFsQjtBQUNJLGVBQUtsQixLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXZ0IsSUFBWCxFQUFkO0FBQ0E7O0FBQ0o7QUFDSWYsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVo7QUFYUjtBQWFIOzs7V0FFRCxvQkFBVztBQUNQLFdBQUtjLElBQUwsQ0FBVXRCLFlBQVksQ0FBQ3FCLFNBQXZCO0FBQ0g7OztXQUVELHVCQUFjO0FBQ1YsV0FBS0MsSUFBTCxDQUFVdEIsWUFBWSxDQUFDdUIsWUFBdkI7QUFDSDs7O1dBRUQscUJBQVk7QUFDUixXQUFLRCxJQUFMLENBQVV0QixZQUFZLENBQUN3QixVQUF2QjtBQUNIOzs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Z0JBdEdxQnhCLFksZUFDRSxHOztnQkFERkEsWSxrQkFFSyxJOztnQkFGTEEsWSxnQkFHRyxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFVRElPIGZyb20gJy4vcHJvdmlkZXJzL2F1ZGlvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmRNYW5hZ2VyIHtcbiAgICBzdGF0aWMgTU9WRV9GTEFHID0gJ20nO1xuICAgIHN0YXRpYyBDQVBUVVJFX0ZMQUcgPSAnY3QnO1xuICAgIHN0YXRpYyBDSEVDS19GTEFHID0gJ2MnO1xuICAgIG1vdmU6IEhUTUxBdWRpb0VsZW1lbnQgPSBudWxsO1xuICAgIGNhcHR1cmU6IEhUTUxBdWRpb0VsZW1lbnQgPSBudWxsO1xuICAgIGNoZWNrOiBIVE1MQXVkaW9FbGVtZW50ID0gbnVsbDtcbiAgICBpc0VuYWJsZSA9IGZhbHNlO1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuaXNFbmFibGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubW92ZSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5tb3ZlKTtcbiAgICAgICAgICAgIHRoaXMubW92ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2FwdHVyZSkge1xuICAgICAgICAgICAgdGhpcy5jYXB0dXJlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jYXB0dXJlKTtcbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hlY2spIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2sucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNoZWNrKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZCBpcyBkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5pc0VuYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubW92ZSA9IHRoaXMuX2FkZFNvdW5kKEFVRElPLm1vdmUpO1xuICAgICAgICB0aGlzLmNhcHR1cmUgPSB0aGlzLl9hZGRTb3VuZChBVURJTy5jYXB0dXJlKTtcbiAgICAgICAgdGhpcy5jaGVjayA9IHRoaXMuX2FkZFNvdW5kKEFVRElPLmNoZWNrKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kIGlzIGVuYWJsZWQnKTtcbiAgICB9XG5cbiAgICBfYWRkU291bmQoc3JjOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuICAgICAgICBzb3VuZC5zcmMgPSBzcmM7XG4gICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZSgncHJlbG9hZCcsICdhdXRvJyk7XG4gICAgICAgIHNvdW5kLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnbm9uZScpO1xuICAgICAgICBzb3VuZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNvdW5kKTtcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xuICAgIH1cblxuICAgIHBsYXkoZmxhZzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0VuYWJsZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kIGlzIGRpc2FibGUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGZsYWcpIHtcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLk1PVkVfRkxBRzpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUgJiYgdGhpcy5tb3ZlLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLkNBUFRVUkVfRkxBRzpcbiAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmUgJiYgdGhpcy5jYXB0dXJlLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU291bmRNYW5hZ2VyLkNIRUNLX0ZMQUc6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVjayAmJiB0aGlzLmNoZWNrLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgc291bmQgZmxhZycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheU1vdmUoKSB7XG4gICAgICAgIHRoaXMucGxheShTb3VuZE1hbmFnZXIuTU9WRV9GTEFHKTtcbiAgICB9XG5cbiAgICBwbGF5Q2FwdHVyZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5KFNvdW5kTWFuYWdlci5DQVBUVVJFX0ZMQUcpO1xuICAgIH1cblxuICAgIHBsYXlDaGVjaygpIHtcbiAgICAgICAgdGhpcy5wbGF5KFNvdW5kTWFuYWdlci5DSEVDS19GTEFHKTtcbiAgICB9XG59XG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqKi8iXX0=