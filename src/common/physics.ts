import * as THREE from "three";
import * as CANNON from "cannon-es"
import { IObject } from "../scenes/models/iobject";

export class Physics extends CANNON.World {
    clock = new THREE.Clock()
    models: IObject[]

    constructor() {
        super()

        this.models = []
        this.gravity = new CANNON.Vec3(0, -9.82, 0)
        this.broadphase = new CANNON.SAPBroadphase(this)
        this.allowSleep = true
    }
    add(...models: IObject[]) {
        models.forEach((model) => this.addBody(model.Body))
        this.models = models
    }
    update() {
        const deltaTime = this.clock.getDelta()
        this.step(1 / 60, deltaTime)

        this.models.forEach((model) => {
            if (model.Body) {
                const vec3 = model.Body.position
                model.position.set(vec3.x, vec3.y, vec3.z)
                const quat = model.Body.quaternion
                model.quaternion.set(quat.x, quat.y, quat.z, quat.w)
            }
        })
    }
}