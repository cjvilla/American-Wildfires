const url = "/causes";
    
d3.json(url).then(function(response){

    console.log("hello");
    console.log(response);

    console.log(response.fire_count);
    console.log(response.fire_size);

    var xValues = response.fire_count
    var yValues = response.cause
    
    trace = {
        type: 'bar',
        x: xValues,
        y: yValues,
        orientation: 'h',

    };
    
    var data = [trace];

    var layout = {
        title: "Causes by Fire Count"
    };

Plotly.newPlot('plot',data,layout);
});