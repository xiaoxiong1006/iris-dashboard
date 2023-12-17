// 基于 散点 图，初始化echarts实例
var histChart = echarts.init(document.getElementById("histChart"));

// 假设您从 Flask API 获取到的数据如下
const histogramData = {
  "Iris-setosa": {
    frequencies: [9, 19, 12, 9, 1, 0, 0, 0, 0, 0],
    intervals: [
      "4.3-4.7",
      "4.7-5.0",
      "5.0-5.4",
      "5.4-5.7",
      "5.7-6.1",
      "6.1-6.5",
      "6.5-6.8",
      "6.8-7.2",
      "7.2-7.5",
      "7.5-7.9",
    ],
  },
  "Iris-versicolor": {
    frequencies: [0, 3, 2, 16, 9, 11, 7, 2, 0, 0],
    intervals: [
      "4.3-4.7",
      "4.7-5.0",
      "5.0-5.4",
      "5.4-5.7",
      "5.7-6.1",
      "6.1-6.5",
      "6.5-6.8",
      "6.8-7.2",
      "7.2-7.5",
      "7.5-7.9",
    ],
  },
  "Iris-virginica": {
    frequencies: [0, 1, 0, 2, 6, 15, 11, 4, 5, 6],
    intervals: [
      "4.3-4.7",
      "4.7-5.0",
      "5.0-5.4",
      "5.4-5.7",
      "5.7-6.1",
      "6.1-6.5",
      "6.5-6.8",
      "6.8-7.2",
      "7.2-7.5",
      "7.5-7.9",
    ],
  },
};

const histSeries = Object.keys(histogramData).map((species) => ({
  name: speciesNameMapping[species],
  type: "bar",
  data: histogramData[species].frequencies,
  barGap: "0%",
  barWidth: "100%",
  itemStyle: {
    opacity: 0.8,
  },
}));

const histOption = {
  title: {
    text: "鸢尾花花萼长度分布",
  },
  tooltip: {},
  legend: {
    data: Object.keys(histogramData).map(
      (species) => speciesNameMapping[species]
    ), // 将英文名映射为中文名
    left: "center",
    bottom: 5,
  },
  xAxis: {
    data: histogramData["Iris-setosa"].intervals, // 或者其他种类的区间，确保它们是相同的
    axisLabel: {
      rotate: 45, // 或您认为合适的其他角度
    },
  },
  yAxis: {},
  series: histSeries,
};

// 使用刚指定的配置项和数据显示图表。
histChart.setOption(histOption);

