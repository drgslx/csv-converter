from flask import Flask, jsonify, request, json
import mysql.connector
import os
import pandas as pd

app = Flask(__name__)

# MySQL Database Configuration
db_config = {
    'user': 'your_mysql_user',
    'password': 'your_mysql_password',
    'host': 'your_mysql_host',  # For example 'localhost' or your EC2 instance IP
    'database': 'your_database_name',
}

@app.route("/api/csv-convert")
def get_csv_as_json():
    csv_path = os.path.join('public', 'google_dataset.csv')  # Adjust the path if necessary
    try:
        # Read the CSV file
        df = pd.read_csv(csv_path, on_bad_lines='warn')

        # Replace NaN values with None (to be converted to null in JSON)
        df = df.applymap(lambda x: None if pd.isna(x) else x)

        # Convert DataFrame to JSON
        data = df.to_dict(orient='records')
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get-json")
def get_json_data():
    json_path = os.path.join('data', 'sample_data.json')
    try:
        # Open and read the JSON file
        with open(json_path, 'r') as json_file:
            data = json.load(json_file)

        # Return JSON data as response
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/db-convert")
def get_db_data_as_json():
    try:
        # Connect to MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Replace 'your_table_name' with your actual table name
        query = "SELECT * FROM your_table_name"
        cursor.execute(query)

        # Fetch all rows from the table
        rows = cursor.fetchall()

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Return data as JSON
        return jsonify(rows)

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


if __name__ == "__main__":
    app.run(debug=True)
