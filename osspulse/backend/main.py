from flask import Flask, jsonify
from flask_cors import CORS

from api.app import create_app

app = create_app()

@app.route("/")
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
