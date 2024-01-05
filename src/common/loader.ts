import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export class Loader {
    loader: GLTFLoader
    get Load(): GLTFLoader { return this.loader }
    constructor() {
        this.loader = new GLTFLoader()
    }
}