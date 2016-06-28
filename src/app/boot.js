import ControllerBooter from "./lib/ControllerBooter";




/*******************************************
  Express is the default application user.
  Express is passed in incase there is some fork
  of express that is better to use.
  This can be changed but it is not advised
*******************************************/
import express from "express";




/******************************************

  Place custom express routes on booter.app
  You can install middleware here if you want.

******************************************/
let booter = new ControllerBooter(express);





export let Boot = function(port,cb){
  port = port || 3000;
  /******************************************

  This is a sync operation that will load
  all the controllers and creates the
  route for the controllers.

  ******************************************/
  booter.start();



  /********************************
  This will start you application.
  booter exposes the booter.app property
  *********************************/
  booter.listen(3000,cb);

  return booter;
}



export let boot = Boot;
