import * as THREE from "three";
import { Camera } from "./camera";
import { Canvas } from "./canvas";
import { IViewer } from "../scenes/models/iviewer";
import { Floor } from "../scenes/models/floor";
import { Vec3 } from "cannon-es";
import { Player } from "../scenes/models/player";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Renderer extends THREE.WebGLRenderer implements IViewer{

    constructor(private camera: Camera, private scene: THREE.Scene, private canvas: Canvas) {
        super({ alpha: true, antialias: true, canvas: canvas.Canvas })
        this.setClearColor(0x333333, 1)
        this.setSize(canvas.Width, canvas.Height)
        this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.shadowMap.enabled = true
        this.shadowMap.type = THREE.PCFSoftShadowMap
        canvas.RegisterViewer(this)
    }

    setScene(scene: THREE.Scene) {
        this.scene = scene
    }

    resize(width: number, height: number) {
        this.setSize(width, height)
        this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update() {
        this.render(this.scene, this.camera)
    }
}