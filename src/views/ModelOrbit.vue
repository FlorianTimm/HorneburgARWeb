<template>
    <DefaultPage>
        <template #header_left>
            <button @click="$router.push('/orbit')">&#8592;</button>
        </template>
        <template #header_center>
            <h1>{{ modelle ? (model == 'alle' ? $t('all_models') : modelle[model]?.getName($i18n.locale)) : '' }}
            </h1>
        </template>
        <template #header_right>
            <button @click="vorheriges()">&#8592;</button>
            <button @click="naechstes()">&#8594;</button>
        </template>
        <template #main>
            <div id="orbit-container"></div>
        </template>
    </DefaultPage>
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
import { useI18n } from 'vue-i18n';
import { ModelFetcher } from '@/func/modelFetcher';
import DefaultPage from '@/components/DefaultPage.vue';
import router from '@/router'

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

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.001, 1000);

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();


    function freeSpaceForOverlay() {
        if (!container) return;
        if (container.clientWidth > 1000) {
            infobox.value = true;
            camera.setViewOffset(container.clientWidth, container.clientHeight, 0 + container.clientWidth / 10, 0, container.clientWidth + container.clientWidth / 10, container.clientHeight);
        }
        else {
            camera.setViewOffset(container.clientWidth, container.clientHeight, 0, 0, container.clientWidth, container.clientHeight);
        }
    }

    freeSpaceForOverlay();

    window.addEventListener("resize", e => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        freeSpaceForOverlay();
    });

    let cameraControls = new OrbitControls(camera, renderer.domElement);

    //cameraControls.update();
    console.log("Model:", model);
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
        console.log('Mittelwert Latitude:', latAvg, 'Mittelwert Longitude:', lngAvg);

        let lngFactor = 2. * 6370000. * Math.cos(latAvg / 180. * Math.PI) * Math.PI / 360. * 1.1;
        let latFactor = 2. * 6370000. * Math.PI / 360. * 1.1;

        console.log('Längengrad Faktor:', lngFactor, 'Breitengrad Faktor:', latFactor);


        for (let key in modelle.value) {
            ModelFetcher.getModel(key).
                then(object => {
                    let model = modelle.value[key];
                    if (!model) {
                        console.warn(`Model ${key} not found in modelle.json, skipping.`);
                        return;
                    }

                    let lat = -(model.latitude - latAvg) * latFactor;
                    let lng = (model.longitude - lngAvg) * lngFactor;
                    let rot = Math.PI * (model.rotation) / 180.;

                    object.translateX(lng);
                    object.translateZ(lat);
                    object.rotateY(rot);

                    scene.add(object);
                    console.log(`Model ${key} loaded and added to scene at lat: ${lat}, lng: ${lng}, rot: ${rot}`);
                }).catch(e => {
                    console.error(`Error loading model ${key}:`, e);
                });
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

function vorheriges() {

    let index = -1;
    let keys = Object.keys(modelle.value);
    if (model != 'alle') {
        index = keys.indexOf(model);
    }

    for (; ;) {
        index--;
        if (index < -1) {
            index = keys.length - 1;
            break;
        }

        if (index == -1 || (index >= 0 && index < keys.length && modelle.value[keys[index] ?? '']?.show_in_list)) {
            break;
        }
    }

    if (index >= 0 && index < keys.length) {
        let nextModel = keys[index];
        router.push(`/orbit/${nextModel}`);
    } else {
        router.push(`/orbit/alle`);
    }
}

function naechstes() {
    let index = -1;
    let keys = Object.keys(modelle.value);
    if (model != 'alle') {
        index = keys.indexOf(model);
    }

    for (; ;) {
        index++;

        if (index >= keys.length) {
            index = -1;
            break;
        }

        if (index == -1 || (index >= 0 && index < keys.length && modelle.value[keys[index] ?? '']?.show_in_list)) {
            break;
        }
    }

    if (index >= 0 && index < keys.length) {
        let nextModel = keys[index];
        router.push(`/orbit/${nextModel}`);
    } else {
        router.push(`/orbit/alle`);
    }
}

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
}
</style>
