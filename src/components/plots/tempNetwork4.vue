<template>
  <div id="network">
    <div class="controls">
      <div>
        <label>Adjust width</label>
        <input type="range" v-model="settings.width" min="0" max="100" />
      </div>
    </div>
    <div class="svg-container" :style="{ width: settings.width + '%' }">
      <svg
        id="svg"
        pointer-events="all"
        viewBox="0 0 960 600"
        preserveAspectRatio="xMinYMin meet"
      >
        <g :id="links"></g>
        <g :id="nodes"></g>
      </svg>
    </div>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Network",
    el: "#network",
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
      console.log("mounted");
      d3.json("./static/data/network.json", function(error, network) {
        if (error) throw error;
        this.networkData = network;
        console.log("json");
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
    },
    computed: {
      nodes: function() {
        return d3
          .select("svg")
          .append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(this.networkData.nodes)
          .enter()
          .append("circle")
          .attr("r", 20)
          .attr("fill", function(d, i) {
            return this.color(i);
          })
          .call(
            d3
              .drag()
              .on("start", function dragstarted(d) {
                if (!d3.event.active)
                  this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
              })
              .on("drag", function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
              })
              .on("end", function dragended(d) {
                if (!d3.event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
              })
          );
      },
      links: function() {
        return d3
          .select("svg")
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(this.networkData.links)
          .enter()
          .append("line")
          .attr("stroke-width", function(d) {
            return Math.sqrt(d.value);
          });
      },
    },
    methods: {},
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
    position: fixed;
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
