import BaseController from "./BaseController";
import _ from "lodash";

export default class HomeController extends BaseController {
  /****************************

    When the constructor is called
    the user doesn't have access to alot of information

  *****************************/
  constructor() {
    super();
  }

  get() {
    this.render("swing_example_renderer.html",{message:"Welcome"});
  }

  static get route() {
    return "/example_home";
  }
}
