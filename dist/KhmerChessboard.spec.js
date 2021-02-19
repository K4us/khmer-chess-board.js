"use strict";

var _KhmerChessboard = _interopRequireDefault(require("./KhmerChessboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Greeter', function () {
  it('should greet', function () {
    spyOn(console, 'log');
    new _KhmerChessboard["default"]();
    expect(console.log).toHaveBeenCalled();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9LaG1lckNoZXNzYm9hcmQuc3BlYy50cyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0Iiwic3B5T24iLCJjb25zb2xlIiwiS2htZXJDaGVzc0JvYXJkIiwiZXhwZWN0IiwibG9nIiwidG9IYXZlQmVlbkNhbGxlZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUVBQSxRQUFRLENBQUMsU0FBRCxFQUFZLFlBQU07QUFDdEJDLEVBQUFBLEVBQUUsQ0FBQyxjQUFELEVBQWlCLFlBQU07QUFDckJDLElBQUFBLEtBQUssQ0FBQ0MsT0FBRCxFQUFVLEtBQVYsQ0FBTDtBQUNBLFFBQUlDLDJCQUFKO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0YsT0FBTyxDQUFDRyxHQUFULENBQU4sQ0FBb0JDLGdCQUFwQjtBQUNILEdBSkMsQ0FBRjtBQUtILENBTk8sQ0FBUiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLaG1lckNoZXNzQm9hcmQgZnJvbSAnLi9LaG1lckNoZXNzYm9hcmQnO1xuXG5kZXNjcmliZSgnR3JlZXRlcicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGdyZWV0JywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb25zb2xlLCAnbG9nJyk7XG4gICAgICAgIG5ldyBLaG1lckNoZXNzQm9hcmQoKTtcbiAgICAgICAgZXhwZWN0KGNvbnNvbGUubG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcbiJdfQ==