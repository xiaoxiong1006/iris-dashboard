from flask import Flask, jsonify,render_template
import pandas as pd

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/iris_species_counts')
def iris_species_counts():
    # 读取数据集
    # 注意：请确保文件路径与实际存放的位置匹配
    iris = pd.read_csv("data/iris.csv")

    # 查看种类的分布情况
    species_counts = iris.Species.value_counts()

    # 转换为对象数组格式
    echarts_data = [{"species": species, "count": count} for species, count in species_counts.items()]

    # 返回 JSON 数据
    return jsonify(echarts_data)
