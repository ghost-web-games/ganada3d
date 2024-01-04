import * as THREE from "three";
import { IViewer } from "../scenes/models/iviewer";
import { IObject } from "../scenes/models/iobject";
import { Canvas } from "./canvas";

export class Camera extends THREE.PerspectiveCamera implements IViewer{
    constructor(canvas: Canvas, private player: IObject) {
        super(75, canvas.Width, canvas.Height)
        this.position.set(0, 20, 15)
        this.rotation.x = -Math.PI / 3
        canvas.RegisterViewer(this)
    }

    resize(width: number, height: number) {
        this.aspect = width / height
        this.updateProjectionMatrix()
    }

    update() {
        const position = this.player.position
        const mode = "far"
        switch (mode) {
            /*
            case "near":
                this.rotation.x = -0.6
                this.position.set(position.x, position.y + 2, position.z + 2.3)
                break;
                */
            case "far":
                this.rotation.x = -Math.PI / 3
                this.position.set(position.x, position.y + 20, position.z + 15)
                break;
        }
    }
}