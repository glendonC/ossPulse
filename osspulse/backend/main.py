from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/top-repositories')
def get_top_repositories():
    # Your code to fetch and process data from the GitHub API
    return

if __name__ == '__main__':
    app.run(debug=True)