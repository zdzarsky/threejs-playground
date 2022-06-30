import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { AmbientLight, DirectionalLight, LineDashedMaterial, MeshPhongMaterial, PointLight } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);

const phongMaterial = new MeshPhongMaterial({
	color: 0x00ff00,
})

const lambertMaterial = new THREE.MeshLambertMaterial({
	color: 0xffffff,
})
const isPhong = true;

const material = isPhong ? phongMaterial : lambertMaterial;


new GLTFLoader().load('/assets/gltf/robot/scene.gltf', function(gltf) {
	scene.add(gltf.scene);
})
//
// const mesh = new THREE.Mesh(
// 	new THREE.SphereGeometry(1, 100, 100),
// 	material
// );
// mesh.position.y = 1.5
// mesh.receiveShadow = true;
// mesh.castShadow = true;
//
// scene.add(mesh)

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 10, 10, 10),
	lambertMaterial,
)

plane.rotation.x = -Math.PI / 2;

scene.add(plane)
plane.receiveShadow = true;



const ambientLight = new AmbientLight(0xffffff, 0.01);

scene.add(ambientLight);

const light = new DirectionalLight(0xffffff, 1);
light.position.set(0, 25, 25)
light.rotation.set(-Math.PI / 2, 0, 0)
light.castShadow = true;

scene.add(light)

const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.y = 5;
camera.position.x = 5
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

new OrbitControls(camera, renderer.domElement);


const render = function() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


document.body.appendChild(renderer.domElement);

render();