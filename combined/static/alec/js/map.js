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

top20Map();