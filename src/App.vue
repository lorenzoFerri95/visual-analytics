<template>
  <div id="app">
    <TheNavbar />

    <div class="container-fluid ms-4 me-3">
      <div class="row justify-content-center mt-4 mb-4">
        <Dashboard />
      </div>
    </div>
  </div>
</template>

<script>
  import TheNavbar from "@/components/TheNavbar.vue";
  import Dashboard from "@/components/Dashboard.vue";

  export default {
    name: "App",
    components: {
      TheNavbar,
      Dashboard,
    },
  };
</script>

<style scoped>
  @import "./assets/styles/header.css";
  @import "./assets/styles/card.css";
  @import "./assets/styles/network.css";
</style>
