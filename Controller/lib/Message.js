"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageController = function () {
  function MessageController() {
    (0, _classCallCheck3.default)(this, MessageController);
  }

  (0, _createClass3.default)(MessageController, [{
    key: "send",
    value: function send() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.res.send.apply(this.res, args);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.res.status.apply(this.res, args);
    }
  }]);
  return MessageController;
}();

exports.default = MessageController;