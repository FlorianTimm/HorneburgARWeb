import * as THREE from 'three';

export function frontSideOnly(object: THREE.Object3D, name?: string) {
    object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            child.name = name || child.name;
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material) => {
                    material.side = THREE.FrontSide;
                });
            } else {
                mesh.material.side = THREE.FrontSide;
            }
        }
    });
}


export function addLight(scene: THREE.Scene) {
    const ambientLight = new THREE.AmbientLight(0xffeecc, 2.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffcc99, 3);
    directionalLight.position.set(100, 200, 100);
    scene.add(directionalLight);
}

// Haversine formula to calculate distance
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371e3; // metres
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}