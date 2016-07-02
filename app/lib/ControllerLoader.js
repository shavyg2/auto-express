"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names");

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _acorn = require("acorn");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _decamelize = require("decamelize");

var _decamelize2 = _interopRequireDefault(_decamelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerLoader = function () {
  function ControllerLoader(express, bodyParser) {
    (0, _classCallCheck3.default)(this, ControllerLoader);

    this.express = express;
    this.app = express();

    /*************************
           API methods
     *************************/
    this.getRegexp = /^get/i;
    this.postRegexp = /^post/i;

    this.deleteRegexp = /^delete/i;
    this.putRegexp = /^put/i;

    this.headRegexp = /^head/i;
    this.lockRegexp = /^lock/i;

    /***********************************
             API methods end
     ***********************************/

    /***********************************
     If a function can't be parsed with
    acorn then functions are toString ed
    and then parsed using a regex to get
    the parameters from the function.
     As a back up
     ************************************/
    this.function_params_regex = /\(([^)]+)\)/;

    /**************************************
      This stores not the controllers
    but the meta data about controllers
    This might not be the best naming
    for this property
     **************************************/
    this.controllers = [];
  }

  /*****************************************
   This will load a file and expects it to
  a controller.
   To support es6 and beyond. The default
  param is checked to see if it's an es6 module
   There are better ways to check this.
   Using the prototype of the class
  All methods can be found.
   This will allow the framework to
  interpret if it's a get method and so on
   *****************************************/


  (0, _createClass3.default)(ControllerLoader, [{
    key: "loadFile",
    value: function loadFile(filename) {
      var Controller = require(filename).default || require(filename);
      var prototype = this.getPrototype(Controller);
      var metaData = this.getMethodsMetaData(prototype);
      metaData.class = Controller;
      metaData.file = metaData.filename = filename;
      this.controllers.push(metaData);
    }

    /**************************************
     Incase at some later date the framework
    needs some more robust way to get a
    prototype this methods was used.
     If a prototype doesn't exist
    we might create one but this
    might not be a case that will happen.
     More research might be needed.
     **************************************/

  }, {
    key: "getPrototype",
    value: function getPrototype(_class) {
      return _class.prototype;
    }

    /**********************************************************
     Once a method is found in a prototype. The framework
    Needs to understand what that method in the controller does
     This is how.
     Getting the properties that are attahed only to this prototype.
    We can get all the methods that are of importance to the framework
     And leave all the other ones for the user to futher abstract
    There application.
     ***********************************************************/

  }, {
    key: "getMethodsMetaData",
    value: function getMethodsMetaData(prototype) {
      var prototype_meta = {};
      var properties = (0, _getOwnPropertyNames2.default)(prototype);

      for (var i in properties) {
        var key = properties[i],
            method = prototype[key];
        if (_lodash2.default.isFunction(method)) {
          prototype_meta[key] = this.parseMethod(key, method);
        }
      }
      return prototype_meta;
    }

    /*******************************************************
     This will get the method type for the function.
    Currently this is only working for get and post
     ********************************************************/

  }, {
    key: "parseMethodType",
    value: function parseMethodType(meta, key, method) {
      if (this.getRegexp.test(key)) {
        meta.type = "get";
        meta.regex = this.getRegexp;
      } else if (this.postRegexp.test(key)) {
        meta.type = "post";
        meta.regex = this.postRegexp;
      }
    }

    /*************************************************************
    meta: The metadata object for the method
    key: the raw name of the method
    method: the actual method
      This will use decamelize module to create the route
    of the method and attached that to the name name property
    the name of the function will be the original name of the
    prototype.
     the function is also converted to a string.
    This will be parsed later.
     This seems to be a great place for any reflection library
     **************************************************************/

  }, {
    key: "parseMethodName",
    value: function parseMethodName(meta, key, method) {
      meta.name = (0, _decamelize2.default)(key.replace(meta.regex, "")) || "/";
      meta.functionName = key;
      var method_as_string = method.toString();
      meta.functionString = method_as_string;
    }

    /*************************************************************
       using async and await might break this.
      So there is a backup of using regex to parse.
       This might need to be more extended at a later date.
       With something a little bit more concrete and tested
     *************************************************************/

  }, {
    key: "parseMethodParams",
    value: function parseMethodParams(meta, key, method) {
      try {
        meta.ast = (0, _acorn.parse)(meta.functionString, {
          sourceType: "module",
          ecmaVersion: 7
        });
        meta.params = (0, _lodash2.default)(meta.ast.body[0].params).map(function (param) {
          return param.name;
        }).value();
      } catch (e) {
        var result = this.function_params_regex.exec(meta.functionString);
        if (result) {
          meta.params = (0, _lodash2.default)(result[1].split(",")).map(function (x) {
            return x.replace(/=.*$/, "");
          }).value();
        }
      }
    }

    /****************************************************************
     This will group previously parsed methods so that they can be
    easily used.
     ****************************************************************/

  }, {
    key: "parseMethod",
    value: function parseMethod(key, method) {
      var meta = {};
      this.parseMethodType(meta, key, method);
      this.parseMethodName(meta, key, method);
      this.parseMethodParams(meta, key, method);
      return meta;
    }
  }]);
  return ControllerLoader;
}();

exports.default = ControllerLoader;