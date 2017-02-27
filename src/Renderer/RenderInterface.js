import path from "path";
import fs from "fs";

export default class Render{


  constructor(options){
    options = options || {};
    this._basePath =  options.basePath || options.base_path || options.BasePath || options.base;
    this._basePath =  path.resolve(this._basePath);
    this._template_store={};
  }

  render(file,data){
    var absolute_file;
    if(!path.isAbsolute(file)){
     absolute_file = path.join(this._basePath,file);
   }else{
     absolute_file = file;
   }
   let view;
   if(this.isCompilable){
     if(!this._template_store[file]){
       this._template_store[file] = this.compile(absolute_file);
     }
     let  _template = this._template_store[file];
     view = _template(data);

   }else{
     view = this.build_from_file(file,data);
   }

   return view;
  }

  getContent(file){
    return fs.readFileSync(file,"utf8");
  }

  build_from_file(file,data){
    throw new Error("render from file must be implemented");
  }

  compile(file,data){
    throw new Error("template function must be implemented");
  }



  get isCompilable(){
    return false;
  }





}
