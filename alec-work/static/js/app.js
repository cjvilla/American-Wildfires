// let defaultURL = "/"
// var inputID = dropDownId.property("value");




function Stackedbar(){
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
          yearData = data.data

          yearData = yearData.filter(x => x.STATE = "ALL STATES")

          var parseTime = d3.timeParse("%Y");

          yearData.forEach(d => {
               d.FIRE_YEAR = parseTime(d.FIRE_YEAR)
               d.COUNT_FIRES = +d.COUNT_FIRES
               d.FIRE_SIZE = +d.FIRE_SIZE
               d.PRIOR_RUNNING_SIZE = +d.PRIOR_RUNNING_SIZE
               d.PRIOR_RUNNING_COUNT = +d.PRIOR_RUNNING_COUNT
          });

          var years = yearData.map(d => d.FIRE_YEAR)
          var numFires = yearData.map(d => d.COUNT_FIRES)
          var fireSize = yearData.map(d => d.FIRE_SIZE)
          var numFiresRun = yearData.map(d => d.PRIOR_RUNNING_COUNT)
          var fireSizeRun = yearData.map(d => d.PRIOR_RUNNING_SIZE)

          var traceNumBar2 = {
               type: "bar",
               // mode: "lines",
               name: `Current Year`,
               x: years,
               y: numFires,
               color: "Purple"
               // line: {
               // color: "#17BECF"
               // }
          };

          var traceNumBar1 = {
               type: "bar",
               // mode: "lines",
               name: `Total`,
               x: years,
               y: numFiresRun,
               color: "Green"
               // line: {
               // color: "#17BECF"
               // }
          };

          var dataNum = [traceNumBar1,traceNumBar2]
     
          var layoutNum = {
          title: `U.S. Cumulative Number of Fires (1992-2015)`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          },
          barmode: 'stack'
          };
     
          Plotly.newPlot("stacked-count-plot", dataNum, layoutNum); 

          var traceSizeBar2 = {
               type: "bar",
               // mode: "lines",
               name: `Current Year`,
               x: years,
               y: fireSize,
               color: "Purple"
               // line: {
               // color: "#17BECF"
               // }
          };

          var traceSizeBar1 = {
               type: "bar",
               // mode: "lines",
               name: `Total`,
               x: years,
               y: fireSizeRun,
               color: "Green"
               // line: {
               // color: "#17BECF"
               // }
          };

          var dataSize = [traceSizeBar1,traceSizeBar2]
     
          var layoutSize = {
          title: `U.S. Cumulative Fire Size (Acres Burned: 1992-2015)`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          },
          barmode: 'stack'
          };
     
          Plotly.newPlot("stacked-size-plot", dataSize, layoutSize); 
          
     })
}

function top20Map() {
     const url = "/top20Map";

     var myMap = L.map("map", {
          center: [38, -111.8910],
          zoom: 5
     });
        
     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: "mapbox/streets-v11",
          accessToken: API_KEY
     }).addTo(myMap);

     d3.json(url).then(data => {
          topData = data.data

          topData.forEach(d => {
               d.FIRE_SIZE = +d.FIRE_SIZE;
          });

          sizes = topData.map(d => d.FIRE_SIZE)
          lat = topData.map(d => d.LATITUDE)
          lon = topData.map(d => d.LONGITUDE)
          names = topData.map(d => d.FIRE_NAME)
          years = topData.map(d => d.FIRE_YEAR)     

          for (var i = 0; i < topData.length; i++) {
               L.circle([lat[i],lon[i]], {
                    fillOpacity: 0.75,
                    color: "black",
                    fillColor: "red",
                    // Adjust radius
                    radius: sizes[i] / 6
               }).bindPopup("<h3>" + `${names[i]} | ${years[i]}` +
                    "</h3><hr><p>" + `Acres Burned: ${sizes[i]}` + "</p>").addTo(myMap);
          }

     })
}

