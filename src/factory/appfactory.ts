import { Vec3 } from "cannon-es";
import { Game } from "../scenes/game";
import { Player } from "../scenes/models/player";
import { Physics } from "../common/physics";
import { Floor } from "../scenes/models/floor";
import { Canvas } from "../common/canvas";
import { Camera } from "../common/camera";
import { Renderer } from "../common/renderer";
import { IScene } from "../scenes/models/iviewer";
import { Light } from "../common/light";

export class AppFactory {
    physics: Physics
    game: Game
    player: Player
    floor: Floor
    canvas: Canvas
    camera: Camera
    light: Light
    renderer: Renderer

    currentScene: IScene
    constructor() {
        this.player = new Player(0.3, new Vec3(0, 3, 9))
        this.floor = new Floor(30, 2, 20, new Vec3(0, 0, 0))
        this.physics = new Physics()

        this.canvas = new Canvas()
        this.camera = new Camera(this.canvas, this.player)
        this.light = new Light(this.canvas, this.camera)

        this.game = new Game(this.physics, this.light, this.light.target,
            this.player, this.floor)
        this.currentScene = this.game
        this.renderer = new Renderer(this.camera, this.game, this.canvas)
    }
    get Canvas(): Canvas { return this.canvas }
    get Scene(): IScene { return this.currentScene }
}