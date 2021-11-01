<template>
  <div>
    <div class="row justify-content-start ms-5 mb-5 pb-3">
      <div class="col-auto">
        <h5 class="header">Filters</h5>
        <TheForm
          :jobType="jobType"
          :ageBind="ageBind"
          :suspectedPok="suspectedPok"
          :suspectedKidnapped="suspectedKidnapped"
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
            <BaseCard header="numer of employee" :text="numEmployee" />
          </div>
          <div class="col-auto">
            <BaseCard header="avg age" :text="avgAge" />
          </div>
        </div>

        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <BaseCard header="avg years since job start" :text="avgJobYears" />
          </div>
          <div class="col-auto">
            <BaseCard
              header="avg years since mlitary discharge"
              :text="avgMlitaryDischargeYears"
            />
          </div>
        </div>

        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <BaseCard
              header="avg years since passport issue date"
              :text="avgPassportIssueYears"
            />
          </div>
          <div class="col-auto">
            <BaseCard
              header="avg years to passport expiration date"
              :text="avgPassportExpireYears"
            />
          </div>
        </div>
      </div>

      <div class="col-8" align="center">
        <h5 class="header">Bar Charts</h5>
        <div class="row justify-content-start ms-5 mb-0 pb-0">
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart
              plotId="Years in current job"
              :aggregatedData="jobYearsBindData"
            />
          </div>
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart plotId="Job type" :aggregatedData="jobTypeData" />
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
  let dimJobType;
  let dimAgeBind;
  let dimSuspectedPok;
  let dimSuspectedKidnapped;
  let dimGender;
  let dimCluster;
  let dimJobYearsBind;

  export default {
    name: "Dashboard",
    components: {
      TheForm,
      BaseListGroup,
      BaseCard,
      BarChart,
    },
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        employeeData: [],
        /* variabili di stato per le opzioni selezionabili dall'utente nei filtri */
        jobType: {
          value: "",
          options: [],
        },
        ageBind: {
          value: "",
          options: [],
        },
        suspectedPok: {
          value: "",
          options: [],
        },
        suspectedKidnapped: {
          value: "",
          options: [],
        },
        gender: {
          value: "",
          options: [],
        },
        cluster: {
          value: "",
          options: [],
        },
        /* variabili di stato per i dati da inserire nella pagina web */
        /* per la lista dei nomi */
        fullNamesList: [],
        /* per le statistiche */
        numEmployee: 0,
        avgAge: 0,
        avgJobYears: 0,
        avgMlitaryDischargeYears: 0,
        avgPassportIssueYears: 0,
        avgPassportExpireYears: 0,
        /* per i Bar Charts */
        jobYearsBindData: [],
        jobTypeData: [],
        ageBindData: [],
      };
    },
    mounted: function() {
      fetch("./static/data/employee.json")
        .then(response => response.json())
        .then(data => {
          this.employeeData = data.map(row => this.parseEmployeeRow(row));

          cf = crossfilter(this.employeeData);

          dimJobType = cf.dimension(row => row.jobType);
          dimAgeBind = cf.dimension(row => row.ageBind);
          dimSuspectedPok = cf.dimension(row => row.suspectedPok);
          dimSuspectedKidnapped = cf.dimension(row => row.suspectedKidnapped);
          dimGender = cf.dimension(row => row.gender);
          dimCluster = cf.dimension(row => row.cluster);
          dimJobYearsBind = cf.dimension(row => row.jobYearsBind);

          this.jobType.options.push("All");
          this.jobType.options.push(
            ...dimJobType
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.jobType.value = this.jobType.options[0];

          this.ageBind.options.push("All");
          this.ageBind.options.push(
            ...dimAgeBind
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.ageBind.value = this.ageBind.options[0];

          this.suspectedPok.options.push("All");
          this.suspectedPok.options.push(
            ...dimSuspectedPok
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.suspectedPok.value = this.suspectedPok.options[0];

          this.suspectedKidnapped.options.push("All");
          this.suspectedKidnapped.options.push(
            ...dimSuspectedKidnapped
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.suspectedKidnapped.value = this.suspectedKidnapped.options[0];

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
      suspectedPok: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimSuspectedPok.filter(null);
          } else {
            dimSuspectedPok.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      suspectedKidnapped: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimSuspectedKidnapped.filter(null);
          } else {
            dimSuspectedKidnapped.filter(newVal.value);
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
          fullName: row.FullName,
          gender: row.Gender,
          age: +row.Age,
          ageBind: row.AgeBind,
          cluster: +row.Cluster,
          jobType: row.CurrentEmploymentType,
          jobYears: +row.YearsSinceCurrentEmploymentStart,
          jobYearsBind: row.YSCESBind,
          militaryDischargeYears: +row.YearsSinceMilitaryDischargeDate,
          passportIssueYears: +row.YearsSincePassportIssueDate,
          passportExpireYears: +row.YearsToPassportExpirationDate,
          suspectedPok: row.POK_Suspected,
          suspectedKidnapped: row.Kidnapped_Suspected,
        };
        return parsedRow;
      },
      refreshDashboard() {
        /* aggiornamento della variabile per la lista di nomi */
        this.fullNamesList = cf.allFiltered().map(row => row.fullName);

        /* aggiornamento delle variabili per le statistiche */
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
                .reduceSum(row => row.age)
                .value()) /
              countRecords
          ) / 100;

        this.avgJobYears =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.jobYears)
                .value()) /
              countRecords
          ) / 100;

        this.avgMlitaryDischargeYears =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.militaryDischargeYears)
                .value()) /
              countRecords
          ) / 100;

        this.avgPassportIssueYears =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.passportIssueYears)
                .value()) /
              countRecords
          ) / 100;

        this.avgPassportExpireYears =
          Math.round(
            (100 *
              cf
                .groupAll()
                .reduceSum(row => row.passportExpireYears)
                .value()) /
              countRecords
          ) / 100;

        /* aggiornamento delle variabili per i dati dei Bar Charts */
        this.jobYearsBindData = dimJobYearsBind
          .group()
          .reduceCount()
          .all();

        this.jobTypeData = dimJobType
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
