<template>
  <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
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
    watch: {
      networkNodesData: function(newData) {
        this.nodes = newData;
      },
      networkLinksData: function(newData) {
        this.links = newData;
      },
    },
  };
</script>

<style></style>
