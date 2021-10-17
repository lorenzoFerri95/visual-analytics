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
  import crossfilter from "crossfilter2";

/*   let cf;
  let dimAgeBind; */

  export default {
    name: "Dashboard",
    components: {
      Network,
      BarChart,
      BaseCard,
    },
    data: function() {
      return {
        /* variabili di stato per i dati dei files */
        employeeData: [],
        nodes: [],
        edges: [],
        /* variabili di stato per i dati da inserire nella pagina web */
        count: 0,
      };
    },
    mounted: function() {
      fetch("./static/data/employee.json")
        .then(response => response.json())
        .then(data => {
          this.employeeData = data.map(row => {
            const parsedData = {
              FullName: row.FullName,
              Gender: row.Gender,
              Age: +row.Age,
              AgeBind: row.AgeBind,
              Cluster: +row.Cluster,
              JobType: row.CurrentEmploymentType,
              JobYears: +row.YearsSinceCurrentEmploymentStart,
              JobYearsBind: row.YSCESBind,
            };
            return parsedData;
          });
        });

      fetch("./static/data/nodes.json")
        .then(response => response.json())
        .then(data => {
          this.nodes = data;
        });

      fetch("./static/data/edges.json")
        .then(response => response.json())
        .then(data => {
          this.edges = data;
        });

      console.log(this.employeeData);
      const cf = crossfilter(this.employeeData);
      const dimAgeBind = cf.dimension(row => row.AgeBind);
      console.log(
        dimAgeBind
          .group()
          .reduceCount()
          .all()
      );
      console.log(
        cf
          .groupAll()
          .reduceCount()
          .value()
      );
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
