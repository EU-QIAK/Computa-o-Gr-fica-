import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";

// ATUALIZAÇÂO 1.0.5 CHAT DEU UMA SALVADA NAS PROPORÇÕES

const defaultCameraPos = new THREE.Vector3(100, 100, 200);
const defaultTarget = new THREE.Vector3(0, 0, 0);

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "f") {
    camera.position.copy(defaultCameraPos);
    controls.target.copy(defaultTarget);
    controls.update();
  }
});

// Constante para escalar o universo
const SCALE = 1e-6;

// Cena, câmera, renderizador, controles
let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.5,
    3000 // menor far = mais precisão de profundidade
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

// Mercurio
const MercuryTexture = textureLoader.load("textures/Mercurio.jpg");
const MercuryGeometry = new THREE.SphereGeometry(0.38, 32, 32);
const MercuryMaterial = new THREE.MeshBasicMaterial({
    map: MercuryTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const MercuryMesh = new THREE.Mesh(MercuryGeometry, MercuryMaterial);
scene.add(MercuryMesh);

// Venus
const VenusTexture = textureLoader.load("textures/Venus.jpg");
const VenusGeometry = new THREE.SphereGeometry(0.95, 32, 32);
const VenusMaterial = new THREE.MeshBasicMaterial({
    map: VenusTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const VenusMesh = new THREE.Mesh(VenusGeometry, VenusMaterial);
scene.add(VenusMesh);


// Terra
const worldTexture = textureLoader.load("textures/small-world.jpg");
const worldGeometry = new THREE.SphereGeometry(1, 32, 32);
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
const cloudGeometry = new THREE.SphereGeometry(1.05, 32, 32);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true,
    depthTest: true,
    depthWrite: false
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);
// lua
// Textura da Lua
const moonTexture = textureLoader.load("textures/Lua.jpg");

// Grupo de órbita da Lua (orbita a Terra)
const moonOrbit = new THREE.Object3D();
moonOrbit.position.set(40, 0, 0); // Mesmo X da Terra
scene.add(moonOrbit);

// Criar a Lua
const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32); // Lua tem ~27% do tamanho da Terra
const moonMaterial = new THREE.MeshBasicMaterial({
    map: moonTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

// Posicionar a Lua ao redor da Terra (no raio da órbita)
moonMesh.position.set(2, 0, 0); // Distância da Terra (2 unidades)
moonOrbit.add(moonMesh);


// Marte
const marsTexture = textureLoader.load("textures/Marte.jpg");
const marsGeometry = new THREE.SphereGeometry(0.60, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({
    map: marsTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(marsMesh);

// Jupiter 
const JupiterTexture = textureLoader.load("textures/Jupiter.jpg");
const JupiterGeometry = new THREE.SphereGeometry(11.2, 32, 32);
const JupiterMaterial = new THREE.MeshBasicMaterial({
    map: JupiterTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const JupiterMesh = new THREE.Mesh(JupiterGeometry, JupiterMaterial);
scene.add(JupiterMesh);

// Saturno
const SaturnTexture = textureLoader.load("textures/Saturno.jpg");
const SaturnGeometry = new THREE.SphereGeometry(9.5, 32, 32);
const SaturnMaterial = new THREE.MeshBasicMaterial({
    map: SaturnTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const SaturnMesh = new THREE.Mesh(SaturnGeometry, SaturnMaterial);
scene.add(SaturnMesh);

// Aneis de Saturno
const SaturnRingTexture = textureLoader.load("textures/Anel_de_Saturno.png");
const SarturnRingGeometry = new THREE.RingGeometry(11, 16.5, 100); 
const SaturnRingmaterial = new THREE.MeshBasicMaterial({ 
    map: SaturnRingTexture,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: true,
    transparent: false,
});
const SaturnRingMesh = new THREE.Mesh(SarturnRingGeometry, SaturnRingmaterial);
SaturnRingMesh.rotation.x = -Math.PI / 2;
scene.add(SaturnRingMesh);


// Urano
const UranoTexture = textureLoader.load("textures/Uranos.jpg");
const UranoGeometry = new THREE.SphereGeometry(4, 32, 32);
const UranonMaterial = new THREE.MeshBasicMaterial({
    map: UranoTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const UranoMesh = new THREE.Mesh(UranoGeometry, UranonMaterial);
scene.add(UranoMesh);

// Netuno
const NeptuneTexture = textureLoader.load("textures/Netuno.jpg");
const NeptuneGeometry = new THREE.SphereGeometry(3.88, 32, 32);
const NeptuneMaterial = new THREE.MeshBasicMaterial({
    map: NeptuneTexture,
    depthTest: true,
    depthWrite: true,
    transparent: false
});
const NeptuneMesh = new THREE.Mesh(NeptuneGeometry, NeptuneMaterial);
scene.add(NeptuneMesh);


// OrbitControls
const controls = new OrbitControls(camera, render.domElement);
controls.minDistance = 1;
controls.maxDistance = 1500;
controls.enableDamping = true;

// Eixos de referência
scene.add(new THREE.AxesHelper(10));

// malha pra ajudar a localização do eixo
const gridHelper = new THREE.GridHelper(10000, 1500); 
scene.add(gridHelper);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.2;

// const gridHelper2 = new THREE.GridHelper(10000, 10000); 
// scene.add(gridHelper2);
// gridHelper2.material.transparent = true;
// gridHelper2.material.opacity = 0.15;

// Loop de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação e posição dos planetas
    MercuryMesh.position.x = 20;
    VenusMesh.position.x = 30;
    worldMesh.position.x = 40;
    cloudMesh.position.x = 40;
    marsMesh.position.x = 50;
    JupiterMesh.position.x = 75;
    SaturnMesh.position.x = 115;
    SaturnRingMesh.position.x = 115;
    UranoMesh.position.x = 150;
    NeptuneMesh.position.x = 180;

    worldMesh.rotation.y += 0.0005;
    cloudMesh.rotation.y -= 0.005;
    moonOrbit.rotation.y += 0.002;
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