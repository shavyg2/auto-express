import path from "path";
import fs from "fs";

export default class Render{
  constructor(options){
    options = options || {};
    this._basePath =  options.basePath || options.base_path || options.BasePath;
    this._basePath =  path.resolve(this._basePath);
    this._template_store={};
  }

  render(file,data){
    var absolute_file = path.join(this._basePath,)
  }

  Compile(file){
    
  }

  isCompilable(){
    return false;
  }





}
