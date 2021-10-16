<template>
  <div id="app" class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h1>VAST Challenge 2014</h1>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-auto">
        <h4>mini-challenge 1</h4>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-auto">
        <Dashboard />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
