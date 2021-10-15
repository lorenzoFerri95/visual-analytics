<template>
  <div></div>
</template>

<script>
export default {
  name: "Network",
  data: function() {
    return {
      nodes: [],
    };
  },
  mounted: function() {
    fetch("./static/data/nodes.json")
      .then((res) => res.json())
      .then(function(data) {
          console.log(data);
      });
  },
};
</script>

<style lang="scss" scoped></style>
