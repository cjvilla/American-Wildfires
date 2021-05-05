from flask import Flask, render_template, redirect, jsonify, request
import pandas as pd
import json 

app = Flask(__name__)

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index_am.html")

@app.route("/Map")
def chartTest():
    # add in data variables here
    return render_template("map.html")

@app.route("/YearlyDataState")
def yearlyState():
    csv_path = "output/total_fires_yearly_by_state.csv"
    fires_state_year_df = pd.read_csv(csv_path)
    fires_state_year_df_index = fires_state_year_df.set_index(['FIRE_YEAR', 'STATE'])
    result = fires_state_year_df_index.to_json(orient="table")
    json_parsed = json.loads(result)
    return json_parsed

@app.route("/top20")
def top20():
    csv_path = "output/top_20_fires.csv"
    top_20_df = pd.read_csv(csv_path)
    top_20_load_df = top_20_df[["DISCOVERY_DATE","STATE","FIRE_NAME","STAT_CAUSE_DESCR","FIRE_SIZE"]]
    top_20_load_df_ind = top_20_load_df.set_index("FIRE_NAME")
    result_load = top_20_load_df_ind.to_json(orient="table")
    json_parsed_load = json.loads(result_load)
    return json_parsed_load

@app.route("/top20Map")
def top20Map():
    csv_path = "output/top_20_fires.csv"
    top_20_df = pd.read_csv(csv_path)
    result = top_20_df.to_json(orient="table")
    json_parsed = json.loads(result)
    return json_parsed

@app.route("/YearlyDataAll")
def yearly():
    csv_path = "output/total_fires_yearly_by_state.csv"
    fires_state_year_df = pd.read_csv(csv_path)
    years_df = fires_state_year_df.groupby(["FIRE_YEAR"]).sum()
    result = years_df.to_json(orient="table")
    json_parsed = json.loads(result)
    return json_parsed

# for additional pages
# @app.route("/api/v1.0/justice-league")
# def justice_league():
#     """Return the justice league data as json"""

#     return jsonify(justice_league_members)

# @app.route("/sqlite/firesstatesyears")
# def statesyears():


if __name__ == "__main__":
    app.run(debug=True)