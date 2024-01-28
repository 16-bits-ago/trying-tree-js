import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width, sizes.height );

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const colors = [ 'yellow', 'green', 'blue', 'purple', 'orange', 'pink', 'brown', 'red' ];

const group = new THREE.Group();
const meshes = [];

for ( let x = -1.2; x <= 1.2; x = x + 1.2 ) {
    for ( let y = -1.2; y <= 1.2; y = y + 1.2 ) {
        const material = new THREE.MeshBasicMaterial({ 
            // задаем рандомно цвета кубикам
            color: colors[((Math.random() * 8) | 0) + 1], wireframe: true 
        });
        const mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set( 0.5, 0.5, 0.5 );
        mesh.position.set( x, y, 0 ); // - позиция каждого кубика в камере
        meshes.push( mesh );
    }
}

group.add(...meshes );
scene.add( group );

const clock = new THREE.Clock();

const MAX_SCALE = 3;
const MIN_SCALE = 0;
let grow = false;

function animate() {
    const deltaTime = clock.getDelta();

    meshes.forEach((mesh, index) => {
        const mult = index % 2 === 0 ? 1 : -1; // четные крутим влево, не четные вправо
        mesh.rotation.x += mult * deltaTime;
        mesh.rotation.y += mult * deltaTime * 0.4;
    });

    const elapsed = clock.getElapsedTime();
    camera.position.x = Math.sin( elapsed ); // - крутим камеру вокруг 
    camera.position.y = Math.cos( elapsed ); // - крутим камеру вокруг 
    camera.lookAt( new THREE.Vector3( 0, 0, 0 )); // - заставляем камеру смотреть в центр сцены

    const mult = grow ? 1 : -1;
    group.scale.x += mult * deltaTime * 0.2;
    group.scale.y += mult * deltaTime * 0.2;
    group.scale.z += mult * deltaTime * 0.2;

    if (grow && group.scale.x >= MAX_SCALE){
        grow = false;
    } else if (group.scale.x <= MIN_SCALE){
        grow = true;
    }

	requestAnimationFrame( animate ); 
	renderer.render( scene, camera );
}

animate();