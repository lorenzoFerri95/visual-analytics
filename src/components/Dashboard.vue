<template>
  <div>
    <div class="row justify-content-center mb-5 pb-3">
      <h5 class="header">Filters</h5>
      <TheForm
        :ageBind="ageBind"
        :jobType="jobType"
        :gender="gender"
        :jobYearsBind="jobYearsBind"
        :cluster="cluster"
      />
    </div>

    <div class="row justify-content-start">
      <div class="col-auto overflow-auto" id="cards-scrollbar">
        <h5 class="header">Statistics</h5>
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
  import TheForm from "@/components/TheForm.vue";
  import crossfilter from "crossfilter2";

  let cf;
  let dimAgeBind;
  let dimCluster;
  let dimGender;
  let dimJobType;
  let dimJobYearsBind;

  export default {
    name: "Dashboard",
    components: {
      Network,
      BarChart,
      BaseCard,
      TheForm,
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

          cf = crossfilter(this.employeeData);

          dimJobType = cf.dimension(row => row.JobType);
          dimAgeBind = cf.dimension(row => row.AgeBind);
          dimJobYearsBind = cf.dimension(row => row.JobYearsBind);
          dimGender = cf.dimension(row => row.Gender);
          dimCluster = cf.dimension(row => row.Cluster);

          this.ageBind.options = dimAgeBind
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.ageBind.value = null;

          this.gender.options = dimGender
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.gender.value = null;

          this.jobType.options = dimJobType
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.jobType.value = null;

          this.jobYearsBind.options = dimJobYearsBind
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.jobYearsBind.value = null;

          this.cluster.options = dimCluster
            .group()
            .reduceCount()
            .all()
            .map(row => row.key);
          this.cluster.value = null;
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
    /*     computed: {
      numRecords() {
        return cf
          .groupAll()
          .reduceCount()
          .value();
      },
    }, */
    watch: {
      jobType: {
        handler(newVal) {
          dimJobType.filter(newVal.value);
          this.refreshCounters();
        },
        deep: true,
      },
      ageBind: {
        handler(newVal) {
          dimAgeBind.filter(newVal.value);
          this.refreshCounters();
        },
        deep: true,
      },
      jobYearsBind: {
        handler(newVal) {
          dimJobYearsBind.filter(newVal.value);
          this.refreshCounters();
        },
        deep: true,
      },
      gender: {
        handler(newVal) {
          dimGender.filter(newVal.value);
          this.refreshCounters();
        },
        deep: true,
      },
      cluster: {
        handler(newVal) {
          dimCluster.filter(newVal.value);
          this.refreshCounters();
        },
        deep: true,
      },
    },
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
      refreshCounters() {
        this.numEmployee = cf
          .groupAll()
          .reduceCount()
          .value();
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
  #cards-scrollbar {
    height: 500px;
  }
</style>
