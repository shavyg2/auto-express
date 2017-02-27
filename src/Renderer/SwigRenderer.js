import swig from "swig";
import RenderInterface from "./RenderInterface";


export default class SwigRenderer extends RenderInterface {
    constructor(options) {
        super(options);
    }

    build_from_file(file, data) {
        return swig.compileFile(file)(data)
    }

    compile(file) {
        return swig.compileFile(file);
    }

    get isCompilable() {
        return true;
    }
}
