// 柱状图的dom，初始化echarts实例
var barChart = echarts.init(document.getElementById("barChartContainer"));

// 指定柱状图的配置项和数据
var barOption = {
  title: {
    text: "鸢尾花数据集的种类分布",
  },
  tooltip: {},
  legend: {
    data: ["数量"],
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  dataset: {},
  series: [
    {
      name: "数量",
      type: "bar",
      // 指定数据来源
      encode: {
        // x 轴使用 species
        x: "species",
        // y 轴使用 count
        y: "count",
      },
    },
  ],
};

// 饼图的dom，初始化echarts实例
var pieChart = echarts.init(document.getElementById("pieChartContainer"));

// 指定饼图的配置项和数据
var pieOption = {
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
    },
  ],
};

// 散点图的dom，初始化echarts实例
var scatterChart = echarts.init(
  document.getElementById("scatterChartContainer")
);

// 指定饼图的配置项和数据
var scatterOption = {
  xAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: {
        formatter: "{value} cm",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: {
        formatter: "{value} cm",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      data: [
        [5.1, 3.5],
        [4.9, 3],
        [4.7, 3.2],
        [4.6, 3.1],
        [5, 3.6],
      ],
      name: "Iris-setosa",
      type: 'scatter',
    },
    {
      data: [
        [7, 3.2],
        [6.4, 3.2],
        [6.9, 3.1],
        [5.5, 2.3],
        [6.5, 2.8],
      ],
      name: "Iris-versicolor",
      type: 'scatter',
    },
    {
      data: [
        [6.3, 3.3],
        [5.8, 2.7],
        [7.1, 3],
        [6.3, 2.9],
        [6.5, 3],
      ],
      name: "Iris-virginica",
      type: 'scatter',
    },
  ],
};

scatterChart.setOption(scatterOption);

// 英文到中文的映射
const speciesNameMapping = {
  "Iris-setosa": "山鸢尾",
  "Iris-versicolor": "杂色鸢尾",
  "Iris-virginica": "弗吉尼亚鸢尾",
};

// 使用 fetch API 加载 JSON 数据
fetch("/iris_species_counts")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)

    data.forEach((item) => {
      item.species = speciesNameMapping[item.species] || item.species;
    });

    barOption.dataset.source = data;
    // console.log(barOption.dataset.source);
    barChart.setOption(barOption);

    pieOption.series[0].data = data.map((item) => ({
      name: item.species,
      value: item.count,
    }));
    pieChart.setOption(pieOption);
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
