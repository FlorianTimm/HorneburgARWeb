<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/orbit"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ modelle ? (model == 'alle' ? $t('all_models') : modelle[model]?.getName($i18n.locale)) :
                    ''
                    }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="orbit-container"></div>
        </ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="infobox = !infobox">
                <ion-icon v-if="infobox" :icon="chevronDown"></ion-icon>
                <ion-icon v-else :icon="chevronUp"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-card v-if="infobox"
            style="position:absolute; bottom: 80px; top: 70px;  right: 0px; padding: 12px; width: 300px; max-width: 90%; z-index: 1000; background-color: rgba(255, 255, 255, 0.9);">
            <div v-html="infotext"></div>
        </ion-card>
    </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { JsonFile } from '@/func/json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { addLight, frontSideOnly } from '@/func/threed';
import { chevronUp, chevronDown } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import { ModelFetcher } from '@/func/modelFetcher';

const { t, locale } = useI18n();

const route = useRoute();
const { model } = route.params as { model: string };
const modelle: Ref<JsonFile<ModelJson>> = ref({});
let infobox = ref(false);
let infotext = ref("");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

onMounted(async () => {
    modelle.value = await ModelJson.load_json();

    console.log("Orbit.vue mounted");

    const container = document.getElementById('orbit-container');

    if (!container) {
        console.error("Orbit container not found");
        return;
    }

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 1000);

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();





    function freeSpaceForOverlay() {
        if (window.innerWidth > 1000) {
            infobox.value = true;
            camera.setViewOffset(window.innerWidth, window.innerHeight, 0 + window.innerWidth / 10, 0, window.innerWidth + window.innerWidth / 10, window.innerHeight);
        }
        else {
            camera.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight);
        }
    }

    freeSpaceForOverlay();

    window.addEventListener("resize", e => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        freeSpaceForOverlay();
    });

    let cameraControls = new OrbitControls(camera, renderer.domElement);

    //cameraControls.update();

    if (model == 'alle') {

        // Mittelwert von allen Breiten (latitude) und Längengeraden (longitude) berechnen
        let latSum = 0;
        let lngSum = 0;
        let count = 0;
        for (let key in modelle.value) {
            latSum += modelle.value[key].latitude;
            lngSum += modelle.value[key].longitude;
            count++;
        }
        const latAvg = count > 0 ? latSum / count : 0;
        const lngAvg = count > 0 ? lngSum / count : 0;
        //console.log('Mittelwert Latitude:', latAvg, 'Mittelwert Longitude:', lngAvg);

        let lngFactor = 2. * 6370000. * Math.cos(latAvg / 180. * Math.PI) * Math.PI / 360. * 1.1;
        let latFactor = 2. * 6370000. * Math.PI / 360. * 1.1;

        //console.log('Längengrad Faktor:', lngFactor, 'Breitengrad Faktor:', latFactor);

        ModelFetcher.getModels().then(models => {

            for (let key in modelle.value) {

                let object = models[key];

                // Positioning logic for grid layout
                let lat = -(modelle.value[key].latitude - latAvg) * latFactor;
                let lng = (modelle.value[key].longitude - lngAvg) * lngFactor;
                let rot = Math.PI * modelle.value[key].rotation / 180.;

                object.translateX(lng);
                object.translateZ(lat);
                object.rotateY(rot);

                scene.add(object);

                /*
                let sphere = new THREE.SphereGeometry(0.1, 16, 16);
                let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                let marker = new THREE.Mesh(sphere, material);
                marker.position.set(lng, 0, lat);
                scene.add(marker);
                */

            }
        });
        camera.position.set(-20, 33, -90);
        //cameraControls.target.set(0, 0, 0);

        //let sphere = new THREE.SphereGeometry(0.3, 16, 16);
        //let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        //let marker = new THREE.Mesh(sphere, material);
        //marker.position.set(0, 0, 0);
        //scene.add(marker);

        document.addEventListener("click", (event) => {
            let pointer = new THREE.Vector2();
            let raycaster = new THREE.Raycaster();
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);

            let meshes: THREE.Mesh[] = [];
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    meshes.push(child as THREE.Mesh);
                    const mesh = child as THREE.Mesh;
                    // Only reset emissive if material supports it
                    const material = mesh.material;
                    if (Array.isArray(material)) {
                        material.forEach(mat => {
                            // Typisierung für mat als MeshStandardMaterial erzwingen
                            const stdMat = mat as THREE.MeshStandardMaterial;
                            if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                                stdMat.emissive.setHex(0x000000);
                            }
                        });
                    } else {
                        const stdMat = material as THREE.MeshStandardMaterial;
                        if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                            stdMat.emissive.setHex(0x000000);
                        }
                    }
                }
            });

            const intersects = raycaster.intersectObjects(meshes, false);
            console.log("Raycaster checked for intersections, found", intersects.length);
            if (intersects.length > 0) {
                let name = intersects[0].object.name;
                console.log("Object name:", name);

                intersects[0].object.parent?.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        // Only set emissive if material supports it
                        const material = mesh.material;
                        if (Array.isArray(material)) {
                            material.forEach(mat => {
                                const stdMat = mat as THREE.MeshStandardMaterial;
                                if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                                    stdMat.emissive.setHex(0x775555);
                                }
                            });
                        } else if ('emissive' in material && typeof (material as any).emissive?.setHex === 'function') {
                            const stdMat = material as THREE.MeshStandardMaterial;
                            if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                                stdMat.emissive.setHex(0x775555);
                            }
                        }
                    }
                });
                infotext.value = (modelle.value[name]?.getName(locale.value) + '<br /><br />' + modelle.value[name]?.getDescription(locale.value))
                    || t('all_models_description');
            } else {
                console.log("No intersections found");
                infotext.value = t('all_models_description');
            }
        });

        infotext.value = t('all_models_description');
        // Add useI18n import and t extraction at the top of the script setup
        // (Assuming <script setup lang="ts">)




    } else {
        let entry = modelle.value[model];
        ModelFetcher.getModels().then(models => {
            let object = models[model];
            scene.add(object);
        })
        cameraControls.target.set(entry.breite / 2, entry.hoehe / 2, -entry.tiefe / 2);
        camera.position.set(entry.breite * 2, entry.hoehe * .6, entry.tiefe);

        infotext.value = modelle.value[model].getDescription(locale.value);

    }
    // Add illumination to the scene

    addLight(scene)

    scene.background = new THREE.Color(0xdde3dd);

    renderer.setAnimationLoop(animate);
    cameraControls.update();

    function animate() {
        cameraControls.update();
        renderer.render(scene, camera);
    }
});

onUnmounted(() => {
    console.log("Orbit.vue unmounted");
    try {
        renderer.dispose();
        renderer.setAnimationLoop(null);
    } catch (e) {
        console.warn("Error while disposing renderer:", e);
    }
});
</script>

<style scoped>
#orbit-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
