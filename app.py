from flask import Flask, render_template, redirect, jsonify, request
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

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index.html")


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

@app.route('/bubble_map')
def causes_map():
    return render_template('all_wildfires.html')

@app.route('/choropleth_map')
def evolution_map():
    return render_template('choropleth_map.html')

if __name__ == "__main__":
    app.run(debug=True)
