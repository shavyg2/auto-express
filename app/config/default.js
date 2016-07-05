"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Merge = Merge;

var _SwigRenderer = require("../../Renderer/SwigRenderer");

var _SwigRenderer2 = _interopRequireDefault(_SwigRenderer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Merge(dest, src) {
  dest = dest || {};
  src = src || {};

  var dest_keys = _lodash2.default.keysIn(dest);
  var src_keys = _lodash2.default.keysIn(src);
  var _return = {};

  var keys = _lodash2.default.concat(dest_keys, src_keys);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i],
        value1 = dest[key],
        value2 = src[key],
        value = void 0;

    if (_lodash2.default.isUndefined(value1) || _lodash2.default.isUndefined(value2)) {
      if (_lodash2.default.isNull(value1)) {
        value = value1;
      } else {
        value = value1 || value2;
      }
    } else if (_lodash2.default.isArray(value1) && _lodash2.default.isArray(value2)) {
      value = _lodash2.default.concat(value1, value2);
    } else if (_lodash2.default.isObject(value1) && _lodash2.default.isObject(value2)) {
      value = Merge(value1, value2);
    } else {
      value = value1 || value2;
    }

    _return[key] = value;
  }

  return _return;
}

var index = void 0,
    _defaults = {
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

try {
  index = require("./index").default || require("index");
} catch (e) {
  index = {};
}

exports.default = Merge(index, _defaults);