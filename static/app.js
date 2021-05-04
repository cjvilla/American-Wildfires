function init(){

const url = "/causes";

d3.json(url).then(function(response){
    console.log("hello");
    console.log(response);

    console.log(response.fire_count);
    console.log(response.fire_size);

    var fireCount = response.fire_count
    var fireCause = response.cause
    var fireSize = response.fire_size
    var burnTime = response.burn_time
    
    trace1 = {
        type: 'bar',
        x: fireSize,
        y: fireCause,
        name: 'firecause',
        orientation: 'h',
        marker: {
            color:'rgb(255,127,80)',
            opacity: 0.6,
            width: 5,
            line: {
            color: 'rgb(255,69,0)',
            width: 1.5
            }}
            
    };

    trace2 = {
        type: 'bar',
        x: burnTime,
        y: fireCause,
        name: 'burntime',
        xaxis: 'x2',
        orientation: 'h',
        marker: {
            color:'rgb(255,215,0)',
            opacity: 0.6,
            width: 0.5,
            line: {
            color: 'rgb(255,69,0)',
            width: 1.5
            }}
            
    };
    
    var data = [trace2,trace1];

    var layout = {
        title: "Causes by Fire Size and Burn Time",
        xaxis: {
            title: 'Avg Fire Size (Acres)',
            side: 'bottom'
        },
        xaxis2: {
            title: 'Avg Burn Time',
            overlaying: 'x',
            side: 'top'
        }
    };

Plotly.newPlot('plot',data,layout);

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
Plotly.newPlot('plot2', donut,layout);
});
}
init();