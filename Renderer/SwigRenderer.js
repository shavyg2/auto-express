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

var _swig = require("swig");

var _swig2 = _interopRequireDefault(_swig);

var _RenderInterface2 = require("./RenderInterface");

var _RenderInterface3 = _interopRequireDefault(_RenderInterface2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwigRenderer = function (_RenderInterface) {
    (0, _inherits3.default)(SwigRenderer, _RenderInterface);

    function SwigRenderer(options) {
        (0, _classCallCheck3.default)(this, SwigRenderer);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SwigRenderer).call(this, options));
    }

    (0, _createClass3.default)(SwigRenderer, [{
        key: "build_from_file",
        value: function build_from_file(file, data) {
            return _swig2.default.compileFile(file)(data);
        }
    }, {
        key: "compile",
        value: function compile(file) {
            return _swig2.default.compileFile(file);
        }
    }, {
        key: "isCompilable",
        get: function get() {
            return true;
        }
    }]);
    return SwigRenderer;
}(_RenderInterface3.default);

exports.default = SwigRenderer;