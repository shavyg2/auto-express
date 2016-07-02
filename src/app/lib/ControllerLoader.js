import {
  parse as acorn
} from "acorn";
import _ from "lodash";
import decamelize from "decamelize";

export default class ControllerLoader {
  constructor(express,bodyParser) {
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
    this.function_params_regex = /\(([^)]+)\)/


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
  loadFile(filename) {
    let Controller = require(filename).default || require(filename);
    let prototype = this.getPrototype(Controller);
    const metaData = this.getMethodsMetaData(prototype);
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
  getPrototype(_class) {
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


  /*******************************************************

  This will get the method type for the function.
  Currently this is only working for get and post

  ********************************************************/
  parseMethodType(meta, key, method) {
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
  parseMethodName(meta, key, method) {
    meta.name = decamelize(key.replace(meta.regex, "")) || "/";
    meta.functionName = key;
    const method_as_string = method.toString();
    meta.functionString = method_as_string;
  }


  /*************************************************************

    using async and await might break this.
    So there is a backup of using regex to parse.

    This might need to be more extended at a later date.

    With something a little bit more concrete and tested

  *************************************************************/
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



  /****************************************************************

  This will group previously parsed methods so that they can be
  easily used.

  ****************************************************************/
  parseMethod(key, method) {
    const meta = {};
    this.parseMethodType(meta, key, method);
    this.parseMethodName(meta, key, method);
    this.parseMethodParams(meta, key, method);
    return meta;
  }
}
