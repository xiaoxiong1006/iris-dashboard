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
      data: [
        {
          value: 50,
          name: "Iris-setosa",
        },
        {
          value: 50,
          name: "Iris-versicolor",
        },
        {
          value: 50,
          name: "Iris-virginica",
        },
      ],
      radius: ['40%', '70%']
    },
  ],
};

pieChart.setOption(pieOption);

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
    console.log(barOption.dataset.source);
    barChart.setOption(barOption);
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
