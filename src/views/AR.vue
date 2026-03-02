<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>HorneburgAR</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <div id="ar-container"></div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import * as THREE from 'three';
import * as LocAR from 'locar';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMounted, onUnmounted } from 'vue';
import { load_json } from '@/func/modelle_json';
import { toast } from '@/func/toast';
import { addLight, frontSideOnly, getDistance } from '@/func/threed';

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.001, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const scene = new THREE.Scene();
const locar = new LocAR.LocationBased(scene, camera);
const cam = new LocAR.Webcam({
    video: {
        facingMode: "environment"
    }
});

onMounted(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('ar-container')?.appendChild(renderer.domElement);

    window.addEventListener("resize", e => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
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
    });

    locar.on("gpsupdate", async ev => {
        toast(`GPS Update: Lat ${ev.position.coords.latitude.toFixed(6)}, Lon ${ev.position.coords.longitude.toFixed(6)}, Accuracy ${ev.position.coords.accuracy}m`);
        if (firstLocation) {
            firstLocation = false;
            const locations = [
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

            const loader = new GLTFLoader();

            let liste = await load_json()

            const userLat = ev.position.coords.latitude;
            const userLon = ev.position.coords.longitude;

            let diffLat = 0;
            let diffLong = 0;

            // Find nearest location
            let nearest = locations[0];
            let minDist = getDistance(userLat, userLon, locations[0].latitude, locations[0].longitude);
            for (let i = 1; i < locations.length; i++) {
                const dist = getDistance(userLat, userLon, locations[i].latitude, locations[i].longitude);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = locations[i];
                }
            }

            diffLat = nearest.diffLat;
            diffLong = nearest.diffLong;

            toast(`Nächster Standort: ${nearest.name}`);

            for (let name in liste) {
                let obj = liste[name];

                await loader.loadAsync(obj.path).then((gltf: GLTF) => {
                    let object = gltf.scene;
                    frontSideOnly(object);
                    object.rotation.y = Math.PI * obj.rotation / 180;

                    locar.add(object,
                        obj.longitude + diffLong,
                        obj.latitude + diffLat,
                        -1.5);
                }).catch((err: Error) => {
                    console.error('An error happened while loading the FBX model.', err);
                });
            }
            // Add illumination to the scene
            addLight(scene)
        }
    });


    locar.startGps();

    renderer.setAnimationLoop(animate);

    function animate() {
        deviceOrientationControls.update();
        renderer.render(scene, camera);
    }
});

onUnmounted(() => {
    // Clean up resources, event listeners, etc. if needed
    console.log("AR.vue deactivated");
    try {
        locar.stopGps();
        renderer.setAnimationLoop(null);
        cam.dispose();
    } catch (e) {
        console.warn("Error while stopping", e);
    }
});

</script>

<style scoped>
#ar-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
