import * as THREE from 'three';
import * as LocAR from 'locar';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.001, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const locar = new LocAR.LocationBased(scene, camera);

window.addEventListener("resize", e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


const cam = new LocAR.Webcam({
    video: {
        facingMode: "environment"
    }
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

// GPS status div
let div = document.createElement('div')
div.innerText = "GPS-Position ungenau oder nicht verfügbar";
div.style.position = 'absolute';
div.style.top = '20px';
div.style.color = 'red';
div.style.left = '50%';
div.style.transform = 'translateX(-50%)';
div.style.backgroundColor = 'white';
div.style.padding = '10px';
div.style.fontFamily = 'Arial, sans-serif';
div.style.zIndex = '1000';
document.body.appendChild(div);

locar.setGpsOptions({
    gpsMinDistance: 1.5 // meters
});

locar.on("gpserror", error => {
    alert(`GPS error: ${error.code}`);
    div.style.display = 'block';
    div.innerText += `GPS Fehler: Code ${error.code}`;
});

locar.on("gpsupdate", ev => {
    // if (ev.position.coords.accuracy <= 10) {
    //     div.style.display = 'none';
    //     div.innerText = "GPS-Position ungenau oder nicht verfügbar";
    // } else {
    div.style.display = 'block';
    div.innerText = `GPS Genauigkeit: ${ev.position.coords.accuracy} Meter`;
    div.innerText += `\nLat: ${ev.position.coords.latitude}\nLon: ${ev.position.coords.longitude}`;
    div.innerText += `\nBewegung: ${ev.distMoved} Meter`;
    div.innerText += `\nAltitude: ${ev.position.coords.altitude} Meter`;
    // }

    if (firstLocation) {
        console.log(`GPS position acquired: ${ev.position.coords.latitude}, ${ev.position.coords.longitude}`);
        const boxProps = [{
            latDis: 0.0005,
            lonDis: 0,
            colour: 0xff0000
        }, {
            latDis: -0.0005,
            lonDis: 0,
            colour: 0xffff00
        }, {
            latDis: 0,
            lonDis: -0.0005,
            colour: 0x00ffff
        }, {
            latDis: 0,
            lonDis: 0.0005,
            colour: 0x00ff00
        }];

        const geom = new THREE.BoxGeometry(10, 10, 10);

        for (const boxProp of boxProps) {
            const mesh = new THREE.Mesh(
                geom,
                new THREE.MeshBasicMaterial({ color: boxProp.colour })
            ) as THREE.Object3D;

            locar.add(
                mesh,
                ev.position.coords.longitude + boxProp.lonDis,
                ev.position.coords.latitude + boxProp.latDis
            );
        }

        // const loader = new FBXLoader();
        // loader.loadAsync('wohnhaus1.fbx').then((object: THREE.Group) => {

        const loader = new GLTFLoader();
        loader.loadAsync('wohnhaus1_neu.glb').then((gltf: GLTF) => {

            //const loader = new OBJLoader();
            //loader.loadAsync('backhausv.obj').then((object: THREE.Group) => {

            let object = gltf.scene;

            object.traverse(function (child: THREE.Object3D) {
                //object.traverse(function (child: THREE.Object3D) {
                console.log(typeof child);
                if (child.isMesh) {
                    let mesh = child as THREE.Mesh;
                    //mesh.material.side = THREE.DoubleSide;

                    //mesh.material = new THREE.MeshBasicMaterial({ color: 0xdddddd });

                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    console.log('FBX model loaded successfully.');
                }
            });
            //object.scale.set(100, 100, 100);
            object.rotation.y = Math.PI * 210 / 180; // Rotate 180 degrees
            locar.add(object, 10.006360171632716, 53.54025627076634, -1.5); // Uni
            locar.add(object.clone(), 10.0282, 53.4174, -1.5); // Meckelfeld
            locar.add(object.clone(), 9.5873684507624617, 53.509736171441112, -1.5); // Horneburg
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

        firstLocation = false;
    }
});




locar.startGps();

renderer.setAnimationLoop(animate);

function animate() {
    deviceOrientationControls.update();
    renderer.render(scene, camera);
}