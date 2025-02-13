from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def index():
    return "Hello"

@app.route('/about')
def about():
    return "Hello about"

if __name__=="__main__":
    app.run()