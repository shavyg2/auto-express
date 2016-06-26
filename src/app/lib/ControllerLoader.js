import {
  parse as acorn
} from "acorn";
import _ from "lodash";
import decamelize from "decamelize";

export default class ControllerLoader {
  constructor(express) {
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
    this.function_params_regex = /\(([^)]+)\)/
    this.controllers = [];
  }


  loadFile(filename) {
    let Controller = require(filename).default || require(filename);
    let prototype = this.getPrototype(Controller);
    const metaData = this.getMethodsMetaData(prototype);
    metaData.class = Controller;
    metaData.file = metaData.filename = filename;
    this.controllers.push(metaData);
  }


  getPrototype(_class) {
    return _class.prototype;
  }


  getMethodsMetaData(prototype) {
    let prototype_meta = {};
    let properties = Object.getOwnPropertyNames(prototype);

    for (let i in properties) {
      let key = properties[i],
        method = prototype[key];
      if (_.isFunction(method)) {
        prototype_meta[key] = this.parseMethod(key, method);
      }
    }
    return prototype_meta;
  }

  parseMethodType(meta, key, method) {
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

  parseMethodName(meta, key, method) {
    meta.name = decamelize(key.replace(meta.regex, "")) || "/";
    meta.functionName = key;
    const method_as_string = method.toString();
    meta.functionString = method_as_string;
  }

  parseMethodParams(meta, key, method) {
    try {
      meta.ast = acorn(meta.functionString, {
        sourceType: "module",
        ecmaVersion: 7
      });
      meta.params = _(meta.ast.body[0].params).map(param=>{
        return param.name;
      }).value()

    } catch (e) {
      var result = this.function_params_regex.exec(meta.functionString);
      if (result) {
        meta.params = _(result[1].split(",")).map(x => x.replace(/=.*$/, "")).value();
      }
    }
  }

  parseMethod(key, method) {
    const meta = {};
    this.parseMethodType(meta, key, method);
    this.parseMethodName(meta, key, method);
    this.parseMethodParams(meta, key, method);
    return meta;
  }
}
