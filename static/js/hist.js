// 基于 散点 图，初始化echarts实例
var histChart = echarts.init(document.getElementById("histChart"));

histOption = {
  title: {
    text: "模拟直方图",
  },
  tooltip: {},
  xAxis: {
    data: ["区间1", "区间2", "区间3", "区间4", "区间5"], // 这里的区间代表数据分布的区间
    name: "区间",
  },
  yAxis: {
    name: "频率",
  },
  series: [
    {
      name: "频率",
      type: "bar",
      barWidth: '100%',  // 设置柱子宽度为类目宽度的60%
      data: [5, 20, 36, 10, 10], // 这里的数字代表每个区间的数据频率
    },
  ],
};

// // 使用 fetch API 加载 JSON 数据
// fetch("/iris/species/petal")
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);

//     // 将数据赋值给 scatterOption.series
//     data.forEach((item, index) => {
//       if (scatterOption.series[index]) {
//         scatterOption.series[index].data = item.data;
//         scatterOption.series[index].name =
//           speciesNameMapping[item.name] || item.name;
//         scatterOption.legend[index] =
//           speciesNameMapping[item.name] || item.name;
//       }
//     });

//     // scatterOption.series[0].name = data[0].name;
//     // scatterOption.series[0].data = data[0].data;

//     // scatterOption.series[1].name = data[1].name;
//     // scatterOption.series[1].data = data[1].data;

//     // scatterOption.series[2].name = data[2].name;
//     // scatterOption.series[2].data = data[2].data;

//     scatterChart.setOption(scatterOption);
//   })
//   .catch((error) => console.error("Error loading the JSON data:", error));

histChart.setOption(histOption)
