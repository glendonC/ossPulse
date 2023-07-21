from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/contributors', methods=['GET'])
def get_contributors():
    # Fetch and process data here...
    data = {"contributors": [{"name": "Alice", "contributions": 100}, {"name": "Bob", "contributions": 80}]}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)