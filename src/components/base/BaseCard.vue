<template>
  <div>
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">{{ header }}</div>
      <div class="card-body">
        <p id="card-text">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseCard",
    props: {
      header: { default: "Header", required: true, type: String },
      text: { default: 0, required: true, type: Number },
    },
  };
</script>

<style scoped>
  #card-text {
    text-align: center;
    font-size: 25px;
  }
</style>
