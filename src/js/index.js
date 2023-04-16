import * as THREE from 'three';
// import * as dat from 'dat.gui';
import nebula from "../img/nebula.jpg";
import stars from "../img/stars.jpg";
// import stars2 from "../img/296702.jpg";
import stars2 from "../img/stars3.jpg";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([stars2,stars2, stars2, stars2, stars2, stars2]);

const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00});
const box= new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane= new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0xfff000, side: THREE.DoubleSide});
const sphere= new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.castShadow = true;

sphere.position.set(-5, 5, 10);

const ambienLight = new THREE.AmbientLight(0x333333);
scene.add(ambienLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.bottom = -30;s
directionalLight.shadow.camera.top = 20;

const gLightHelper =  new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(gLightHelper);

const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// const gui = new dat.GUI();

// const options = {
//     sphereColor: '#ffea00',
//     wireframe: true,
//     speed : 0.01
// }

// gui.addColor(options, 'sphereColor').onChange(function(e){
//     sphere.material.color.set(e);
// })

// gui.add(options, 'wireframe').onChange(function(e){
//     sphere.material.wireframe = e;
// })

// gui.add(options, 'speed', 0, 0.1);

let step = 0;
function animate(time){
    box.rotation.x += time/1000;
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    renderer.render(scene, camera);
}

// animate();

renderer.setAnimationLoop(animate);
