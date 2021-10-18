<template>
  <div class="container-fluid mt-3 mb-4">
    <div class="row justify-content-center">
      <div id="title" class="col-auto">
        <h1>VAST Challenge 2014</h1>
        <h3>mini-challenge 1</h3>
      </div>
    </div>
    <div class="row">
      <Dashboard />
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

<style scoped>
  #title {
    text-align: center;
  }
</style>
