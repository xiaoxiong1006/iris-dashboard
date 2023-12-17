// 基于 散点 图，初始化echarts实例
var histChart = echarts.init(document.getElementById("histChart"));

// 使用 fetch API 加载 JSON 数据
fetch("/iris/species/sepal/histogram")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // 假设您从 Flask API 获取到的数据如下
    const histogramData = data;

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
  })
  .catch((error) => console.error("Error loading the JSON data:", error));
  