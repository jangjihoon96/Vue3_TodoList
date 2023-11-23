<template>
  <div class="flex-wrap">
    <div ref="donutChart" class="donut-chart"></div>
    <ul class="donut-chart-data">
      <li>
        <span aria-hidden="true" class="list-style red"></span>
        <h2 class="contents-black">진행전</h2>
        <p class="contents-black">{{ $store.state.donutChartData[0] }}</p>
      </li>
      <li>
        <span aria-hidden="true" class="list-style orange"></span>
        <h2 class="contents-black">진행중</h2>
        <p class="contents-black">{{ $store.state.donutChartData[1] }}</p>
      </li>
      <li>
        <span aria-hidden="true" class="list-style green"></span>
        <h2 class="contents-black">완료</h2>
        <p class="contents-black">{{ $store.state.donutChartData[2] }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "DonutChart",
  mounted() {
    this.createDonutChart();
    this.$watch(
      () => this.$store.state.donutChartData,
      () => {
        // 상태 변화가 감지되면 차트를 다시 생성하여 업데이트
        this.createDonutChart();
      }
    );
  },
  methods: {
    createDonutChart() {
      // 이미 존재하는 차트 요소 제거
      d3.select(this.$refs.donutChart).select("svg").remove();

      // 데이터와 색상, 제목 설정
      let checkData = [...this.$store.state.donutChartData];
      let changeTitles = ["진행전", "진행중", "완료"];
      if (checkData[0] === 0) {
        changeTitles[0] = null;
      }
      if (checkData[1] === 0) {
        changeTitles[1] = null;
      }
      if (checkData[2] === 0) {
        changeTitles[2] = null;
      }
      const data = [...this.$store.state.donutChartData];
      const colors = ["#ec4d3e", "#f6c25b", "#77d572"];
      const titles = [...changeTitles];

      // SVG 요소 설정
      const width = 200;
      const height = 200;
      const radius = Math.min(width, height) / 2;
      const svg = d3
        .select(this.$refs.donutChart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // 색상 스케일과 파이 생성
      const colorScale = d3.scaleOrdinal().range(colors);
      const pie = d3.pie().value((d) => d);

      // 아크 설정
      const arc = d3
        .arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius);

      // 파이 데이터 생성
      const data_ready = pie(data);

      // 각 섹션의 아크를 생성하여 색상과 함께 추가
      svg
        .selectAll("whatever")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colorScale(i));

      // 텍스트 추가
      svg
        .selectAll("whatever")
        .data(data_ready)
        .enter()
        .append("text")
        .text((d, i) => {
          return titles[i];
        })
        .attr("transform", function (d) {
          const [x, y] = arc.centroid(d); // 각 섹션의 중심점
          return `translate(${x},${y})`;
        })
        .style("text-anchor", "middle")
        .style("font-weight", "700")
        .style("font-size", "12px")
        .style("fill", "#ffffff")
        .attr("dy", "0.35em");
    },
  },
};
</script>
<style>
.flex-wrap {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.donut-chart {
  width: 200px;
  height: 200px;
}
.donut-chart-data {
  width: 180px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  gap: 20px;
}
.donut-chart-data li {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding-left: 20px;
}
.donut-chart-data li .list-style {
  width: 3px;
  height: 16px;
  border-radius: 1px;
  align-items: center;
  margin-right: 8px;
}
.donut-chart-data li .red {
  background-color: #ec4d3e;
}
.donut-chart-data li .orange {
  background-color: #f6c25b;
}
.donut-chart-data li .green {
  background-color: #77d572;
}
.donut-chart-data li h2,
.donut-chart-data li p {
  font-weight: 600;
  font-size: 16px;
  text-align: left;
}
.donut-chart-data li h2 {
  width: 60px;
  flex-shrink: 0;
}
@media screen and (max-width: 414px) {
  .flex-wrap {
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 40px;
  }
  .donut-chart-data {
    width: 180px;
    flex-flow: row nowrap;
    justify-content: center;
    align-content: center;
    gap: 20px;
  }
  .donut-chart-data li {
    padding-left: 0;
  }
  .donut-chart-data li .list-style {
    width: 3px;
    height: 12px;
    margin-right: 4px;
  }
  .donut-chart-data li h2,
  .donut-chart-data li p {
    font-weight: 600;
    font-size: 14px;
    text-align: left;
  }
  .donut-chart-data li h2 {
    width: 40px;
  }
}
</style>
