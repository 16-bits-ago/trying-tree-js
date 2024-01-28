import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css';

const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const cursor = {
    x: 0,
    y: 0
}

const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width, sizes.height );

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement ); // управление объектом с помощью мыши
controls.enableDamping = true; // - сглаживание анимации

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial({ 
    color: 'purple', wireframe: true 
});

const mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );

window.addEventListener('mousemove', (event) => {
    //console.log(event.clientX, event.clientY); // - позиции мыши по Х and Y

    //console.log(event.clientX / sizes.width - 0.5); // - нормализация значений по единицу по Х
    //console.log(event.clientY / sizes.height - 0.5); // - нормализация значений по единицу по Y

    cursor.x = -(event.clientX / sizes.width - 0.5); // убираем инверсию по X с помощью -()
    cursor.y = event.clientY / sizes.height - 0.5;
})

const tick = () => {
    /* // камера следует за курсором
    camera.position.x = cursor.x * 2;
    camera.position.y = cursor.y * 2; */

    /* camera.position.x = Math.sin( cursor.x * Math.PI * 2) * 2; // - крутим камерy вокруг объекта
    camera.position.z = Math.cos( cursor.x * Math.PI * 2) * 2;
    camera.position.y = cursor.y * 2;

    camera.lookAt( mesh.position ); // - c этим параметром объект уже не следует за мишкой, а как будто крутится в направлении мыши */

    controls.update(); // - для правильной работы обновляем элементы управления в каждом кадре (тике отрисовки). Помогает также сглаживать анимацию
    renderer.render( scene, camera );
    requestAnimationFrame( tick ); 
}

tick();