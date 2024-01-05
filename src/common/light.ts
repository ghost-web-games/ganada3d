import * as THREE from "three";
import { Camera } from "./camera";
import { IViewer } from "../scenes/models/iviewer";
import { Canvas } from "./canvas";

export class Light extends THREE.DirectionalLight implements IViewer {
    constructor(canvas: Canvas, private camera: Camera) {
        super(0xffffff)
        this.position.set(this.camera.position.x, 5, this.camera.position.y)
        this.castShadow = true
        canvas.RegisterViewer(this)
    }

    resize(width: number, height: number): void {
        
    }

    update() {
        this.position.set(this.camera.position.x, 5, this.camera.position.z)
        this.target.position.set(this.camera.position.x, 3, this.camera.position.z)
    }
}