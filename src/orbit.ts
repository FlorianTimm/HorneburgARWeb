import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.createElement('div');
document.body.appendChild(container);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.001, 1000);

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
camera.position.set(6, 0, 10);
//cameraControls.update();

const loader = new GLTFLoader();
loader.loadAsync('wohnhaus1_neu.glb').then((gltf: GLTF) => {

    //const loader = new OBJLoader();
    //loader.loadAsync('backhausv.obj').then((object: THREE.Group) => {

    let object = gltf.scene;

    object.traverse(function (child: THREE.Object3D) {
        //object.traverse(function (child: THREE.Object3D) {
        if (child.isMesh) {
            let mesh = child as THREE.Mesh;
            mesh.material.side = THREE.DoubleSide;

            //mesh.material = new THREE.MeshBasicMaterial({ color: 0xdddddd });

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            console.log('FBX model loaded successfully.');
        }
    });
    object.translateX(-5);
    object.translateY(-2);
    object.translateZ(5);
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