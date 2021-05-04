from flask import Flask, render_template, redirect, jsonify, request
import pandas as pd
import json 

app = Flask(__name__)

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index.html")

@app.route("/Chart")
def chartTest():
    # add in data variables here
    return render_template("chart.html")

@app.route("/YearlyData")
def yearly():
    csv_path = "output/total_fires_yearly_by_state.csv"
    fires_state_year_df = pd.read_csv(csv_path)
    fires_state_year_df_index = fires_state_year_df.set_index(['FIRE_YEAR', 'STATE'])
    result = fires_state_year_df_index.to_json(orient="table")
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