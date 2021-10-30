<template>
  <div id="app">
    <TheNavbar />

    <div class="container-fluid ms-4 me-3">
      <div class="row justify-content-center mt-4 mb-4">
        <router-view></router-view>
      </div>
      <!-- <div class="row justify-content-center">
        <Network />
      </div> -->
    </div>
  </div>
</template>

<script>
  /* import Network from "@/components/plots/Network.vue"; */
  import TheNavbar from "@/components/TheNavbar.vue";

  export default {
    name: "App",
    components: {
      TheNavbar,
      /* Network, */
    },
  };
</script>

<style scoped>
  @import "./assets/styles/header.css";
  @import "./assets/styles/card.css";
  @import "./assets/styles/network.css";
</style>
