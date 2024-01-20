import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene(); // СЦЕНА

/* const axesHelper = new THREE.AxesHelper( 3 ); // Отображение осей x, y, z идущих из центра сцены
scene.add( axesHelper ); */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Kameра которая летает вокруг нашего объекта. Чем дальше обхект, тем он меньше, как глаз человека
// 75 - поле зрения
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );

// Эта строка создает новый экземпляр класса THREE.WebGLRenderer, который представляет собой рендерер, использующий WebGL для отображения трехмерной графики в браузере.
const renderer = new THREE.WebGLRenderer();
// Здесь устанавливается размер выходного холста рендерера. Метод setSize принимает два аргумента: ширину и высоту холста.
renderer.setSize( sizes.width, sizes.height );
// Эта строка добавляет DOM-элемент рендерера в тег <body> HTML-документа. renderer.domElement представляет собой элемент canvas, который рендерер использует для отображения трехмерного контента.
document.body.appendChild( renderer.domElement );

// Геометрия + материал дают нам сетку
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 'purple', wireframe: true } ); // wireframe: true - делает объект прозрачным
const cube = new THREE.Mesh( geometry, material );

// Добавление сетки на сцену
scene.add( cube );

// Отодвигаем камеру от объекта, так как по дефолту камера и сам объект создаются в позиции 0
camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

    // Виды преобразования обхектов: position, rotation, scale, quaternion
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

    cube.position.x = -1;
    cube.position.y = -0.5;
    cube.position.z = -2;

    cube.scale.x = 3;
    cube.scale.y = 5;
    cube.scale.z = 1;

    /* Полезные методы для позиции:
        cube.position.length() - расстояние между объектами
        cube.position.distanceTo(camera.position) - расстояние между объектами в камере
        cube.position.normalize() - уменьшает длину вектора до 1, но сохраняет его направление
        cube.position.set(-1, -0.8, 0.5) изменение x, y, z*/

	renderer.render( scene, camera );
}

animate();

console.log( THREE )