<template>
  <div>
    <h5 class="header">Network</h5>
    <div class="network-controls">
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

        this.createNetwork(
          this.nodes,
          this.edges,
          this.settings.svgWidth,
          this.settings.svgHeight
        );
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
          .append("g")
          .selectAll("g.node")
          .data(nodes)
          .join("g")
          .attr("class", "node")
          .append("text")
          .text(d => d.Id)
          .attr("dx", width / 2)
          .attr("dy", height / 2)
          .call(d3.drag(simulation));

        const link = svg
          .append("g")
          .selectAll("g.line")
          .data(edges)
          .join("g")
          .attr("class", "line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.8);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3.forceLink(edges).id(d => d.Id)
          )
          .force(
            "charge",
            d3
              .forceManyBody()
              .strength(-400)
              .theta(0.8)
              .distanceMax(150)
          )
          .force(
            "collide",
            d3
              .forceCollide()
              /* .radius(d => 40) */
              .iterations(2)
          )
          .force("center", d3.forceCenter(width / 2, height / 2)); // This force attracts nodes to the center of the svg area

        simulation.on("tick", () => {
          link
            .attr("x1", d => {
              return d.Source.x;
            })
            .attr("y1", d => {
              return d.Source.y;
            })
            .attr("x2", d => {
              return d.Target.x;
            })
            .attr("y2", d => {
              return d.Target.y;
            });

          node.attr("cx", d => d.x).attr("cy", d => d.y);
        });
      },
    },
  };
</script>

<style scoped></style>
