from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import json

import mysql.connector
from mysql.connector import Error


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

### Database stuff
def create_database_connection():
    """Create a database connection to a MySQL database"""
    try:
        conn = mysql.connector.connect(
            host='127.0.0.1',
            user='admin',
            password='password',
            database='GTD'
        )
        if conn.is_connected():
            print("Successfully connected to the database")
        return conn
    except Error as e:
        print(e)

def create_table(conn):
    """Create a table in the MySQL database"""
    try:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN NOT NULL DEFAULT FALSE
            );
        """)
        print("Table created successfully")
    except Error as e:
        print(e)


if __name__ == '__main__':
    data = []
    with open('data/30-samples.json') as f:
        data = json.load(f)
    f.close()

    conn = create_database_connection()

    if conn:
        create_table(conn)
        conn.close()

    app.run(host='0.0.0.0', debug=True)




