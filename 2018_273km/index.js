


    // Setup leaflet map
    var map = new L.Map('map');
    var basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');
    // Adds the background layer to the map
    map.addLayer(basemapLayer);


var runLayer = omnivore.kml('./mapdata/273.kml')
    .on('ready', function () {
        // map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);

    map.setView([32.760886, 129.865541], 13);





    // Get start/end times
    var startTime = new Date(demoTracks.properties.time[0]);
    var endTime = new Date(demoTracks.properties.time[demoTracks.properties.time.length - 1]);

    // Create a DataSet with data
    var timelineData = new vis.DataSet([{ start: startTime, end: endTime, content: '金龍への道' }]);

    // Set timeline options
    var timelineOptions = {
      "width":  "100%",
      "height": "120px",
      "style": "box",
      "axisOnTop": true,
      "showCustomTime":true
    };
    

    // Setup timeline
    var timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);
        
    // Set custom time marker (blue)
    timeline.setCustomTime(startTime);



    var moveIcon = L.icon({
        iconUrl: 'images/sugapon3.png',
        shadowUrl: 'images/marker-shadow.png',

        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [13, 40],
        shadowAnchor: [12, 40],
        popupAnchor: [0, -32]
    });



// Playback options
var playbackOptions = {
    playControl: true,
    dateControl: false,
    sliderControl: false ,   
    speed: 10,
        
    marker: function(){
        return {
            icon:  moveIcon 
        };
    }      
};

// Initialize playback
var playback = new L.Playback(map, demoTracks, onPlaybackTimeChange, playbackOptions);



// Set timeline time change event, so cursor is set after moving custom time (blue)
timeline.on('timechange', onCustomTimeChange);    

// A callback so timeline is set after changing playback time
function onPlaybackTimeChange (ms) {
    timeline.setCustomTime(new Date(ms));

    var day = moment(ms);
    var st = day.format('YYYY/MM/DD HH:mm:ss ');
    $('#datetime').html( st );
    //console.debug(st);
};

// 
function onCustomTimeChange(properties) {
    if (!playback.isPlaying()) {
        playback.setCursor(properties.time.getTime());
    }        
}       