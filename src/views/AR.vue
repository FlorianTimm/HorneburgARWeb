<template>

    <Header :type="'ar'">
        <template #left>
            <button @click="$router.push('/#main')"><img src="@/assets/icons/close.svg" :title="t('close')"></button>
        </template>
        <template #center>
            <h1>{{ t('armode') }} </h1>
        </template>
        <template #right>
            <button @click="reload()"><img src="@/assets/icons/reload.svg" :title="t('reload')"></button>
        </template>
    </Header>

    <main>
        <canvas id="ar-container"></canvas>

        <Infobox :header="infobox_header" :text="infotext" />

        <div v-if="ar_overlay" id="ar_overlay">
            <button id="ar_close" @click="ar_overlay = false"><img src="@/assets/icons/close.svg"
                    :button="t('close')"></button>
            <h4>{{ t('ar_overlay_header') }}</h4>
            <table>
                <tbody>
                    <tr>
                        <td><img src="@/assets/icons/left_right.svg" :alt="t('ar_overlay_instruction_1')"></td>
                        <td>{{ t('ar_overlay_instruction_1') }}</td>
                    </tr>
                    <tr>
                        <td><img src="@/assets/icons/reload.svg" :alt="t('ar_overlay_instruction_2')"></td>
                        <td>{{ t('ar_overlay_instruction_2') }}</td>
                    </tr>
                    <tr>
                        <td><img src="@/assets/icons/house.svg" :alt="t('ar_overlay_instruction_3')"></td>
                        <td>{{ t('ar_overlay_instruction_3') }}</td>
                    </tr>
                </tbody>
            </table>
            <button id="ar_start" @click="ar_overlay = false">{{ t('ar_start') }}</button>
        </div>
    </main>

</template>

<script setup lang="ts">
import { App, type LocAR } from 'locar';
import { onMounted, onUnmounted } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { toast } from '@/func/toast';
import { addLight, getDistance, modelSelector } from '@/func/threed';
import { ref } from 'vue';
import { ModelFetcher } from '@/func/modelFetcher';

import Header from '@/components/Header.vue';
import Infobox from '@/components/Infobox.vue';

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

let locar: LocAR;

let infotext = ref("");
let infobox_header = ref("");
let ar_overlay = ref(true);

onMounted(async () => {

    let container = document.getElementById('ar-container') as HTMLCanvasElement;
    if (!container) {
        console.error("AR container not found");
        return;
    }

    const app = new App({
        cameraOptions: { hFov: 80, near: 0.001, far: 1000 },
        gpsOptions: { gpsMinDistance: 1.5 },
        canvas: container
    });

    let firstLocation = true;

    locar = await app.start();

    locar.on("gpserror", error => {
        toast(`GPS Fehler: Code ${error.code}`);
    });


    locar.on("gpsupdate", async (ev: { position: GeolocationPosition }, distMoved: number) => {
        toast(`GPS Update: Lat ${ev.position.coords.latitude.toFixed(6)}, Lon ${ev.position.coords.longitude.toFixed(6)}, Accuracy ${ev.position.coords.accuracy}m`);
        if (firstLocation) {
            firstLocation = false;
            loadModels(ev);
        }
    });

    if (window.location.search.includes("debug")) {
        console.debug("Debug mode: Simulating GPS location");
        locar.fakeGps(53.54025627076634, 10.006360171632716);
    }

    modelSelector(document.getElementById('ar-container')!, app.camera, app.scene, async (name) => {
        console.log("Model selected:", name);
        let liste = await ModelJson.load_json()
        let ganzerName = liste[name]?.getName(locale.value);
        if (ganzerName) {
            toast(ganzerName);
        }
        infobox_header.value = ganzerName || '';
        infotext.value = liste[name]?.getDescription(locale.value) || '';
    }, () => {
        console.log("No model selected");
        infobox_header.value = '';
        infotext.value = '';
    });

    locar.startGps();

    async function loadModels(ev: { position: GeolocationPosition }) {
        let liste = await ModelJson.load_json();

        const { diffLat, diffLong, nearest } = debugPositions(ev);
        if (nearest)
            toast(`Nächster Standort: ${nearest.name}`);

        for (let name in liste) {
            let obj = liste[name];

            if (!obj) continue;


            let object = await ModelFetcher.getModel(name);
            object.rotation.y = Math.PI * obj.rotation / 180;

            locar.add(object,
                obj.longitude + diffLong,
                obj.latitude + diffLat,
                -1.5);
        }
        ;
        // Add illumination to the scene
        addLight(app.scene)
    }

    function debugPositions(ev: { position: GeolocationPosition }) {
        const locations: {
            name: string;
            longitude: number;
            latitude: number;
            diffLong: number;
            diffLat: number;
        }[] = [
                {
                    name: 'Uni',
                    longitude: 10.006360171632716,
                    latitude: 53.54025627076634,
                    diffLong: 10.006360171632716 - 9.5873684507624617,
                    diffLat: 53.54025627076634 - 53.509736171441112
                },
                {
                    name: 'Meckelfeld',
                    longitude: 10.0282,
                    latitude: 53.4174,
                    diffLong: 10.0282 - 9.5873684507624617,
                    diffLat: 53.4174 - 53.509736171441112
                },
                {
                    name: 'Horneburg',
                    longitude: 9.5873684507624617,
                    latitude: 53.509736171441112,
                    diffLong: 0,
                    diffLat: 0
                }
            ];

        const userLat = ev.position.coords.latitude;
        const userLon = ev.position.coords.longitude;

        let diffLat = 0;
        let diffLong = 0;

        // Find nearest location
        let nearest = locations[0];


        let minDist = getDistance(userLat, userLon, locations[0]?.latitude ?? 0, locations[0]?.longitude ?? 0);
        for (let i = 1; i < locations.length; i++) {
            const dist = getDistance(userLat, userLon, locations[i]?.latitude ?? 0, locations[i]?.longitude ?? 0);
            if (dist < minDist) {
                minDist = dist;
                nearest = locations[i];
            }
        }

        if (nearest) {
            diffLat = nearest.diffLat;
            diffLong = nearest.diffLong;
        }
        return { diffLat, diffLong, nearest };
    }
});


function reload() {
    window.location.reload();
}

onUnmounted(() => {
    // Clean up resources, event listeners, etc. if needed
    console.log("AR.vue deactivated");

    let video = document.querySelector("video");
    if (video) {
        video.pause();
        video.srcObject = null;
        document.body.removeChild(video);
    }

    if (locar) {
        locar.startGps()
        locar = null as any;
    }

});

</script>

<style scoped>
#header {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

}

#ar-container {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}

#ar_overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 90%;
    max-width: 30em;
    max-height: 90%;
    overflow-y: auto;
    background-color: rgba(255, 255, 255);
    padding: 1.3em;
    border-radius: 0.25em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    text-align: left;
    font-weight: 400;
}

#ar_overlay h4 {
    margin-bottom: 1em;
}

#ar_overlay #ar_close {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    font-size: 1em;
    cursor: pointer;
}

#ar_overlay table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0.9375em;
}

#ar_overlay table td {
    padding: 1em;
    vertical-align: middle;
    line-height: 1.5;
}

#ar_overlay table td img {
    width: 2em;
    height: 2em;
}

#ar_overlay #ar_start {
    display: block;
    width: 100%;
    padding: 1.25em;
    background-color: #4A594A;
    color: white;
    border: none;
    border-radius: 0.1em;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
}
</style>

<style>
video {
    z-index: 5 !important;
}
</style>