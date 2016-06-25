import path from "path";
import chai from "chai"
import express from "express";
const should = chai.should();
import _ from "lodash";
import ControllerBooter from "../src/app/lib/ControllerBooter";
const FILE = path.resolve(__dirname,"ExampleController.js");
const PORT=3000;
let HOSTNAME,BACKLOG,CALLBACK;


describe('ControllerBooter', () => {
  let booter;
  before(function () {
    booter = new ControllerBooter(express);
    booter.start();
  });


  it("Should be able to boot controller",function(){
    booter.listen(PORT,HOSTNAME,BACKLOG,CALLBACK);
  })
});
