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
const cube1 = new THREE.Mesh( geometry, material );
const cube2 = new THREE.Mesh( geometry, material );
const cube3 = new THREE.Mesh( geometry, material );
const cube4 = new THREE.Mesh( geometry, material );

const group = new THREE.Group().add(cube1, cube2, cube3, cube4); // - группа объектов

//group.scale.y = 2; - взаимодействие с группой

// Добавление сетки на сцену
scene.add( group );

// Отодвигаем камеру от объекта, так как по дефолту камера и сам объект создаются в позиции 0
camera.position.z = 5;

//cube.rotation.reorder('YXZ'); - позволяет сменить порядок вращения

//camera.lookAt( new THREE.Vector3(1, -1, 0) ); - смещение взгляда камеры в позиции 0
//camera.lookAt(cube.position); - позволяет зафиксировать камеру на объекте



function animate() {
	requestAnimationFrame( animate );

    // Виды преобразования обхектов: position, rotation, scale, quaternion
	cube1.rotation.x += 0.01;
	cube1.rotation.y += 0.01;
    cube1.position.y = -1;

    cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;
    cube2.position.y = 1;

    cube3.rotation.x += 0.01;
	cube3.rotation.y += 0.01;
    cube3.position.x = 1;

    cube4.rotation.x += 0.01;
	cube4.rotation.y += 0.01;
    cube4.position.x = -1;

    /* cube.position.x = -1;
    cube.position.y = -0.5;
    cube.position.z = -2;

    cube.scale.x = 3;
    cube.scale.y = 5;
    cube.scale.z = 1; */

    /* Полезные методы для позиции:
        cube.position.length() - расстояние между объектами
        cube.position.distanceTo(camera.position) - расстояние между объектами в камере
        cube.position.normalize() - уменьшает длину вектора до 1, но сохраняет его направление
        cube.position.set(-1, -0.8, 0.5) изменение x, y, z*/

	renderer.render( scene, camera );
}

animate();

console.log( THREE )