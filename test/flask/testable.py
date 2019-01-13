from flask import Flask
import json

states = [ 1, 2, 3, 4]
index = 0

layouts = ["Layout1", "Layout2", "Layout3"] 
lindex = 0

app = Flask(__name__)
@app.route('/matrix', methods=["GET"])
def matrix():
    global index
    index = (index + 1) % len(states)
    return json.dumps({"state": states[index]})

@app.route('/obs', methods=["GET"])
def obs():
    return json.dumps({"layout": layouts[lindex]})


@app.route('/obs/<layout>', methods=["GET"])
def obsset(layout):
    global lindex
    lindex = layouts.index(layout)
    return obs()
