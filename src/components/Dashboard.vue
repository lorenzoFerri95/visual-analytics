<template>
  <div>
    <div class="row justify-content-start ms-5 mb-5">
      <div class="col-auto">
        <h5 class="header">Filters</h5>
        <TheForm
          :jobType="jobType"
          :ageBind="ageBind"
          :membership="membership"
          :kidnapped="kidnapped"
          :gender="gender"
        />
      </div>
      <div class="col-1"></div>
      <div class="col-4 ms-4" align="center">
        <h5 class="header">Names List</h5>
        <div class="overflow-auto" style="height: 170px; width: 300px">
          <BaseListGroup :namesList="namesList" />
        </div>
      </div>
    </div>

    <div class="row justify-content-start ms-3 mb-5 pb-3">
      <div class="col-auto">
        <h5 class="header">Statistics</h5>
        <div class="row justify-content-center">
          <div class="col-auto">
            <BaseCard header="numer of persons" :text="numEmployee" />
          </div>
          <div class="col-auto">
            <BaseCard header="avg age" :text="avgAge" />
          </div>
        </div>

        <div class="row justify-content-center">
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

        <div class="row justify-content-center">
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
      <div class="col-1"></div>
      <div class="col-auto">
        <h5 class="header">Bar Charts</h5>
        <div class="row justify-content-start">
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart
              plotId="Years in current job"
              :aggregatedData="jobYearsBindData"
            />
          </div>
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart plotId="Age Rage" :aggregatedData="ageBindData" />
          </div>
          <div class="col-auto ms-0 me-0 ps-0 pe-0">
            <BarChart plotId="Job type" :aggregatedData="jobTypeData" />
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <h5 class="header">Network</h5>
      <div class="col-auto">
        <Network
          :networkNodesData="networkNodesData"
          :networkLinksData="networkLinksData"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import TheForm from "@/components/TheForm.vue";
  import BaseListGroup from "@/components/base/BaseListGroup.vue";
  import BaseCard from "@/components/base/BaseCard.vue";
  import BarChart from "@/components/plots/BarChart.vue";
  import Network from "@/components/plots/Network.vue";

  import crossfilter from "crossfilter2";

  let cf;
  let dimMembership;
  let dimKidnapped;
  let dimGender;
  let dimJobType;
  let dimAgeBind;
  let dimJobYearsBind;

  export default {
    name: "Dashboard",
    components: {
      TheForm,
      BaseListGroup,
      BaseCard,
      BarChart,
      Network,
    },
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        personsData: [],
        /* variabili di stato per le opzioni selezionabili dall'utente nei filtri */
        membership: {
          value: "",
          options: [],
        },
        kidnapped: {
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
        ageBind: {
          value: "",
          options: [],
        },
        /* variabili di stato per i dati da inserire nella pagina web */
        /* per la lista dei nomi */
        namesList: [],
        /* per le statistiche */
        numEmployee: 0,
        avgAge: 0,
        avgJobYears: 0,
        avgMlitaryDischargeYears: 0,
        avgPassportIssueYears: 0,
        avgPassportExpireYears: 0,
        /* per i Bar Charts */
        jobYearsBindData: [],
        ageBindData: [],
        jobTypeData: [],
        /* per il network */
        networkNodesData: [],
        networkLinksData: [],
      };
    },
    mounted: function() {
      fetch("./static/data/persons.json")
        .then(response => response.json())
        .then(data => {
          this.personsData = data.map(row => this.personsDataParsing(row));

          cf = crossfilter(this.personsData);

          dimMembership = cf.dimension(row => row.membership);
          dimKidnapped = cf.dimension(row => row.kidnapped);
          dimGender = cf.dimension(row => row.gender);
          dimJobType = cf.dimension(row => row.jobType);
          dimAgeBind = cf.dimension(row => row.ageBind);
          dimJobYearsBind = cf.dimension(row => row.jobYearsBind);

          this.membership.options.push("All");
          this.membership.options.push(
            ...dimMembership
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.membership.value = "All";

          this.kidnapped.options.push("All");
          this.kidnapped.options.push(
            ...dimKidnapped
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.kidnapped.value = "All";

          this.gender.options.push("All");
          this.gender.options.push(
            ...dimGender
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.gender.value = "All";

          this.jobType.options.push("All");
          this.jobType.options.push(
            ...dimJobType
              .group()
              .reduceCount()
              .all()
              .map(row => row.key)
          );
          this.jobType.value = "All";
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
      membership: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimMembership.filter(null);
          } else {
            dimMembership.filter(newVal.value);
          }
          this.refreshDashboard();
        },
        deep: true,
      },
      kidnapped: {
        handler(newVal) {
          if (newVal.value == "All") {
            dimKidnapped.filter(null);
          } else {
            dimKidnapped.filter(newVal.value);
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
    },
    methods: {
      personsDataParsing(row) {
        const parsedRow = {
          id: row.Id,
          name: row.FullName,
          gender: row.Gender,
          age: +row.Age,
          ageBind: row.AgeBind,
          jobType: row.CurrentEmploymentType,
          jobYears: +row.YearsSinceCurrentEmploymentStart,
          jobYearsBind: row.YSCESBind,
          militaryDischargeYears: +row.YearsSinceMilitaryDischargeDate,
          passportIssueYears: +row.YearsSincePassportIssueDate,
          passportExpireYears: +row.YearsToPassportExpirationDate,
          kidnapped: row.Kidnapped,
          membership: row.Membership,
          cssClass: row.CssClass,
          labelClass: row.LabelClass,
          targetNodes: row.TargetNodes,
        };
        return parsedRow;
      },
      networkNodesDataParsing(row) {
        const parsedRow = {
          id: row.id,
          name: row.name,
          _cssClass: row.cssClass,
          _labelClass: row.labelClass,
        };
        return parsedRow;
      },
      networkLinksDataParsing(row) {
        let parsedRow = [];
        row.targetNodes.forEach(element => {
          parsedRow.push({ sid: row.id, tid: element });
        });
        return parsedRow;
      },
      refreshDashboard() {
        /* aggiornamento della variabile per la lista di nomi */
        this.namesList = cf.allFiltered().map(row => row.name);

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

        /* aggiornamento delle variabili per i dati del Network */
        this.networkNodesData = cf
          .allFiltered()
          .map(row => this.networkNodesDataParsing(row));

        const filteredIds = new Set(cf.allFiltered().map(row => row.id));

        this.networkLinksData = cf
          .allFiltered()
          .flatMap(row => this.networkLinksDataParsing(row))
          .filter(d => filteredIds.has(d.tid));
      },
    },
  };
</script>

<style scoped></style>
