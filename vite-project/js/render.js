import * as THREE from '../node_modules/three/build/three.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

export default class Render {
  scene;
  controls;
  camera;
  renderer;
  results = [];
  opacity = 0.7
  minScale = 0.009154263417774748; // -0.37586// 1.1682089853006994 //0.009154263417774748;
  maxScale = 0.7339091467266231; // 0.33631// 12.569004536008084//1.9901629763665085; //TODO setup
  allCones = [];
  podvzorMin = 10;
  podvzorMax = 50;
  dataUrl = '../data/ds1/el1CUT.csv'//'../data/ds2/el2Reduced64.csv'//'../data/ds1/el1CUT.csv'//'../data/ds1/el1Reduced64.csv'
  gridLayoutX = 10
  gridLayoutY = 10
  gridLayoutZ = 10

  constructor() {
    this.init();
  }

  init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(0, 20, 100);
    this.controls.update();
    this.camera.position.z = 1;
    this.animate();
    // this.renderSphere(5,"red",0.5, {x:1,y:1,z:1})
    this.loadFile().then(() => {
        console.log("-> Done loading",);
        this.makeGlyphs()
      }
    );
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  async loadFile() {
    const response = await fetch(this.dataUrl)
    const data = await response.text()
    this.results = data.split("\n")
  }

  //this.renderSphere(0.1,"red", 0.7,{x:x*3,y:y*6,z:z*6})
  renderSphere = (radius, color, opacity, position) => {
    const geometry = new THREE.SphereGeometry(radius, 15, 15);
    const material = new THREE.MeshBasicMaterial({color: color, transparent: true});
    material.opacity = opacity;
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere)
    sphere.position.set(position.x, position.y, position.z)
  }
  renderCone = (prop) => {
    const glyphGeometry = new THREE.ConeGeometry(0.1, 1, 6);
    let scaleOfData = Math.sqrt(Math.pow(prop.d1,2) + Math.pow(prop.d2,2) + Math.pow(prop.d3,2))
    let normalizationScale = (scaleOfData - this.minScale) / (this.maxScale - this.minScale);

    const material = new THREE.MeshBasicMaterial({
      color: this.getColor(normalizationScale), transparent: true
    });

    material.opacity = this.opacity;
    const glyph = new THREE.Mesh(glyphGeometry, material);
    this.scene.add(glyph)

    glyph.position.set(prop.x * this.gridLayoutX, prop.y * this.gridLayoutY, prop.z * this.gridLayoutZ);

    glyph.rotation.set(
      scaleOfData,
      Math.atan(prop.d3 / prop.d2),
      Math.acos(prop.d2 / scaleOfData)
    );

    // let magn = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
    glyph.scale.set(scaleOfData, scaleOfData, scaleOfData);
    this.allCones.push(glyph)

  }

  makeGlyphs = () => {
    this.setupMaxMinValues();

    for (let i = 1; i < this.results.length; i++) {
      if ((i % this.getRandomArbitrary(this.podvzorMin,this.podvzorMax)) === 0) {
        let currentRow = this.results[i].split(",")
        let x = parseFloat(currentRow[0]);
        let y = parseFloat(currentRow[1]);
        let z = parseFloat(currentRow[2]);
        if(currentRow[3] === "NaN"){
          this.renderSphere(0.1,"blue", 1,{x:x*this.gridLayoutX,y:y*this.gridLayoutY,z:z*this.gridLayoutZ})
          continue
        }

        let d1 = parseFloat(currentRow[3]);
        let d2 = parseFloat(currentRow[4]);
        let d3 = parseFloat(currentRow[5]);
        this.renderCone({x,y,z,d1,d2,d3});

      }
    }
    console.log("Done rendering -> ",);
  }

  setupMaxMinValues(){
    this.results[0]
  }

  getColor(val){
    return new THREE.Color((1.0 - val), 1.0-val, val );
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }


}
