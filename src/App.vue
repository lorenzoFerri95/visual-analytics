<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="#" class="navbar-brand ms-5">VAST Challenge 2014</a>
      <ul class="navbar-nav me-5">
        <li class="nav-item nav-link">mini-challenge 1</li>
      </ul>
    </nav>

    <div class="container-fluid ms-4 me-3">
      <div class="row justify-content-center mt-4 mb-4">
        <Dashboard />
      </div>
      <div class="row justify-content-center">
        <h5 class="header">Network</h5>
        <Network />
      </div>
    </div>
  </div>
</template>

<script>
  import Dashboard from "@/components/Dashboard.vue";
  import Network from "@/components/plots/Network.vue";

  export default {
    name: "App",
    components: {
      Dashboard,
      Network,
    },
  };
</script>

<style scoped>
  @import "./assets/styles/header.css";
  @import "./assets/styles/card.css";
  @import "./assets/styles/network.css";
</style>
