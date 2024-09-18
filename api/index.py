from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/csv-convert")
def get_csv_as_json():
    csv_path = os.path.join('public', 'website_dataset.csv')  # Adjust the path if necessary

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

if __name__ == "__main__":
    app.run(debug=True)


