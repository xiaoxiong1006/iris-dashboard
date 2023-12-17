// 基于柱状图，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 基于饼图，初始化echarts实例
var pieChart = echarts.init(document.getElementById('pieChart'));

// 指定柱状图的配置项和数据
var option = {
    title: {
        text: '鸢尾花数据集的种类分布'
    },
    tooltip: {},
    legend: {
        data: ['数量']
    },
    dataset: {},
    xAxis: {},
    yAxis: {},
    series: [
        {
            type: 'bar',
            name: '数量',
            encode: {
                x: "species",
                y: "count",
            }
        }
    ]
};

// 指定饼图的配置项和数据
pieOption = {
    title: {
        text: '鸢尾花数据集的种类分布'
    },
    series: [
        {
            type: 'pie',
        }
    ]
};

// 英文到中文的映射
const speciesNameMapping = {
    "Iris-setosa": "山鸢尾",
    "Iris-versicolor": "杂色鸢尾",
    "Iris-virginica": "弗吉尼亚鸢尾",
};

// 使用 fetch API 加载 JSON 数据
fetch("/iris/species/count")
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)

        data.forEach((item) => {
            item.species = speciesNameMapping[item.species] || item.species;
        });

        console.log(data)

        option.dataset.source = data
        option.xAxis.data = data.map(item => item.species)
        myChart.setOption(option)

        pieOption.series[0].data = data.map((item)=>({
            name:item.species,
            value:item.count,
        }))

        pieChart.setOption(pieOption)

    }
    )
    .catch((error) => console.error("Error loading the JSON data:", error));