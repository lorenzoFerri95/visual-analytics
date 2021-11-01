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
            {{ val }}
          </option>
        </select>
      </div>

      <div class="col-auto">
        <label for="ageRange-select">Age range</label>
        <select
          id="ageRange-select"
          v-model="ageBind.value"
          :options="ageBind.options"
          class="form-select"
        >
          <option
            v-for="(val, key) in ageBind.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            {{ val }}
          </option>
        </select>
      </div>
    </div>

    <!-- RADIOS -->
    <div class="row justify-content-center">
      <div class="col-auto">
        <p>Suspected POK</p>
        <div class="input-group">
          <div
            v-for="(val, key) in suspectedPok.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`suspectedPok-radio-${key}`"
              v-model="suspectedPok.value"
              name="options-suspectedPok"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`suspectedPok-radio-${key}`"
              class="btn btn-outline-secondary"
            >
              {{ val }}
            </label>
          </div>
        </div>
      </div>

      <div class="col-auto">
        <p>Suspected Kidnapped</p>
        <div class="input-group">
          <div
            v-for="(val, key) in suspectedKidnapped.options"
            v-bind:key="key"
            v-bind:value="val"
          >
            <input
              :id="`suspectedKidnapped-radio-${key}`"
              v-model="suspectedKidnapped.value"
              name="options-suspectedKidnapped"
              :value="val"
              type="radio"
              class="btn-check"
              autocomplete="off"
            />
            <label
              :for="`suspectedKidnapped-radio-${key}`"
              class="btn btn-outline-secondary"
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
              {{ val }}
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
      jobType: { required: true, type: Object },
      ageBind: { required: true, type: Object },
      suspectedPok: { required: true, type: Object },
      suspectedKidnapped: { required: true, type: Object },
      gender: { required: true, type: Object },
      cluster: { required: true, type: Object },
    },
  };
</script>

<style scoped></style>
