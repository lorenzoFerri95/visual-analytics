<template>
  <div id="my_dataviz"></div>
</template>

<script>
  /* const d3 = require("d3"); */
  import * as d3 from "d3";

  export default {
    name: "Network",
    data: function() {
      return {
        nodes: [],
        edges: [],
      };
    },
    mounted: function() {
      const resources = [
        "./static/data/nodes.json",
        "./static/data/edges.json",
      ];

      let promises = [];

      resources.forEach(it => {
        promises.push(d3.json(it));
      });

      Promise.all(promises).then(responses => {
        console.log(responses[0]);
        console.log(responses[1]);
      })



/*       Promise.all(promises)
        .then(responses => {
          return [responses[0].json(), responses[1].json()];
        })
        .then(data => {
          data[0].then(data0 => {
            this.nodes = data0;
            data[1].then(data1 => {
              this.edges = data1;

              console.log(this.nodes);
              console.log(this.edges);

              this.createNetwork(this.nodes, this.edges);
            });
          });
        }); */
    },
    methods: {
      createNetwork(nodes, edges) {
        const width = 960,
          height = 500;

        const svg = d3
          .select("#my_dataviz")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        /*         const force = d3.layout
          .force()
          .gravity(0.05)
          .distance(100)
          .charge(-100)
          .size([width, height]);

        force
          .nodes(nodes)
          .links(edges)
          .start(); */

        /* var link = svg
          .selectAll(".link")
          .data(edges)
          .enter()
          .append("line")
          .attr("class", "link")
          .style("stroke-width", function(d) {
            return Math.sqrt(d.weight);
          }); */

        const node = svg
          .selectAll("g.node") //text
          .data(nodes)
          .join("g")
          .attr("class", "node"); //text
        /* .call(force.drag); */

        /* node.append("circle").attr("r", "5"); */

        node
          .append("text")
          .attr("dx", 250)
          .attr("dy", 250)
          .text(d => {
            return d.Id;
          })
          .call(this.drag(simulation));

        const simulation = d3
          .forceSimulation(nodes)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(edges))
          .force("center", d3.forceCenter(width / 2, height / 2));
        /* 
        simulation
          .nodes(nodes)
          .links(edges)
          .start(); */

        /* force.on("tick", function() {
          link
            .attr("x1", function(d) {
              return d.source.x;
            })
            .attr("y1", function(d) {
              return d.source.y;
            })
            .attr("x2", function(d) {
              return d.target.x;
            })
            .attr("y2", function(d) {
              return d.target.y;
            });

          node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
        });*/
      },
      drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      },
    },
  };
</script>

<style scoped>
  .link {
    stroke: #aaa;
  }

  .node text {
    stroke: #333;
    cursos: pointer;
  }

  .node circle {
    stroke: #fff;
    stroke-width: 3px;
    fill: #555;
  }
</style>
