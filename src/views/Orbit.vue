<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/orbit"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ modelle ? modelle[model]?.name : '' }}</ion-title>
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

import { useRoute } from 'vue-router';

const route = useRoute();
const { model } = route.params as { model: string };

import axios from 'axios';
import { ref } from 'vue';
import { ModelleJson } from '@/func/modelle_json';
import type { Ref } from 'vue';

const modelle: Ref<ModelleJson> = ref({});

onMounted(async () => {
    await axios.get('/modelle/modelle.json').then(response => {
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
    let file = modelle.value[model].path
    console.log(modelle.value);
    loader.loadAsync(file).then((gltf: GLTF) => {

        //const loader = new OBJLoader();
        //loader.loadAsync('backhausv.obj').then((object: THREE.Group) => {

        let object = gltf.scene;

        object.translateX(-5);
        object.translateY(-3);
        object.translateZ(4);
        scene.add(object);
    })
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
