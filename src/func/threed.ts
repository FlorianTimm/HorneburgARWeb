import * as THREE from 'three';

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


export function modelSelector(container: HTMLElement, camera: THREE.Camera, scene: THREE.Scene,
    foundCallback?: (name: string) => void,
    notFoundCallback?: () => void) {

    container.addEventListener("click", (event) => {
        let pointer = new THREE.Vector2();
        let raycaster = new THREE.Raycaster();
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);

        let meshes: THREE.Mesh[] = [];
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                meshes.push(child as THREE.Mesh);
                const mesh = child as THREE.Mesh;
                // Only reset emissive if material supports it
                const material = mesh.material;
                if (Array.isArray(material)) {
                    material.forEach(mat => {
                        // Typisierung für mat als MeshStandardMaterial erzwingen
                        const stdMat = mat as THREE.MeshStandardMaterial;
                        if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                            stdMat.emissive.setHex(0x000000);
                        }
                    });
                } else {
                    const stdMat = material as THREE.MeshStandardMaterial;
                    if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                        stdMat.emissive.setHex(0x000000);
                    }
                }
            }
        });

        const intersects = raycaster.intersectObjects(meshes, false);
        console.log("Raycaster checked for intersections, found", intersects.length);
        if (intersects.length > 0) {
            let name = intersects[0].object.name;
            console.log("Object name:", name);

            intersects[0].object.parent?.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    // Only set emissive if material supports it
                    const material = mesh.material;
                    if (Array.isArray(material)) {
                        material.forEach(mat => {
                            const stdMat = mat as THREE.MeshStandardMaterial;
                            if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                                stdMat.emissive.setHex(0x775555);
                            }
                        });
                    } else if ('emissive' in material && typeof (material as any).emissive?.setHex === 'function') {
                        const stdMat = material as THREE.MeshStandardMaterial;
                        if (stdMat.emissive && typeof stdMat.emissive.setHex === 'function') {
                            stdMat.emissive.setHex(0x775555);
                        }
                    }
                }
            });
            if (foundCallback) {
                foundCallback(name);
            }
        } else {
            if (notFoundCallback) {
                notFoundCallback();
            }
        }
    });
}