import _ from "lodash";

export default class BaseController {
  constructor() {
    this._pre=[];
  }

  static get route() {
    return "/";
  }


  pre(func){
    this._pre.push(func);
    return this;
  }

  _run(cb){
    var pre = _.clone(this._pre);
    let self = this;
    let next = function(){
      if(pre.length>0){
        let now = pre.unshift();
        now(self.req,this.res,next);
      }else{
        if(_.isFunction(cb)){
          cb();
        }
      }
    }

    next();
  }
}


BaseController.ioc = [];
