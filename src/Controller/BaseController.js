import _ from "lodash";

export default class BaseController {
  constructor() {
  }

  static get route() {
    return "/";
  }
}


BaseController.ioc = [];
