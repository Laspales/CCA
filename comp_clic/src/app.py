from flask import Flask, jsonify
from flask_cors import CORS
import json
import threading
import os

LOCK = threading.Lock()
DATA_FILE = "counter.json"

def read_count():
    if not os.path.exists(DATA_FILE):
        return 0
    try:
        with open(DATA_FILE, "r") as f:
            data = json.load(f)
            return int(data.get("count", 0))
    except Exception:
        return 0

def write_count(n):
    with open(DATA_FILE, "w") as f:
        json.dump({"count": n}, f)

app = Flask(__name__)
CORS(app)

@app.route("/api/count", methods=["GET"])
def get_count():
    with LOCK:
        c = read_count()
    return jsonify({"count": c})

@app.route("/api/increment", methods=["POST"])
def increment():
    with LOCK:
        c = read_count() + 1
        write_count(c)
    return jsonify({"count": c})

@app.route("/api/reset", methods=["POST"])
def reset():
    with LOCK:
        write_count(0)
    return jsonify({"count": 0})

if __name__ == "__main__":
    # crée le fichier si besoin
    if not os.path.exists(DATA_FILE):
        write_count(0)
    app.run(host="0.0.0.0", port=5002, debug=True)
