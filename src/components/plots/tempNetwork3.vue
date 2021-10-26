<template>
  <div id="network"></div>
</template>

<script>
  import * as d3 from "d3";

  export default {
    name: "Network",
    data: function() {
      return {
        /* variabili di stato per i dati fetchati */
        networkData: null,
        simulation: null,
        color: d3.scaleOrdinal(d3.schemeCategory20),
        settings: {
          strokeColor: "#29B5FF",
          width: 100,
          svgWigth: 960,
          svgHeight: 600,
        },
      };
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
      edges: function() {
        return d3
          .select("svg")
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(this.networkData.edges)
          .enter()
          .append("line")
          .attr("stroke-width", function(d) {
            return Math.sqrt(d.value);
          });
      },
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

        this.createNetwork(this.nodes, this.edges);
      });
    },
    methods: {
      createNetwork(nodes, edges) {
        const width = 1200,
          height = 500;

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

        // This function is run at each iteration of the force algorithm, updating the nodes position.

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
      },

      ////

      /*         node
          .append("text")
          .attr("dx", 250)
          .attr("dy", 250)
          .text(d => {
            return d.Id;
          }); */
    },
    updated: function() {
      this.simulation.nodes(this.networkData.nodes).on("tick", function ticked() {
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

<style scoped></style>
