import * as THREE from "three";
import * as CANNON from "cannon-es"
import { ICtrlObject, IObject, IPhysicsObject } from "./iobject";
import { EventController } from "../../event/eventctrl";
import { IKeyCommand, KeyNone } from "../../event/keycommand";


export class Player extends THREE.Mesh implements IObject, ICtrlObject, IPhysicsObject {
    body: PhysicsPlayer
    get Body() {
        return this.body
    }
    get Position(): CANNON.Vec3 { return new CANNON.Vec3(
        this.position.x, this.position.y, this.position.z) }
    set Position(v: CANNON.Vec3) { this.position.set(v.x, v.y, v.z) }
    set Quaternion(q: CANNON.Quaternion) { this.quaternion.set(q.x, q.y, q.z, q.w) }
    get Meshs() { return this }
    constructor(eventCtrl: EventController, radius: number, position: CANNON.Vec3) {
        const geometry = new THREE.SphereGeometry(radius, 30, 30)
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xcccccc ,
        })
        super(geometry, material)
        this.body = new PhysicsPlayer(eventCtrl, radius, position)
        this.castShadow = true
        this.receiveShadow = false
        this.position.set(position.x, position.y, position.z)
    }
    PostStep(): void {
        this.body.PostStep()
    }
}

class PhysicsPlayer extends CANNON.Body {
    name = "player"
    keyQueue: IKeyCommand[]
    keycode: IKeyCommand | null
    constructor(private eventCtrl: EventController, radius: number, position: CANNON.Vec3) {
        const shape = new CANNON.Sphere(radius)
        const material = new CANNON.Material({ friction: 0.1, restitution: 0.5 })
        super({shape, material, mass: 10, position})

        this.keyQueue = []
        this.keycode = null
        eventCtrl.RegisterKeyDownEvent((keyCommand: IKeyCommand) => {
            this.keyQueue.push(keyCommand)
            this.keycode = keyCommand
        })
    }
    PostStep(): void {
        if (this.keyQueue.length > 0) {
            const cmd = this.keyQueue.shift()
            if (cmd != undefined)  {
                const position = cmd.ExecuteKeyDown()
                this.applyImpulse(position)
            }
        }
        /*
       if(this.keycode != null) {
        const position = this.keycode.ExecuteKeyDown()
        this.applyImpulse(position)
        this.keycode = null
       }
        */
    }
}