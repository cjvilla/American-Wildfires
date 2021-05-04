// let defaultURL = "/"
// var inputID = dropDownId.property("value");

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
          };
     
          Plotly.newPlot("time-size-plot", dataSize, layout);
          
          if (inputID2 === "(CHOOSE A STATE BELOW)") {
               generateDashNull()
          }
     })
}

function top5Yearly() {
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
     yearData = data.data//  console.log(yearData)
     inputID = 2015

     // filtering out summary data for all states
     yearData = yearData.filter(x => x.STATE != "ALL STATES")
     // filtering for the given input ID
     yearData = yearData.filter(x => x.FIRE_YEAR === inputID)
     // console.log(yearData)
     
     var sortByCount = yearData.sort((a, b) => b.COUNT_FIRES - a.COUNT_FIRES)
     slicedCount = sortByCount.slice(0, 5).reverse()
     console.log(slicedCount)

     var sortBySize = yearData.sort((a, b) => b.FIRE_SIZE - a.FIRE_SIZE)
     slicedSize = sortBySize.slice(0, 5).reverse()
     console.log(slicedSize)

     var sortByAvg = yearData.sort((a, b) => b.AVG_FIRE_SIZE - a.AVG_FIRE_SIZE)
     slicedAvg = sortByAvg.slice(0, 5).reverse()
     console.log(slicedAvg)
     
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
          title: `${inputID} - Top 5 States by Average Fire Size (Acres Burned)`,
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
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

          let unqStates = [...new Set(states)]

          // console.log(states)
          var dropDown1 = d3.select("#selDataset")
          var dropDown2 = d3.select("#selDataset2")

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

function generateDashNullJson() {
     // console.log('hi')
     const url = "/YearlyDataState";
     d3.json(url).then(data => { 
          yearData = data.data
          console.log(yearData)
     
          var dropDownId = d3.select("#selDataset")
          var inputID = "AK"
     
          // creating filter for selected state
          stateData = yearData.filter(x => x.STATE === inputID)
          console.log(stateData)

     })     
}

createDropDowns();
generateDashNull();
top5Yearly();


// Call generateDash() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", StateFiresOverYears);

// Call generateDash() when a change takes place to the DOM
d3.selectAll("#selDataset2").on("change", StateFiresOverYears);