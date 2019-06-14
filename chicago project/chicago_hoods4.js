// Set link
var link = "https://data.cityofchicago.org/resource/igwz-8jzy.geojson"


//Function that will determine the color of a Chicago neighborhood based on the area it belongs to
function chooseColor(community) {
  switch (community) {
    // "Far North Side"
    case "OHARE":
      return "darkgreen";
    case "EDISON PARK":
      return "darkgreen";
    case "NORWOOD PARK":
      return "darkgreen";
    case "JEFFERSON PARK":
      return "darkgreen";
    case "FOREST GLEN": 
      return "darkgreen";
    case "NORTH PARK":  
      return "darkgreen";
    case "ALBANY PARK":
      return "darkgreen";
    case "WEST RIDGE":  
      return "darkgreen";
    case "LINCOLN SQUARE":
      return "darkgreen";
    case "ROGERS PARK": 
      return "darkgreen";
    case "EDGEWATER":
      return "darkgreen";
    case "UPTOWN":
      return "darkgreen";
    // "North Side"
    case "AVONDALE":
      return "cyan";
    case "LAKE VIEW":
      return "cyan";
    case "LINCOLN PARK":
      return "cyan";
    case "LOGAN SQUARE":
      return "cyan";
    case "NORTH CENTER": 
      return "cyan";
    // "Northwest Side"
    case "BELMONT CRAGIN":
      return "darkslateblue";
    case "DUNNING":
      return "darkslateblue";
    case "HERMOSA":
      return "darkslateblue";
    case "IRVING PARK":
      return "darkslateblue";
    case "MONTCLARE": 
      return "darkslateblue";
    case "PORTAGE PARK":
      return "darkslateblue";
    //"West Side"
    case "AUSTIN":
      return "red";
    case "HUMBOLDT PARK":
      return "red";
    case "WEST TOWN":
      return "red";
    case "WEST GARFIELD PARK":
      return "red";
    case "EAST GARFIELD PARK": 
      return "red";
    case "NEAR WEST SIDE":
      return "red";
    case "NORTH LAWNDALE":
      return "red";
    case "SOUTH LAWNDALE":
      return "red";
    case "LOWER WEST SIDE":
      return "red"; 
    // "Central"
    case "NEAR NORTH SIDE":
      return "fuchsia";
    case "LOOP":
      return "fuchsia";
    case "NEAR SOUTH SIDE":
      return "fuchsia";
    // "Southwest Side"
    case "GARFIELD RIDGE":
        return "orange";
    case "CLEARING":
        return "darkorange";
    case "ARCHER HEIGHTS":
        return "darkorange";
    case "WEST ELSDON":
        return "darkorange";
    case "WEST LAWN": 
        return "darkorange";
    case "BRIGHTON PARK":
        return "darkorange";
    case "GAGE PARK":
        return "darkorange";
    case "CHICAGO LAWN":
        return "darkorange";
    case "MCKINLEY PARK":
        return "darkorange"; 
    case "NEW CITY":
        return "darkorange";
    case "WEST ENGLEWOOD":
        return "darkorange";
    case "ENGLEWOOD":
        return "darkorange"; 
    // "South Side"
    case "BRIDGEPORT":
        return "yellow";
    case "ARMOUR SQUARE":
        return "yellow";
    case "DOUGLAS":
        return "yellow";
    case "OAKLAND":
        return "yellow";
    case "GRAND BOULEVARD": 
        return "yellow";
    case "FULLER PARK":
        return "yellow";
    case "WASHINGTON PARK":
        return "yellow";
    case "HYDE PARK":
        return "yellow";
    case "WOODLAWN":
        return "yellow"; 
    case "GREATER GRAND CROSSING":
        return "yellow";
    case "SOUTH SHORE":
        return "yellow";
    case "KENWOOD":
        return "yellow"; 
    // "Far Southwest Side"
    case "ASHBURN":
        return "green";
    case "AUBURN GRESHAM":
        return "green";
    case "BEVERLY":
        return "green";
    case "WASHINGTON HEIGHTS":
        return "green";
    case "MOUNT GREENWOOD": 
        return "green";
    case "MORGAN PARK":
        return "green";
    // "Far Southwest Side"
    case "CHATHAM":
        return "cadetblue";
    case "AVALON PARK":
        return "cadetblue";
    case "SOUTH CHICAGO":
        return "cadetblue";
    case "CALUMET HEIGHTS":
        return "cadetblue";
    case "BURNSIDE": 
        return "cadetblue";
    case "ROSELAND":
        return "cadetblue";
    case "WEST PULLMAN":
        return "cadetblue";
    case "RIVERDALE":
        return "cadetblue";
    case "PULLMAN":
        return "cadetblue"; 
    case "SOUTH DEERING":
        return "cadetblue";
    case "EAST SIDE":
        return "cadetblue";
    case "HEGEWISCH":
        return "cadetblue";

  default:
    return "grey";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  //Test print
  console.log(data.features[1].properties.community);
  // Call createFeatures function defined below
  createFeatures(data.features);
});

// Define createFeatures function
function createFeatures (neighborhoodData) {
  // Define neighborhood layer
  var neighborhoods = L.geoJson(neighborhoodData, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.community),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            strokeweight: 2,
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        //FYI right now I can't get this feature to work tbd
        // click: function(event) {
        //   map.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.community + "</h1> <hr> <h2>" + feature.properties.community + "</h2>");
    }
  });
  // Call createMap function defined below
  createMap(neighborhoods);
};

var hauntedMarkers = [];
d3.csv("haunted.csv", function(error, hauntedData) {
  
  if (error) return console.warn(error);

  // Cast each hours value in tvData as a number using the unary + operator
  hauntedData.forEach(function(data) {

    lat = data.Latitude;
    lng = data.Longitude;
    hauntedMarkers.push(
      L.marker([lat, lng]).bindPopup("<h1>" + data.Address + "</h1> <hr> <h3>" + data.Blurb + "</h3>"));
  });
});

console.log(hauntedMarkers);


//Define createMap function
function createMap(neighborhoods) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  var hauntedLayer = L.layerGroup(hauntedMarkers);

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Neighborhoods: neighborhoods,
    Ghosts: hauntedLayer
  };

  // Create our map, giving it the streetmap and neighborhood layers to display on load
  var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11,
    layers: [streetmap, hauntedLayer]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}