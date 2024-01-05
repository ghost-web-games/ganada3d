import * as THREE from "three";
import * as CANNON from "cannon-es"
import { ICtrlObject, IPhysicsObject } from "./iobject";
import { EventController } from "../../event/eventctrl";
import { Loader } from "../../common/loader";
import { IKeyCommand, KeyNone } from "../../event/keycommand";

export class Bird implements ICtrlObject, IPhysicsObject {
    body: PhysicsBird
    get Body() { return this.body }
    get Position(): CANNON.Vec3 { return new CANNON.Vec3(
        this.meshs.position.x, this.meshs.position.y, this.meshs.position.z) }
    set Position(v: CANNON.Vec3) { this.meshs.position.set(v.x, v.y, v.z) }
    set Quaternion(q: CANNON.Quaternion) { this.meshs.quaternion.set(q.x, q.y, q.z, q.w) }

    meshs: THREE.Group
    get Meshs() { return this.meshs }

    constructor(private loader: Loader, private eventCtrl: EventController) {
        this.meshs = new THREE.Group
        this.body = new PhysicsBird(new CANNON.Vec3(0, 0, 0), this.eventCtrl)
    }

    async Init() {
    }

    async Loader(scale: number, position: CANNON.Vec3) {
        return new Promise((resolve) => {
            this.loader.Load.load("assets/bird/scene.gltf", (gltf) => {
                this.meshs = gltf.scene
                this.meshs.scale.set(scale, scale, scale)
                this.meshs.position.set(position.x, position.y, position.z)
                this.meshs.castShadow = true
                this.meshs.receiveShadow = false
                this.meshs.traverse(child => { child.castShadow = true })
                this.body.position = position
                resolve(gltf.scene)
            })
        })
    }

    PostStep(): void {
        this.body?.PostStep()
    }
}

class PhysicsBird extends CANNON.Body {
    name = "bird"
    speed = 10
    forceAmount = 10
    ry = 0
    keyQueue: IKeyCommand[]
    keycode: IKeyCommand | null
    constructor(position: CANNON.Vec3, private eventCtrl: EventController) {
        const shape = new CANNON.Sphere(0.4)
        const material = new CANNON.Material({ friction: 0.1, restitution: 0.5 })
        super({ shape, material, mass: 10, position })

        this.keyQueue = []
        this.keycode = null
        eventCtrl.RegisterKeyDownEvent((keyCommand: IKeyCommand) => {
            this.keyQueue.push(keyCommand)
            this.keycode = keyCommand
        })
    }
    none = new KeyNone
    PostStep(): void {
        let cmd = this.keyQueue.shift()
        if (cmd == undefined) {
            cmd = this.none
        }
        const position = cmd.ExecuteKeyDown()
        if (position.x === 0 && position.z === 0) {
            this.velocity.x = 0
            this.velocity.z = 0
        } else {
            this.ry = Math.atan2(position.x, position.z)
            this.velocity.x = position.x * this.speed
            this.velocity.z = position.z * this.speed

            const force = new CANNON.Vec3(
                this.forceAmount * Math.sin(this.ry),
                this.forceAmount * Math.sin(this.ry),
                this.forceAmount * Math.cos(this.ry),
            )
            this.applyForce(force, this.position)
        }
        this.quaternion.setFromEuler(0, this.ry, 0)
    }
}