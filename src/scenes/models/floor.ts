import * as THREE from "three";
import * as CANNON from "cannon-es"
import { IObject } from "./iobject";


export class Floor extends THREE.Mesh implements IObject{
    body: PhysicsFloor
    get Body() {
        return this.body
    }
    constructor(width: number, height: number, depth: number, position: CANNON.Vec3) {
        const geometry = new THREE.BoxGeometry(width, height, depth)
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff })

        super(geometry, material)
        this.body = new PhysicsFloor(width, height, depth, position)
        this.receiveShadow = true
    }
}

class PhysicsFloor extends CANNON.Body {
    constructor(width: number, height: number, depth: number, position: CANNON.Vec3) {
        const shape = new CANNON.Box(
            new CANNON.Vec3(width / 2, height / 2, depth / 2)
        )
        const material = new CANNON.Material({ friction: 0.1, restitution: 0.5 })

        super({shape, material, mass: 0, position})
    }
}