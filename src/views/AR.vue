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
import { toastController } from '@ionic/vue';
import { load_json } from '@/func/modelle_json';

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.001, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const scene = new THREE.Scene();
const locar = new LocAR.LocationBased(scene, camera);
const cam = new LocAR.Webcam({
    video: {
        facingMode: "environment"
    }
});



async function toast(text: string) {
    const toast = await toastController.create({
        message: text,
        duration: 1500,
        position: 'bottom',
    });

    await toast.present();
}

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
            //smoothingFactor: 0.1
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
            const loader = new GLTFLoader();

            let diff_for_uni = [0, 0]
            let diff_for_meckelfeld = [0, 0]


            // Ort - Horneburg
            diff_for_uni[0] = 10.006360171632716 - 9.5873684507624617;
            diff_for_uni[1] = 53.54025627076634 - 53.509736171441112;

            diff_for_meckelfeld[0] = 10.0282 - 9.5873684507624617;
            diff_for_meckelfeld[1] = 53.4174 - 53.509736171441112;

            let liste = await load_json()

            for (let name in liste) {
                let obj = liste[name];

                loader.loadAsync(obj.path).then((gltf: GLTF) => {
                    let object = gltf.scene;

                    object.rotation.y = Math.PI * obj.rotation / 180; // Rotate 180 degrees
                    locar.add(object,
                        obj.longitude + diff_for_uni[0],
                        obj.latitude + diff_for_uni[1],
                        -1.5); // Uni
                    locar.add(object.clone(),
                        obj.longitude + diff_for_meckelfeld[0],
                        obj.latitude + diff_for_meckelfeld[1],
                        -1.5); // Meckelfeld
                    locar.add(object.clone(), obj.longitude, obj.latitude, -1.5); // Horneburg

                    // Add illumination to the scene
                    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
                    scene.add(ambientLight);

                    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
                    directionalLight.position.set(100, 200, 100);
                    scene.add(directionalLight);
                    console.log(object);
                }).catch((err: Error) => {
                    console.error('An error happened while loading the FBX model.', err);
                });
            }

            firstLocation = false;
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
    locar.stopGps();
    renderer.setAnimationLoop(null);
    cam.dispose();
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
