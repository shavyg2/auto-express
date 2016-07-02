import Renderer from "../../Renderer/SwigRenderer";
import path from "path";

module.exports = {
  server:{
    port:3000
  },
  render:{
    engine:Renderer,
    options:{
      base:path.resolve(__dirname,"../../views")
    }
  }
}
