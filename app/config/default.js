"use strict";

var _SwigRenderer = require("../../Renderer/SwigRenderer");

var _SwigRenderer2 = _interopRequireDefault(_SwigRenderer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  server: {
    port: 3000
  },
  render: {
    engine: _SwigRenderer2.default,
    options: {
      base: _path2.default.resolve(__dirname, "../../views")
    }
  }
};