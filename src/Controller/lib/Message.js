

export default class MessageController{
  constructor(){

  }

  send(...args){
    this.res.send.apply(this.res,args);
  }

  status(...args){
    this.res.status.apply(this.res,args);
  }

  
}
