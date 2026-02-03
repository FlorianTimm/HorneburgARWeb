<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/orbit"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ modelle ? (model == 'alle' ? 'Alle Modelle' : modelle[model]?.name) : '' }}</ion-title>
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
import get from 'axios';
import { ref } from 'vue';
import { ModelleJson } from '@/func/modelle_json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { model } = route.params as { model: string };
const modelle: Ref<ModelleJson> = ref({});

onMounted(async () => {
    await get('/modelle/modelle.json').then(response => {
        modelle.value = response.data;
    });
    console.log("Orbit.vue mounted");

    const container = document.getElementById('orbit-container');

    if (!container) {
        console.error("Orbit container not found");
        return;
    }

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    window.addEventListener("resize", e => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    let cameraControls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(10, 2, 12);
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
            loader.loadAsync(file).then((gltf: GLTF) => {
                let object = gltf.scene;

                object.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        if (Array.isArray(mesh.material)) {
                            mesh.material.forEach((material) => {
                                material.side = THREE.FrontSide;
                            });
                        } else {
                            mesh.material.side = THREE.FrontSide;
                        }
                    }
                });


                // Positioning logic for grid layout
                let lat = -(modelle.value[key].latitude - latAvg) * latFactor;
                let lng = (modelle.value[key].longitude - lngAvg) * lngFactor;
                let rot = Math.PI * (270 - modelle.value[key].rotation) / 180.;

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
        camera.position.set(10, 100, -5);
        //cameraControls.target.set(0, 0, 0);

        let sphere = new THREE.SphereGeometry(0.3, 16, 16);
        let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        let marker = new THREE.Mesh(sphere, material);
        marker.position.set(0, 0, 0);
        scene.add(marker);
    } else {

        let file = modelle.value[model].path
        console.log(modelle.value);
        loader.loadAsync(file).then((gltf: GLTF) => {

            //const loader = new OBJLoader();
            //loader.loadAsync('backhausv.obj').then((object: THREE.Group) => {

            let object = gltf.scene;

            object.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((material) => {
                            material.side = THREE.FrontSide;
                        });
                    } else {
                        mesh.material.side = THREE.FrontSide;
                    }
                }
            });

            object.translateX(-5);
            object.translateY(-3);
            object.translateZ(4);
            scene.add(object);
        })
    }
    // Add illumination to the scene

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(100, 200, 100);
    scene.add(directionalLight);
    scene.background = new THREE.Color(0xAAAAAA);

    renderer.setAnimationLoop(animate);
    cameraControls.update();

    function animate() {
        cameraControls.update();
        renderer.render(scene, camera);
    }
});

onUnmounted(() => {
    console.log("Orbit.vue deactivated");

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
