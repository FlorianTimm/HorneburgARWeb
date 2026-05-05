<template>
    <div id="container">
        <Header>
            <template #left>
                <button @click="$router.push('/#main')">&#8592;</button>
            </template>
            <template #center>
                <h1>{{ $t('armode') }} </h1>
            </template>
            <template #right>
                <button @click="reload()">&#8635;</button>
            </template>
        </Header>

        <main>
            <div id="ar-container"></div>
        </main>

    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import * as LocAR from 'locar';
import { onMounted, onUnmounted } from 'vue';
import { ModelJson } from '@/func/modelle_json';
import { toast } from '@/func/toast';
import { addLight, getDistance, modelSelector } from '@/func/threed';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { ModelFetcher } from '@/func/modelFetcher';

import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

const { t, locale } = useI18n();

let renderer: THREE.WebGLRenderer;
let locar: LocAR.LocationBased;
let cam: LocAR.Webcam;

let infobox = ref(false);
let infotext = ref("");

onMounted(() => {

    let container = document.getElementById('ar-container');
    if (!container) {
        console.error("AR container not found");
        return;
    }

    const camera = new THREE.PerspectiveCamera(80, container.clientWidth / container.clientHeight, 0.001, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const scene = new THREE.Scene();
    locar = new LocAR.LocationBased(scene, camera);
    cam = new LocAR.Webcam({
        video: {
            facingMode: "environment"
        }
    });
    /*     toast({
            header: 'AR-Modus',
            subHeader: 'Dieser Modus ist für die Nutzung auf einem Smartphone gedacht. Bitte wechsle zu einem mobilen Gerät, um die AR-Funktionalität zu nutzen.',
            message: 'Falls du bereits auf einem Smartphone bist, könnte es sein, dass die Kamera-Berechtigungen nicht erteilt wurden. Bitte erlaube den Zugriff auf die Kamera, um fortzufahren.',
            buttons: ['Loslegen'],
        }).then(alert => alert.present()); */

    renderer.setSize(container.clientWidth, container.clientHeight);
    container?.appendChild(renderer.domElement);

    window.addEventListener("resize", e => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });

    cam.on("webcamstarted", ev => {
        scene.background = ev.texture;
    });

    cam.on("webcamerror", error => {
        alert(`Webcam error: code ${error.code} message ${error.message}`);
    });

    let firstLocation = true;

    const deviceOrientationControls = new LocAR.DeviceOrientationControls(camera,
        {
            smoothingFactor: 0.1,
            enablePermissionDialog: true

        }
    );

    deviceOrientationControls.on("deviceorientationgranted", ev => {
        ev.target.connect();
    });

    deviceOrientationControls.on("deviceorientationerror", error => {
        alert(`Device orientation error: code ${error.code} message ${error.message}`);
    });

    deviceOrientationControls.init();

    locar.setGpsOptions({
        gpsMinDistance: 1.5 // meters
    });

    locar.on("gpserror", error => {
        toast(`GPS Fehler: Code ${error.code}`);
        /*  alertController.create({
             header: 'GPS-Fehler',
             subHeader: 'Es gab ein Problem mit der GPS-Verbindung.',
             message: 'Bitte stelle sicher, dass GPS aktiviert ist und die App die notwendigen Berechtigungen hat.',
             buttons: ['OK']
         }).then(alert => alert.present()); */
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

    modelSelector(document.getElementById('ar-container')!, camera, scene, async (name) => {
        console.log("Model selected:", name);
        let liste = await ModelJson.load_json()
        let ganzerName = liste[name]?.getName(locale.value);
        if (ganzerName) {
            toast(ganzerName);
        }
    }, () => {
        console.log("No model selected");
        infotext.value = t('all_models_description');
    });


    locar.startGps();

    renderer.setAnimationLoop(animate);

    function animate() {
        deviceOrientationControls.update();
        renderer.render(scene, camera);
    }

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
        addLight(scene)
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
    try {
        if (renderer) renderer.setAnimationLoop(null);
        if (locar) locar.stopGps();
        if (cam) cam.dispose();
    } catch (e) {
        console.warn("Error while stopping", e);
    }
});

</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
}

header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
}

.left {
    display: flex;
    align-items: center;
}

.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

#ar-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
