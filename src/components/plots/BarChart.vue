<template>
  <Plotly
    :id="plotId"
    :data="plotData"
    :layout="layout"
    :display-mode-bar="false"
  ></Plotly>
</template>

<script>
  import { Plotly } from "vue-plotly";

  export default {
    name: "BarChart",
    components: {
      Plotly,
    },
    props: {
      plotId: { required: true, type: String },
      aggregatedData: { required: true, type: Array },
    },
    data: function() {
      return {
        plotData: [
          {
            x: this.aggregatedData.map(row => row.key),
            y: this.aggregatedData.map(row => row.value),
            type: "bar",
            marker: {
              /* color: "#7d7d7d", */
              opacity: 0.9,
              line: {
                color: "white",
                width: 1,
              },
            },
          },
        ],
        layout: {
          title: this.plotId,
          xaxis: {
            tickfont: {
              size: 10,
              color: "#000",
            },
            tickangle: 45,
            showgrid: true,
            zeroline: false,
            showline: false,
            gridcolor: "#bdbdbd",
            gridwidth: 1,
            zerolinecolor: "#969696",
            zerolinewidth: 1,
            linecolor: "#636363",
            linewidth: 1,
          },
          yaxis: {
            title: "",
            titlefont: {
              size: 12,
              color: "#000",
            },
            showgrid: true,
            zeroline: false,
            showline: false,
            gridcolor: "#bdbdbd",
            gridwidth: 1,
            zerolinecolor: "#969696",
            zerolinewidth: 1,
            linecolor: "#636363",
            linewidth: 1,
          },
          legend: {
            x: 0,
            y: 1.0,
            bgcolor: "rgba(255, 255, 255, 0)",
            bordercolor: "rgba(255, 255, 255, 0)",
          },
          barmode: "group",
          bargap: 0.4,
          bargroupgap: 0,
          autosize: false,
          width: 280,
          height: 450,
          margin: {
            l: 30,
            r: 40,
            b: 120,
            t: 80,
            pad: 3,
          },
          paper_bgcolor: "#F8F9Fa",
          plot_bgcolor: "#ebebeb",
          showlegend: false,
        },
        config: {
          displayModeBar: false,
        },
      };
    },
    watch: {
      aggregatedData: function(newData) {
        this.plotData[0].x = newData.map(row => row.key);
        this.plotData[0].y = newData.map(row => row.value);
      },
    },
  };
</script>

<style scoped></style>
