<template>
  <div id="app" class="main">
    <Controls @max-cone="maxConeRender" @height-cone="heightConeRender" @opacity-cone="opacityConeRender" @load-data="loadData" @show-data="showData"/>
  </div>
</template>

<script>
import Render from './js/render'
import Controls from "@/components/Controls";

let threeRenderer;
export default {
  name: 'App',
  components: {
    Controls
  },
  data() {
    return {
    }
  },
  mounted(){
    threeRenderer = new Render();
    threeRenderer.init();
  },
  methods:{
    maxConeRender(data){
      console.log("-> data", data);

    },
    heightConeRender(data){
      console.log("-> data", data);

    },
    opacityConeRender(data){
      console.log("-> data", data);

    },
    loadData(data){
      console.log("-> data", data);
      threeRenderer.loadData(data.address)

    },
    showData(data){
      console.log("-> data", data);

    },
  }
}
</script>

<style>
body {
  margin: 0;
}
.main{
  margin: 0;
  position: relative;
}
</style>
