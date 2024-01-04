import * as THREE from "three";
import * as CANNON from "cannon-es"

export interface IObject extends THREE.Mesh{
    get Body(): CANNON.Body
}