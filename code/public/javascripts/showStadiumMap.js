mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: match.matchVenue.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

let popup = new mapboxgl.Popup()
    .setText(match.matchVenue.stadiumName)
    .addTo(map);

let marker = new mapboxgl
    .Marker()
    .setLngLat(match.matchVenue.coordinates)
    .addTo(map)
    .setPopup(popup);


