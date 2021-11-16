<template>
  <ul class="list-group">
    <li
      v-for="(val, key) in namesList"
      v-bind:key="key"
      v-bind:value="val"
      class="list-group-item"
    >
      {{ val }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "BaseListGroup",
    props: {
      namesList: { required: true, type: Array },
    },
  };
</script>

<style scoped></style>
