<template>
  <div>
    <div class="controls">
      <div>
        <label>Adjust width</label>
        <input type="range" v-model="settings.width" min="0" max="100" />
      </div>
    </div>
    <div id="network" :style="{ width: settings.width + '%' }"></div>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Network",
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        networkData: null,
        /* variabili di stato */
        simulation: null,
        settings: {
          strokeColor: "#29B5FF",
          width: 100,
          svgWigth: 960,
          svgHeight: 600,
        },
      };
    },
    mounted: function() {
      fetch("./static/data/network.json")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.networkData = data; /* .map(row => this.parseNetworkRow(row)); */

          this.simulation = d3
            .forceSimulation(this.networkData.nodes)
            .force(
              "link",
              d3
                .forceLink(this.networkData.links)
                .distance(100)
                .strength(0.1)
            )
            .force("charge", d3.forceManyBody())
            .force(
              "center",
              d3.forceCenter(
                this.settings.svgWigth / 2,
                this.settings.svgHeight / 2
              )
            );
        });
      console.log("mounted");
    },
    computed: {},
    methods: {
      parseNetworkRow(row) {
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
    updated: function() {
      this.simulation
        .nodes(this.networkData.nodes)
        .on("tick", function ticked() {
          this.edges
            .attr("x1", function(d) {
              return d.Source.x;
            })
            .attr("y1", function(d) {
              return d.Source.y;
            })
            .attr("x2", function(d) {
              return d.Target.x;
            })
            .attr("y2", function(d) {
              return d.Target.y;
            });

          this.nodes
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            });
        });
    },
  };
</script>

<style scoped>
  body {
    width: 100%;
    height: 100%;
    font-family: monospace;
  }

  .controls {
    top: 16px;
    left: 16px;
    background: #f8f8f8;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .svg-container {
    display: table;
    border: 1px solid #f8f8f8;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .controls > * + * {
    margin-top: 1rem;
  }

  label {
    display: block;
  }

  .links line {
    stroke: #999;
    stroke-opacity: 0.6;
  }

  .nodes circle {
    stroke: #fff;
    stroke-width: 1.5px;
  }
</style>
