"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appendCss = _interopRequireDefault(require("./helpers/appendCss"));

var _PlayManagerEventController = _interopRequireDefault(require("./event/PlayManagerEventController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MoveData = /*#__PURE__*/function () {
  function MoveData(_ref) {
    var _this = this;

    var containerDom = _ref.containerDom,
        renData = _ref.renData,
        title = _ref.title,
        str = _ref.str,
        onClick = _ref.onClick;

    _classCallCheck(this, MoveData);

    _defineProperty(this, "renData", void 0);

    _defineProperty(this, "dom", void 0);

    this.renData = renData;
    var span = document.createElement('span');
    span.title = title;
    span.innerText = str;
    containerDom.appendChild(span);
    this.dom = span;

    span.onclick = function () {
      if (!_this.isCurrent) {
        onClick();
      }
    };
  }

  _createClass(MoveData, [{
    key: "isCurrent",
    get: function get() {
      return this.dom.classList.contains('current');
    }
  }, {
    key: "current",
    value: function current(b) {
      this.dom.classList.remove('current');

      if (b) {
        this.dom.classList.add('current');
      }
    }
  }]);

  return MoveData;
}();

var PlayerManager = /*#__PURE__*/function () {
  function PlayerManager() {
    _classCallCheck(this, PlayerManager);

    _defineProperty(this, "khmerChessBoard", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "containerClassName", 'player-table');

    _defineProperty(this, "containerDom", void 0);

    _defineProperty(this, "renDataList", []);

    _defineProperty(this, "playEventController", void 0);

    _defineProperty(this, "backBtnDom", void 0);

    _defineProperty(this, "playBtnDom", void 0);

    _defineProperty(this, "pauseBtnDom", void 0);

    _defineProperty(this, "nextBtnDom", void 0);

    this.playEventController = new _PlayManagerEventController["default"]();
  }

  _createClass(PlayerManager, [{
    key: "setProps",
    value: function setProps(khmerChessBoard) {
      this.khmerChessBoard = khmerChessBoard;
      this.options = khmerChessBoard.options;
      (0, _appendCss["default"])(this.options.uniqueClassName, this.css());
    }
  }, {
    key: "add",
    value: function add(str, title) {
      var _this2 = this;

      var moveData = new MoveData({
        containerDom: this.containerDom,
        renData: '',
        title: title,
        str: str,
        onClick: function onClick() {
          _this2.playEventController.click(moveData);
        }
      });
      this.renDataList.push(moveData);
      this.rendCurrent();
    }
  }, {
    key: "rendCurrent",
    value: function rendCurrent() {
      this.renDataList.forEach(function (e) {
        return e.current(false);
      });

      if (this.renDataList.length) {
        var moveData = this.renDataList[this.renDataList.length - 1];
        moveData.current(true);
      }
    }
  }, {
    key: "draw",
    value: function draw(playerContainer) {
      var containerWidth = ~~(this.options.width * 3 / 4);
      var table = document.createElement('table');
      table.classList.add(this.options.uniqueClassName);
      table.classList.add(this.containerClassName);
      playerContainer.appendChild(table);
      var tbody = document.createElement('tbody');
      table.appendChild(tbody);
      var tr = document.createElement('tr');
      tbody.appendChild(tr);
      var tdHistory = document.createElement('td');
      var div = document.createElement('div');
      div.style.width = "".concat(containerWidth, "px");
      div.classList.add('container');
      this.containerDom = div;
      tdHistory.appendChild(div);
      tdHistory.style.width = "".concat(containerWidth, "px");
      tr.appendChild(tdHistory);
      tdHistory = document.createElement('td');
      var btn = document.createElement('button');
      btn.innerHTML = '<';
      this.backBtnDom = btn;
      tdHistory.appendChild(btn);
      tr.appendChild(tdHistory);
      tdHistory = document.createElement('td');
      btn = document.createElement('button');
      btn.innerHTML = '^';
      this.playBtnDom = btn;
      tdHistory.appendChild(btn);
      btn = document.createElement('button');
      btn.innerHTML = '#';
      this.pauseBtnDom = btn;
      tdHistory.appendChild(btn);
      btn.style.display = 'none';
      tr.appendChild(tdHistory);
      tdHistory = document.createElement('td');
      btn = document.createElement('button');
      btn.innerHTML = '>';
      this.nextBtnDom = btn;
      tdHistory.appendChild(btn);
      tr.appendChild(tdHistory);
      this.btnListen();
    }
  }, {
    key: "btnListen",
    value: function btnListen() {
      var _this3 = this;

      this.backBtnDom.onclick = function () {
        _this3.playEventController.back();
      };

      this.playBtnDom.onclick = function () {
        _this3.playEventController.play();
      };

      this.pauseBtnDom.onclick = function () {
        _this3.playEventController.pause();
      };

      this.nextBtnDom.onclick = function () {
        _this3.playEventController.next();
      };
    }
  }, {
    key: "css",
    value: function css() {
      var containerSelector = "table.".concat(this.options.uniqueClassName, ".").concat(this.containerClassName);
      return "\n        ".concat(containerSelector, " {\n            width: 100%;\n            height: 100%;\n            box-shadow: rgb(0, 0, 0) 0px 0px 2px inset;\n        }\n        ").concat(containerSelector, " td {\n            padding: 0px;\n            margin: 0px;\n            text-align: center;\n            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px inset;\n        }\n        ").concat(containerSelector, " .container {\n            font-size: 14px;\n            text-align: right;\n            overflow-x: auto;\n        }\n        ").concat(containerSelector, " .container::-webkit-scrollbar {\n            width: 1em;\n        }\n        ").concat(containerSelector, " .container span{\n            margin: 0 2px;\n            padding: 0 2px;\n            border: 1px solid rgba(0, 0, 0, 0.2);\n            border-radius: 2px;\n            cursor: pointer;\n        }\n        ").concat(containerSelector, " .container span.current{\n            background-color: rgba(255, 255, 255, 0.3);\n            cursor: auto;\n        }\n        ");
    }
  }]);

  return PlayerManager;
}();

exports["default"] = PlayerManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QbGF5ZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIk1vdmVEYXRhIiwiY29udGFpbmVyRG9tIiwicmVuRGF0YSIsInRpdGxlIiwic3RyIiwib25DbGljayIsInNwYW4iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJhcHBlbmRDaGlsZCIsImRvbSIsIm9uY2xpY2siLCJpc0N1cnJlbnQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImIiLCJyZW1vdmUiLCJhZGQiLCJQbGF5ZXJNYW5hZ2VyIiwicGxheUV2ZW50Q29udHJvbGxlciIsIlBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwib3B0aW9ucyIsInVuaXF1ZUNsYXNzTmFtZSIsImNzcyIsIm1vdmVEYXRhIiwiY2xpY2siLCJyZW5EYXRhTGlzdCIsInB1c2giLCJyZW5kQ3VycmVudCIsImZvckVhY2giLCJlIiwiY3VycmVudCIsImxlbmd0aCIsInBsYXllckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJ0YWJsZSIsImNvbnRhaW5lckNsYXNzTmFtZSIsInRib2R5IiwidHIiLCJ0ZEhpc3RvcnkiLCJkaXYiLCJzdHlsZSIsImJ0biIsImlubmVySFRNTCIsImJhY2tCdG5Eb20iLCJwbGF5QnRuRG9tIiwicGF1c2VCdG5Eb20iLCJkaXNwbGF5IiwibmV4dEJ0bkRvbSIsImJ0bkxpc3RlbiIsImJhY2siLCJwbGF5IiwicGF1c2UiLCJuZXh0IiwiY29udGFpbmVyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUE2QkE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxRO0FBR0YsMEJBTUc7QUFBQTs7QUFBQSxRQU5XQyxZQU1YLFFBTldBLFlBTVg7QUFBQSxRQU55QkMsT0FNekIsUUFOeUJBLE9BTXpCO0FBQUEsUUFOa0NDLEtBTWxDLFFBTmtDQSxLQU1sQztBQUFBLFFBTnlDQyxHQU16QyxRQU55Q0EsR0FNekM7QUFB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O0FBQUE7O0FBQ1IsV0FBS0wsVUFBTCxDQUFnQm5DLE9BQWhCLEdBQTBCLFlBQU07QUFDNUIsUUFBQSxNQUFJLENBQUNRLG1CQUFMLENBQXlCaUMsSUFBekI7QUFDSCxPQUZEOztBQUdBLFdBQUtMLFVBQUwsQ0FBZ0JwQyxPQUFoQixHQUEwQixZQUFNO0FBQzVCLFFBQUEsTUFBSSxDQUFDUSxtQkFBTCxDQUF5QmtDLElBQXpCO0FBQ0gsT0FGRDs7QUFHQSxXQUFLTCxXQUFMLENBQWlCckMsT0FBakIsR0FBMkIsWUFBTTtBQUM3QixRQUFBLE1BQUksQ0FBQ1EsbUJBQUwsQ0FBeUJtQyxLQUF6QjtBQUNILE9BRkQ7O0FBR0EsV0FBS0osVUFBTCxDQUFnQnZDLE9BQWhCLEdBQTBCLFlBQU07QUFDNUIsUUFBQSxNQUFJLENBQUNRLG1CQUFMLENBQXlCb0MsSUFBekI7QUFDSCxPQUZEO0FBR0g7OztXQUNELGVBQWM7QUFDVixVQUFNQyxpQkFBaUIsbUJBQVksS0FBS2xDLE9BQUwsQ0FBYUMsZUFBekIsY0FBNEMsS0FBS2Usa0JBQWpELENBQXZCO0FBQ0EsaUNBQ0VrQixpQkFERixrSkFNRUEsaUJBTkYsNExBWUVBLGlCQVpGLDRJQWlCRUEsaUJBakJGLDJGQW9CRUEsaUJBcEJGLDhOQTJCRUEsaUJBM0JGO0FBZ0NIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAyMSwgSzR1c1xuICogQXV0aG9yOiBSYWtzYSBFbmcgPGVuZy5yYWtzYUBnbWFpbC5jb20+XG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKlxuICogMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgJ0FTIElTJ1xuICogQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRVxuICogSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRVxuICogTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTU1xuICogSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU5cbiAqIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRVxuICogUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4gKlxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5pbXBvcnQgT3B0aW9uc01hbmFnZXIgZnJvbSAnLi9PcHRpb25zTWFuYWdlcic7XG5pbXBvcnQgS2htZXJDaGVzc0JvYXJkIGZyb20gJy4vS2htZXJDaGVzc0JvYXJkJztcbmltcG9ydCBhcHBlbmRDc3MgZnJvbSAnLi9oZWxwZXJzL2FwcGVuZENzcyc7XG5pbXBvcnQgUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIgZnJvbSAnLi9ldmVudC9QbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlcic7XG5cbmNsYXNzIE1vdmVEYXRhIHtcbiAgICByZW5EYXRhOiBzdHJpbmc7XG4gICAgZG9tOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3Rvcih7IGNvbnRhaW5lckRvbSwgcmVuRGF0YSwgdGl0bGUsIHN0ciwgb25DbGljayB9OiB7XG4gICAgICAgIGNvbnRhaW5lckRvbTogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJlbkRhdGE6IHN0cmluZyxcbiAgICAgICAgdGl0bGU6IHN0cmluZyxcbiAgICAgICAgc3RyOiBzdHJpbmcsXG4gICAgICAgIG9uQ2xpY2s6IEZ1bmN0aW9uLFxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5yZW5EYXRhID0gcmVuRGF0YTtcbiAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bhbi50aXRsZSA9IHRpdGxlO1xuICAgICAgICBzcGFuLmlubmVyVGV4dCA9IHN0cjtcbiAgICAgICAgY29udGFpbmVyRG9tLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB0aGlzLmRvbSA9IHNwYW47XG4gICAgICAgIHNwYW4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0N1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBpc0N1cnJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKTtcbiAgICB9XG4gICAgY3VycmVudChiOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQnKTtcbiAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyTWFuYWdlciB7XG4gICAga2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQ7XG4gICAgb3B0aW9uczogT3B0aW9uc01hbmFnZXI7XG4gICAgY29udGFpbmVyQ2xhc3NOYW1lID0gJ3BsYXllci10YWJsZSc7XG4gICAgY29udGFpbmVyRG9tOiBIVE1MRWxlbWVudDtcbiAgICByZW5EYXRhTGlzdDogTW92ZURhdGFbXSA9IFtdO1xuICAgIHBsYXlFdmVudENvbnRyb2xsZXI6IFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyPE1vdmVEYXRhPjtcbiAgICBiYWNrQnRuRG9tOiBIVE1MRWxlbWVudDtcbiAgICBwbGF5QnRuRG9tOiBIVE1MRWxlbWVudDtcbiAgICBwYXVzZUJ0bkRvbTogSFRNTEVsZW1lbnQ7XG4gICAgbmV4dEJ0bkRvbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGxheUV2ZW50Q29udHJvbGxlciA9IG5ldyBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICBzZXRQcm9wcyhraG1lckNoZXNzQm9hcmQ6IEtobWVyQ2hlc3NCb2FyZCkge1xuICAgICAgICB0aGlzLmtobWVyQ2hlc3NCb2FyZCA9IGtobWVyQ2hlc3NCb2FyZDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ga2htZXJDaGVzc0JvYXJkLm9wdGlvbnM7XG4gICAgICAgIGFwcGVuZENzcyh0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lLCB0aGlzLmNzcygpKTtcbiAgICB9XG4gICAgYWRkKHN0cjogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IG1vdmVEYXRhID0gbmV3IE1vdmVEYXRhKHtcbiAgICAgICAgICAgIGNvbnRhaW5lckRvbTogdGhpcy5jb250YWluZXJEb20sXG4gICAgICAgICAgICByZW5EYXRhOiAnJyxcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgc3RyLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUV2ZW50Q29udHJvbGxlci5jbGljayhtb3ZlRGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5EYXRhTGlzdC5wdXNoKG1vdmVEYXRhKTtcbiAgICAgICAgdGhpcy5yZW5kQ3VycmVudCgpO1xuICAgIH1cbiAgICByZW5kQ3VycmVudCgpIHtcbiAgICAgICAgdGhpcy5yZW5EYXRhTGlzdC5mb3JFYWNoKGUgPT4gZS5jdXJyZW50KGZhbHNlKSk7XG4gICAgICAgIGlmICh0aGlzLnJlbkRhdGFMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbW92ZURhdGEgPSB0aGlzLnJlbkRhdGFMaXN0W3RoaXMucmVuRGF0YUxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBtb3ZlRGF0YS5jdXJyZW50KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXcocGxheWVyQ29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IH5+KHRoaXMub3B0aW9ucy53aWR0aCAqIDMgLyA0KTtcbiAgICAgICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWUpO1xuICAgICAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKHRoaXMuY29udGFpbmVyQ2xhc3NOYW1lKTtcbiAgICAgICAgcGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgICAgICAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0Ym9keSk7XG4gICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICBsZXQgdGRIaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IGAke2NvbnRhaW5lcldpZHRofXB4YDtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckRvbSA9IGRpdjtcbiAgICAgICAgdGRIaXN0b3J5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIHRkSGlzdG9yeS5zdHlsZS53aWR0aCA9IGAke2NvbnRhaW5lcldpZHRofXB4YDtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRIaXN0b3J5KTtcbiAgICAgICAgdGRIaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidG4uaW5uZXJIVE1MID0gJzwnO1xuICAgICAgICB0aGlzLmJhY2tCdG5Eb20gPSBidG47XG4gICAgICAgIHRkSGlzdG9yeS5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZEhpc3RvcnkpO1xuICAgICAgICB0ZEhpc3RvcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnRuLmlubmVySFRNTCA9ICdeJztcbiAgICAgICAgdGhpcy5wbGF5QnRuRG9tID0gYnRuO1xuICAgICAgICB0ZEhpc3RvcnkuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnIyc7XG4gICAgICAgIHRoaXMucGF1c2VCdG5Eb20gPSBidG47XG4gICAgICAgIHRkSGlzdG9yeS5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRIaXN0b3J5KTtcbiAgICAgICAgdGRIaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPic7XG4gICAgICAgIHRoaXMubmV4dEJ0bkRvbSA9IGJ0bjtcbiAgICAgICAgdGRIaXN0b3J5LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkSGlzdG9yeSk7XG4gICAgICAgIHRoaXMuYnRuTGlzdGVuKCk7XG4gICAgfVxuICAgIGJ0bkxpc3RlbigpIHtcbiAgICAgICAgdGhpcy5iYWNrQnRuRG9tLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIuYmFjaygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBsYXlCdG5Eb20ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheUV2ZW50Q29udHJvbGxlci5wbGF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGF1c2VCdG5Eb20ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheUV2ZW50Q29udHJvbGxlci5wYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHRCdG5Eb20ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheUV2ZW50Q29udHJvbGxlci5uZXh0KCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGNzcygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBjb250YWluZXJTZWxlY3RvciA9IGB0YWJsZS4ke3RoaXMub3B0aW9ucy51bmlxdWVDbGFzc05hbWV9LiR7dGhpcy5jb250YWluZXJDbGFzc05hbWV9YDtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0ge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBib3gtc2hhZG93OiByZ2IoMCwgMCwgMCkgMHB4IDBweCAycHggaW5zZXQ7XG4gICAgICAgIH1cbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0gdGQge1xuICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMikgMHB4IDBweCAxcHggaW5zZXQ7XG4gICAgICAgIH1cbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0gLmNvbnRhaW5lciB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0gLmNvbnRhaW5lcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgICAgICAgICAgd2lkdGg6IDFlbTtcbiAgICAgICAgfVxuICAgICAgICAke2NvbnRhaW5lclNlbGVjdG9yfSAuY29udGFpbmVyIHNwYW57XG4gICAgICAgICAgICBtYXJnaW46IDAgMnB4O1xuICAgICAgICAgICAgcGFkZGluZzogMCAycHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0gLmNvbnRhaW5lciBzcGFuLmN1cnJlbnR7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gICAgICAgICAgICBjdXJzb3I6IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgYDtcbiAgICB9XG59XG4iXX0=