<template>
  <form>
    <div class="row justify-content-center mb-4">
      <div class="col-auto">
        <label for="jobType-select">Job Type:</label>
        <br />
        <select
          id="jobType-select"
          v-model="jobType.value"
          :options="jobType.options"
        >
          <option
            v-for="(value, key) in jobType.options"
            v-bind:key="key"
            v-bind:value="value"
            >{{ value }}</option
          >
        </select>
      </div>
    </div>

    <div class="row align-items-end justify-content-center">
      <div class="col-auto">
        <p>Age Range</p>
        <div class="input-group">
          <div
            v-for="(value, key) in ageBind.options"
            v-bind:key="key"
            v-bind:value="value"
          >
            <input
              :id="key"
              v-model="ageBind.value"
              :value="value"
              type="radio"
              class="btn-check"
              name="options"
              autocomplete="off"
            />
            <label :for="key" class="btn btn-outline-secondary">{{
              value
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "TheForm",
    props: {
      ageBind: { required: true, type: Object },
      jobType: { required: true, type: Object },
    },
  };
</script>

<style scoped></style>
