from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS module
import json
import os

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

@app.route('/store-json', methods=['POST'])
def store_json():
    try:
        # Get JSON data from request body
        json_data = request.get_json()

        # Check if JSON data exists
        if json_data is None:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        folder_path = os.path.join(os.path.dirname('tasks.json'), '../assets/data')
        
        # Ensure the folder exists, create it if it doesn't
        os.makedirs(folder_path, exist_ok=True)

        file_path = os.path.join(folder_path, 'tasks.json')

        # Write JSON data to file
        with open(file_path, 'w') as file:
            file.write(json.dumps(json_data))

        return jsonify({'message': 'JSON data stored successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)