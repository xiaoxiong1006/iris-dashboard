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

// 指定散点图的配置项和数据
var scatterOption = {
  title: {
    text: "不同种类花萼长度与宽度的分布图",
  },
  legend: {
    left: 'center',
    bottom: 10
  },
  toolbox: {
    feature: {
      dataZoom: {},
      brush: {
        type: ['rect']
      }
    }
  },
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
  series: [{ type: "scatter" }, { type: "scatter" }, { type: "scatter" }],
};

//scatterChart.setOption(scatterOption);

// 英文到中文的映射
const speciesNameMapping = {
  "Iris-setosa": "山鸢尾",
  "Iris-versicolor": "杂色鸢尾",
  "Iris-virginica": "弗吉尼亚鸢尾",
};

// 使用 fetch API 加载种类分布的json数据
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

// 使用 fetch API 加载花萼的json数据
fetch("/iris_sepal_data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // 将数据赋值给 scatterOption.series
    data.forEach((item, index) => {
      if (scatterOption.series[index]) {
        scatterOption.series[index].data = item.data;
        scatterOption.series[index].name =
          speciesNameMapping[item.name] || item.name;
        scatterOption.legend[index] = speciesNameMapping[item.name] || item.name;
      }
    });

    scatterChart.setOption(scatterOption);
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
