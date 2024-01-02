import { Vec3 } from "cannon-es";
import { Game } from "../scenes/game";
import { Player } from "../scenes/models/player";
import { Physics } from "../common/physics";

export class AppFactory {
    physics: Physics
    game: Game
    player: Player
    constructor() {
        this.physics = new Physics()
        this.player = new Player(0.3, new Vec3(0, 3, 9))
        this.game = new Game(this.physics, this.player)
    }
}