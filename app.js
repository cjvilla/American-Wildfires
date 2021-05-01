from flask import Flask, render_template, redirect, jsonify
from sqlalchemy import create_engine
import sqlite3 as lite
import pandas as pd
import json 

app = Flask(__name__)

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index.html")



#@app.route("/ByRegion")
#query for causes and total count of fires




if __name__ == "__main__":
    app.run(debug=True)
