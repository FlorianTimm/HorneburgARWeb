<template>
    <h2>{{ modelle ? (model == 'alle' ? $t('all_models') : modelle[model]?.getName($i18n.locale)) :
        ''
    }}</h2>
    <div id="orbit-container"></div>
    <!--   </ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="infobox = !infobox; autoActivated = false;">
                <ion-icon v-if="infobox" :icon="chevronDown"></ion-icon>
                <ion-icon v-else :icon="chevronUp"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-card v-if="infobox"
            style="position:absolute; bottom: 80px; top: 70px;  right: 0px; padding: 12px; width: 300px; max-width: 90%; z-index: 1000; background-color: rgba(255, 255, 255, 0.9);">
            <div v-html="infotext"></div>
        </ion-card>
    </ion-page> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { type JsonFile } from '@/func/json';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import { addLight, modelSelector } from '@/func/threed';
import { chevronUp, chevronDown } from 'ionicons/icons';
import { useI18n } from 'vue-i18n';
import { ModelFetcher } from '@/func/modelFetcher';

const { t, locale } = useI18n();

const route = useRoute();
const { model } = route.params as { model: string };
const modelle: Ref<JsonFile<ModelJson>> = ref({});
let infobox = ref(false);
let autoActivated = ref(false);
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
            latSum += modelle.value[key]?.latitude ?? 0;
            lngSum += modelle.value[key]?.longitude ?? 0;
            count++;
        }
        const latAvg = count > 0 ? latSum / count : 0;
        const lngAvg = count > 0 ? lngSum / count : 0;
        //console.log('Mittelwert Latitude:', latAvg, 'Mittelwert Longitude:', lngAvg);

        let lngFactor = 2. * 6370000. * Math.cos(latAvg / 180. * Math.PI) * Math.PI / 360. * 1.1;
        let latFactor = 2. * 6370000. * Math.PI / 360. * 1.1;

        //console.log('Längengrad Faktor:', lngFactor, 'Breitengrad Faktor:', latFactor);


        for (let key in modelle.value) {
            let object = await ModelFetcher.getModel(key);

            // Positioning logic for grid layout
            let lat = -(modelle.value[key]?.latitude ?? 0 - latAvg) * latFactor;
            let lng = (modelle.value[key]?.longitude ?? 0 - lngAvg) * lngFactor;
            let rot = Math.PI * (modelle.value[key]?.rotation ?? 0) / 180.;

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


        };
        camera.position.set(-20, 33, -90);
        //cameraControls.target.set(0, 0, 0);

        //let sphere = new THREE.SphereGeometry(0.3, 16, 16);
        //let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        //let marker = new THREE.Mesh(sphere, material);
        //marker.position.set(0, 0, 0);
        //scene.add(marker);

        modelSelector(container, camera, scene, (name) => {
            console.log("Model selected:", name);
            infotext.value = (modelle.value[name]?.getName(locale.value) + '<br /><br />' +
                modelle.value[name]?.getDescription(locale.value)) || t('all_models_description');
            if (!infobox.value) {
                infobox.value = true;
                autoActivated.value = true;
            }
        }, () => {
            infotext.value = t('all_models_description');
            if (autoActivated.value) {
                infobox.value = false;
                autoActivated.value = false;
            }
        });

        infotext.value = t('all_models_description');


    } else {
        let entry = modelle.value[model];
        ModelFetcher.getModel(model).then(object => {
            scene.add(object);
        })
        cameraControls.target.set((entry?.breite ?? 0) / 2, (entry?.hoehe ?? 0) / 2, -(entry?.tiefe ?? 0) / 2);
        camera.position.set((entry?.breite ?? 0) * 2, (entry?.hoehe ?? 0) * .6, entry?.tiefe ?? 0);

        infotext.value = modelle.value[model]?.getDescription(locale.value) ?? '';

    }

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
    height: auto;
    overflow: hidden;
}
</style>
