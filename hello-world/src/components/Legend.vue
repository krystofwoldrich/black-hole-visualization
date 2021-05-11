<template>
  <div class="legend">
    <div>
    <div>
    Left mouse - rotate
    </div>
    <div>
    Right mouse - move
  </div>
    <div>
    Middle mouse scroll - zoom
  </div>
    </div>
    <div>
      <div>
      Blue dot = blackhole
      </div>
      <div>
        Yellow cone = strength
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend"
}
</script>

<style scoped>
.legend {
  padding: 0.5rem;
  position: absolute;
  left: 1%;
  top: 1%;
  background: white;
  height: 5rem;
  width: 40rem;
  z-index: 2;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
}
</style>
