<template>
  <div>
    <!-- <div class="row justify-content-start">
      <div class="col-auto">
        <label for="nodeSize-rangeSelection" class="form-label">
          Node size
        </label>
        <input
          id="nodeSize-rangeSelection"
          type="range"
          class="form-range"
          min="1"
          max="30"
          step="1"
          v-model="options.nodeSize"
        />
        {{ options.nodeSize }}
      </div>
    </div> -->
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>

<script>
  import * as d3 from "d3";
  import D3Network from "vue-d3-network";

  export default {
    components: {
      D3Network,
    },
    name: "Network",
    data: function() {
      return {
        nodes: [],
        links: [],
        options: {
          resizeListener: true,
          size: { w: 1200, h: 600 },
          fontSize: 15,
          nodeSize: 10,
          nodeLabels: true,
          linkLabels: true,
          force: 600,
          forces: {
            Center: false,
            X: 0.2,
            Y: 0.4,
            ManyBody: true,
            Link: true,
          },
          noNodes: false,
        },
      };
    },
    mounted: function() {
      const resources = [
        "./static/data/nodes.json",
        "./static/data/links.json",
      ];

      let promises = [];

      resources.forEach(url => {
        promises.push(d3.json(url));
      });

      Promise.all(promises).then(responses => {
        this.nodes = responses[0];
        this.links = responses[1];
      });
    },
    /* watch: {
      options: {
        handler(newVal) {
          this.options.nodeSize = newVal.nodeSize;
        },
      },
      deep: true,
    }, */
  };
</script>

<style></style>
