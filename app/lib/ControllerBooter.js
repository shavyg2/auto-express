'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ControllerLoader2 = require('./ControllerLoader');

var _ControllerLoader3 = _interopRequireDefault(_ControllerLoader2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hot_pepper_logger = require('hot-pepper-logger-interface/lib/FileLogInterface').default || require('hot-pepper-logger-interface/lib/FileLogInterface');
hot_pepper_logger = new hot_pepper_logger({ 'file': 'logger.log' });

var ControllerBooter = function (_ControllerLoader) {
    (0, _inherits3.default)(ControllerBooter, _ControllerLoader);

    function ControllerBooter(express) {
        (0, _classCallCheck3.default)(this, ControllerBooter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ControllerBooter).call(this, express));

        _this.routes = [];
        return _this;
    }

    (0, _createClass3.default)(ControllerBooter, [{
        key: 'start',
        value: function start(dir) {
            dir = dir || _path2.default.resolve(__dirname, '../../Controller');
            this.bootdir(dir);
            this.boot();
        }
    }, {
        key: 'listen',
        value: function listen(port, hostname, backlog, callback) {
            this.app.listen(port, hostname, backlog, callback);
        }
    }, {
        key: 'bootdir',
        value: function bootdir(dir) {
            var controllers_path_glob = _path2.default.join(dir, '**/*Controller.js');
            var controllers_file_path = _glob2.default.sync(controllers_path_glob);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(controllers_file_path), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var file = _step.value;

                    this.loadFile(file);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'boot',
        value: function boot() {
            var _this2 = this;

            (0, _lodash2.default)(this.controllers).forEach(function (controller) {
                _this2.bootController(controller);
            });
        }
    }, {
        key: 'bootController',
        value: function bootController(controller) {
            var get_methods = this.getMethodsByType(controller);
            this.bootMethods(controller, get_methods);
        }
    }, {
        key: 'bootMethods',
        value: function bootMethods(controller, methods) {
            var _this3 = this;

            var route = this.express.Router();
            this.routes.push(route);
            (0, _lodash2.default)(methods).forEach(function (method_by_type) {
                (0, _lodash2.default)(method_by_type).forEach(function (method) {
                    _this3.bootMethod(route, controller, method);
                });
            });
            this.app.use('' + controller.class.route, route);
        }
    }, {
        key: 'bootMethod',
        value: function bootMethod(route, _controller, method_meta) {
            var url = '/';
            var param_builder = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(method_meta.params), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var param = _step2.value;

                    if (_lodash2.default.hasIn(_controller.class.ioc, param)) {
                        param_builder.push(function (req, res) {
                            return _controller.class.ioc[param];
                        });
                    } else {
                        url = url + ':' + param + '/';
                        param_builder.push(function (param) {
                            return function (req, res) {
                                console.log(req.params);
                                return req.params[param];
                            };
                        }(param));
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            route[method_meta.type].call(route, '/' + method_meta.name + url, function (req, res, next) {
                var controller = new _controller.class();
                controller.req = req;
                controller.res = res;
                controller.next = next;
                var params_built = (0, _lodash2.default)(param_builder).map(function (x) {
                    return x(req, res);
                }).value();
                controller[method_meta.functionName].apply(controller, params_built);
            });
        }
    }, {
        key: 'getMethodsByType',
        value: function getMethodsByType(controller) {
            var methods = {};
            methods.get = this.getGetMethods(controller);
            methods.post = this.getPostMethods(controller);
            methods.pre = this.getPreMethods(controller);
            return methods;
        }
    }, {
        key: 'getGetMethods',
        value: function getGetMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === 'get';
            }).map(function (method) {
                return method;
            }).value();
        }
    }, {
        key: 'getPostMethods',
        value: function getPostMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === 'post';
            }).map(function (method) {
                return method;
            }).value();
        }
    }, {
        key: 'getPreMethods',
        value: function getPreMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === 'pre';
            }).map(function (method) {
                return method;
            }).value();
        }
    }]);
    return ControllerBooter;
}(_ControllerLoader3.default);

exports.default = ControllerBooter;