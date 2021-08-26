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

exports["default"] = MessageManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlTWFuYWdlci50cyJdLCJuYW1lcyI6WyJNZXNzYWdlTWFuYWdlciIsImtobWVyQ2hlc3NCb2FyZCIsIm9wdGlvbnMiLCJ1bmlxdWVDbGFzc05hbWUiLCJjc3MiLCJtZXNzYWdlIiwiZG9tQ29udGFpbmVyIiwic3R5bGUiLCJkaXNwbGF5IiwiZG9tTWVzc2FnZSIsImlubmVySFRNTCIsImNvbnRhaW5lciIsImRvbUJvYXJkIiwiYmMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb250YWluZXJDbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImhlaWdodCIsInRyYW5zZm9ybSIsImRpdk1lc3NhZ2UiLCJtZXNzYWdlQ2xhc3NOYW1lIiwiaGlkZSIsImNvbnRhaW5lclNlbGVjdG9yIiwid2lkdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUE2QkE7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Z0RBR0ksbUI7OzhDQUNGLFM7Ozs7Ozs7OztXQUduQixrQkFBU0MsZUFBVCxFQUEyQztBQUN2QyxXQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLFdBQUtDLE9BQUwsR0FBZUQsZUFBZSxDQUFDQyxPQUEvQjtBQUNBLGlDQUFVLEtBQUtBLE9BQUwsQ0FBYUMsZUFBdkIsRUFBd0MsS0FBS0MsR0FBTCxFQUF4QztBQUNIOzs7V0FDRCxxQkFBWUMsT0FBWixFQUE2QjtBQUN6QixXQUFLQyxZQUFMLENBQWtCQyxLQUFsQixDQUF3QkMsT0FBeEIsR0FBa0MsT0FBbEM7QUFDQSxXQUFLQyxVQUFMLENBQWdCQyxTQUFoQixHQUE0QkwsT0FBNUI7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxXQUFLQyxZQUFMLENBQWtCQyxLQUFsQixDQUF3QkMsT0FBeEIsR0FBa0MsTUFBbEM7QUFDSDs7O1dBQ0QsZ0JBQU87QUFDSCxVQUFNRyxTQUFTLEdBQUcsS0FBS1YsZUFBTCxDQUFxQlcsUUFBdkM7QUFDQSxVQUFNQyxFQUFFLEdBQUcsS0FBS1osZUFBTCxDQUFxQlcsUUFBckIsQ0FBOEJFLHFCQUE5QixFQUFYO0FBQ0EsVUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFdBQUtYLFlBQUwsR0FBb0JTLEdBQXBCO0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ0csU0FBSixDQUFjQyxHQUFkLENBQWtCLEtBQUtqQixPQUFMLENBQWFDLGVBQS9CO0FBQ0FZLE1BQUFBLEdBQUcsQ0FBQ0csU0FBSixDQUFjQyxHQUFkLENBQWtCLEtBQUtDLGtCQUF2QjtBQUNBVCxNQUFBQSxTQUFTLENBQUNVLFdBQVYsQ0FBc0JOLEdBQXRCO0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ1IsS0FBSixDQUFVZSxNQUFWLGFBQXNCVCxFQUFFLENBQUNTLE1BQXpCO0FBQ0FQLE1BQUFBLEdBQUcsQ0FBQ1IsS0FBSixDQUFVZ0IsU0FBVix5QkFBcUNWLEVBQUUsQ0FBQ1MsTUFBeEM7QUFFQSxVQUFNRSxVQUFVLEdBQUdSLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLFdBQUtSLFVBQUwsR0FBa0JlLFVBQWxCO0FBQ0FBLE1BQUFBLFVBQVUsQ0FBQ04sU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsS0FBS00sZ0JBQTlCO0FBQ0FWLE1BQUFBLEdBQUcsQ0FBQ00sV0FBSixDQUFnQkcsVUFBaEI7QUFFQSxXQUFLRSxJQUFMO0FBQ0g7OztXQUNELGVBQWM7QUFDVixVQUFNQyxpQkFBaUIsY0FBTyxLQUFLekIsT0FBTCxDQUFhQyxlQUFwQixjQUF1QyxLQUFLaUIsa0JBQTVDLENBQXZCO0FBQ0EsaUNBQ0VPLGlCQURGLG9DQUVhLEtBQUt6QixPQUFMLENBQWEwQixLQUYxQix5VUFhRUQsaUJBYkYsZUFhd0IsS0FBS0YsZ0JBYjdCO0FBaUJIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5pbXBvcnQgS2htZXJDaGVzc0JvYXJkIGZyb20gJy4vS2htZXJDaGVzc0JvYXJkJztcbmltcG9ydCBhcHBlbmRDc3MgZnJvbSAnLi9oZWxwZXJzL2FwcGVuZENzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VNYW5hZ2VyIHtcbiAgICBraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZDtcbiAgICBvcHRpb25zOiBPcHRpb25zTWFuYWdlcjtcbiAgICBjb250YWluZXJDbGFzc05hbWUgPSAnbWVzc2FnZS1jb250YWluZXInO1xuICAgIG1lc3NhZ2VDbGFzc05hbWUgPSAnbWVzc2FnZSc7XG4gICAgZG9tQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgICBkb21NZXNzYWdlOiBIVE1MRGl2RWxlbWVudDtcbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ga2htZXJDaGVzc0JvYXJkLm9wdGlvbnM7XG4gICAgICAgIGFwcGVuZENzcyh0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lLCB0aGlzLmNzcygpKTtcbiAgICB9XG4gICAgc2hvd01lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZG9tQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLmRvbU1lc3NhZ2UuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5kb21Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5raG1lckNoZXNzQm9hcmQuZG9tQm9hcmQ7XG4gICAgICAgIGNvbnN0IGJjID0gdGhpcy5raG1lckNoZXNzQm9hcmQuZG9tQm9hcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRvbUNvbnRhaW5lciA9IGRpdjtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKHRoaXMuY29udGFpbmVyQ2xhc3NOYW1lKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBgJHtiYy5oZWlnaHR9cHhgO1xuICAgICAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7YmMuaGVpZ2h0fXB4KWA7XG5cbiAgICAgICAgY29uc3QgZGl2TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmRvbU1lc3NhZ2UgPSBkaXZNZXNzYWdlO1xuICAgICAgICBkaXZNZXNzYWdlLmNsYXNzTGlzdC5hZGQodGhpcy5tZXNzYWdlQ2xhc3NOYW1lKTtcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRpdk1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICBjc3MoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyU2VsZWN0b3IgPSBgLiR7dGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZX0uJHt0aGlzLmNvbnRhaW5lckNsYXNzTmFtZX1gO1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAke2NvbnRhaW5lclNlbGVjdG9yfSB7XG4gICAgICAgICAgICB3aWR0aDogJHt0aGlzLm9wdGlvbnMud2lkdGh9cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXI6IDBweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB9XG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IC4ke3RoaXMubWVzc2FnZUNsYXNzTmFtZX0ge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNTAlO1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxufVxuIl19