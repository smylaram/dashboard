import pandas as pd
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    data = dict()
    df = pd.read_csv('final_data.csv')

    return render_template('index.html', data=data)


if __name__ == "__main__":
    app.run("localhost", 8000, debug=True)