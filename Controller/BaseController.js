"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseController = function () {
  function BaseController() {
    (0, _classCallCheck3.default)(this, BaseController);

    this._pre = [];
  }

  (0, _createClass3.default)(BaseController, [{
    key: "pre",
    value: function pre(func) {
      this._pre.push(func);
      return this;
    }
  }, {
    key: "_run",
    value: function _run(cb) {
      var pre = _lodash2.default.clone(this._pre);
      var self = this;
      var next = function next() {
        if (pre.length > 0) {
          var now = pre.shift();
          console.log(now, pre.length);
          now(self.req, self.res, next);
        } else {
          if (_lodash2.default.isFunction(cb)) {
            cb();
          }
        }
      };

      next();
    }
  }], [{
    key: "route",
    get: function get() {
      return "/";
    }
  }]);
  return BaseController;
}();

exports.default = BaseController;


BaseController.ioc = [];