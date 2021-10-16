<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <h6>Network</h6>
        <Network />
      </div>
      <div class="col-auto">
        <h6>Bar Charts</h6>
        <BarChart />
      </div>
    </div>
    
    
  </div>
</template>

<script>
import Network from "@/components/dashboard/Network.vue";
import BarChart from "@/components/dashboard/BarChart.vue";

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
      .then((res) => res.json())
      .then(function(data) {
        console.log(data);
      });
  },
};
</script>

<style>
/* #header {
  width: 200px;
  height: 80px;
  padding: 10px 10px 10px 10px;
  border: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
  text-align: center;
} */
</style>
