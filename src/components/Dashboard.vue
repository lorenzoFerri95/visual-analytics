<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto align-self-center">
        <h5>Counters</h5>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-auto align-self-center">
        <BaseCard header="Counter 1" :text="count" />
      </div>
      <div class="col-auto align-self-center">
        <BaseCard header="Counter 2" :text="count" />
      </div>
      <div class="col-auto align-self-center">
        <BaseCard header="Counter 3" :text="count" />
      </div>
      <div class="col-auto align-self-center">
        <BaseCard header="Counter 4" :text="count" />
      </div>
    </div>

    <div class="row">
      <div class="col-auto">
        <h5>Bar Charts</h5>
        <BarChart />
        <BarChart />
        <BarChart />
        <BarChart />
      </div>
      <div class="col-auto">
        <h5>Network</h5>
        <Network />
      </div>
    </div>
  </div>
</template>

<script>
  import Network from "@/components/plots/Network.vue";
  import BarChart from "@/components/plots/BarChart.vue";
  import BaseCard from "@/components/base/BaseCard.vue";

  const cf = require("crossfilter2");

  export default {
    name: "Dashboard",
    components: {
      Network,
      BarChart,
      BaseCard,
    },
    data: function() {
      return {
        count: 0,
        nodes: [],
        edges: [],
        employeeData: [],
      };
    },
    mounted: function() {
      fetch("./static/data/nodes.json")
        .then(response => response.json())
        .then(data => {
          /* console.log(data); */
          this.nodes = Object.values(data.Id);
        });

      fetch("./static/data/edges_split.json")
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });

      fetch("./static/data/employee.json")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          /*           this.employeeData = data.map(row => {
            const parsedData = {
              gender: row.gender
            }
            return parsedData
          }) */
        });

      console.log(cf);
    },
    watch: {},
    methods: {},
  };
</script>

<style scoped>
  /* #header {
  width: 200px;
  height: 80px;
  padding: 10px 10px 10px 10px;
  border: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  text-align: center;
} */
</style>
