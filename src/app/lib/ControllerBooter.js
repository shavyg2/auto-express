import _ from "lodash";
import ControllerLoader from "./ControllerLoader";
import path from "path";
import glob from "glob";


import BaseController from "../../Controller/BaseController";
import MessageController from "../../Controller/Message";


export default class ControllerBooter extends ControllerLoader {
    constructor(express, bodyParser) {
        super(express, bodyParser);
        this.routes = [];
    }


    /**********************************************************

    This will load all the controller files in directory.
    The default controller files are inside the provided controller
    folder.

    There doesn't seem to be a reason to every need to change
    this. However here we are.

    **********************************************************/
    start(dir) {
        dir = dir || path.resolve(__dirname, "../../Controller");
        this.bootdir(dir);
        this.boot();
    }

    /*********************************************************
    Regular node/express listen function.
    This just passes the params
    **********************************************************/
    listen(port, hostname, backlog, callback) {
        this.app.listen(port, hostname, backlog, callback);
    }

    /********************************************************

    finds files that ends with the name Controller.js
    These are the only ones that are loaded. This leaves
    You to extend and provide other files if needed.

    Keeping only controllers here is a very clean way
    and should be encouraged.

    ********************************************************/
    bootdir(dir) {
        var controllers_path_glob = path.join(dir, "**/*Controller.js");
        var controllers_file_path = glob.sync(controllers_path_glob);
        for (var file of controllers_file_path) {
            this.loadFile(file);
        }
    }

    /***********************************************************

    Boots controllers

    ***********************************************************/
    boot() {
        _(this.controllers).forEach(controller => {
            this.bootController(controller);
        })
    }


    /*********************************************************

    Boot the methods of a controller

    *********************************************************/
    bootController(controller) {
        var get_methods = this.getMethodsByType(controller);
        this.bootMethods(controller, get_methods);
    }


    /********************************************************

    Every Controller get's it's own Router. This will
    make the application perform better

    *********************************************************/
    bootMethods(controller, methods) {
        let route = this.express.Router();
        this.routes.push(route);
        _(methods).forEach(method_by_type => {
            _(method_by_type).forEach(method => {
                this.bootMethod(route, controller, method);
            })
        })
        this.app.use(`${controller.class.route||"/"}`, route);
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
    bootMethod(route, _controller, method_meta) {
        var url = "/";
        const param_builder = [];
        for (var param of method_meta.params) {
            (function(param) {
                if (_.hasIn(_controller.class.ioc, param)) {
                    param_builder.push(function(req, res) {
                        return _controller.class.ioc[param];
                    })
                } else if (param && param[0] === "$") {
                    param_builder.push(function(req, res) {
                        param = param.substring(1);
                        if (req.body && req.body[param]) {
                            return req.body[param];
                        } else {
                            return null;
                        }
                    });
                } else {
                    url = `${url}:${param}/`;
                    param_builder.push(function(req, res) {
                        return req.params[param];
                    });
                }
            })(param);
        }


        let static_route = `/${method_meta.name}${url}`;
        static_route = static_route[0] === "/" ? static_route : "/" + static_route;
        static_route = static_route.replace(/\/{2,}/g, "/");


        /***********************************

          Meta Data

        ***********************************/

        console.log(`${method_meta.type.toUpperCase()}: ${_controller.class.route}${static_route}`);

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
        route[method_meta.type].call(route, static_route, (req, res, next)=>{

            let controller = Object.create(_controller.class.prototype);
            // let controller = new _controller.class;
            controller.req = req;
            controller.res = res;
            controller.next = next;
            controller.local = res.locals;
            controller.global = req.app.locals;
            controller.app = req.app;
            controller.params = req.params;
            controller.renderer = this.config.render.engine;
            controller.setRenderOptions(this.config.render.options);
            controller = _controller.class.call(controller) || controller;
            controller._run(function() {
                var params_built = _(param_builder).map(x => x(req, res)).value();
                controller[method_meta.functionName].apply(controller, params_built);
            })
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
