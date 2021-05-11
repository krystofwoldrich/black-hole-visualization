<template>
  <div class="window">
    <div>Load</div>
    <div>
      <ul>
        <li v-bind:key="data.name + data.type" v-for="data in loadData">
          {{ data.name }}
          <input type="checkbox" @change="checkEventLoad(data,$event)">
        </li>
      </ul>
    </div>
    <div>Show</div>
    <div>
      <ul>
        <li v-bind:key="data.name + data.type" v-for="data in showData">
          {{ data.name }}
          <input type="checkbox" @change="checkEventShow(data,$event)">
        </li>
      </ul>
    </div>
    <div>Change number of cones: {{maxCone}}</div>
    <input  v-bind:value="maxCone" type="range" min="50" max="500" step="50" @change="changeNumberOfCones($event)" />
    <div>Change height of cones: {{heightCone}}</div>
    <input v-bind:value="heightCone" type="range" min="0.1" max="6" step="0.1" @change="changeHeightOfCones($event)" />
    <div>Change opacity of cones: {{opacityCone}}</div>
    <input v-bind:value="opacityCone"  type="range" min="0.1" max="1" step="0.1" @change="changeOpacityOfCones($event)" />
  </div>
</template>

<script>
import datasetSetup from '../assets/datasets/datasetSetup.json'


export default {
  name: "Controls",
  components: { },
  data() {
    let loadData;
    let showData;
    return {
      loadData,
      showData,
      maxCone: 200,
      heightCone:0.5,
      opacityCone:0.7
    }
  },
  mounted() {
    this.setupDataControls()
  },
  updated() {
  },
  methods: {
    setupDataControls() {
      let loadData = []
      let showData = []
      for (let datasetSetupKey of datasetSetup) {
        // debugger
        let ld = datasetSetupKey;
        ld.type = "load"
        ld.active = false
        loadData.push(ld)
        let sd = JSON.parse(JSON.stringify(datasetSetupKey));
        sd.type = "show"
        sd.active = false
        showData.push(sd)
      }
      this.loadData = loadData
      this.showData = showData
      console.log("-> this.setupData", this.loadData);
    },
    checkEventLoad (item, event) {
      console.log("-> event", event);
      // alert(item.name);
      // alert(item.address);
      // alert(event.target.checked);
      let setupLoadElement = {address:item.address, load:event.target.checked}
      this.$emit('load-data', setupLoadElement)
    },
    checkEventShow (item, event) {
      console.log("-> event", event);
      // alert(item.name);
      // alert(item.address);
      // alert(event.target.checked);
      let setupLoadElement = {name: item.name, address:item.address, load:event.target.checked}
      this.$emit('show-data', setupLoadElement)
    },
    changeNumberOfCones (event) {
      console.log("-> NUM of COnes", event);
      this.maxCone = event.target.valueAsNumber
      this.$emit('max-cone', this.maxCone)
    },
    changeHeightOfCones (event) {
      console.log("-> Height of COnes", event);
      this.heightCone = event.target.valueAsNumber
      this.$emit('height-cone', this.heightCone)
    },
    changeOpacityOfCones (event) {
      console.log("-> Opacity of COnes", event);
      this.opacityCone = event.target.valueAsNumber
      this.$emit('opacity-cone', this.opacityCone)
    }
  }
}

</script>

<style scoped>
.window {
  padding: 1rem;
  position: absolute;
  width: 20%;
  font-size: 1.5rem;
  right: 2%;
  top: 2%;
  background: white;
}
</style>
