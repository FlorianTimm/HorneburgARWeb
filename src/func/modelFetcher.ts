import { ModelJson } from "./modelle_json";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { frontSideOnly } from '@/func/threed';
import * as THREE from 'three';

export class ModelFetcher {
    static instance: ModelFetcher;
    values: Promise<{ [key: string]: THREE.Object3D }>;

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
        const names: string[] = [];
        return ModelJson.load_json().then(modelle => {
            let queue = [];
            for (let key in modelle) {
                const feature = modelle[key];
                names.push(key);
                queue.push(loader.loadAsync(feature.path).then(gltf => {
                    let object = gltf.scene;
                    return frontSideOnly(object, key);
                }));
            }
            return Promise.all(queue);
        }).then(objects => {
            console.log('Modelle geladen:', objects);
            const d: { [key: string]: THREE.Object3D } = {};
            for (let i = 0; i < objects.length; i++) {
                d[names[i]] = objects[i];
            }
            return d;
        });
    }

    static preload() {
        ModelFetcher.getInstance();
    }

    static getModels() {
        return ModelFetcher.getInstance().values;
    }


}