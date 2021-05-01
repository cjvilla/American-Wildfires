let defaultURL = "/"

function StateFiresOverYears() {
    // console.log('hi')
   d3.csv("../output/total_fires_yearly_by_state.csv").then(yearData =>{ 
     // console.log(yearData)

     var dropDownId = d3.select("#selDataset")
     var inputID = dropDownId.property("value");
     // var inputID = "CO"

     // creating filter for selected state
     stateData = yearData.filter(x => x.STATE === inputID)
     console.log(stateData)

     // adding parse time function for years
     var parseTime = d3.timeParse("%Y");

     // formatting the date and casting fires value to a number
     stateData.forEach(d => {
          d.FIRE_YEAR = parseTime(d.FIRE_YEAR)
          // d.
          d.COUNT_FIRES = +d.COUNT_FIRES;
     });

     // adding variables for plotly line chart
     var years = stateData.map(d => d.FIRE_YEAR)
     var numFires = stateData.map(d => d.COUNT_FIRES)

     // console.log(years)
     // console.log(numFires)

     // adding trace1
     var trace1 = {
          type: "scatter",
          mode: "lines",
          name: `${inputID} Fires Over Time`,
          x: years,
          y: numFires,
          line: {
            color: "#17BECF"
          }
        };

        var data = [trace1];

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

    Plotly.newPlot("time-count-plot", data, layout); 

   })
}



//creating an option tag with all the available ID's
function createDropDowns() {
     d3.csv("../output/total_fires_yearly_by_state.csv").then(yearData =>{   
          var states = yearData.map(d => d.STATE)
          // console.log(states)
          var dropDown = d3.select("#selDataset")
          // console.log(dataNames)
          states.forEach((d) => {
          var row = dropDown.append("option");
          row
               .text(d)
               .attr('value', d)
     
          });
     });
}


function generateDashNull() {
     // console.log('hi')
    d3.csv("../output/total_fires_yearly_by_state.csv").then(yearData =>{ 
     //  console.log(yearData)
 
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
           d.COUNT_FIRES = +d.COUNT_FIRES;
      });
 
      // adding variables for plotly line chart
      var years = stateData.map(d => d.FIRE_YEAR)
      var numFires = stateData.map(d => d.COUNT_FIRES)
 
     //  console.log(years)
     //  console.log(numFires)
 
      // adding trace1
      var trace1 = {
           type: "scatter",
           mode: "lines",
           name: `${inputID} Fires Over Time`,
           x: years,
           y: numFires,
           line: {
             color: "#17BECF"
           }
         };
 
         var data = [trace1];
 
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
 
     Plotly.newPlot("time-count-plot", data, layout); 
 
    })
}

createDropDowns();
generateDashNull();

// Call generateDash() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", StateFiresOverYears);

