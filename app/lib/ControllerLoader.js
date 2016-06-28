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
  function ControllerLoader(express) {
    (0, _classCallCheck3.default)(this, ControllerLoader);

    this.express = express;
    this.app = express();
    this.getRegexp = /^get/i;
    this.postRegexp = /^post/i;

    this.postRegexp = /^post/i;
    this.postRegexp = /^post/i;
    this.postRegexp = /^post/i;
    this.postRegexp = /^post/i;
    this.postRegexp = /^post/i;
    this.preRegexp = /^pre/i;
    this.function_params_regex = /\(([^)]+)\)/;
    this.controllers = [];
  }

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
  }, {
    key: "getPrototype",
    value: function getPrototype(_class) {
      return _class.prototype;
    }
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
  }, {
    key: "parseMethodType",
    value: function parseMethodType(meta, key, method) {
      if (this.getRegexp.test(key)) {
        meta.type = "get";
        meta.regex = this.getRegexp;
      } else if (this.postRegexp.test(key)) {
        meta.type = "post";
        meta.regex = this.postRegexp;
      } else if (this.preRegexp.test(key)) {
        meta.type = "pre";
        meta.regex = this.preRegexp;
      }
    }
  }, {
    key: "parseMethodName",
    value: function parseMethodName(meta, key, method) {
      meta.name = (0, _decamelize2.default)(key.replace(meta.regex, "")) || "/";
      meta.functionName = key;
      var method_as_string = method.toString();
      meta.functionString = method_as_string;
    }
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