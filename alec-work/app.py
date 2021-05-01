from flask import Flask, render_template, redirect, jsonify, request

app = Flask(__name__)

@app.route("/")
def welcome():
    # add in data variables here
    return render_template("index.html")

# for additional pages
# @app.route("/api/v1.0/justice-league")
# def justice_league():
#     """Return the justice league data as json"""

#     return jsonify(justice_league_members)

if __name__ == "__main__":
    app.run(debug=True)