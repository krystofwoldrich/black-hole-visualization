import './style.css'
import Render from "./js/render"
const render = new Render();

// import * as THREE from './node_modules/three/build/three.module'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// let scene, controls,camera, renderer;

// const setup = () =>{
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );
//   controls = new OrbitControls( camera, renderer.domElement );
//   camera.position.set( 0, 20, 100 );
//   controls.update();
//   camera.position.z = 5;
// }
// setup()



// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// for (let i = 0; i < 10 ; i++) {
//   const sphere = renderSphere(0.5, "red")
//   scene.add(sphere);
//   sphere.position.set(0, 0, i);
// }



// function animate() {
//   requestAnimationFrame( animate );
//   // cube.rotation.x += 0.01;
//   // cube.rotation.y += 0.01;
//   controls.update();
//   renderer.render( scene, camera );
// }
//
//
//
// animate();


function renderSphere(radius,color,opacity) {
  const geometry = new THREE.SphereGeometry( radius, 32, 32 );
  const material = new THREE.MeshBasicMaterial( {color: color, transparent:true } );
  material.opacity = 0.5;

  const sphere = new THREE.Mesh( geometry, material );
  return sphere;
}

// const el1_512 = require('path');
import * as fs from 'fs';

// import { parse } from 'fast-csv';
// import * as data from "../data/dataset1/el1Reduced512.csv"
// console.log("-> data", data);
// const csv = require('fast-csv');

// function readRow(row) {
//   const sphere = renderSphere(0.5, "red")
//   scene.add(sphere);
//   let x = parseFloat(row[0])
//   let y = parseFloat(row[1])
//   let z = parseFloat(row[2])
//   sphere.position.set(x, y, z);
// }

let arrayOfPoints = [
  [-2.2603,-3,-3,0.40108,-0.29683,0.0065308],
[-1.5088,-3,-3,0.44271,-0.21205, 0.012898],
[-0.75734,-3,-3,0.47062,-0.10484,0.01875],
[-0.0058708,-3,-3,0.47806,0.014164,0.021213],
[0.7456,-3,-3,0.46434,0.12941,0.018821],
[1.4971,-3,-3,0.43474,0.22762,0.013],
[2.2485,-3,-3,0.39657,0.30268,0.0066221],
[3,-3,-3,0.35582,0.3551,0.0016868]]
for (let i = 0; i < 8; i++) {
  let scalar = Math.sqrt(arrayOfPoints[i][3]*arrayOfPoints[i][3] + arrayOfPoints[i][4]*arrayOfPoints[i][4] + arrayOfPoints[i][5]*arrayOfPoints[i][5])
  console.log("-> scalar", scalar);
  // const sphere = renderSphere(0.5, 0x00ff00,scalar)
  // scene.add(sphere);
  // sphere.position.set(arrayOfPoints[i][0], arrayOfPoints[i][1], arrayOfPoints[i][2]);
  const geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,
    transparent : true,} );
  material.opacity = 0.5;
  // material.transparent = true;
  //material.alphaMap = 0.5;
  const sphere = new THREE.Mesh( geometry, material );
  scene.add(sphere);
  sphere.position.set(arrayOfPoints[i][0], arrayOfPoints[i][1], arrayOfPoints[i][2]);
//   const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
}


function colorToHex(color) {
  // Convert any CSS color to a hex representation
  // Examples:
  // colorToHex('red')            # '#ff0000'
  // colorToHex('rgb(255, 0, 0)') # '#ff0000'
  var rgba, hex;
  rgba = colorToRGBA(color);
  hex = [0,1,2].map(
    function(idx) { return byteToHex(rgba[idx]); }
  ).join('');
  return "#"+hex;
}


// const dir = new THREE.Vector3( 1, 2, 0 );
//
// //normalize the direction vector (convert to vector of length 1)
// dir.normalize();
//
//
// const origin = new THREE.Vector3( 0, 0, 0 );
// const length = 5;
// const hex = 0xffff00;
//
// const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
// scene.add( arrowHelper );


// different colors
// let ah = new THREE.ArrowHelper(
//   new THREE.Vector3(0, 1, 0),
//   new THREE.Vector3(-4, 0, 0),
//   5,
//   "magenta" /* default colour */);
// ah.cone.material.color.set("red"); // change color of cone
// scene.add(ah);

// // colourful pyramid
// let cg = new THREE.SphereBufferGeometry(0.5, 4, 2).toNonIndexed();
// let pos = cg.attributes.position;
// for (let i = 0; i < pos.count; i++){
//   if (pos.getY(i) < 0) pos.setY(i, 0);
// }
// console.log(cg);
// let cls = [
//   new THREE.Color("green"),
//   new THREE.Color("red"),
//   new THREE.Color("red"),
//   new THREE.Color("red")
// ]
// let colors = [];
// for(let i = 0; i < 2; i++){
//   cls.forEach( (c) => {
//     colors.push(c.r, c.g, c.b);
//     colors.push(c.r, c.g, c.b);
//     colors.push(c.r, c.g, c.b);
//   });
// }
// cg.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
//
// let cm = new THREE.MeshBasicMaterial({vertexColors: true});
// let co = new THREE.Mesh(cg, cm);
// co.scale.set(1, 5, 1);
// scene.add(co);
