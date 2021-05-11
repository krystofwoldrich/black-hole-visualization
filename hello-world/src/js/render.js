import * as THREE from '../../node_modules/three/build/three.module'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class Render {
  scene;
  controls;
  camera;
  renderer;
  results = [];
  minScale = 0;
  maxScale = 10;
  podvzorMin = 10;
  podvzorMax = 50;
  gridLayoutX = 10
  gridLayoutY = 10
  gridLayoutZ = 10
  allMesh = {}

  constructor() {}

  init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const app = document.querySelector("#app");
    app.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(0, 20, 100);
    this.controls.update();
    this.camera.position.z = 1;
    this.animate();
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  async loadFile(emittedData) {
    await fetch(
      `http://localhost:8000/api/load-data`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({address: emittedData.address})
      }
    )
      .then(response => {
        response.text()
          .then(data => {
            this.results = data.split("\n")
            this.makeGlyphs(emittedData.slug)
          });
      });


  }
  unloadFile(emittedData) {
    this.allMesh[emittedData.slug].spheres.forEach(sphere =>   {
      const object = this.scene.getObjectByProperty( 'uuid', sphere.uuid );
      object.geometry.dispose();
      object.material.dispose();
      this.scene.remove( object );
    } )

    this.allMesh[emittedData.slug].cones.forEach(cone =>{
      {
        const object = this.scene.getObjectByProperty( 'uuid', cone.uuid );
        object.geometry.dispose();
        object.material.dispose();
        this.scene.remove( object );
      }
    })
    this.allMesh[emittedData.slug] = undefined;
  }


  renderSphere = (radius, color, opacity, position) => {
    const geometry = new THREE.SphereGeometry(radius, 15, 15);
    const material = new THREE.MeshBasicMaterial({color: color, transparent: true});
    material.opacity = opacity;
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere)
    sphere.position.set(position.x, position.y, position.z)
    return(sphere)
  }
  renderCone = (prop, height =1, opacity=0.5) => {
    const glyphGeometry = new THREE.ConeGeometry(0.1, height, 6);
    let scaleOfData = Math.sqrt(Math.pow(prop.d1,2) + Math.pow(prop.d2,2) + Math.pow(prop.d3,2))
    let normalizationScale = (scaleOfData - this.minScale) / (this.maxScale - this.minScale);

    const material = new THREE.MeshBasicMaterial({
      color: this.getColor(normalizationScale), transparent: true
    });

    material.opacity = opacity;
    const glyph = new THREE.Mesh(glyphGeometry, material);
    glyph.VIZ = prop;
    glyph.VIZ.opacity = opacity;
    this.scene.add(glyph)

    glyph.position.set(prop.x * this.gridLayoutX, prop.y * this.gridLayoutY, prop.z * this.gridLayoutZ);
    glyph.rotation.set(
      scaleOfData,
      Math.atan(prop.d3 / prop.d2),
      Math.acos(prop.d2 / scaleOfData)
    );

    // let magn = Math.sqrt(d1 * d1 + d2 * d2 + d3 * d3);
    glyph.scale.set(scaleOfData, scaleOfData, scaleOfData);
    return glyph

  }

  makeGlyphs = (slug) => {
    // this.setupMaxMinValues(); TODO
    let arrayOfDatasetGlyphs = {spheres:[], cones:[]
      }
    for (let i = 1; i < this.results.length; i++) {
      if ((i % this.getRandomArbitrary(this.podvzorMin,this.podvzorMax)) === 0) {
        let currentRow = this.results[i].split(",")
        let x = parseFloat(currentRow[0]);
        let y = parseFloat(currentRow[1]);
        let z = parseFloat(currentRow[2]);
        if(currentRow[3] === "NaN"){
          arrayOfDatasetGlyphs.spheres.push(
            this.renderSphere(0.1,"blue", 1,{x:x*this.gridLayoutX,y:y*this.gridLayoutY,z:z*this.gridLayoutZ})
          )
          continue
        }

        let d1 = parseFloat(currentRow[3]);
        let d2 = parseFloat(currentRow[4]);
        let d3 = parseFloat(currentRow[5]);
        arrayOfDatasetGlyphs.cones.push(
          this.renderCone({x,y,z,d1,d2,d3},)
        )

      }
    }

    this.allMesh[slug] = arrayOfDatasetGlyphs

    console.log("Done rendering -> ",);
  }

  setupMaxMinValues(){
    let currentRow = this.results[0].split(",")
    this.minScale = parseFloat(currentRow[0]);
    this.maxScale = parseFloat(currentRow[1]);
    this.podvzorMin = parseFloat(currentRow[2]);
    this.podvzorMax = parseFloat(currentRow[3]);
    this.gridLayoutX = parseFloat(currentRow[4]);
    this.gridLayoutY = parseFloat(currentRow[5]);
    this.gridLayoutZ = parseFloat(currentRow[6]);
  }

  getColor(val){
    return new THREE.Color((1.0 - val), 1.0 - val, val );
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  hideFile(emittedData){
    debugger
    this.allMesh[emittedData.slug].spheres.forEach(sphere =>   {
      const object = this.scene.getObjectByProperty( 'uuid', sphere.uuid );
      object.visible = false;
    } )

    this.allMesh[emittedData.slug].cones.forEach(cone =>{
      {
        const object = this.scene.getObjectByProperty( 'uuid', cone.uuid );
        object.visible = false;
      }
    })
  }

  showFile(emittedData){
    this.allMesh[emittedData.slug].spheres.forEach(sphere =>   {
      const object = this.scene.getObjectByProperty( 'uuid', sphere.uuid );
      object.visible = true;
    } )

    this.allMesh[emittedData.slug].cones.forEach(cone =>{
      {
        const object = this.scene.getObjectByProperty( 'uuid', cone.uuid );
        object.visible = true;
      }
    })
  }

  changeHeightOfCones(height){
    for (const property in this.allMesh) {
      console.log("-> property", property);

      let conesOld = this.allMesh[property].cones
      console.log("-> conesOld", conesOld);
      let conesNew = []
      for (let i = 0; i < conesOld.length; i++) {
        let propOld = conesOld[i].VIZ;
        conesOld[i].geometry.dispose();
        conesOld[i].material.dispose();
        this.scene.remove( conesOld[i] );
        conesNew.push(this.renderCone(propOld, height, propOld.opacity))
      }

      this.allMesh[property].cones = conesNew

    }
  }

  changeOpacityOfCones(opacity){
    for (const property in this.allMesh) {
      let conesOld = this.allMesh[property].cones
      for (let i = 0; i < conesOld.length; i++) {
        conesOld[i].material.opacity = opacity;
        conesOld[i].VIZ.opacity = opacity;
      }
    }
  }

  maxConesClient(modulo){
    for (const property in this.allMesh) {
      let conesOld = this.allMesh[property].cones
      for (let i = 0; i < conesOld.length; i++) {
        conesOld[i].visible = false;
        if(i % (11-modulo) === 0){
          conesOld[i].visible = true;
        }
      }
    }
  }


}