function top20() {
     const url = "/top20";
     d3.json(url).then(data => {
          topData = data.data

          topData.forEach(d => {
               d.FIRE_SIZE = d.FIRE_SIZE.toString()
               d.FIRE_SIZE = d.FIRE_SIZE.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });

          var table = d3.select("#top20-table");
          var tbody = d3.select("#top20-body");
          var thead = d3.select("thead")

          topData.forEach((observation) => {
               var row = tbody.append("tr");
               Object.entries(observation).forEach(([key, value]) => {
                 var cell = row.append("td");
                 cell.text(value);
               });
          });
     })
}

function StateFiresOverYears() {
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
          yearData = data.data//  console.log(yearData)
 
          var dropDownId = d3.select("#selDataset")
          var dropDownId2 = d3.select("#selDataset2")
          var inputID = dropDownId.property("value")
          var inputID2 = dropDownId2.property("value")

          if (inputID2 === "(CHOOSE A STATE BELOW)") {
               generateDashNull()
          }
 
          // creating filter for selected state
          stateData = yearData.filter(x => x.STATE === inputID)
          stateData2 = yearData.filter(x => x.STATE === inputID2)
          //  console.log(stateData)
 
          // adding parse time function for years
          var parseTime = d3.timeParse("%Y");
 
          // formatting the date and casting fires value to a number
          stateData.forEach(d => {
               d.FIRE_YEAR = parseTime(d.FIRE_YEAR)
               d.COUNT_FIRES = +d.COUNT_FIRES
               d.FIRE_SIZE = +d.FIRE_SIZE;
          });

          stateData2.forEach(d => {
               d.FIRE_YEAR = parseTime(d.FIRE_YEAR)
               d.COUNT_FIRES = +d.COUNT_FIRES
               d.FIRE_SIZE = +d.FIRE_SIZE;
          });
 
          // adding variables for plotly line chart
          var years = stateData.map(d => d.FIRE_YEAR)
          var numFires = stateData.map(d => d.COUNT_FIRES)
          var fireSize = stateData.map(d => d.FIRE_SIZE)

          var years2 = stateData2.map(d => d.FIRE_YEAR)
          var numFires2 = stateData2.map(d => d.COUNT_FIRES)
          var fireSize2 = stateData2.map(d => d.FIRE_SIZE)

          // adding traceNum
          var traceNumBar = {
               type: "scatter",
               mode: "lines",
               name: `${inputID} Number of Fires`,
               x: years,
               y: numFires,
               line: {
               color: "#17BECF"
               }
          };

          var traceNumBar2 = {
               type: "scatter",
               mode: "lines",
               name: `${inputID2} Number of Fires`,
               x: years2,
               y: numFires2,
               line: {
               color: "red"
               }
          };
          // var traceNumLine = {
          //      type: "scatter",
          //      mode: "lines",
          //      name: `${inputID} Fires Over Time`,
          //      x: years,
          //      y: numFires,
          //      line: {
          //      color: "#17BECF"
          //      }
          // };
          
          // var dataNum = [traceNumBar,traceNumLine];
          var dataNum = [traceNumBar,traceNumBar2]
     
          var layout = {
          title: `Number of Fires Over Time By State`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          }
          // barmode: 'stack'
          };
     
          Plotly.newPlot("time-count-plot", dataNum, layout); 

          // adding traceSize over Time
          var traceSize = {
               type: "scatter",
               mode: "lines",
               name: `${inputID} Fire Size (Acres Burned)`,
               x: years,
               y: fireSize,
               line: {
               color: "#17BECF"
               }
          };

          var traceSize2 = {
               type: "scatter",
               mode: "lines",
               name: `${inputID2} Fire Size (Acres Burned)`,
               x: years2,
               y: fireSize2,
               line: {
               color: "red"
               }
          };
     
          var dataSize = [traceSize,traceSize2];
     
          var layout = {
          title: `Fire Size (Acres Burned) Over Time`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          }
          // labels={
          //      "years2": "Years (1992 - 2014)",
          //      "fireSize2": "Fire Size (Acres Burned)"}
          };
     
          Plotly.newPlot("time-size-plot", dataSize, layout);
          
          if (inputID2 === "(CHOOSE A STATE BELOW)") {
               generateDashNull()
          }
     })
}

