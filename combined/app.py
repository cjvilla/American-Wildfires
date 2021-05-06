from flask import Flask, render_template, redirect, jsonify, request, url_for, request
from sqlalchemy import create_engine
import sqlite3 as lite
import pandas as pd
import json 
import folium
from folium import plugins
import ipywidgets
import geocoder
import geopy
import plotly.express as px


app = Flask(__name__)

# celine start main app
@app.route("/",methods=['GET', 'POST'])
def welcome():
    # add in FPA_FOD_20170508 variables here
    return render_template("index.html")

# celine data page
@app.route('/totalStateFires')
#query for causes and total count of fires
def total_fires():
    engine = create_engine("sqlite:///Resources/FPA_FOD_20170508.sqlite")
    conn = lite.connect('Resources/FPA_FOD_20170508.sqlite')
    total_query = 'select STATE, SUM(FIRE_YEAR) as "Total Fires", AVG(FIRE_SIZE) as "Average Size" from Fires group by State order by "Total Fires" desc;'
    total_fires_df = pd.read_sql_query(total_query,conn)
    total_fires_ranked = {
        "state": total_fires_df["STATE"].values.tolist(),
        "fire_count": total_fires_df["Total Fires"].values.tolist(),
        "avg_size": total_fires_df["Average Size"].values.tolist(),
    }
    conn.close()
    return jsonify(total_fires_ranked) 

#celine maps
@app.route('/bubble_map')
def causes_map():
    return render_template('all_wildfires.html')
@app.route('/choropleth_map')
def evolution_map():
    return render_template('choropleth_map.html')
@app.route('/heatmap')
def heatmap_display():
    return render_template('heatmap_overtime.html')

# alec start main app
@app.route("/alec")
def welcomealec():
    # add in data variables here
    return render_template("index_am.html")

# alec data load
@app.route("/YearlyDataState")
def yearlyState():
    csv_path = "Resources/total_fires_yearly_by_state.csv"
    fires_state_year_df = pd.read_csv(csv_path)
    fires_state_year_df_index = fires_state_year_df.set_index(['FIRE_YEAR', 'STATE'])
    result = fires_state_year_df_index.to_json(orient="table")
    json_parsed = json.loads(result)
    return json_parsed
@app.route("/top20")
def top20():
    csv_path = "Resources/top_20_fires.csv"
    top_20_df = pd.read_csv(csv_path)
    top_20_load_df = top_20_df[["DISCOVERY_DATE","STATE","FIRE_NAME","STAT_CAUSE_DESCR","FIRE_SIZE"]]
    top_20_load_df_ind = top_20_load_df.set_index("FIRE_NAME")
    result_load = top_20_load_df_ind.to_json(orient="table")
    json_parsed_load = json.loads(result_load)
    return json_parsed_load
@app.route("/top20Map")
def top20Map():
    csv_path = "Resources/top_20_fires.csv"
    top_20_df = pd.read_csv(csv_path)
    result = top_20_df.to_json(orient="table")
    json_parsed = json.loads(result)
    return json_parsed
# Alec Maps
@app.route("/LargestFiresMap")
def lgfiresmap():
    # add in data variables here
    return render_template("maptop20.html")


# Julie Main app
@app.route("/julie")
def welcomeJulie():
    # add in data variables here
    return render_template("index_j.html")

# julie data
@app.route("/causes")
#query for causes and total count of fires
def bycause():
    engine = create_engine("sqlite:///../Resources/FPA_FOD_20170508.sqlite")
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

if __name__ == "__main__":
    app.run(debug=True)