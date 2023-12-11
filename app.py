from flask import Flask, jsonify,render_template
import pandas as pd

app = Flask(__name__)

# 读取数据集
# 注意：请确保文件路径与实际存放的位置匹配
iris = pd.read_csv("data/iris.csv")

# 分别获取三个种类的鸢尾花
iris_setosa = iris[iris.Species == 'Iris-setosa']
iris_versicolor = iris[iris.Species == 'Iris-versicolor']
iris_virginica = iris[iris.Species == 'Iris-virginica']


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/iris_species_counts')
def iris_species_counts():

    # 查看种类的分布情况
    species_counts = iris.Species.value_counts()

    # 转换为对象数组格式
    echarts_data = [{"species": species, "count": count} for species, count in species_counts.items()]

    # 返回 JSON 数据
    return jsonify(echarts_data)

@app.route('/iris_sepal_data')
def iris_sepal_data():

    # 构造返回的 JSON 数据
    data_to_return = [
        {
            "name": "Iris-setosa",
            "data": iris_setosa[['SepalLengthCm', 'SepalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-versicolor",
            "data": iris_versicolor[['SepalLengthCm', 'SepalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-virginica",
            "data": iris_virginica[['SepalLengthCm', 'SepalWidthCm']].values.tolist()
        }
    ]

    return jsonify(data_to_return)

@app.route('/iris_petal_data')
def iris_petal_data():

    # 构造返回的 JSON 数据
    data_to_return = [
        {
            "name": "Iris-setosa",
            "data": iris_setosa[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-versicolor",
            "data": iris_versicolor[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        },
        {
            "name": "Iris-virginica",
            "data": iris_virginica[['PetalLengthCm', 'PetalWidthCm']].values.tolist()
        }
    ]

    return jsonify(data_to_return)

