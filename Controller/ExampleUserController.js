"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseController2 = require("./BaseController");

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserController = function (_BaseController) {
  (0, _inherits3.default)(UserController, _BaseController);

  /****************************
     When the constructor is called
    the user doesn't have access to alot of information
   *****************************/

  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UserController).call(this));
  }

  (0, _createClass3.default)(UserController, [{
    key: "get",
    value: function get(id, UserService) {
      var user = UserService.find(id);
      this.res.send("Hello World");
    }
  }, {
    key: "postCreate",
    value: function postCreate(firstname, lastname, UserService) {
      UserService.create({
        firstname: firstname,
        lastname: lastname
      });
    }
  }], [{
    key: "route",
    get: function get() {
      return "/example_user";
    }
  }]);
  return UserController;
}(_BaseController3.default);

exports.default = UserController;


var ioc = void 0;

UserController.ioc = ioc = [];

ioc["UserService"] = {
  id: 0,
  store: [],
  find: function find(id) {
    var found = (0, _lodash2.default)(this.store).filter(function (x) {
      return x.id === id;
    }).value();
    return found;
  },
  create: function create(user) {
    this.store.push(user);
    user.id = ++this.id;
  },
  findOne: function findOne(id) {
    var results = this.find(id);
    return results.length ? results[0] : null;
  },
  delete: function _delete(id) {
    var index = this.store.indexOf(id);
    //cute trick
    if (~index) {
      this.store.slice(index, 1);
      //Baby Gone Gone
    }
  }

};