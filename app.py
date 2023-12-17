from flask import Flask,render_template,jsonify
import pandas as pd

app = Flask(__name__)

# 开启调试模式
app.config["DEBUG"] = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/iris/species/count')
def iris_species_count():
    # 读取数据集
    iris = pd.read_csv("data/iris.csv")

    # 查看种类的分布情况
    species_counts = iris.Species.value_counts()

    # 转换为对象数组格式
    echarts_data = [{"species": species, "count": count} for species, count in species_counts.items()]

    # 返回JSON数据
    return jsonify(echarts_data)