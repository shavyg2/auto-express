import ControllerBooter from "./lib/ControllerBooter";
import express from "express";

let booter = new ControllerBooter(express);
booter.start();
booter.listen(3000);
