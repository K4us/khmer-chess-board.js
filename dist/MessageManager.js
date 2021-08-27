"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appendCss = _interopRequireDefault(require("./helpers/appendCss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageManager = /*#__PURE__*/function () {
  function MessageManager() {
    _classCallCheck(this, MessageManager);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "containerClassName", 'message-container');

    _defineProperty(this, "messageClassName", 'message');

    _defineProperty(this, "domContainer", void 0);

    _defineProperty(this, "domMessage", void 0);
  }

  _createClass(MessageManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.options = khmerChessBoard.options;
      (0, _appendCss["default"])(this.options.uniqueClassName, this.css());
    }
  }, {
    key: "showMessage",
    value: function showMessage(message) {
      this.domContainer.style.display = 'block';
      this.domMessage.innerHTML = message;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.domContainer.style.display = 'none';
    }
  }, {
    key: "draw",
    value: function draw() {
      var container = this.khmerChessBoard.domBoard;
      var bc = this.khmerChessBoard.domBoard.getBoundingClientRect();
      var div = document.createElement('div');
      this.domContainer = div;
      div.classList.add(this.options.uniqueClassName);
      div.classList.add(this.containerClassName);
      container.appendChild(div);
      div.style.height = "".concat(bc.height, "px");
      div.style.transform = "translateY(-".concat(bc.height, "px)");
      var divMessage = document.createElement('div');
      this.domMessage = divMessage;
      divMessage.classList.add(this.messageClassName);
      div.appendChild(divMessage);
      this.hide();
    }
  }, {
    key: "css",
    value: function css() {
      var containerSelector = ".".concat(this.options.uniqueClassName, ".").concat(this.containerClassName);
      return "\n        ".concat(containerSelector, " {\n            width: ").concat(this.options.width, "px;\n            text-align: center;\n            border: 0px;\n            padding: 10px;\n            box-sizing: border-box;\n            margin: auto;\n            position: absolute;\n            background-color: rgba(0, 0, 0, 0.8);\n            color: white;\n            font-size: 18px;\n        }\n        ").concat(containerSelector, " .").concat(this.messageClassName, " {\n            margin-top: 50%;\n        }\n        ");
    }
  }]);

  return MessageManager;
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


