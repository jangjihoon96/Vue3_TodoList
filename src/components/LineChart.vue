<template>
  <div id="lineChart">
    <apexchart
      type="line"
      ref="radar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LineChart",
  computed: {
    ...mapState({
      categories: (state) => state.lineChartCategories,
      data: (state) => state.lineChartData,
    }),
  },
  watch: {
    categories(newVal) {
      this.$refs.radar.updateOptions({
        xaxis: {
          categories: [...newVal],
        },
      });
    },
    data(newVal) {
      this.$refs.radar.updateSeries([
        {
          data: [...newVal],
        },
      ]);
    },
  },
  data() {
    return {
      options: {
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 10,
          decimalsInFloat: 0,
        },
        title: {
          text: "날짜별 할 일 수량 차트",
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "Avenir, Helvetica, Arial, sans-serif",
            color: "#1b1b1b",
          },
        },
        chart: {
          id: "line-chart",
          width: "100%",
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        colors: ["#ff8600"],
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
      series: [
        {
          name: "합계",
          data: [],
        },
      ],
    };
  },
};
</script>

<style></style>
