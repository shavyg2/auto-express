import chai from "chai";
const should = chai.should();
import Controller from "../Controller/UserController";

describe("BaseController Test", function() {
  let controller;
  before(function() {
    controller = new Controller();
  })

  it('Should be able to get name', done => {
    controller.name.should.equal("UserController");
    done();
  });

  it('Should return null when register is called', function() {
    should.not.exist(controller.register())
  })

})
