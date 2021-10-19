<template>
  <form>
    <!-- SELECTIONS -->
    <div class="row justify-content-center mb-4">
      <div class="col-auto">
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
            <div v-if="val == null">
              All
            </div>
            <div v-else>
              {{ val }}
            </div>
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="yearJob-select">Years in current job</label>
        <select
          id="yearJob-select"
          v-model="jobYearsBind.value"
          :options="jobYearsBind.options"
          class="form-select"
        >
          <option
            v-for="(val, key) in jobYearsBind.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <div v-if="val == null">
              All
            </div>
            <div v-else>
              {{ val }}
            </div>
          </option>
        </select>
      </div>
    </div>

    <!-- RADIOS -->
    <div class="row align-items-end justify-content-center">
      <div class="col-auto">
        <p>Age range</p>
        <div class="input-group">
          <div
            v-for="(val, key) in ageBind.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`age-radio-${key}`"
              v-model="ageBind.value"
              name="options-age"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label :for="`age-radio-${key}`" class="btn btn-outline-secondary">
              <div v-if="val == null">
                All
              </div>
              <div v-else>
                {{ val }}
              </div>
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
              <div v-if="val == null">
                All
              </div>
              <div v-else>
                {{ val }}
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <p>Cluster</p>
        <div class="input-group">
          <div
            v-for="(val, key) in cluster.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`cluster-radio-${key}`"
              v-model="cluster.value"
              name="options-cluster"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`cluster-radio-${key}`"
              class="btn btn-outline-secondary"
            >
              <div v-if="val == null">
                All
              </div>
              <div v-else>
                {{ val }}
              </div>
            </label>
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
      gender: { required: true, type: Object },
      jobYearsBind: { required: true, type: Object },
      cluster: { required: true, type: Object },
    },
  };
</script>

<style scoped></style>
