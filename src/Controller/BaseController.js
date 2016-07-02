import _ from "lodash";
import SwigRenderer from "../Renderer/SwigRenderer";
import ErrorStatus from "./Error";
import path from "path";

export default class BaseController extends ErrorStatus {
    constructor() {
        super();
        this._pre = [];
        this.renderer_options = {
            base: path.resolve(__dirname, "../views")
        }
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
        if (!this.renderer) {
            throw new Error("no renderer selected\nSet renderer in constructor");
        } else {
            const renderer = new this.rendered(this.renderer_options);
            let content = renderer.render(file, data);
            this.status.ok(content);
        }
    }
}


BaseController.ioc = [];
