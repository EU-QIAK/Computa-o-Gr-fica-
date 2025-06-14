import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";

// ATUALIZAÇÂO 1.0.5 CHAT DEU UMA SALVADA NAS PROPORÇÕES

// Constante para escalar o universo
const SCALE = 1e-6;

// Cena, câmera, renderizador, controles
let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    2000 // menor far = mais precisão de profundidade
);
camera.position.set(100, 100, 200); // equivalente a (100_000_000, 100_000_000, 200_000_000)

let render = new THREE.WebGLRenderer({ alpha: true, antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

// Loader de textura
const textureLoader = new THREE.TextureLoader();

// Universo (esfera gigante ao redor)
const universeTexture = textureLoader.load("textures/universe-texture.jpg");
const universeGeometry = new THREE.SphereGeometry(1000, 32, 32);
const universeMaterial = new THREE.MeshBasicMaterial({
    map: universeTexture,
    side: THREE.BackSide
});
const universeMesh = new THREE.Mesh(universeGeometry, universeMaterial);
scene.add(universeMesh);

// Sol
const sunTexture = textureLoader.load("textures/Sol.jpg");
const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.set(0, 0, 0);
scene.add(sunMesh);

// Terra
const worldTexture = textureLoader.load("textures/small-world.jpg");
const worldGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const worldMaterial = new THREE.MeshBasicMaterial({
    map: worldTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const worldMesh = new THREE.Mesh(worldGeometry, worldMaterial);
scene.add(worldMesh);

// Nuvens da Terra
const cloudTexture = textureLoader.load("textures/small-world-clouds.png");
const cloudGeometry = new THREE.SphereGeometry(0.905, 32, 32);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    depthTest: true,
    depthWrite: false
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// Marte
const marsTexture = textureLoader.load("textures/Marte.jpg");
const marsGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({
    map: marsTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(marsMesh);

// OrbitControls
const controls = new OrbitControls(camera, render.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;
controls.enableDamping = true;

// Eixos de referência
scene.add(new THREE.AxesHelper(10));

// malha pra ajudar a localização do eixo
const gridHelper = new THREE.GridHelper(10000, 1000); 
scene.add(gridHelper);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.3;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação e posição dos planetas
    worldMesh.position.x = 50;
    cloudMesh.position.x = 50;
    marsMesh.position.x = 30;

    worldMesh.rotation.y += 0.0005;
    cloudMesh.rotation.y -= 0.005;
    marsMesh.rotation.y += 0.0005;

    controls.update();
    render.render(scene, camera);
}

animate();


// teste pra eventos, NÂO ESTÁ FUNCIONANDO
// window.addEventListener("keydown", (event) => {
//   if (event.key.toLowerCase() === "f") {
//     // Resetar posição e alvo
//     camera.position.copy(defaultCameraPos);
//     controls.target.copy(defaultTarget);
//     controls.update();
//   }
// });