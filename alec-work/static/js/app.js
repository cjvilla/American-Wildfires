// let defaultURL = "/"
// var inputID = dropDownId.property("value");

function StateFiresOverYears() {
     const url = "/YearlyData";
     d3.json(url).then(data => { 
          yearData = data.data//  console.log(yearData)
 
          var dropDownId = d3.select("#selDataset")
          var inputID = dropDownId.property("value")
 
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

          // adding traceNum
          var traceNumBar = {
               type: "bar",
               // mode: "lines",
               name: `${inputID} Fires Over Time`,
               x: years,
               y: numFires,
               line: {
               color: "#17BECF"
               }
          };
          var traceNumLine = {
               type: "scatter",
               mode: "lines",
               name: `${inputID} Fires Over Time`,
               x: years,
               y: numFires,
               line: {
               color: "#17BECF"
               }
          };
     
          var dataNum = [traceNumBar,traceNumLine];
     
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



//creating an option tag with all the available ID's
function createDropDowns() {
     const url = "/YearlyData";
     d3.json(url).then(data => { 
          yearData = data.data 
          var states = yearData.map(d => d.STATE)
          // console.log(states)
          var dropDown1 = d3.select("#selDataset")
          var dropDown2 = d3.select("#selDataset2")
          // console.log(dataNames)
          states.forEach((d) => {
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
     
     const url = "/YearlyData";
     d3.json(url).then(data => { 
          yearData = data.data//  console.log(yearData)
 
          var dropDownId = d3.select("#selDataset")
          var inputID = "AK"
 
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
     const url = "/YearlyData";
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


// Call generateDash() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", StateFiresOverYears);

