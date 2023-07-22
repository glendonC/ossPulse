from api.app import create_app

app = create_app()

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/test")
def test():
    return "Test successful!"

if __name__ == "__main__":
    app.run(debug=True)
