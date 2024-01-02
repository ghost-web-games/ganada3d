import THREE from "three";
import { Physics } from "../common/physics";
import { IObject } from "./models/iobject";

export class Game extends THREE.Scene {
    models: THREE.Object3D[]

    constructor(private physics: Physics, ...models: IObject[]) {
        super()
        this.add(...models)
        const meshModels = models.filter((child: THREE.Mesh) => child.isMesh)
        this.models = meshModels
        this.physics.add(
            ...meshModels.map((model) => model.Body).filter((v) => !!v)
        )
    }
}