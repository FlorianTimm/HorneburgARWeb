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
        <canvas id="ar-container">

        </canvas>
        <div id="error">
            <div>
                <img src="../assets/grafiken/burginsel.gif" />
                <h3>{{ t('ar_error', { distance: distanceToCastle }) }}</h3>
                <router-link to="/orbit" id="link" class="arrow_in_front">{{ t('ar_alternative') }}</router-link>
                <router-link to="/#main" id="zumstart">{{ t('ar_error_back') }}</router-link>

                <a @click="beamMeToHorneburg()" id="beaming">{{ t('ar_error_teleport') }}</a>
            </div>
        </div>
        <Infobox :header="infobox_header" :text="infotext" />

        <div v-if="ar_instruction_overlay && geo_permission == 'granted'" class="ar_overlay">
            <button id="ar_close" @click="ar_instruction_overlay = false"><img src="@/assets/icons/close.svg"
                    :button="t('close')"></button>
            <h4>{{ t('ar_overlay_header') }}</h4>
            <table>
                <tbody>
                    <tr>
                        <td><img src="@/assets/icons/left_right.svg" :alt="t('ar_overlay_instruction_1')"></td>
                        <td>{{ t('ar_overlay_instruction_1') }}</td>
                    </tr>
                    <tr>
                        <td><img src="@/assets/icons/footprints.svg" :alt="t('ar_overlay_instruction_2')"></td>
                        <td>{{ t('ar_overlay_instruction_2') }}</td>
                    </tr>
                    <tr>
                        <td><img src="@/assets/icons/house.svg" :alt="t('ar_overlay_instruction_3')"></td>
                        <td>{{ t('ar_overlay_instruction_3') }}</td>
                    </tr>
                    <tr>
                        <td><img src="@/assets/icons/reload.svg" :alt="t('ar_overlay_instruction_4')"></td>
                        <td>{{ t('ar_overlay_instruction_4') }}</td>
                    </tr>
                </tbody>
            </table>
            <button id="ar_start" @click="ar_instruction_overlay = false">{{ t('ar_start') }}</button>
        </div>

        <div v-if="geo_permission != 'granted' || webcam_permission != 'granted'" class="ar_overlay">
            <h4>{{ t('ar_permission_header') }}</h4>
            <p v-if="geo_permission != 'denied' && webcam_permission != 'denied'">{{ t('ar_permission_start') }}</p>
            <p v-else>{{ t('ar_permission_decline') }}</p>
            <button v-if="geo_permission != 'denied' && webcam_permission != 'denied'" id="ar_start"
                @click="startAR()">{{
                    t('ar_start_permissions')
                }}</button>
            <router-link to="/orbit" id="link" class="arrow_in_front">{{ t('ar_alternative') }}</router-link>
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
let app: App;

let infotext = ref("");
let infobox_header = ref("");
let ar_instruction_overlay = ref(false);
let geo_permission = ref<PermissionState>('prompt');
let webcam_permission = ref<PermissionState>('prompt');
let distanceToCastle = ref(t('ar_distance_placeholder'));

let diffLat = 0;
let diffLong = 0;

let firstLocation = true;

onMounted(async () => {
    firstLocation = true;
    diffLat = 0;
    diffLong = 0;
    navigator.permissions.query({ name: "geolocation" }).then(result => {
        geo_permission.value = result.state;
        if (result.state === "granted" && webcam_permission.value === "granted") {
            startAR();
        }
    });
    (await navigator.permissions.query({ name: "geolocation" })).addEventListener('change', function () {
        console.log("Geolocation permission state changed:", this.state);
        geo_permission.value = this.state;
        if (this.state === "granted" && webcam_permission.value === "granted") {
            startAR();
        }
    });

    navigator.permissions.query({ name: "camera" }).then(result => {
        webcam_permission.value = result.state;
        if (result.state === "granted" && geo_permission.value === "granted") {
            startAR();
        }
    });
    (await navigator.permissions.query({ name: "camera" })).addEventListener('change', function () {
        console.log("Camera permission state changed:", this.state);
        webcam_permission.value = this.state;
        if (this.state === "granted" && geo_permission.value === "granted") {
            startAR();
        }
    });

});

