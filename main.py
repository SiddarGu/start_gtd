from flask import Flask, jsonify, request, abort
from flask_cors import CORS

import json

import mysql.connector
from mysql.connector import Error
import bcrypt


app = Flask(__name__)
CORS(app, origins="*")  # This enables CORS for all domains on all routes


@app.route("/getdata", methods=["GET"])
def get_data():
    # Example response data
    with open("data/30-samples.json") as f:
        data = json.load(f)
    return jsonify(data)


@app.route("/postdata", methods=["POST"])
def post_data():
    received_data = request.json
    print(received_data)  # For debugging, print the received data
    # Example response acknowledging the received data
    return jsonify({"status": "success", "received": received_data}), 201


@app.route("/articles/<int:article_id>", methods=["GET"])
def get_article(article_id):
    with open("data/30-samples.json") as f:
        data = json.load(f)
    f.close()
    # Find the article by its ID
    article = next(
        (item for item in data if item.get("article_id") == article_id), None
    )
    if article:
        return jsonify(article)
    else:
        # If the article is not found, return a 404 error
        abort(404, description=f"Article with ID {article_id} not found")


# update an article
@app.route("/articles/<int:article_id>", methods=["PUT"])
def update_article(article_id):
    article = next(
        (item for item in data if item.get("article_id") == article_id), None
    )
    if article:
        # update the article
        article.update(request.json)
        # update the article in the data
        new_data = [
            item if item.get("article_id") != article_id else article for item in data
        ]
        with open("data/30-samples.json", "w") as f:
            json.dump(new_data, f)
        f.close()

        return jsonify(article)

    else:
        abort(404, description=f"Article with ID {article_id} not found")


@app.route("/getusers", methods=["GET"])
def get_users():
    conn = get_db_connection()
    if conn is not None:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT id, username, is_admin FROM users"
            )  # Adjusted to include the 'is_admin' column if exists
            users = cursor.fetchall()
            users_list = [
                {"id": user[0], "username": user[1], "is_admin": user[2]}
                for user in users
            ]  # Adjust the indices if your table structure is different
            return jsonify(users_list), 200
        except Error as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"error": "Database connection failed."}), 500


### Database stuff
def create_database_connection():
    """Create a database connection to a MySQL database"""
    try:
        conn = mysql.connector.connect(
            host="127.0.0.1", user="admin", password="password", database="GTD"
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
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN NOT NULL DEFAULT FALSE
            );
        """
        )
        print("Table created successfully")
    except Error as e:
        print(e)


@app.route("/login", methods=["POST"])
def login_user():
    data = request.json
    username = data["username"]
    password = data["password"].encode("utf-8")  # Convert password to bytes

    conn = get_db_connection()
    if conn is not None:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "SELECT password FROM users WHERE username = %s", (username,)
            )
            user_password = cursor.fetchone()
            if user_password and bcrypt.checkpw(
                password, user_password[0].encode("utf-8")
            ):
                return jsonify({"message": "Login successful."}), 200
            else:
                return jsonify({"error": "Invalid username or password."}), 401
        except Error as e:
            return jsonify({"error": str(e)}), 400
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({"error": "Database connection failed."}), 500


def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="127.0.0.1", user="admin", password="password", database="GTD"
        )
        return conn
    except Error as e:
        print(e)
        return None


if __name__ == "__main__":
    data = []
    with open("data/30-samples.json") as f:
        data = json.load(f)
    f.close()

    conn = create_database_connection()

    if conn:
        create_table(conn)
        conn.close()

    app.run(host="0.0.0.0", debug=True)
