const url = "/totalStateFires";
    
d3.json(url).then(function(response){

    var trace1 = {
        x: response.state,
        y: response.fire_count,
        name: 'Total Wildfires',
        type: 'bar'
    };
    
    var trace2 = {
        x: response.state,
        y: response.avg_size,
        name: 'Average Size',
        type: 'bar',
        yaxis: 'y2'
    };

    var data = [trace1, trace2];

    var layout = {
        title: "Total Wildfires and Average Wildfire Size Per State",
        yaxis: {title: 'Total Wildfires'},
        yaxis2:{
        title: 'Average Size',
        overlaying: 'y',
        side: 'right'
        },
        legend:{
            xachor: 'center',
            yachor: 'top',
            y: -0.3,
            x: 0.4
        },
        width: 1000,
        height: 600
    };

Plotly.newPlot('bar_graph',data,layout);
});
