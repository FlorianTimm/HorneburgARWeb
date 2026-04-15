import { ModelJson } from "./modelle_json";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export class ModelFetcher {
    static instance: ModelFetcher;
    private values: Promise<{ [key: string]: Promise<THREE.Object3D> }>;
    private fortschritt: number = 0;


    private constructor() {
        this.values = this.fetchModel();
    }

    static getInstance() {
        if (!ModelFetcher.instance) {
            ModelFetcher.instance = new ModelFetcher();
        }
        return ModelFetcher.instance;
    }

    private async fetchModel() {
        const loader = new GLTFLoader();
        const values: { [key: string]: Promise<THREE.Object3D> } = {};
        let modellListe = await ModelJson.load_json();

        const count = Object.keys(modellListe).length;

        for (let key in modellListe) {
            const feature = modellListe[key];

            values[key] = loader.loadAsync(feature.path).then(gltf => {
                let object = gltf.scene;
                if (object.children.length == 1 && (object.children[0] as THREE.Group).isGroup) {
                    object = object.children[0] as THREE.Group;
                }
                return this.frontSideOnlyAndName(object, key);
            }).finally(() => {
                this.fortschritt++;
                console.log(`Fortschritt: ${this.fortschritt}/${count} (${key})`);
            });
        }

        return values;
    }

    static preload() {
        ModelFetcher.getInstance();
    }

    static async getModel(name: string): Promise<THREE.Object3D<THREE.Object3DEventMap>> {
        const instance = ModelFetcher.getInstance();
        const model = await (await instance.values)[name];
        return model.clone();
    }

    getProgress() {
        return this.fortschritt / Object.keys(this.values).length;
    }

    private frontSideOnlyAndName(object: THREE.Object3D, name?: string) {
        object.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                child.name = name || child.name;
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((material) => {
                        material.side = THREE.FrontSide;
                    });
                } else {
                    mesh.material.side = THREE.FrontSide;
                }
            }
        });
        object.name = name || object.name;
        return object;
    }
}