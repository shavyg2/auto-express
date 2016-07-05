import ControllerBooter from "./lib/ControllerBooter";
import _ from "lodash";



/*******************************************
  Express is the default application user.
  Express is passed in incase there is some fork
  of express that is better to use.
  This can be changed but it is not advised
*******************************************/
import express from "express";
import bodyParser from "body-parser";

let config = require("./config/default");


/******************************************

  Place custom express routes on booter.app
  You can install middleware here if you want.

******************************************/
let booter = new ControllerBooter(express, bodyParser);

booter.config = config;





export let Boot = function(port, cb) {
    port = config.server.port || 3000;
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
    booter.listen(config.server.port, cb);

    return booter;
}



export let boot = Boot;
