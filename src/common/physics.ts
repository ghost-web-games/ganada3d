import THREE from "three";
import CANNON from "cannon-es"
import { IObject } from "../scenes/models/iobject";

export class Physics extends CANNON.World {
    clock = new THREE.Clock()

    constructor() {
        super()

        this.gravity = new CANNON.Vec3(0, -9.82, 0)
        this.broadphase = new CANNON.SAPBroadphase(this)
        this.allowSleep = true
    }
    add(...bodies: CANNON.Body[]) {
        bodies.forEach((body) => this.addBody(body))
    }
    update(...models: IObject[]) {
        const deltaTime = this.clock.getDelta()
        this.step(1 / 60, deltaTime)

        models.forEach((model) => {
            if (model.Body) {
                const vec3 = model.Body.position
                model.position.set(vec3.x, vec3.y, vec3.z)
                const quat = model.Body.quaternion
                model.quaternion.set(quat.x, quat.y, quat.z, quat.w)
            }
        })
    }
}