function checkARSupport() {
    if (!('xr' in navigator)) {
        toast("WebXR wird von diesem Gerät nicht unterstützt.");
        return false;
    }
    return true;
}

async function startAR() {
    if (!checkARSupport()) {
        console.error("AR not supported on this device");
        return;
    }

    let container = document.getElementById('ar-container') as HTMLCanvasElement;
    if (!container) {
        console.error("AR container not found");
        return;
    }

    app = new App({
        cameraOptions: { hFov: 80, near: 0.001, far: 1000 },
        gpsOptions: { gpsMinDistance: 1.5 },
        canvas: container
    });
    locar = await app.start();

    locar.on("gpserror", error => {
        toast(`GPS Fehler: Code ${error.code}`);
        //document.getElementById("error")!.style.visibility = "visible";
        geo_permission.value = 'denied';
    });

    locar.on("gpsupdate", async (ev: { position: GeolocationPosition }, distMoved: number) => {
        gpsUpdate(ev, distMoved);
    });

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

    ar_instruction_overlay.value = true;
};

async function loadModels() {
    let liste = await ModelJson.load_json();

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

    addLight(app.scene)
}


function gpsUpdate(ev: { position: GeolocationPosition }, distMoved: number) {
    let dist = getDistance(ev.position.coords.latitude - diffLat, ev.position.coords.longitude - diffLong, 53.509736171441112, 9.5873684507624617);

    console.log(`Entfernung zur Burginsel: ${dist}m`);
    if (dist > 1500) {
        distanceToCastle.value = (dist / 1000).toFixed(1) + " km";
        document.getElementById("error")!.style.visibility = "visible";
    } else if (dist > 300) {
        distanceToCastle.value = Math.round(dist) + " m";
        document.getElementById("error")!.style.visibility = "visible";
    }
    else {
        document.getElementById("error")!.style.visibility = "hidden";

        if (firstLocation) {
            firstLocation = false;
            loadModels();
        }
    }
}

function reload() {
    window.location.reload();
}

onUnmounted(() => {
    // Clean up resources, event listeners, etc. if needed
    console.log("AR.vue deactivated");

    stop()
});

function stop() {
    let video = document.querySelector("video");
    if (video) {
        video.pause();
        video.srcObject = null;
        document.body.removeChild(video);
    }

    if (locar) {
        locar.stopGps();
        locar = null as any;
    }
}

function beamMeToHorneburg() {
    let pos = locar.getLastKnownLocation()
    if (!pos) {
        toast("Aktuelle Position unbekannt. Teleportation fehlgeschlagen.");
        return;
    }
    diffLat = pos.latitude - 53.50970522;
    diffLong = pos.longitude - 9.58754553;
    gpsUpdate({ position: { coords: { latitude: pos.latitude, longitude: pos.longitude, accuracy: 10 } } } as any, 0);
}

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

.ar_overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(calc(-50% + 2em));
    width: 90%;
    max-width: 30em;
    max-height: calc(100% - 5em);
    overflow-y: auto;
    background-color: rgba(255, 255, 255);
    padding: 1.3em;
    border-radius: 0.25em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 15;
    text-align: left;
    font-weight: 400;
}

.ar_overlay h4 {
    margin-bottom: 1em;
}

.ar_overlay #ar_close {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    font-size: 1em;
    cursor: pointer;
}

.ar_overlay table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0.9375em;
}

.ar_overlay table td {
    padding: 1em;
    vertical-align: middle;
    line-height: 1.5;
}

.ar_overlay table td img {
    width: 2em;
    height: 2em;
}

.ar_overlay #ar_start,
#error #zumstart {
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


#error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: #EBEDE9;
    justify-content: center;
    align-items: center;
    visibility: hidden;
}

#error>div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(calc(-50% + 2em));
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
}

#error img {
    width: 4em;
    height: auto;
    margin: 0 auto;
    filter: invert()
}

#beaming {
    color: #777;
    font-size: 0.7em;
    line-height: 110%;
    cursor: pointer;
}
</style>

<style>
video {
    z-index: 5 !important;
}
</style>