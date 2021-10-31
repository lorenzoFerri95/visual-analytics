<template>
  <ul class="list-group">
    <li
      v-for="(val, key) in fullNamesList"
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
      fullNamesList: { required: true, type: Array },
    },
  };
</script>

<style scoped></style>
