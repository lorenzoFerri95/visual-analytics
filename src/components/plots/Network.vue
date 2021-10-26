<template>
  <div>
    <div class="controls">
      <div>
        <label>Adjust width</label>
        <input type="range" v-model="settings.widthPerc" min="0" max="100" />
      </div>
    </div>
    <div id="network" :style="{ width: settings.widthPerc + '%' }"></div>
  </div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Network",
    data: function() {
      return {
        nodes: [],
        edges: [],
        settings: {
          strokeColor: "#29B5FF",
          widthPerc: 100,
          svgWidth: 960,
          svgHeight: 600,
        },
      };
    },
    mounted: function() {
      const resources = [
        "./static/data/nodes.json",
        "./static/data/edges.json",
      ];

      let promises = [];

      resources.forEach(url => {
        promises.push(d3.json(url));
      });

      Promise.all(promises).then(responses => {
        this.nodes = responses[0];
        this.edges = responses[1];

        this.createNetwork(this.nodes, this.edges, this.settings.svgWidth, this.settings.svgHeight);
      });
    },
    methods: {
      createNetwork(nodes, edges, width, height) {

        const svg = d3
          .select("#network")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        // Initialize the nodes
        const node = svg
          .selectAll("g.nodes")
          .data(nodes)
          .join("g")
          .attr("class", "nodes")
          .append("text")
          .attr("dx", width / 2)
          .attr("dy", height / 2)
          .text(d => {
            return d.Id;
          });

        const link = svg
          .selectAll("line")
          .data(edges)
          .join("line")
          .attr("class", "line")
          .style("stroke", "#aaa");

        const simulation = d3
          .forceSimulation()
          .nodes(nodes) // Force algorithm is applied to nodes
          .force(
            "link",
            d3
              .forceLink() // This force provides links between nodes
              .id(d => {
                return d.Id;
              }) // This provide  the id of a node
              .links(edges) // and this the list of links
          )
          .force(
            "charge",
            d3
              .forceManyBody()
              .strength(-400)
              .theta(0.8)
              .distanceMax(150)
          ) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
          .force(
            "collide",
            d3
              .forceCollide()
              /* .radius(d => 40) */
              .iterations(2)
          )
          .force("center", d3.forceCenter(width / 2, height / 2)); // This force attracts nodes to the center of the svg area

        simulation.on("tick", ticked);

        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
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

          node
            .attr("r", 16)
            .style("fill", "#efefef")
            .style("stroke", "#424242")
            .style("stroke-width", "1px")
            .attr("cx", function(d) {
              return d.x + 6;
            })
            .attr("cy", function(d) {
              return d.y - 6;
            });
        }

        ////

        /*         node
          .append("text")
          .attr("dx", 250)
          .attr("dy", 250)
          .text(d => {
            return d.Id;
          }); */
      },
    },
  };
</script>

<style scoped>
.controls {
    top: 16px;
    left: 16px;
    background: #f8f8f8;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  </style>
