"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.boot = exports.Boot = undefined;

var _ControllerBooter = require("./lib/ControllerBooter");

var _ControllerBooter2 = _interopRequireDefault(_ControllerBooter);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _default = require("./config/default");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************

  Place custom express routes on booter.app
  You can install middleware here if you want.

******************************************/
var booter = new _ControllerBooter2.default(_express2.default, _bodyParser2.default);

/*******************************************
  Express is the default application user.
  Express is passed in incase there is some fork
  of express that is better to use.
  This can be changed but it is not advised
*******************************************/


booter.config = _default2.default;

var Boot = exports.Boot = function Boot(port, cb) {
    port = _default2.default.server.port || 3000;
    /******************************************
      This is a sync operation that will load
    all the controllers and creates the
    route for the controllers.
      ******************************************/
    booter.start();

    /********************************
    This will start you application.
    booter exposes the booter.app property
    *********************************/
    booter.listen(_default2.default.server.port, cb);

    return booter;
};

var boot = exports.boot = Boot;