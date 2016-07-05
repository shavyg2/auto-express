import Renderer from "../../Renderer/SwigRenderer";
import path from "path";

let index, _defaults = {
  server: {
    port: 3000
  },
  render: {
    engine: Renderer,
    options: {
      base: path.resolve(__dirname, "../../views")
    }
  }
}

try {
  index = require("./index").default || require("index");
} catch (e) {
  index = {};
}


export default _.merge(index,_defaults);
