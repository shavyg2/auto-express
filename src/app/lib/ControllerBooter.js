import _ from "lodash";
import ControllerLoader from "./ControllerLoader";
import path from "path";
import glob from "glob";
export default class ControllerBooter extends ControllerLoader {
  constructor(express) {
    super(express);
    this.routes = [];
  }

  start(dir){
    dir =  dir || path.resolve(__dirname,"../../Controller");
    this.bootdir(dir);
    this.boot();
  }

  listen(port,hostname,backlog,callback){
    this.app.listen(port,hostname,backlog,callback);
  }

  bootdir(dir){
    var controllers_path_glob = path.join(dir,"**/*Controller.js");
    var controllers_file_path = glob.sync(controllers_path_glob);
    for(var file of controllers_file_path){
      this.loadFile(file);
    }
  }

  boot() {
    _(this.controllers).forEach(controller => {
      this.bootController(controller);
    })
  }

  bootController(controller) {
    var get_methods = this.getMethodsByType(controller);
    this.bootMethods(controller, get_methods);
  }

  bootMethods(controller, methods) {
    let route = this.express.Router();
    this.routes.push(route);
    _(methods).forEach(method_by_type => {
      _(method_by_type).forEach(method => {
        this.bootMethod(route, controller, method);
      })
    })
    this.app.use(`${controller.class.route}`,route);
  }

  bootMethod(route, _controller, method_meta) {
    // let controller = new _controller.class();
    var url = "/";
    const param_builder = [];
    for (var param of method_meta.params) {
      if (_.hasIn(_controller.class.ioc,param)) {
        param_builder.push(function(req, res) {
          return _controller.class.ioc[param];
        })
      } else {
        url = `${url}:${param}/`;
        param_builder.push(function(param) {
          return function(req,res){
            console.log(req.params);
            return req.params[param];
          }
        }(param));
      }
    }

    route[method_meta.type].call(route,`/${method_meta.name}${url}`, function(req, res, next) {
      let controller = new _controller.class();

      controller.req = req;
      controller.res = res;
      controller.next = next;
      var params_built = _(param_builder).map(x => x(req, res)).value();
      controller[method_meta.functionName].apply(controller,params_built);
    });
  }

  getMethodsByType(controller) {
    var methods = {};
    methods.get = this.getGetMethods(controller);
    methods.post = this.getPostMethods(controller);
    methods.pre = this.getPreMethods(controller);
    return methods;
  }

  getGetMethods(controller) {
    return _(controller).filter((value, key) => {
      return _.isObject(value);
    }).filter((value, key) => {
      return value.type === "get";
    }).map(method => {
      return method;
    }).value();
  }

  getPostMethods(controller) {
    return _(controller).filter((value, key) => {
      return _.isObject(value);
    }).filter((value, key) => {
      return value.type === "post";
    }).map(method => {
      return method;
    }).value();
  }

  getPreMethods(controller) {
    return _(controller).filter((value, key) => {
      return _.isObject(value);
    }).filter((value, key) => {
      return value.type === "pre";
    }).map(method => {
      return method;
    }).value();
  }
}