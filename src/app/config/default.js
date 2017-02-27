import Renderer from "../../Renderer/SwigRenderer";
import path from "path";
import _ from "lodash";




export function Merge(dest, src) {
  dest = dest || {};
  src = src || {};

  var dest_keys = _.keysIn(dest);
  var src_keys = _.keysIn(src);
  let _return = {};

  let keys = _.concat(dest_keys, src_keys);
  for (var i = 0, len = keys.length; i < len; i++) {
    let key = keys[i],
      value1 = dest[key],
      value2 = src[key],
      value;

    if (_.isUndefined(value1) || _.isUndefined(value2)) {
      if (_.isNull(value1)) {
        value = value1;
      } else {
        value = value1 || value2;
      }
    } else if (_.isArray(value1) && _.isArray(value2)) {
      value = _.concat(value1, value2);
    } else if (_.isObject(value1) && _.isObject(value2)) {
      value = Merge(value1, value2);
    } else {
      value = value1 || value2;
    }

    _return[key] = value;
  }

  return _return;
}

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


export default Merge(index, _defaults);