exports["default"] = MessageManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlTWFuYWdlci50cyJdLCJuYW1lcyI6WyJNZXNzYWdlTWFuYWdlciIsImtobWVyQ2hlc3NCb2FyZCIsIm9wdGlvbnMiLCJ1bmlxdWVDbGFzc05hbWUiLCJjc3MiLCJtZXNzYWdlIiwiZG9tQ29udGFpbmVyIiwic3R5bGUiLCJkaXNwbGF5IiwiZG9tTWVzc2FnZSIsImlubmVySFRNTCIsImNvbnRhaW5lciIsImRvbUJvYXJkIiwiYmMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb250YWluZXJDbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImhlaWdodCIsInRyYW5zZm9ybSIsImRpdk1lc3NhZ2UiLCJtZXNzYWdlQ2xhc3NOYW1lIiwiaGlkZSIsImNvbnRhaW5lclNlbGVjdG9yIiwid2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7OztnREFHSSxtQjs7OENBQ0YsUzs7Ozs7Ozs7O1dBR25CLGtCQUFTQyxlQUFULEVBQTJDO0FBQ3ZDLFdBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlRCxlQUFlLENBQUNDLE9BQS9CO0FBQ0EsaUNBQVUsS0FBS0EsT0FBTCxDQUFhQyxlQUF2QixFQUF3QyxLQUFLQyxHQUFMLEVBQXhDO0FBQ0g7OztXQUNELHFCQUFZQyxPQUFaLEVBQTZCO0FBQ3pCLFdBQUtDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQXdCQyxPQUF4QixHQUFrQyxPQUFsQztBQUNBLFdBQUtDLFVBQUwsQ0FBZ0JDLFNBQWhCLEdBQTRCTCxPQUE1QjtBQUNIOzs7V0FDRCxnQkFBTztBQUNILFdBQUtDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQXdCQyxPQUF4QixHQUFrQyxNQUFsQztBQUNIOzs7V0FDRCxnQkFBTztBQUNILFVBQU1HLFNBQVMsR0FBRyxLQUFLVixlQUFMLENBQXFCVyxRQUF2QztBQUNBLFVBQU1DLEVBQUUsR0FBRyxLQUFLWixlQUFMLENBQXFCVyxRQUFyQixDQUE4QkUscUJBQTlCLEVBQVg7QUFDQSxVQUFNQyxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsV0FBS1gsWUFBTCxHQUFvQlMsR0FBcEI7QUFDQUEsTUFBQUEsR0FBRyxDQUFDRyxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsS0FBS2pCLE9BQUwsQ0FBYUMsZUFBL0I7QUFDQVksTUFBQUEsR0FBRyxDQUFDRyxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsS0FBS0Msa0JBQXZCO0FBQ0FULE1BQUFBLFNBQVMsQ0FBQ1UsV0FBVixDQUFzQk4sR0FBdEI7QUFDQUEsTUFBQUEsR0FBRyxDQUFDUixLQUFKLENBQVVlLE1BQVYsYUFBc0JULEVBQUUsQ0FBQ1MsTUFBekI7QUFDQVAsTUFBQUEsR0FBRyxDQUFDUixLQUFKLENBQVVnQixTQUFWLHlCQUFxQ1YsRUFBRSxDQUFDUyxNQUF4QztBQUVBLFVBQU1FLFVBQVUsR0FBR1IsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQW5CO0FBQ0EsV0FBS1IsVUFBTCxHQUFrQmUsVUFBbEI7QUFDQUEsTUFBQUEsVUFBVSxDQUFDTixTQUFYLENBQXFCQyxHQUFyQixDQUF5QixLQUFLTSxnQkFBOUI7QUFDQVYsTUFBQUEsR0FBRyxDQUFDTSxXQUFKLENBQWdCRyxVQUFoQjtBQUVBLFdBQUtFLElBQUw7QUFDSDs7O1dBQ0QsZUFBYztBQUNWLFVBQU1DLGlCQUFpQixjQUFPLEtBQUt6QixPQUFMLENBQWFDLGVBQXBCLGNBQXVDLEtBQUtpQixrQkFBNUMsQ0FBdkI7QUFDQSxpQ0FDRU8saUJBREYsb0NBRWEsS0FBS3pCLE9BQUwsQ0FBYTBCLEtBRjFCLHlVQWFFRCxpQkFiRixlQWF3QixLQUFLRixnQkFiN0I7QUFpQkg7Ozs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9wdGlvbnNNYW5hZ2VyIGZyb20gJy4vT3B0aW9uc01hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgYXBwZW5kQ3NzIGZyb20gJy4vaGVscGVycy9hcHBlbmRDc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlTWFuYWdlciB7XG4gICAga2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQ7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAgY29udGFpbmVyQ2xhc3NOYW1lID0gJ21lc3NhZ2UtY29udGFpbmVyJztcbiAgICBtZXNzYWdlQ2xhc3NOYW1lID0gJ21lc3NhZ2UnO1xuICAgIGRvbUNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG4gICAgZG9tTWVzc2FnZTogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgICAgICBhcHBlbmRDc3ModGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSwgdGhpcy5jc3MoKSk7XG4gICAgfVxuICAgIHNob3dNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRvbUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5kb21NZXNzYWdlLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZG9tQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMua2htZXJDaGVzc0JvYXJkLmRvbUJvYXJkO1xuICAgICAgICBjb25zdCBiYyA9IHRoaXMua2htZXJDaGVzc0JvYXJkLmRvbUJvYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5kb21Db250YWluZXIgPSBkaXY7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWUpO1xuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnRhaW5lckNsYXNzTmFtZSk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gYCR7YmMuaGVpZ2h0fXB4YDtcbiAgICAgICAgZGl2LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke2JjLmhlaWdodH1weClgO1xuXG4gICAgICAgIGNvbnN0IGRpdk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5kb21NZXNzYWdlID0gZGl2TWVzc2FnZTtcbiAgICAgICAgZGl2TWVzc2FnZS5jbGFzc0xpc3QuYWRkKHRoaXMubWVzc2FnZUNsYXNzTmFtZSk7XG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXZNZXNzYWdlKTtcblxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gICAgY3NzKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclNlbGVjdG9yID0gYC4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9LiR7dGhpcy5jb250YWluZXJDbGFzc05hbWV9YDtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0ge1xuICAgICAgICAgICAgd2lkdGg6ICR7dGhpcy5vcHRpb25zLndpZHRofXB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgYm9yZGVyOiAwcHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgfVxuICAgICAgICAke2NvbnRhaW5lclNlbGVjdG9yfSAuJHt0aGlzLm1lc3NhZ2VDbGFzc05hbWV9IHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDUwJTtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cbn1cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICoqLyJdfQ==