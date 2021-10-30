<template>
  <div class="card bg-light mb-3 shadow-sm">
    <div class="card-header text-center pb-0">
      <h6>{{ header }}</h6>
    </div>
    <div class="card-body pb-0">
      <p id="card-text">{{ text }}</p>
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

<style scoped></style>
