import mysql.connector
from mysql.connector import Error
import bcrypt

def encrypt_password(password):
    """Encrypt a plaintext password."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed

def add_user_to_database(username, hashed_password, is_admin=False):
    """Add a new user with the encrypted password to the database."""
    try:
        connection = mysql.connector.connect(
            host='127.0.0.1',
            user='admin',
            password='password',
            database='GTD'
        )

        if connection.is_connected():
            cursor = connection.cursor()
            sql = "INSERT INTO users (username, password, is_admin) VALUES (%s, %s, %s)"
            cursor.execute(sql, (username, hashed_password, is_admin))
            connection.commit()
            print("User added successfully.")
    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def remove_user_from_database(username):
    """Remove a user from the database based on their username."""
    try:
        connection = mysql.connector.connect(
            host='127.0.0.1',
            user='admin',
            password='password',
            database='GTD'
        )

        if connection.is_connected():
            cursor = connection.cursor()
            sql = "DELETE FROM users WHERE username = %s"
            cursor.execute(sql, (username,))
            connection.commit()

            if cursor.rowcount > 0:
                print("User removed successfully.")
            else:
                print("User not found.")

    except Error as e:
        print(f"Error: {e}")

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def main():
    # Example usage
    username = "admin"
    password = "password"  # This should be collected securely, e.g., via input()
    hashed_password = encrypt_password(password)
    
    # Add user to database
    add_user_to_database(username, hashed_password, is_admin=True)

    # Remove user from database
    #remove_user_from_database(username)

if __name__ == "__main__":
    main()
