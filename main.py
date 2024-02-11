from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app)  # This enables CORS for all domains on all routes

@app.route('/getdata', methods=['GET'])
def get_data():
    # Example response data
    return jsonify(data)

@app.route('/postdata', methods=['POST'])
def post_data():
    received_data = request.json
    print(received_data)  # For debugging, print the received data
    # Example response acknowledging the received data
    return jsonify({"status": "success", "received": received_data}), 201

@app.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    # Find the article by its ID
    article = next((item for item in data if item.get("article_id") == article_id), None)
    if article:
        return jsonify(article)
    else:
        # If the article is not found, return a 404 error
        abort(404, description=f"Article with ID {article_id} not found")


if __name__ == '__main__':
    with open('data/30-samples.json') as f:
        data = json.load(f)

    

    app.run(debug=True)
