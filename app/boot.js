"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boot = exports.Boot = undefined;

var _ControllerBooter = require("./lib/ControllerBooter");

var _ControllerBooter2 = _interopRequireDefault(_ControllerBooter);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************

  Place custom express routes on booter.app
  You can install middleware here if you want.

******************************************/


/*******************************************
  Express is the default application user.
  Express is passed in incase there is some fork
  of express that is better to use.
  This can be changed but it is not advised
*******************************************/
var booter = new _ControllerBooter2.default(_express2.default, _bodyParser2.default);

var Boot = exports.Boot = function Boot(port, cb) {
  port = port || 3000;
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
  booter.listen(3000, cb);

  return booter;
};

var boot = exports.boot = Boot;