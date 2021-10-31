<template>
  <div>
    <div class="row justify-content-start ms-5 mb-5 pb-3">
      <div class="col-auto">
        <h5 class="header">Filters</h5>
        <TheForm
          :jobType="jobType"
          :ageBind="ageBind"
          :jobYearsBind="jobYearsBind"
          :gender="gender"
          :cluster="cluster"
        />
      </div>
      <div class="col-4 ms-4" align="center">
        <h5 class="header">Employee Names List</h5>
        <div class="overflow-auto" style="height: 170px; width: 300px">
          <BaseListGroup :fullNamesList="fullNamesList" />
        </div>
      </div>
    </div>

    <div class="row justify-content-start ms-4 mb-4">
      <div class="col-auto">
        <h5 class="header">Statistics</h5>
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <BaseCard header="# of Employee" :text="numEmployee" />
          </div>
          <div class="col-auto">
            <BaseCard header="avg Age" :text="avgAge" />
          </div>
        </div>

        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <BaseCard header="avg Job Years" :text="avgJobYears" />
          </div>
          <div class="col-auto">
            <BaseCard header="Counter 4" :text="numEmployee" />
          </div>
        </div>

        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <BaseCard header="Counter 5" :text="numEmployee" />
          </div>
          <div class="col-auto">
            <BaseCard header="Counter 6" :text="numEmployee" />
          </div>
        </div>
      </div>

      <div class="col-8" align="center">
        <h5 class="header">Bar Charts</h5>
        <div class="row justify-content-start ms-5 mb-0 pb-0">
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart plotId="Job type" :aggregatedData="jobTypeData" />
          </div>
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart
              plotId="Years in current job"
              :aggregatedData="jobYearsBindData"
            />
          </div>
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart plotId="Age Rage" :aggregatedData="ageBindData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TheForm from "@/components/TheForm.vue";
  import BaseListGroup from "@/components/base/BaseListGroup.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import BarChart from "@/components/plots/BarChart.vue";

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
      BarChart,
      BaseCard,
      TheForm,
      BaseListGroup,
    },
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        employeeData: [],
        /* variabili di stato per le opzioni selezionabili dall'utente nei filtri */
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
        fullNamesList: [],
        numEmployee: 0,
        avgAge: 0,
        avgJobYears: 0,
        jobTypeData: [],
        jobYearsBindData: [],
        ageBindData: [],
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

          this.jobType.options.push("All");
          this.jobType.options.push(
            ...dimJobType
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.jobType.value = this.jobType.options[0];

          this.jobYearsBind.options.push("All");
          this.jobYearsBind.options.push(
            ...dimJobYearsBind
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.jobYearsBind.value = this.jobYearsBind.options[0];

          this.ageBind.options.push("All");
          this.ageBind.options.push(
            ...dimAgeBind
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.ageBind.value = this.ageBind.options[0];

          this.gender.options.push("All");
          this.gender.options.push(
            ...dimGender
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.gender.value = this.gender.options[0];

          this.cluster.options.push("All");
          this.cluster.options.push(
            ...dimCluster
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.cluster.value = this.cluster.options[0];

          this.refreshDashboard();
        });
    },
    watch: {
      jobType: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimJobType.filter(null);
          } else {
            dimJobType.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      ageBind: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimAgeBind.filter(null);
          } else {
            dimAgeBind.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      jobYearsBind: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimJobYearsBind.filter(null);
          } else {
            dimJobYearsBind.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      gender: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimGender.filter(null);
          } else {
            dimGender.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      cluster: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimCluster.filter(null);
          } else {
            dimCluster.filter(newVal.value);
          }
          this.refreshDashboard();
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
      refreshDashboard() {
        this.fullNamesList = cf.allFiltered().map(row => row.FullName);

        const countRecords = cf
          .groupAll()
          .reduceCount()
          .value();

        this.numEmployee = countRecords;

        this.avgAge =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.Age)
                .value()) /
              countRecords
          ) / 100;

        this.avgJobYears =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.JobYears)
                .value()) /
              countRecords
          ) / 100;

        this.jobTypeData = dimJobType
          .group()
          .reduceCount()
          .all();

        this.jobYearsBindData = dimJobYearsBind
          .group()
          .reduceCount()
          .all();

        this.ageBindData = dimAgeBind
          .group()
          .reduceCount()
          .all();
      },
    },
  };
</script>

<style scoped></style>
