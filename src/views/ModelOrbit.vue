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

const route = useRoute();
const { model } = route.params as { model: string };
const modelle: Ref<JsonFile<ModelJson>> = ref({});

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

    window.addEventListener("resize", e => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    let cameraControls = new OrbitControls(camera, renderer.domElement);

    //cameraControls.update();

    const loader = new GLTFLoader();
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


        for (let key in modelle.value) {

            let file = modelle.value[key].path
            //console.log(modelle.value);
            // Load each model and position them in a grid
            await loader.loadAsync(file).then((gltf: GLTF) => {
                let object = gltf.scene;

                frontSideOnly(object);

                // Positioning logic for grid layout
                let lat = -(modelle.value[key].latitude - latAvg) * latFactor;
                let lng = (modelle.value[key].longitude - lngAvg) * lngFactor;
                let rot = Math.PI * modelle.value[key].rotation / 180.;

                object.translateX(lng);
                object.translateZ(lat);
                object.rotateY(rot);

                scene.add(object);
                let sphere = new THREE.SphereGeometry(0.1, 16, 16);
                let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                let marker = new THREE.Mesh(sphere, material);
                marker.position.set(lng, 0, lat);
                scene.add(marker);
            });
        }
        camera.position.set(-20, 33, -90);
        //cameraControls.target.set(0, 0, 0);

        //let sphere = new THREE.SphereGeometry(0.3, 16, 16);
        //let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        //let marker = new THREE.Mesh(sphere, material);
        //marker.position.set(0, 0, 0);
        //scene.add(marker);
    } else {
        let entry = modelle.value[model];
        let file = entry.path;
        loader.loadAsync(file).then((gltf: GLTF) => {
            let object = gltf.scene;

            frontSideOnly(object);

            scene.add(object);
        })
        cameraControls.target.set(entry.breite / 2, entry.hoehe / 2, -entry.tiefe / 2);
        camera.position.set(entry.breite * 2, entry.hoehe * .6, entry.tiefe);
    }
    // Add illumination to the scene

    addLight(scene)

    scene.background = new THREE.Color(0xdde3dd);

    renderer.setAnimationLoop(animate);
    cameraControls.update();

    function animate() {
        cameraControls.update();
        console.log(camera.position);
        console.log(cameraControls.target);
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
