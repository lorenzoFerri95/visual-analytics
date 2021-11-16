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
  import D3Network from "vue-d3-network";

  export default {
    components: {
      D3Network,
    },
    name: "Network",
    props: {
      networkNodesData: { required: true, type: Array },
      networkLinksData: { required: true, type: Array },
    },
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
      /* fetch("./static/data/links.json")
        .then(response => response.json())
        .then(data => (this.links = data)); */
    },
    watch: {
      networkNodesData: function(newData) {
        this.nodes = newData;
      },
      networkLinksData: function(newData) {
        this.links = newData;
      },
      /* options: {
        handler(newVal) {
          this.options.nodeSize = newVal.nodeSize;
        },
      },
      deep: true, */
    },
  };
</script>

<style></style>
