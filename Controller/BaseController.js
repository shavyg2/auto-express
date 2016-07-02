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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _SwigRenderer = require("../Renderer/SwigRenderer");

var _SwigRenderer2 = _interopRequireDefault(_SwigRenderer);

var _Error = require("./Error");

var _Error2 = _interopRequireDefault(_Error);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseController = function (_ErrorStatus) {
    (0, _inherits3.default)(BaseController, _ErrorStatus);

    function BaseController() {
        (0, _classCallCheck3.default)(this, BaseController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BaseController).call(this));

        _this._pre = [];
        _this.renderer_options = {
            base: _path2.default.resolve(__dirname, "../views")
        };
        return _this;
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
                    now(self.req, self.res, next);
                } else {
                    if (_lodash2.default.isFunction(cb)) {
                        cb();
                    }
                }
            };

            next();
        }
    }, {
        key: "setRenderOptions",
        value: function setRenderOptions(options) {
            this.renderer_options = _lodash2.default.defaults(options, this.renderer_options || {});
        }
    }, {
        key: "render",
        value: function render(file, data) {
            if (!this.renderer) {
                throw new Error("no renderer selected\nSet renderer in constructor");
            } else {
                var renderer = new this.rendered(this.renderer_options);
                var content = renderer.render(file, data);
                this.status.ok(content);
            }
        }
    }, {
        key: "renderer",
        get: function get() {
            return this._renderer;
        },
        set: function set(value) {
            this._renderer = value;
            if (value) {
                this.asApi();
            } else {
                this.asPage();
            }
        }
    }], [{
        key: "route",
        get: function get() {
            return "/";
        }
    }]);
    return BaseController;
}(_Error2.default);

exports.default = BaseController;


BaseController.ioc = [];