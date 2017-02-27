"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Render = function () {
  function Render(options) {
    (0, _classCallCheck3.default)(this, Render);

    options = options || {};
    this._basePath = options.basePath || options.base_path || options.BasePath || options.base;
    this._basePath = _path2.default.resolve(this._basePath);
    this._template_store = {};
  }

  (0, _createClass3.default)(Render, [{
    key: "render",
    value: function render(file, data) {
      var absolute_file;
      if (!_path2.default.isAbsolute(file)) {
        absolute_file = _path2.default.join(this._basePath, file);
      } else {
        absolute_file = file;
      }
      var view = void 0;
      if (this.isCompilable) {
        if (!this._template_store[file]) {
          this._template_store[file] = this.compile(absolute_file);
        }
        var _template = this._template_store[file];
        view = _template(data);
      } else {
        view = this.build_from_file(file, data);
      }

      return view;
    }
  }, {
    key: "getContent",
    value: function getContent(file) {
      return _fs2.default.readFileSync(file, "utf8");
    }
  }, {
    key: "build_from_file",
    value: function build_from_file(file, data) {
      throw new Error("render from file must be implemented");
    }
  }, {
    key: "compile",
    value: function compile(file, data) {
      throw new Error("template function must be implemented");
    }
  }, {
    key: "isCompilable",
    get: function get() {
      return false;
    }
  }]);
  return Render;
}();

exports.default = Render;