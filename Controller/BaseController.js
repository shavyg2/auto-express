'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hot_pepper_logger = require('hot-pepper-logger-interface/lib/FileLogInterface').default || require('hot-pepper-logger-interface/lib/FileLogInterface');
hot_pepper_logger = new hot_pepper_logger({ 'file': 'logger.log' });

var BaseController = function () {
    function BaseController() {
        (0, _classCallCheck3.default)(this, BaseController);
    }

    (0, _createClass3.default)(BaseController, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'BaseController';
        }
    }], [{
        key: 'route',
        get: function get() {
            return '/';
        }
    }]);
    return BaseController;
}();

exports.default = BaseController;

BaseController.ioc = [];
hot_pepper_logger.log({
    'filename': 'C:\\Users\\shava\\Documents\\dev\\TaskFactor\\src\\Controller\\BaseController.js',
    'variable': 'BaseController.ioc'
}, BaseController.ioc);