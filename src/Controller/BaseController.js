import _ from "lodash";

export default class BaseController {
  constructor() {
  }

  get name() {
    return "BaseController";
  }

  static get route() {
    return "/";
  }

  getName() {
    return this.name;
  }
}


BaseController.ioc = [];
