<template>
  <div class="container">
    <div class="chartContent">
      <LineChart />
      <DonutChart />
      <div
        class="data-none"
        v-if="$store.state.lineChartCategories.length === 0"
      >
        <h2 class="data-none-title contents-black">
          차트에 보여줄 데이터가 없습니다.
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import DonutChart from "../components/DonutChart.vue";
export default {
  name: "TabStet",
  components: {
    LineChart,
    DonutChart,
  },
};
</script>

<style>
.data-none {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.data-none-title {
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 18px;
}
</style>
