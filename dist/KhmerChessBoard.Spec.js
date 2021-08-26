"use strict";

var _KhmerChessBoard = _interopRequireDefault(require("./KhmerChessBoard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe("KhmerChessBoard", function () {
  var kcb = null;
  beforeEach(function () {
    var container = document.createElement("div");
    document.body.appendChild(container);
    kcb = new _KhmerChessBoard["default"]();
    kcb.setOptions({
      width: 600,
      container: container
    });
  });
  it('should be function', function () {
    expect(_typeof(_KhmerChessBoard["default"])).toEqual('function');
  });
  it('should has class', function () {
    expect(_typeof(kcb.options.uniqueClassName)).toEqual('string');
  });
  it('should ', function () {
    var cell = kcb.boardManager.get(0);
    expect(cell.isSelected).toEqual(false);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9LaG1lckNoZXNzQm9hcmQuU3BlYy50cyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsImtjYiIsImJlZm9yZUVhY2giLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJLaG1lckNoZXNzQm9hcmQiLCJzZXRPcHRpb25zIiwid2lkdGgiLCJpdCIsImV4cGVjdCIsInRvRXF1YWwiLCJvcHRpb25zIiwidW5pcXVlQ2xhc3NOYW1lIiwiY2VsbCIsImJvYXJkTWFuYWdlciIsImdldCIsImlzU2VsZWN0ZWQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBQSxRQUFRLENBQUMsaUJBQUQsRUFBb0IsWUFBWTtBQUNwQyxNQUFJQyxHQUFvQixHQUFHLElBQTNCO0FBRUFDLEVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsUUFBTUMsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUQsSUFBQUEsUUFBUSxDQUFDRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJKLFNBQTFCO0FBQ0FGLElBQUFBLEdBQUcsR0FBRyxJQUFJTywyQkFBSixFQUFOO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ1EsVUFBSixDQUFlO0FBQ1hDLE1BQUFBLEtBQUssRUFBRSxHQURJO0FBRVhQLE1BQUFBLFNBQVMsRUFBVEE7QUFGVyxLQUFmO0FBSUgsR0FSUyxDQUFWO0FBVUFRLEVBQUFBLEVBQUUsQ0FBQyxvQkFBRCxFQUF1QixZQUFNO0FBQzNCQyxJQUFBQSxNQUFNLFNBQVFKLDJCQUFSLEVBQU4sQ0FBK0JLLE9BQS9CLENBQXVDLFVBQXZDO0FBQ0gsR0FGQyxDQUFGO0FBSUFGLEVBQUFBLEVBQUUsQ0FBQyxrQkFBRCxFQUFxQixZQUFNO0FBQ3pCQyxJQUFBQSxNQUFNLFNBQVFYLEdBQUcsQ0FBQ2EsT0FBSixDQUFZQyxlQUFwQixFQUFOLENBQTJDRixPQUEzQyxDQUFtRCxRQUFuRDtBQUNILEdBRkMsQ0FBRjtBQUlBRixFQUFBQSxFQUFFLENBQUMsU0FBRCxFQUFZLFlBQU07QUFDaEIsUUFBTUssSUFBSSxHQUFHZixHQUFHLENBQUNnQixZQUFKLENBQWlCQyxHQUFqQixDQUFxQixDQUFyQixDQUFiO0FBQ0FOLElBQUFBLE1BQU0sQ0FBQ0ksSUFBSSxDQUFDRyxVQUFOLENBQU4sQ0FBd0JOLE9BQXhCLENBQWdDLEtBQWhDO0FBQ0gsR0FIQyxDQUFGO0FBSUgsQ0F6Qk8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLaG1lckNoZXNzQm9hcmQgZnJvbSBcIi4vS2htZXJDaGVzc0JvYXJkXCI7XG5cbmRlc2NyaWJlKFwiS2htZXJDaGVzc0JvYXJkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQga2NiOiBLaG1lckNoZXNzQm9hcmQgPSBudWxsO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAga2NiID0gbmV3IEtobWVyQ2hlc3NCb2FyZCgpO1xuICAgICAgICBrY2Iuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSBmdW5jdGlvbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHR5cGVvZiBLaG1lckNoZXNzQm9hcmQpLnRvRXF1YWwoJ2Z1bmN0aW9uJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhcyBjbGFzcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KHR5cGVvZiBrY2Iub3B0aW9ucy51bmlxdWVDbGFzc05hbWUpLnRvRXF1YWwoJ3N0cmluZycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCAnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBrY2IuYm9hcmRNYW5hZ2VyLmdldCgwKTtcbiAgICAgICAgZXhwZWN0KGNlbGwuaXNTZWxlY3RlZCkudG9FcXVhbChmYWxzZSk7XG4gICAgfSk7XG59KTsiXX0=