<template>
  <div class="container">
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

  export default {
    name: "Dashboard",
    components: {
      Network,
      BarChart,
    },
    data: function() {
      return {
        nodes: [],
      };
    },
    mounted: function() {
      fetch("./static/data/nodes.json")
        .then(response => response.json())
        .then(data => (this.nodes = Object.values(data.Id)));
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
