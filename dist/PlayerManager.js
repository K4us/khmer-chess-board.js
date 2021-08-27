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


exports["default"] = PlayerManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9QbGF5ZXJNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIk1vdmVEYXRhIiwiY29udGFpbmVyRG9tIiwicmVuRGF0YSIsInRpdGxlIiwic3RyIiwib25DbGljayIsInNwYW4iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJhcHBlbmRDaGlsZCIsImRvbSIsIm9uY2xpY2siLCJpc0N1cnJlbnQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImIiLCJyZW1vdmUiLCJhZGQiLCJQbGF5ZXJNYW5hZ2VyIiwicGxheUV2ZW50Q29udHJvbGxlciIsIlBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyIiwia2htZXJDaGVzc0JvYXJkIiwib3B0aW9ucyIsInVuaXF1ZUNsYXNzTmFtZSIsImNzcyIsIm1vdmVEYXRhIiwiY2xpY2siLCJyZW5EYXRhTGlzdCIsInB1c2giLCJyZW5kQ3VycmVudCIsImZvckVhY2giLCJlIiwiY3VycmVudCIsImxlbmd0aCIsInBsYXllckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwid2lkdGgiLCJ0YWJsZSIsImNvbnRhaW5lckNsYXNzTmFtZSIsInRib2R5IiwidHIiLCJ0ZEhpc3RvcnkiLCJkaXYiLCJzdHlsZSIsImJ0biIsImlubmVySFRNTCIsImJhY2tCdG5Eb20iLCJwbGF5QnRuRG9tIiwicGF1c2VCdG5Eb20iLCJkaXNwbGF5IiwibmV4dEJ0bkRvbSIsImJ0bkxpc3RlbiIsImJhY2siLCJwbGF5IiwicGF1c2UiLCJuZXh0IiwiY29udGFpbmVyU2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFE7QUFHRiwwQkFNRztBQUFBOztBQUFBLFFBTldDLFlBTVgsUUFOV0EsWUFNWDtBQUFBLFFBTnlCQyxPQU16QixRQU55QkEsT0FNekI7QUFBQSxRQU5rQ0MsS0FNbEMsUUFOa0NBLEtBTWxDO0FBQUEsUUFOeUNDLEdBTXpDLFFBTnlDQSxHQU16QztBQUFB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QUFBQTs7QUFDUixXQUFLTCxVQUFMLENBQWdCbkMsT0FBaEIsR0FBMEIsWUFBTTtBQUM1QixRQUFBLE1BQUksQ0FBQ1EsbUJBQUwsQ0FBeUJpQyxJQUF6QjtBQUNILE9BRkQ7O0FBR0EsV0FBS0wsVUFBTCxDQUFnQnBDLE9BQWhCLEdBQTBCLFlBQU07QUFDNUIsUUFBQSxNQUFJLENBQUNRLG1CQUFMLENBQXlCa0MsSUFBekI7QUFDSCxPQUZEOztBQUdBLFdBQUtMLFdBQUwsQ0FBaUJyQyxPQUFqQixHQUEyQixZQUFNO0FBQzdCLFFBQUEsTUFBSSxDQUFDUSxtQkFBTCxDQUF5Qm1DLEtBQXpCO0FBQ0gsT0FGRDs7QUFHQSxXQUFLSixVQUFMLENBQWdCdkMsT0FBaEIsR0FBMEIsWUFBTTtBQUM1QixRQUFBLE1BQUksQ0FBQ1EsbUJBQUwsQ0FBeUJvQyxJQUF6QjtBQUNILE9BRkQ7QUFHSDs7O1dBQ0QsZUFBYztBQUNWLFVBQU1DLGlCQUFpQixtQkFBWSxLQUFLbEMsT0FBTCxDQUFhQyxlQUF6QixjQUE0QyxLQUFLZSxrQkFBakQsQ0FBdkI7QUFDQSxpQ0FDRWtCLGlCQURGLGtKQU1FQSxpQkFORiw0TEFZRUEsaUJBWkYsNElBaUJFQSxpQkFqQkYsMkZBb0JFQSxpQkFwQkYsOE5BMkJFQSxpQkEzQkY7QUFnQ0g7Ozs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9wdGlvbnNNYW5hZ2VyIGZyb20gJy4vT3B0aW9uc01hbmFnZXInO1xuaW1wb3J0IEtobWVyQ2hlc3NCb2FyZCBmcm9tICcuL0tobWVyQ2hlc3NCb2FyZCc7XG5pbXBvcnQgYXBwZW5kQ3NzIGZyb20gJy4vaGVscGVycy9hcHBlbmRDc3MnO1xuaW1wb3J0IFBsYXlNYW5hZ2VyRXZlbnRDb250cm9sbGVyIGZyb20gJy4vZXZlbnQvUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXInO1xuXG5jbGFzcyBNb3ZlRGF0YSB7XG4gICAgcmVuRGF0YTogc3RyaW5nO1xuICAgIGRvbTogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoeyBjb250YWluZXJEb20sIHJlbkRhdGEsIHRpdGxlLCBzdHIsIG9uQ2xpY2sgfToge1xuICAgICAgICBjb250YWluZXJEb206IEhUTUxFbGVtZW50LFxuICAgICAgICByZW5EYXRhOiBzdHJpbmcsXG4gICAgICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgICAgIHN0cjogc3RyaW5nLFxuICAgICAgICBvbkNsaWNrOiBGdW5jdGlvbixcbiAgICB9KSB7XG4gICAgICAgIHRoaXMucmVuRGF0YSA9IHJlbkRhdGE7XG4gICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4udGl0bGUgPSB0aXRsZTtcbiAgICAgICAgc3Bhbi5pbm5lclRleHQgPSBzdHI7XG4gICAgICAgIGNvbnRhaW5lckRvbS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgdGhpcy5kb20gPSBzcGFuO1xuICAgICAgICBzcGFuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgb25DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgaXNDdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb20uY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50Jyk7XG4gICAgfVxuICAgIGN1cnJlbnQoYjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRvbS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChiKSB7XG4gICAgICAgICAgICB0aGlzLmRvbS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllck1hbmFnZXIge1xuICAgIGtobWVyQ2hlc3NCb2FyZDogS2htZXJDaGVzc0JvYXJkO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIGNvbnRhaW5lckNsYXNzTmFtZSA9ICdwbGF5ZXItdGFibGUnO1xuICAgIGNvbnRhaW5lckRvbTogSFRNTEVsZW1lbnQ7XG4gICAgcmVuRGF0YUxpc3Q6IE1vdmVEYXRhW10gPSBbXTtcbiAgICBwbGF5RXZlbnRDb250cm9sbGVyOiBQbGF5TWFuYWdlckV2ZW50Q29udHJvbGxlcjxNb3ZlRGF0YT47XG4gICAgYmFja0J0bkRvbTogSFRNTEVsZW1lbnQ7XG4gICAgcGxheUJ0bkRvbTogSFRNTEVsZW1lbnQ7XG4gICAgcGF1c2VCdG5Eb206IEhUTUxFbGVtZW50O1xuICAgIG5leHRCdG5Eb206IEhUTUxFbGVtZW50O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIgPSBuZXcgUGxheU1hbmFnZXJFdmVudENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgc2V0UHJvcHMoa2htZXJDaGVzc0JvYXJkOiBLaG1lckNoZXNzQm9hcmQpIHtcbiAgICAgICAgdGhpcy5raG1lckNoZXNzQm9hcmQgPSBraG1lckNoZXNzQm9hcmQ7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGtobWVyQ2hlc3NCb2FyZC5vcHRpb25zO1xuICAgICAgICBhcHBlbmRDc3ModGhpcy5vcHRpb25zLnVuaXF1ZUNsYXNzTmFtZSwgdGhpcy5jc3MoKSk7XG4gICAgfVxuICAgIGFkZChzdHI6IHN0cmluZywgdGl0bGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBtb3ZlRGF0YSA9IG5ldyBNb3ZlRGF0YSh7XG4gICAgICAgICAgICBjb250YWluZXJEb206IHRoaXMuY29udGFpbmVyRG9tLFxuICAgICAgICAgICAgcmVuRGF0YTogJycsXG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIHN0cixcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIuY2xpY2sobW92ZURhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuRGF0YUxpc3QucHVzaChtb3ZlRGF0YSk7XG4gICAgICAgIHRoaXMucmVuZEN1cnJlbnQoKTtcbiAgICB9XG4gICAgcmVuZEN1cnJlbnQoKSB7XG4gICAgICAgIHRoaXMucmVuRGF0YUxpc3QuZm9yRWFjaChlID0+IGUuY3VycmVudChmYWxzZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW5EYXRhTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVEYXRhID0gdGhpcy5yZW5EYXRhTGlzdFt0aGlzLnJlbkRhdGFMaXN0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgbW92ZURhdGEuY3VycmVudCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3KHBsYXllckNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSB+fih0aGlzLm9wdGlvbnMud2lkdGggKiAzIC8gNCk7XG4gICAgICAgIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lKTtcbiAgICAgICAgdGFibGUuY2xhc3NMaXN0LmFkZCh0aGlzLmNvbnRhaW5lckNsYXNzTmFtZSk7XG4gICAgICAgIHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQodGJvZHkpO1xuICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIHRib2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgbGV0IHRkSGlzdG9yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuc3R5bGUud2lkdGggPSBgJHtjb250YWluZXJXaWR0aH1weGA7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJEb20gPSBkaXY7XG4gICAgICAgIHRkSGlzdG9yeS5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB0ZEhpc3Rvcnkuc3R5bGUud2lkdGggPSBgJHtjb250YWluZXJXaWR0aH1weGA7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkSGlzdG9yeSk7XG4gICAgICAgIHRkSGlzdG9yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGxldCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8JztcbiAgICAgICAgdGhpcy5iYWNrQnRuRG9tID0gYnRuO1xuICAgICAgICB0ZEhpc3RvcnkuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRIaXN0b3J5KTtcbiAgICAgICAgdGRIaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnXic7XG4gICAgICAgIHRoaXMucGxheUJ0bkRvbSA9IGJ0bjtcbiAgICAgICAgdGRIaXN0b3J5LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidG4uaW5uZXJIVE1MID0gJyMnO1xuICAgICAgICB0aGlzLnBhdXNlQnRuRG9tID0gYnRuO1xuICAgICAgICB0ZEhpc3RvcnkuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkSGlzdG9yeSk7XG4gICAgICAgIHRkSGlzdG9yeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidG4uaW5uZXJIVE1MID0gJz4nO1xuICAgICAgICB0aGlzLm5leHRCdG5Eb20gPSBidG47XG4gICAgICAgIHRkSGlzdG9yeS5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZEhpc3RvcnkpO1xuICAgICAgICB0aGlzLmJ0bkxpc3RlbigpO1xuICAgIH1cbiAgICBidG5MaXN0ZW4oKSB7XG4gICAgICAgIHRoaXMuYmFja0J0bkRvbS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGF5RXZlbnRDb250cm9sbGVyLmJhY2soKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wbGF5QnRuRG9tLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIucGxheSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBhdXNlQnRuRG9tLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIucGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0QnRuRG9tLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlFdmVudENvbnRyb2xsZXIubmV4dCgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBjc3MoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyU2VsZWN0b3IgPSBgdGFibGUuJHt0aGlzLm9wdGlvbnMudW5pcXVlQ2xhc3NOYW1lfS4ke3RoaXMuY29udGFpbmVyQ2xhc3NOYW1lfWA7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogcmdiKDAsIDAsIDApIDBweCAwcHggMnB4IGluc2V0O1xuICAgICAgICB9XG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IHRkIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgICAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjIpIDBweCAwcHggMXB4IGluc2V0O1xuICAgICAgICB9XG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IC5jb250YWluZXIge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICBvdmVyZmxvdy14OiBhdXRvO1xuICAgICAgICB9XG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IC5jb250YWluZXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgICAgICAgIHdpZHRoOiAxZW07XG4gICAgICAgIH1cbiAgICAgICAgJHtjb250YWluZXJTZWxlY3Rvcn0gLmNvbnRhaW5lciBzcGFue1xuICAgICAgICAgICAgbWFyZ2luOiAwIDJweDtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMnB4O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgICAgICR7Y29udGFpbmVyU2VsZWN0b3J9IC5jb250YWluZXIgc3Bhbi5jdXJyZW50e1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgICAgICAgICAgY3Vyc29yOiBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxufVxuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDIxLCBLNHVzXG4gKiBBdXRob3I6IFJha3NhIEVuZyA8ZW5nLnJha3NhQGdtYWlsLmNvbT5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICogICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyAnQVMgSVMnXG4gKiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRVxuICogQVJFIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFXG4gKiBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiBDT05TRVFVRU5USUFMIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRlxuICogU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTXG4gKiBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSlcbiAqIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFXG4gKiBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiovIl19