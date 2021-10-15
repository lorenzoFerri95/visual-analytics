<template>
  <div id="app">
    <Network/>
  </div>
</template>

<script>
import Network from './components/Network.vue';

export default {
  name: 'App',
  components: {
    Network,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
