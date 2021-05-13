<template>
  <div class="legend">
    <div>
      <div class="l-header">
        CONTROLS:
      </div>
      <div>
        Left mouse - rotate
      </div>
      <div>
        Right mouse - move
      </div>
      <div>
        Middle mouse (wheel) - zoom
      </div>
    </div>
    <div>
      <div class="l-header">
        DESCRIPTION:
      </div>
      <div>
        Blue dot = blackhole
      </div>
      <div>
        Yellow cone = electric strength
      </div>
      <div>
        Orange cone = magnetic strength
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
  height: 5.5rem;
  width: 30rem;
  z-index: 2;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.l-header{
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
