import BaseController from "../src/Controller/BaseController";


const UserService = {
  id: 0,
  find: function() {},
  create: function() {},
  findOne: function(id) {}
}

export default class ExampleController extends BaseController {
  constructor() {
    super();
  }

  static get route() {
    return "/example"
  }


  GetAllExample(type,UserService) {
    return ["constructor", "extending", "methods"]
  }
}

let ioc = ExampleController.ioc= [];

ioc["UserService"] = UserService;
