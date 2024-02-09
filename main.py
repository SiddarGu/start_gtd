from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all domains on all routes

@app.route('/getdata', methods=['GET'])
def get_data():
    # Example response data
    return jsonify({"message": "Hello from Flask!"})

@app.route('/postdata', methods=['POST'])
def post_data():
    received_data = request.json
    print(received_data)  # For debugging, print the received data
    # Example response acknowledging the received data
    return jsonify({"status": "success", "received": received_data}), 201

if __name__ == '__main__':
    app.run(debug=True)
