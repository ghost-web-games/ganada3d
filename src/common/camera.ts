import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { IViewer } from "../scenes/models/iviewer";
import { IObject } from "../scenes/models/iobject";
import { Canvas } from "./canvas";

export class Camera extends THREE.PerspectiveCamera implements IViewer{
    //controls: OrbitControls
    constructor(canvas: Canvas, private player: IObject) {
        super(75, canvas.Width/ canvas.Height, 0.1, 100)
        this.position.set(0, 20, 15)
        this.rotation.x = -Math.PI / 3
        canvas.RegisterViewer(this)
        //this.controls = new OrbitControls(this, canvas.Canvas)
    }

    resize(width: number, height: number) {
        this.aspect = width / height
        this.updateProjectionMatrix()
    }

    update() {
        //this.controls.update()
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
                this.position.set(position.x, position.y + 10, position.z + 5)
                break;
        }
    }
}