function top5YearlyDD() {
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
     yearData = data.data//  console.log(yearData)
     
     var dropDownId3 = d3.select("#selDataset3")
     var inputID3 = dropDownId3.property("value")


     inputID3 = parseInt(inputID3)

     // filtering out summary data for all states
     yearData = yearData.filter(x => x.STATE != "ALL STATES")
     // // filtering for the given input ID
     yearData.forEach(d => {
          d.FIRE_YEAR = +d.FIRE_YEAR
     });
     yearData = yearData.filter(x => x.FIRE_YEAR === inputID3)


     var sortByCount = yearData.sort((a, b) => b.COUNT_FIRES - a.COUNT_FIRES)
     slicedCount = sortByCount.slice(0, 5).reverse()


     var sortBySize = yearData.sort((a, b) => b.FIRE_SIZE - a.FIRE_SIZE)
     slicedSize = sortBySize.slice(0, 5).reverse()


     var sortByAvg = yearData.sort((a, b) => b.AVG_FIRE_SIZE - a.AVG_FIRE_SIZE)
     slicedAvg = sortByAvg.slice(0, 5).reverse()


     var traceCount = {
          x: slicedCount.map(d => d.COUNT_FIRES),
          y: slicedCount.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID3,
          type: "bar",
          orientation: "h",
          bar: {
               color: slicedCount.map(d => d.COUNT_FIRES)
          },
     }

     var layoutCount = {
          title: `${inputID3} - Top 5 States by Number of Fires`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartCount = [traceCount];

     Plotly.newPlot("bar-count", chartCount,layoutCount);

     var traceSize = {
          x: slicedSize.map(d => d.FIRE_SIZE),
          y: slicedSize.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID3,
          type: "bar",
          orientation: "h"
     }

     var layoutSize = {
          title: `${inputID3} - Top 5 States by Fire Size (Acres Burned)`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartSize = [traceSize];

     Plotly.newPlot("bar-size", chartSize, layoutSize);


     var traceAvg = {
          x: slicedAvg.map(d => d.AVG_FIRE_SIZE),
          y: slicedAvg.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID3,
          type: "bar",
          orientation: "h"
     }

     var layoutAvg = {
          title: `${inputID3} - Top 5 States by Avg. Fire Size (Acres Burned)`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartAvg = [traceAvg];

     Plotly.newPlot("bar-avg", chartAvg, layoutAvg);
     })
}

function top5YearlyNull() {
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
     yearData = data.data//  console.log(yearData)
     inputID = 1992

     // filtering out summary data for all states
     yearData = yearData.filter(x => x.STATE != "ALL STATES")
     // filtering for the given input ID
     yearData = yearData.filter(x => x.FIRE_YEAR === inputID)
     // console.log(yearData)
     
     var sortByCount = yearData.sort((a, b) => b.COUNT_FIRES - a.COUNT_FIRES)
     slicedCount = sortByCount.slice(0, 5).reverse()


     var sortBySize = yearData.sort((a, b) => b.FIRE_SIZE - a.FIRE_SIZE)
     slicedSize = sortBySize.slice(0, 5).reverse()


     var sortByAvg = yearData.sort((a, b) => b.AVG_FIRE_SIZE - a.AVG_FIRE_SIZE)
     slicedAvg = sortByAvg.slice(0, 5).reverse()

     
     // console.log(slicedCount.map(d => d.COUNT_FIRES))
     // console.log(slicedCount.map(d => d.STATE))

     var traceCount = {
          x: slicedCount.map(d => d.COUNT_FIRES),
          y: slicedCount.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID,
          type: "bar",
          orientation: "h",
          bar: {
               color: slicedCount.map(d => d.COUNT_FIRES)
          },
     }

     var layoutCount = {
          title: `${inputID} - Top 5 States by Number of Fires`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartCount = [traceCount];

     Plotly.newPlot("bar-count", chartCount,layoutCount);

     var traceSize = {
          x: slicedSize.map(d => d.FIRE_SIZE),
          y: slicedSize.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID,
          type: "bar",
          orientation: "h"
     }

     var layoutSize = {
          title: `${inputID} - Top 5 States by Fire Size (Acres Burned)`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartSize = [traceSize];

     Plotly.newPlot("bar-size", chartSize, layoutSize);


     var traceAvg = {
          x: slicedAvg.map(d => d.AVG_FIRE_SIZE),
          y: slicedAvg.map(d => d.STATE),
          // text: top10otuLabels,
          name: inputID,
          type: "bar",
          orientation: "h"
     }

     var layoutAvg = {
          title: `${inputID} - Top 5 States by Avg. Fire Size (Acres Burned)`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          },
          "titlefont": {
               "size": 14
          }
     };

     var chartAvg = [traceAvg];

     Plotly.newPlot("bar-avg", chartAvg, layoutAvg);
     })
}


