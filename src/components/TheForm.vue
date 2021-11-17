<template>
  <form>
    <!-- RADIOS -->
    <div class="row justify-content-center mb-4">
      <div class="col-auto">
        <p>Membership</p>
        <div class="input-group">
          <div
            v-for="(val, key) in membership.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`membership-radio-${key}`"
              v-model="membership.value"
              name="options-membership"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`membership-radio-${key}`"
              class="btn btn-outline-primary"
            >
              {{ val }}
            </label>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <p>Kidnapped</p>
        <div class="input-group">
          <div
            v-for="(val, key) in kidnapped.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`kidnapped-radio-${key}`"
              v-model="kidnapped.value"
              name="options-kidnapped"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`kidnapped-radio-${key}`"
              class="btn btn-outline-danger"
            >
              {{ val }}
            </label>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <p>Gender</p>
        <div class="input-group">
          <div
            v-for="(val, key) in gender.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`gender-radio-${key}`"
              v-model="gender.value"
              name="options-gender"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`gender-radio-${key}`"
              class="btn btn-outline-secondary"
            >
              {{ val }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- SELECTIONS -->
    <div class="row justify-content-center">
      <div class="col-6">
        <label for="jobType-select">Job type</label>
        <select
          id="jobType-select"
          v-model="jobType.value"
          :options="jobType.options"
          class="form-select"
        >
          <option
            v-for="(val, key) in jobType.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            {{ val }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "TheForm",
    props: {
      jobType: { required: true, type: Object },
      ageBind: { required: true, type: Object },
      membership: { required: true, type: Object },
      kidnapped: { required: true, type: Object },
      gender: { required: true, type: Object },
    },
  };
</script>

<style scoped></style>
