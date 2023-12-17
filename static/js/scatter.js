// 基于 散点 图，初始化echarts实例
var scatterChart = echarts.init(document.getElementById("scatterChart"));

scatterOption = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      type: "scatter",
    },
    {
      type: "scatter",
    },
    {
      type: "scatter",
    },
  ],
};

// 使用 fetch API 加载 JSON 数据
fetch("/iris/species/petal")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // 将数据赋值给 scatterOption.series
    data.forEach((item, index) => {
      if (scatterOption.series[index]) {
        scatterOption.series[index].data = item.data;
        scatterOption.series[index].name = item.name;
      }
    });

    // scatterOption.series[0].name = data[0].name;
    // scatterOption.series[0].data = data[0].data;

    // scatterOption.series[1].name = data[1].name;
    // scatterOption.series[1].data = data[1].data;

    // scatterOption.series[2].name = data[2].name;
    // scatterOption.series[2].data = data[2].data;

    scatterChart.setOption(scatterOption);
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
