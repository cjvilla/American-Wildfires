function init(){

const url = "/causes";

d3.json(url).then(function(response){
    // console.log("hello");
    // console.log(response);

    // console.log(response.fire_count);
    // console.log(response.fire_size);

    var fireCount = response.fire_count
    var fireCause = response.cause
    var fireSize = response.fire_size
    var burnTime = response.burn_time
    
    trace1 = {
        type: 'bar',
        x: fireSize,
        y: fireCause,
        name: 'Fire Size (acres)',
        orientation: 'h',
        width: 0.5,
        marker: {
            color:'rgb(255,127,80)',
            opacity: 1,
            width: 0.5,
        }
            
    };

    trace2 = {
        type: 'bar',
        x: burnTime,
        y: fireCause,
        name: 'Burn Time (days)',
        xaxis: 'x2',
        orientation: 'h',
        width: 1,
        marker: {
            color:'rgb(255,215,0)',
            opacity: 0.3,
            width: 1,
        }
            
    };
    
    var data = [trace1,trace2];

    var layout = {
        title: {
        text:"Causes by Fire Size and Burn Time",
        font:{
            size: 12
        }},
        xaxis: {
            title: 'Avg Fire Size (Acres)',
            overlaying: 'x2',
            side: 'top'
        },
        xaxis2: {
            title: 'Avg Burn Time',
            side: 'bottom'
        },
        font: {
            size: 9
        }
    };

Plotly.newPlot('barplot',data,layout);

var donutcolors = ["rgb(255,153,102)","rgb(233,105,44)",
"rgb(255,69,0)","rgb(255,140,0)","rgb(255,127,80)","rgb(255,143,0)",
"rgb(255,229,180)","rgb(255,127,80)","rgb(255,218,185)","rgb(253,103,58)",
"rgb(195,82,20)","RGB(232,150,17)","RGB(254,186,79)"]

trace = {
    values: fireCount,
    labels: fireCause,
    domain: {column:0},
    textinfo: "label+percent",
    marker:{
        colors: donutcolors
    },
    name: 'Fire Count',
    hole: .4,
    type: 'pie'
}

var layout = {
    title: "Fire Count by Cause Type",
    font:{
        size:8
    },
    showarrow: false,
    text: 'Count',
    x: 0.17,
    y: 0.5,
    height: 400,
    width: 600,
    showlegend: false,
    grid: {rows: 1, columns: 2}
}
var donut = [trace]
Plotly.newPlot('donutplot', donut,layout);
});
}
init();