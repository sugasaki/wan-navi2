

L.mapbox.accessToken = 'pk.eyJ1Ijoic3VnYXNha2kiLCJhIjoiY2pmMGg0dDgzMGtvcTJ3cGtiaXpnMmp2eiJ9.5Skxs7z6-o5Jd3WOtKHBcw';
var map = L.mapbox.map('map', 'mapbox.streets');
L.control.locate().addTo(map);

var runLayer = omnivore.kml('./mapdata/217.kml')
    .on('ready', function () {
        // map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);

map.setView([44.61131534, -123.4726739], 9);


// Playback options
var playbackOptions = {
    playControl: true,
    dateControl: true,
    sliderControl: true
};

// Initialize playback
var playback = new L.Playback(map, demoTracks, null, playbackOptions);

