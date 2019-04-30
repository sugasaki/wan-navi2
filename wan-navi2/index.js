// Setup leaflet map
var map = new L.Map("map");
var basemapLayer = new L.TileLayer(
  "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'"
);
// Adds the background layer to the map
map.addLayer(basemapLayer);

var runLayer = omnivore
  .kml("./mapdata/217.kml")
  .on("ready", function() {
    // map.fitBounds(runLayer.getBounds());
  })
  .addTo(map);

map.setView([32.760886, 129.865541], 13);

//スケールコントロールを追加（オプションはフィート単位を非表示）
//L.control.scale({imperial: false}).addTo(map);

var moveIcon = L.icon({
  //iconUrl: 'images/sugapon3.png',
  //shadowUrl: 'images/marker-shadow.png',

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
  sliderControl: false,
  speed: 10,
  tracksLayer: true,
  marker: function() {
    return {
      //icon:  moveIcon
    };
  }
};

var timelineData;
var timelineOptions = {};
var timeline;
var playback;
var lastUpdateTIme;

/*
var id = setInterval(function() {
  _refresh(); //idをclearIntervalで指定している
}, 30000);
*/

/*
var id = setTimeout(
    function(){
        var a = $(".leaflet-control-layers-selector");
        $('input[class="leaflet-control-layers-selector"]').prop("checked", true);
    }, 5000);
*/

var id = setTimeout(function() {
  _fetch(); //idをclearIntervalで指定している
}, 100);

function _refresh() {
  var userid = location.hash;
  var unix_timespamp = lastUpdateTIme.format("x");
  var url =
    "https://wan-navi.azurewebsites.net/api/LeafletPlayback/" + unix_timespamp;
  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(responseJson => {
      refreshTimeLine(responseJson);
      lastUpdateTIme = moment();
    });
}

function _fetch() {
  var userid = location.hash;
  console.log("userid", userid);
  if (!userid) return;

  userid = userid.substr(1); //"3456"
  $("#uid").html(userid);

  var url = "https://wan-navi.azurewebsites.net/api/LeafletPlayback/" + userid;
  //var url = 'http://localhost:5000/api/LeafletPlayback/' + userid;

  console.log("url", url);

  fetch(url, {
    method: "GET"
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson);
      inittimelinn(responseJson);
      // Initialize playback
      playback = new L.Playback(
        map,
        responseJson,
        onPlaybackTimeChange,
        playbackOptions
      );
      playback._map.fitBounds(playback._tracksLayer.layer.getBounds());
      refreshNow(responseJson);
    });
}

var startTime;
var endTime;

function refreshNow(demoTracks) {
  endTime = new Date(
    demoTracks.properties.time[demoTracks.properties.time.length - 1]
  );
  var ms = endTime.valueOf();
  playback.setCursor(ms);
}

function refreshTimeLine(demoTracks) {
  if (demoTracks.geometry.coordinates.length == 0) return;

  endTime = new Date(
    demoTracks.properties.time[demoTracks.properties.time.length - 1]
  );
  playback.addData(demoTracks);

  var timelineEnd = new Date(endTime);
  var item1 = timelineData.get(1);
  item1.end = timelineEnd;
  timelineData.update(item1);

  timeline.setWindow(startTime, timelineEnd);
  timeline.redraw();

  // Set custom time marker (blue)
  timeline.setCurrentTime(endTime);
  timeline.setCustomTime(endTime);
  playback.setCursor(endTime.valueOf());

  var ms = lastUpdateTIme.valueOf();
  onPlaybackTimeChange(ms);
}

function inittimelinn(demoTracks) {
  var a = $(".leaflet-control-layers-selector");

  lastUpdateTIme = moment();

  // Get start/end times
  startTime = new Date(demoTracks.properties.time[0]);
  endTime = new Date(
    demoTracks.properties.time[demoTracks.properties.time.length - 1]
  );

  // Create a DataSet with data
  timelineData = new vis.DataSet([
    { id: 1, start: startTime, end: endTime, content: "" }
  ]);

  // Set timeline options
  timelineOptions = {
    width: "100%",
    height: "120px",
    style: "box",
    axisOnTop: true,
    showCustomTime: true,
    autoResize: true
  };

  // Setup timeline
  timeline = new vis.Timeline(
    document.getElementById("timeline"),
    timelineData,
    timelineOptions
  );

  // Set custom time marker (blue)
  //timeline.setCustomTime(startTime);
  //timeline.setCurrentTime(startTime);

  // Set timeline time change event, so cursor is set after moving custom time (blue)
  timeline.on("timechange", onCustomTimeChange);
}

// A callback so timeline is set after changing playback time
function onPlaybackTimeChange(ms) {
  timeline.setCustomTime(new Date(ms));
  var day = moment(ms);
  var st = day.format("YYYY/MM/DD HH:mm:ss ");
  $("#datetime").html(st);
}

//
function onCustomTimeChange(properties) {
  if (!playback.isPlaying()) {
    playback.setCursor(properties.time.getTime());
  }
}
