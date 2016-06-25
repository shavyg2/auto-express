import chai from "chai";
const should = chai.should();
import express from "express";
import path from "path";
import ControllerLoader from "../app/lib/ControllerLoader";
import ExampleController from "./ExampleController";

describe('ControllerLoader', () => {
  let controllerloader;
  before(function () {
    controllerloader = new ControllerLoader(express);
  });


  it("Should be able to parseMethod",function () {
    const meta = controllerloader.parseMethod("GetUser",function(id){
      this.id = id;
    });

    meta.name.should.equal("user");
    meta.type.should.equal("get");
    meta.params.should.deep.equal(["id"])
  })

  it("Should be able to get Prototype",function(){
    const prototype = controllerloader.getPrototype(ExampleController);
    should.exist(prototype);
  })

  it("Should be able to loadFile",function () {
    var ExampleControllerPath = path.resolve(__dirname,"ExampleController.js");
    controllerloader.loadFile(ExampleControllerPath);
    controllerloader.controllers.length.should.equal(1);
  })

  it("should have each controller metadata",function(){
    // console.log(controllerloader.controllers);
  })


});
