"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseController2 = require("./BaseController");

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeController = function (_BaseController) {
  (0, _inherits3.default)(HomeController, _BaseController);

  /****************************
     When the constructor is called
    the user doesn't have access to alot of information
   *****************************/

  function HomeController() {
    (0, _classCallCheck3.default)(this, HomeController);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HomeController).call(this));
  }

  (0, _createClass3.default)(HomeController, [{
    key: "get",
    value: function get() {
      this.render("swing_example_renderer.html", { message: "Welcome" });
    }
  }], [{
    key: "route",
    get: function get() {
      return "/example_home";
    }
  }]);
  return HomeController;
}(_BaseController3.default);

exports.default = HomeController;