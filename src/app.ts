import { Canvas } from "./common/canvas";
import { AppFactory } from "./factory/appfactory";
import { IScene } from "./scenes/models/iviewer";


export default class App {
    canvas: Canvas
    currentScene: IScene
    constructor() {
        const factory = new AppFactory()
        this.canvas = factory.Canvas
        this.currentScene = factory.Scene
        this.init()
    }

    init() {
        window.addEventListener("resize", () => this.resize())
    }

    render() {
        this.currentScene.play()
        this.canvas.update()
        window.requestAnimationFrame(() => {
            this.render()
        })
    }

    resize() {
        this.canvas.resize()
    }
}