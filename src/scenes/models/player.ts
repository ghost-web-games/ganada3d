import * as THREE from "three";
import * as CANNON from "cannon-es"
import { IObject } from "./iobject";


export class Player extends THREE.Mesh implements IObject{
    body: PhysicsPlayer
    get Body() {
        return this.body
    }
    constructor(radius: number, position: CANNON.Vec3) {
        const geometry = new THREE.SphereGeometry(radius, 30, 30)
        const material = new THREE.MeshStandardMaterial({ color: 0xcccccc })
        super(geometry, material)
        this.body = new PhysicsPlayer(radius, position)
        this.castShadow = true
        this.receiveShadow = false
    }
}

class PhysicsPlayer extends CANNON.Body {
    constructor(radius: number, position: CANNON.Vec3) {
        const shape = new CANNON.Sphere(radius)
        const material = new CANNON.Material({ friction: 0.1, restitution: 0.5 })

        super({shape, material, mass: 10, position})
    }
}