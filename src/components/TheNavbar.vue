<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a href="#" class="navbar-brand">VAST Challenge 2014</a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link"
              >Dashboard</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link to="/network" class="nav-link">Network</router-link>
          </li> -->
        </ul>
      </div>

      <p>mini-challenge 1</p>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
  };
</script>

<style scoped></style>
