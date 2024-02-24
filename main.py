from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import json

app = Flask(__name__)
CORS(app, origins="*")  # This enables CORS for all domains on all routes

@app.route('/getdata', methods=['GET'])
def get_data():
    # Example response data
    with open('data/30-samples.json') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/postdata', methods=['POST'])
def post_data():
    received_data = request.json
    print(received_data)  # For debugging, print the received data
    # Example response acknowledging the received data
    return jsonify({"status": "success", "received": received_data}), 201

@app.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    with open('data/30-samples.json') as f:
        data = json.load(f)
    f.close()
    # Find the article by its ID
    article = next((item for item in data if item.get("article_id") == article_id), None)
    if article:
        return jsonify(article)
    else:
        # If the article is not found, return a 404 error
        abort(404, description=f"Article with ID {article_id} not found")

# update an article
@app.route('/articles/<int:article_id>', methods=['PUT'])
def update_article(article_id):
    article = next((item for item in data if item.get("article_id") == article_id), None)
    if article:
        # update the article
        article.update(request.json)
        # update the article in the data
        new_data = [item if item.get("article_id") != article_id else article for item in data]
        with open('data/30-samples.json', 'w') as f:
            json.dump(new_data, f)
        f.close()
        
        return jsonify(article)

    else:
        abort(404, description=f"Article with ID {article_id} not found")


if __name__ == '__main__':
    data = []
    with open('data/30-samples.json') as f:
        data = json.load(f)
    f.close()

    app.run(host='0.0.0.0', debug=True)
