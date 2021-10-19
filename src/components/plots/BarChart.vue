<template>
  <div :id="plotId"></div>
</template>

<script>
  import Plotly from "plotly.js-dist";

  export default {
    name: "BarChart",
    props: {
      plotId: { required: true, type: String },
      labels: { required: true, type: Array },
      frequencies: { required: true, type: Array },
    },
    data: function() {
      return {
        x: this.labels,
        y: this.frequencies,
      };
    },
    mounted: function() {
      const data = [
        {
          x: this.x,
          y: this.y,
          type: "bar",
        },
      ];

      const layout = {
        title: "US Export of Plastic Scrap",
        xaxis: {
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
        },
        yaxis: {
          title: "USD (millions)",
          titlefont: {
            size: 16,
            color: "rgb(107, 107, 107)",
          },
          tickfont: {
            size: 14,
            color: "rgb(107, 107, 107)",
          },
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: "rgba(255, 255, 255, 0)",
          bordercolor: "rgba(255, 255, 255, 0)",
        },
        barmode: "group",
        bargap: 0.15,
        bargroupgap: 0.1,
        autosize: false,
        width: 250,
        height: 350,
        margin: {
          l: 50,
          r: 50,
          b: 100,
          t: 100,
          pad: 4,
        },
        paper_bgcolor: "white",
        plot_bgcolor: "white",
        showlegend: true,
      };

      const config = {
        displayModeBar: false,
      };

      Plotly.newPlot(this.plotId, data, layout, config);
    },
  };
</script>

<style scoped></style>