//creating an option tag with all the available ID's
function createDropDowns() {
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
          yearData = data.data 
          var states = yearData.map(d => d.STATE)
          var years = yearData.map(d => d.FIRE_YEAR)

          let unqStates = [...new Set(states)]
          let unqYears = [...new Set(years)]         

          // console.log(states)
          var dropDown1 = d3.select("#selDataset")
          var dropDown2 = d3.select("#selDataset2")
          var dropDown3 = d3.select("#selDataset3")

          // optionAll = d3.selectAll("option")
          // optionAll.remove()

          dropDown1.append("option")
               .text("ALL STATES")
               .attr('value', "ALL STATES");

          dropDown2.append("option")
               .text("(CHOOSE A STATE BELOW)")
               .attr('value', "NULL");
          
          
          // console.log(dataNames)
          unqStates.forEach((d) => {
          var row = dropDown1.append("option")
          var row2 = dropDown2.append("option")
          row
               .text(d)
               .attr('value', d);
          row2
               .text(d)
               .attr('value', d);
          });

          unqYears.forEach((d) => {
               var row3 = dropDown3.append("option")
               row3
                    .text(d)
                    .attr('value', d);
          });          
          
     });
}


function generateDashNull() {
     // console.log('hi')
     // d3.csv("../output/total_fires_yearly_by_state.csv").then(yearData =>{ 
     
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
          yearData = data.data//  console.log(yearData)
 
          var dropDownId = d3.select("#selDataset")
          // var dropDownId2 = d3.select("#selDataset2")
          var inputID = "ALL STATES"
 
          // creating filter for selected state
          stateData = yearData.filter(x => x.STATE === inputID)
          //  console.log(stateData)
 
          // adding parse time function for years
          var parseTime = d3.timeParse("%Y");
 
          // formatting the date and casting fires value to a number
          stateData.forEach(d => {
               d.FIRE_YEAR = parseTime(d.FIRE_YEAR)
               d.COUNT_FIRES = +d.COUNT_FIRES
               d.FIRE_SIZE = +d.FIRE_SIZE;
          });
 
          // adding variables for plotly line chart
          var years = stateData.map(d => d.FIRE_YEAR)
          var numFires = stateData.map(d => d.COUNT_FIRES)
          var fireSize = stateData.map(d => d.FIRE_SIZE)
     
          var traceNum = {
               type: "scatter",
               mode: "lines",
               name: `${inputID} Fires Over Time`,
               x: years,
               y: numFires,
               line: {
               color: "#17BECF"
               }
          };
     
          var dataNum = [traceNum];
     
          var layout = {
          title: `${inputID} Number of Fires Over Time`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          }
          };
     
          Plotly.newPlot("time-count-plot", dataNum, layout); 

          // adding traceSize over Time
          var traceSize = {
               type: "scatter",
               mode: "lines",
               name: `${inputID} Fire Size (Acres Burned) Over Time`,
               x: years,
               y: fireSize,
               line: {
               color: "#17BECF"
               }
          };
     
          var dataSize = [traceSize];
     
          var layout = {
          title: `${inputID} Fire Size (Acres Burned) Over Time`,
          xaxis: {
               autorange: true,
               type: "date"
          },
          yaxis: {
               autorange: true,
               type: "linear"
          }
          };
     
          Plotly.newPlot("time-size-plot", dataSize, layout);      
     })
}


createDropDowns();
generateDashNull();
top5YearlyNull();
Stackedbar();
top20();
top20Map();

d3.selectAll("#selDataset").on("change", StateFiresOverYears);
d3.selectAll("#selDataset2").on("change", StateFiresOverYears);
d3.selectAll("#selDataset3").on("change", top5YearlyDD);