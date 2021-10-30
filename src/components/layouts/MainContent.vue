<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
.md-dialog-container {
  max-width: 100% !important;
  max-height: 100% !important;
  margin: 0 !important;
}
/* Animation */
.animate-enter-active {
  transition: all .5s;
}
.animateOpacity-enter-active {
  transition: all .6s;
}
.animate-enter {
  transform: translateY(100px);
  opacity: 0;
}
.animateOpacity-enter {
  opacity: 0;
}
</style>