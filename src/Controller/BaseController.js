import _ from "lodash";
import SwigRenderer from "../Renderer/SwigRenderer";
import ErrorController from "../lib/Error";
import path from "path";

export default class BaseController extends ErrorController {
  constructor() {
    super();
    this._pre = [];
    this.setRenderOptions({
      base: path.resolve(__dirname, "../views")
    })
  }

  static get route() {
    return "/";
  }

  pre(func) {
    this._pre.push(func);
    return this;
  }

  get renderer() {
    return this._renderer;
  }

  set renderer(value) {
    this._renderer = value;
    if (value) {
      this.asApi();
    } else {
      this.asPage();
    }
  }


  _run(cb) {
    var pre = _.clone(this._pre);
    let self = this;
    let next = function() {
      if (pre.length > 0) {
        let now = pre.shift();
        now(self.req, self.res, next);
      } else {
        if (_.isFunction(cb)) {
          cb();
        }
      }
    }

    next();
  }

  setRenderOptions(options) {
    this.renderer_options = _.defaults(options, this.renderer_options || {});
  }

  render(file, data) {
    data = data || {};
    data = _.defaults(data, this.local);
    data = _.defaults(data, this.global);

    if (!this.renderer) {
      throw new Error("no renderer selected\nSet renderer in constructor");
    } else {

      //TODO check if instance of renderer
      let renderer = Object.create(this.renderer.prototype);

      renderer = this.renderer.call(renderer, this.renderer_options);
      let content = renderer.render(file, data);
      this.ok(content);
    }
  }
}

BaseController.ioc = [];
