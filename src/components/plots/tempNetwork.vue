<template>
  <div id="my_dataviz"></div>
</template>

<script>
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
        promises.push(fetch(it));
      });

      /*       Promise.all(promises)
        .then(responses => {
          let res = [];
          for (let response of responses) {
            res.push(response.json());
          }
          return res;
        })
        .then(data => console.log(data)); */

      Promise.all(promises)
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

              this.ForceGraph({ nodes: this.nodes, edges: this.edges });
            });
          });
        });

      /*       Promise.all(promises)
        .then(responses => {
          return [responses[0].json(), responses[1].json()];
        })
        .then(data => {
          data[0].then(data0 => (this.nodes = data0));
          data[1].then(data1 => (this.edges = data1));

          this.ForceGraph({ nodes: this.nodes, edges: this.edges });
        }); */
    },
    methods: {
      ForceGraph(
        {
          nodes, // an iterable of node objects (typically [{id}, …])
          edges, // an iterable of link objects (typically [{source, target}, …])
        },
        {
          nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
          nodeGroup, // given d in nodes, returns an (ordinal) value for color
          nodeGroups, // an array of ordinal values representing the node groups
          nodeTitle, // given d in nodes, a title string
          nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
          nodeStroke = "#fff", // node stroke color
          nodeStrokeWidth = 1.5, // node stroke width, in pixels
          nodeStrokeOpacity = 1, // node stroke opacity
          nodeRadius = 5, // node radius, in pixels
          linkSource = ({ source }) => source, // given d in links, returns a node identifier string
          linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
          linkStroke = "#999", // link stroke color
          linkStrokeOpacity = 0.6, // link stroke opacity
          linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
          linkStrokeLinecap = "round", // link stroke linecap
          colors = d3.schemeTableau10, // an array of color strings, for the node groups
          width = 640, // outer width, in pixels
          height = 400, // outer height, in pixels
          invalidation, // when this promise resolves, stop the simulation
        } = {}
      ) {
        // Compute values.
        const N = d3.map(nodes, nodeId).map(intern);
        const LS = d3.map(edges, linkSource).map(intern);
        const LT = d3.map(edges, linkTarget).map(intern);
        if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
        const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
        const G =
          nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
        const W =
          typeof linkStrokeWidth !== "function"
            ? null
            : d3.map(edges, linkStrokeWidth);

        // Replace the input nodes and links with mutable objects for the simulation.
        nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
        edges = d3.map(edges, (_, i) => ({ source: LS[i], target: LT[i] }));

        // Compute default domains.
        if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

        // Construct the scales.
        const color =
          nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3.forceLink(edges).id(({ index: i }) => N[i])
          )
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter())
          .on("tick", ticked);

        const svg = d3
          .select("#my_dataviz")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        const link = svg
          .append("g")
          .attr("stroke", linkStroke)
          .attr("stroke-opacity", linkStrokeOpacity)
          .attr(
            "stroke-width",
            typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
          )
          .attr("stroke-linecap", linkStrokeLinecap)
          .selectAll("line")
          .data(edges)
          .join("line");

        const node = svg
          .append("g")
          .attr("fill", nodeFill)
          .attr("stroke", nodeStroke)
          .attr("stroke-opacity", nodeStrokeOpacity)
          .attr("stroke-width", nodeStrokeWidth)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", nodeRadius)
          .call(drag(simulation));

        if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
        if (G) node.attr("fill", ({ index: i }) => color(G[i]));
        if (T) node.append("title").text(({ index: i }) => T[i]);
        if (invalidation != null) invalidation.then(() => simulation.stop());

        function intern(value) {
          return value !== null && typeof value === "object"
            ? value.valueOf()
            : value;
        }

        function ticked() {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node.attr("cx", d => d.x).attr("cy", d => d.y);
        }

        function drag(simulation) {
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
        }

        return Object.assign(svg.node(), { scales: { color } });
      },
    },
  };
</script>

<style scoped></style>
