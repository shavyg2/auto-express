"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _ControllerLoader2 = require("./ControllerLoader");

var _ControllerLoader3 = _interopRequireDefault(_ControllerLoader2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerBooter = function (_ControllerLoader) {
    (0, _inherits3.default)(ControllerBooter, _ControllerLoader);

    function ControllerBooter(express, bodyParser) {
        (0, _classCallCheck3.default)(this, ControllerBooter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ControllerBooter).call(this, express, bodyParser));

        _this.routes = [];
        return _this;
    }

    /**********************************************************
     This will load all the controller files in directory.
    The default controller files are inside the provided controller
    folder.
     There doesn't seem to be a reason to every need to change
    this. However here we are.
     **********************************************************/


    (0, _createClass3.default)(ControllerBooter, [{
        key: "start",
        value: function start(dir) {
            dir = dir || _path2.default.resolve(__dirname, "../../Controller");
            this.bootdir(dir);
            this.boot();
        }

        /*********************************************************
        Regular node/express listen function.
        This just passes the params
        **********************************************************/

    }, {
        key: "listen",
        value: function listen(port, hostname, backlog, callback) {
            this.app.listen(port, hostname, backlog, callback);
        }

        /********************************************************
         finds files that ends with the name Controller.js
        These are the only ones that are loaded. This leaves
        You to extend and provide other files if needed.
         Keeping only controllers here is a very clean way
        and should be encouraged.
         ********************************************************/

    }, {
        key: "bootdir",
        value: function bootdir(dir) {
            var controllers_path_glob = _path2.default.join(dir, "**/*Controller.js");
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

        /***********************************************************
         Boots controllers
         ***********************************************************/

    }, {
        key: "boot",
        value: function boot() {
            var _this2 = this;

            (0, _lodash2.default)(this.controllers).forEach(function (controller) {
                _this2.bootController(controller);
            });
        }

        /*********************************************************
         Boot the methods of a controller
         *********************************************************/

    }, {
        key: "bootController",
        value: function bootController(controller) {
            var get_methods = this.getMethodsByType(controller);
            this.bootMethods(controller, get_methods);
        }

        /********************************************************
         Every Controller get's it's own Router. This will
        make the application perform better
         *********************************************************/

    }, {
        key: "bootMethods",
        value: function bootMethods(controller, methods) {
            var _this3 = this;

            var route = this.express.Router();
            this.routes.push(route);
            (0, _lodash2.default)(methods).forEach(function (method_by_type) {
                (0, _lodash2.default)(method_by_type).forEach(function (method) {
                    _this3.bootMethod(route, controller, method);
                });
            });
            this.app.use("" + (controller.class.route || "/"), route);
        }

        /**********************************************************
         each param needs to be handled a little differently.
          if a param is not in the static ioc property of the class
        Then the property will be made a param unless it has a $
        infront of it.
         example:
         static get route(){
          return '/user'
        }
        postList(name,$apikey,UserService)
         A method like this will express the following
        url:/user/list/:name
         Before the method boots. The body property will be accessed
        looking for the a propety called $apikey
        this is to be used as a short hand to get to
        this.req.body.apikey
        you can reference using $apikey in the params
         The UserService will be another param unless
        it's in the controllers
        ioc static class property
         eg
         export default class UserController extends BaseController{
          constructor(){
            super();
          }
        }
         UserController.ioc = {
          "UserService":UserServiceInstance
        }
         The UserServiceInstance will be passed
        This might get Extended or replaced.
         It would be nice to place all of this in one spot.
         Like a register function.
         It can still be extended.
         Because of the nature of rope replacing files
        It might be hard to do this. However we can just do an entire folder
        So you can seperate them.
         Something like a register folder might be nice.
         ***********************************************************/

        //TODO:split to smaller methods

    }, {
        key: "bootMethod",
        value: function bootMethod(route, _controller, method_meta) {
            var url = "/";
            var param_builder = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(method_meta.params), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var param = _step2.value;

                    (function (param) {
                        if (_lodash2.default.hasIn(_controller.class.ioc, param)) {
                            param_builder.push(function (req, res) {
                                return _controller.class.ioc[param];
                            });
                        } else if (param && param[0] === "$") {
                            param_builder.push(function (req, res) {
                                param = param.substring(1);
                                if (req.body && req.body[param]) {
                                    return req.body[param];
                                } else {
                                    return null;
                                }
                            });
                        } else {
                            url = url + ":" + param + "/";
                            param_builder.push(function (req, res) {
                                return req.params[param];
                            });
                        }
                    })(param);
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

            var static_route = "/" + method_meta.name + url;
            static_route = static_route[0] === "/" ? static_route : "/" + static_route;
            static_route = static_route.replace(/\/{2,}/g, "/");

            /***********************************
               Meta Data
             ***********************************/

            console.log(method_meta.type.toUpperCase() + ": " + _controller.class.route + static_route);

            /***************************************
               Meta Data end
             ****************************************/

            /***************************************************************************
             Controllers are booted in a special way. This is some of the flexibility
            that Javascript offers.
             First an object is created using the Object.create();
             This will create the base object to be our class instance.
             Next certain properties are attached to your controller.
             The reason for doing it this way is so that in your constructor, you will
            have these propeties attached to your instance.
             This will avoid having to pass in params such as req,res,next
            instead of
             constructor(req,res,next){
              super(req,res,next);
            }
             you can do
            constructor(){
              super();
              this.req;
              this.res;
              this.next;
            }
             or just
            constructor(){
              super();
            }
              Now there is a problem that needs to be solved.
            Express uses middleware.
             Which is easy to type in express. However how to do this the framework?
            the framework would need to allow for async middleware.
              to allow this to happen a pre method was added to the controllers
            a middle/middleware function might be alias
              The middleware is loading in the constructor.
            Then before the method is called.
            It will be passed through all
            the middlewares first.
             The _run function will then execute the callback
            after all the middleware has ran.
               ***************************************************************************/
            route[method_meta.type].call(route, static_route, function (req, res, next) {
                var controller = (0, _create2.default)(_controller.class.prototype);
                controller.req = req;
                controller.res = res;
                controller.next = next;
                controller.local = res.local;
                controller.global = req.app.local;
                controller.app = req.app;
                controller.params = req.params;
                controller.renderer = this.config.render.engine;
                controller.setRenderOptions(this.config.render.options);
                _controller.class.call(controller);
                controller._run(function () {
                    var params_built = (0, _lodash2.default)(param_builder).map(function (x) {
                        return x(req, res);
                    }).value();
                    controller[method_meta.functionName].apply(controller, params_built);
                });
            });
        }
    }, {
        key: "getMethodsByType",
        value: function getMethodsByType(controller) {
            var methods = {};
            methods.get = this.getGetMethods(controller);
            methods.post = this.getPostMethods(controller);
            methods.pre = this.getPreMethods(controller);
            return methods;
        }
    }, {
        key: "getGetMethods",
        value: function getGetMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === "get";
            }).map(function (method) {
                return method;
            }).value();
        }
    }, {
        key: "getPostMethods",
        value: function getPostMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === "post";
            }).map(function (method) {
                return method;
            }).value();
        }
    }, {
        key: "getPreMethods",
        value: function getPreMethods(controller) {
            return (0, _lodash2.default)(controller).filter(function (value, key) {
                return _lodash2.default.isObject(value);
            }).filter(function (value, key) {
                return value.type === "pre";
            }).map(function (method) {
                return method;
            }).value();
        }
    }]);
    return ControllerBooter;
}(_ControllerLoader3.default);

exports.default = ControllerBooter;