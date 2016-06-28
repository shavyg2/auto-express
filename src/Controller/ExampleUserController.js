import BaseController from "./BaseController";
import _ from "lodash";

export default class UserController extends BaseController {
  /****************************

    When the constructor is called
    the user doesn't have access to alot of information

  *****************************/
  constructor() {
    super();
  }

  get(id,UserService) {
    var user = UserService.find(id);
    this.res.send("Hello World");
  }

  postCreate(firstname,lastname,UserService){
      UserService.create({
        firstname,
        lastname
      });
  }

  static get route() {
    return "/user";
  }
}



let ioc;


UserController.ioc = ioc = [];

ioc["UserService"] = {
  id: 0,
  store: [],
  find: function(id) {
    var found = _(this.store).filter(x => x.id === id).value();
    return found;
  },
  create: function(user) {
    this.store.push(user);
    user.id = ++this.id;
  },
  findOne: function(id) {
    var results = this.find(id);
    return results.length ? results[0] : null
  },
  delete:function(id){
    var index = this.store.indexOf(id);
    //cute trick
    if(~index){
      this.store.slice(index,1);
      //Baby Gone Gone
    }
  }

}
