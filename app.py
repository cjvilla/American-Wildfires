from flask import Flask, render_template, redirect, jsonify, request
from sqlalchemy import create_engine
import sqlite3 as lite
import pandas as pd
import json 

app = Flask(__name__)

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index.html")



@app.route("/causes")
#query for causes and total count of fires
def bycause():
    engine = create_engine("sqlite:///Resources/FPA_FOD_20170508.sqlite")
    con = lite.connect('Resources/FPA_FOD_20170508.sqlite')
    causequery = "SELECT STAT_CAUSE_DESCR AS CAUSE, COUNT(DISTINCT OBJECTID) AS FIRE_COUNT, AVG(FIRE_SIZE) AS AVG_SIZE, AVG(CONT_DATE - DISCOVERY_DATE) AS AVG_BURN FROM fires GROUP BY STAT_CAUSE_DESCR ORDER BY AVG_SIZE ASC"
    cause_df = pd.read_sql_query(causequery,con)
    causes_rank = {
        "cause": cause_df["CAUSE"].values.tolist(),
        "fire_count": cause_df["FIRE_COUNT"].values.tolist(),
        "fire_size": cause_df["AVG_SIZE"].values.tolist(),
        "burn_time": cause_df["AVG_BURN"].values.tolist(),
        "type": "'bar'"
    }
    con.close()
    return jsonify(causes_rank)

@app.route("/causesovertime")
def bycausetimeline():
    engine = create_engine("sqlite:///Resources/FPA_FOD_20170508.sqlite")
    con = lite.connect('Resources/FPA_FOD_20170508.sqlite')
    query = "SELECT FIRE_YEAR, STAT_CAUSE_DESCR AS CAUSE, COUNT(DISTINCT OBJECTID) AS FIRE_COUNT, AVG(FIRE_SIZE) AS AVG_SIZE,AVG(CONT_DATE - DISCOVERY_DATE) AS AVG_BURN FROM fires GROUP BY FIRE_YEAR, STAT_CAUSE_DESCR ORDER BY FIRE_YEAR DESC;"
    overtime_df = pd.read_sql_query(query, con)
    causes_ot = {
        "year": overtime_df['FIRE_YEAR'].values.tolist(),
        "cause": overtime_df["CAUSE"].values.tolist(),
        "fire_count": overtime_df["FIRE_COUNT"].values.tolist(),
        "fire_size": overtime_df["AVG_SIZE"].values.tolist(),
        "burn_time": overtime_df["AVG_BURN"].values.tolist(),
    }
    con.close()
    return jsonify(causes_ot)

if __name__ == "__main__":
    app.run(debug=True)