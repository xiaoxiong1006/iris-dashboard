from flask import Flask,render_template,jsonify
import pandas as pd
import numpy as np

app = Flask(__name__)

# 开启调试模式
app.config["DEBUG"] = True

# 读取数据集
iris = pd.read_csv("data/iris.csv")

# 获取山鸢尾（Iris-setosa）的记录
Iris_setosa = iris[iris.Species=='Iris-setosa']

# 获取杂色鸢尾（Iris Versicolour）的记录
Iris_versicolor = iris[iris.Species=='Iris-versicolor']

# 获取弗吉尼亚鸢尾 Iris Virginica）的记录
Iris_virginica = iris[iris.Species=='Iris-virginica']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/iris/species/count')
def iris_species_count():
    # 查看种类的分布情况
    species_counts = iris.Species.value_counts()

    # 转换为对象数组格式
    echarts_data = [{"species": species, "count": count} for species, count in species_counts.items()]

    # 返回JSON数据
    return jsonify(echarts_data)

@app.route('/iris/species/petal')
def iris_species_petal():

    # 构造返回的 JSON 数据
    data_to_return = [
        {
            "name": "Iris-setosa",
            "data": Iris_setosa[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-versicolor",
            "data": Iris_versicolor[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-virginica",
            "data": Iris_virginica[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        }
    ]

    return jsonify(data_to_return)

@app.route('/iris/species/sepal/histogram')
def iris_histogram():
    # 创建整个数据集的共同区间边界
    min_length = iris['SepalLengthCm'].min()
    max_length = iris['SepalLengthCm'].max()
    bins = np.linspace(min_length, max_length, num=21)  # 创建10个区间

    histogram_data = {}
    for species in iris['Species'].unique():
        species_data = iris[iris['Species'] == species]['SepalLengthCm']
        # 计算每个种类在共同区间的直方图数据
        frequencies, _ = np.histogram(species_data, bins=bins)
        # 转换区间边界为字符串
        intervals = ["{:.1f}-{:.1f}".format(bins[i], bins[i+1]) for i in range(len(bins)-1)]
        # 存储结果
        histogram_data[species] = {
            'intervals': intervals,
            'frequencies': frequencies.tolist()
        }

    return jsonify(histogram_data)