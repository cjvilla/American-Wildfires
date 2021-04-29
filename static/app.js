var defaultURL = "/causes"
    console.log("hi");
    
d3.json(defaultURL).then(function(causes) {
    console.log(causes.cause);
    console.log(causes.fire_count);
    console.log(causes.fire_size);
});