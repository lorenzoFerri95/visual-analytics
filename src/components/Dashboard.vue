<template>
  <div class="container-fluid" style="padding-left: 35px;">
    <div class="row justify-content-start">
      <div class="col-auto overflow-auto" id="lateral-scroll-bar">
        <h5 class="header">Counters</h5>
        <BaseCard header="# of Employee" :text="numEmployee" />
        <BaseCard header="Counter 2" :text="count" />
        <BaseCard header="Counter 3" :text="count" />
        <BaseCard header="Counter 4" :text="count" />
        <BaseCard header="Counter 5" :text="count" />
        <BaseCard header="Counter 6" :text="count" />
        <BaseCard header="Counter 7" :text="count" />
      </div>
      <div class="col-auto">
        <h5 class="header">Bar Charts</h5>
        <BarChart />
        <BarChart />
        <BarChart />
        <BarChart />
      </div>
    </div>

    <div class="row justify-content-center">
      <h5 class="header">Network</h5>
      <Network />
    </div>
  </div>
</template>

<script>
  import Network from "@/components/plots/Network.vue";
  import BarChart from "@/components/plots/BarChart.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import crossfilter from "crossfilter2";

  export default {
    name: "Dashboard",
    components: {
      Network,
      BarChart,
      BaseCard,
    },
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        employeeData: [],
        nodes: [],
        edges: [],
        /* variabili di stato per le opzioni selezionabili dall'utente */
        ageBind: {
          value: "",
          options: [],
        },
        gender: {
          value: "",
          options: [],
        },
        jobType: {
          value: "",
          options: [],
        },
        jobYearsBind: {
          value: "",
          options: [],
        },
        cluster: {
          value: "",
          options: [],
        },
        /* variabili di stato per i dati da inserire nella pagina web */
        numEmployee: 0,
        count: 0,
      };
    },
    mounted: function() {
      fetch("./static/data/employee.json")
        .then(response => response.json())
        .then(data => {
          this.employeeData = data.map(row => this.parseEmployeeRow(row));

          const cf = crossfilter(this.employeeData);

          this.numEmployee = cf
            .groupAll()
            .reduceCount()
            .value();

          const dimAgeBind = cf.dimension(row => row.AgeBind);
          const dimCluster = cf.dimension(row => row.Cluster);
          const dimGender = cf.dimension(row => row.Gender);
          const dimJobType = cf.dimension(row => row.JobType);
          const dimJobYearsBind = cf.dimension(row => row.JobYearsBind);

          this.ageBind.options = dimAgeBind
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.ageBind.value = this.ageBind.options[0];

          this.gender.options = dimGender
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.gender.value = this.gender.options[0];

          this.jobType.options = dimJobType
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.jobType.value = this.jobType.options[0];

          this.jobYearsBind.options = dimJobYearsBind
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.jobYearsBind.value = this.jobYearsBind.options[0];

          this.cluster.options = dimCluster
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.cluster.value = this.cluster.options[0];
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
    },
    watch: {},
    methods: {
      parseEmployeeRow(row) {
        const parsedRow = {
          FullName: row.FullName,
          Gender: row.Gender,
          Age: +row.Age,
          AgeBind: row.AgeBind,
          Cluster: +row.Cluster,
          JobType: row.CurrentEmploymentType,
          JobYears: +row.YearsSinceCurrentEmploymentStart,
          JobYearsBind: row.YSCESBind,
        };
        return parsedRow;
      },
    },
  };
</script>

<style scoped>
  .header {
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  #lateral-scroll-bar {
    height: 500px;
  }
</style>
