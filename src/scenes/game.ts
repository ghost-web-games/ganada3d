import * as THREE from "three";
import { Physics } from "../common/physics";
import { IObject } from "./models/iobject";
import { IScene } from "./models/iviewer";

export class Game extends THREE.Scene implements IScene {
    models: IObject[]
    meshs: IObject[]

    constructor(private physics: Physics, ...models: IObject[]) {
        super()
        this.add(...models)
        this.models = models
        this.meshs = models.filter((child: THREE.Mesh) => child.isMesh)
        this.physics.add(
            ...this.meshs.filter((model) => model.Body)
        )
    }

    play() {
        this.physics.update()
    }

    dispose() {
        this.models.forEach((model) => {
            if(model.isMesh) {
                model.geometry.dispose()
                if (model.material instanceof Array) {
                    model.material.map((m)=>m.dispose())
                } else {
                    model.material.dispose()
                }
                if (model.Body) this.physics.removeBody(model.Body)
                this.remove(model)
            }
        })
    }
}