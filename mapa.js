var map = L.map('map').setView([-12.0464, -77.0428], 13); // Coordenadas de Lima, Perú

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var searchControl = L.Control.geocoder({
  defaultMarkGeocode: false
}).addTo(map);

searchControl.on('markgeocode', function(e) {
  var bbox = e.geocode.bbox;
  map.fitBounds([[bbox.getSouth(), bbox.getWest()], [bbox.getNorth(), bbox.getEast()]]);
});

// Función para mostrar los atributos al hacer clic en un elemento
function showAttributes(feature, layer) {
  if (feature.properties) {
    var popupContent = "<table>";
    for (var property in feature.properties) {
      popupContent += "<tr><td>" + property + "</td><td>" + feature.properties[property] + "</td></tr>";
    }
    popupContent += "</table>";
    layer.bindPopup(popupContent);
  }
}

// Carga de archivos GeoJSON con la función showAttributes
var EPSlayer = L.geoJSON.ajax("https://raw.githubusercontent.com/mzsevallos/mjzc/main/EPS.geojson", {
  onEachFeature: showAttributes
});


// Agregar las capas al mapa
EPSlayer.addTo(map);

// Agregar el control de capas extendido
var layersControl = L.control.layers(null, null, {
  collapsed: false // Mostrar el control de capas extendido por defecto
}).addTo(map);

// Agregar las capas al control de capas
layersControl.addOverlay(EPSlayer, "EPS"); // Agregar capa RAT al control de capas
