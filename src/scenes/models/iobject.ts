import THREE from "three";
import CANNON from "cannon-es"

export interface IObject extends THREE.Mesh{
    get Body(): CANNON.Body
}