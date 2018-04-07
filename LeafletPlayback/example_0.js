$(function() {

L.mapbox.accessToken = 'pk.eyJ1Ijoic3VnYXNha2kiLCJhIjoiY2pmMGg0dDgzMGtvcTJ3cGtiaXpnMmp2eiJ9.5Skxs7z6-o5Jd3WOtKHBcw';
var map = L.mapbox.map('map', 'mapbox.streets');
L.control.locate().addTo(map);

var runLayer = omnivore.kml('./mapdata/273.kml')
    .on('ready', function () {
        // map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);

    map.setView([32.760886, 129.865541], 9);


    // Playback options
    var playbackOptions = {
        playControl: true,
        dateControl: true,
        sliderControl: true ,   
        speed: 10, 
    };
        
    // =====================================================
    // =============== Playback ============================
    // =====================================================

    // Colors for AwesomeMarkers
    var _colorIdx = 0,
        _colors = [
          'orange',
          'green',
          'blue',
          'purple',
          'darkred',
          'cadetblue',
          'red',
          'darkgreen',
          'darkblue',
          'darkpurple'
        ];
        
    function _assignColor() {
        return _colors[_colorIdx++%20];
    }
    // Playback options
    var playbackOptions = {        
        // layer and marker options
        layer: {
            pointToLayer : function(featureData, latlng){
                var result = {};
                
                if (featureData && featureData.properties && featureData.properties.path_options){
                    result = featureData.properties.path_options;
                }
                
                if (!result.radius){
                    result.radius = 5;
                }
                
                return new L.CircleMarker(latlng, result);
            }
        },
        
        marker: function(){
            return {
                icon: L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: 'bullseye', 
                    markerColor: _assignColor()
                }) 
            };
        }        
    };
    
    // Initialize playback
    var playback = new L.Playback(map, demoTracks, null, playbackOptions);
    
    // Initialize custom control
    var control = new L.Playback.Control(playback);
    control.addTo(map);
    
    // Add data
    playback.addData(blueMountain);

// Initialize playback

/*

var url = 'http://localhost:50074/api/RunnerLog';


// Ajax button click
$.ajax({
    url: url,
    type:'get',
})
// Ajaxリクエストが成功した時発動
.done( (data) => {

    var playback = new L.Playback(map, data, null, playbackOptions);

    var control = new L.Playback.Control(playback);
    control.addTo(map);
})
// Ajaxリクエストが成功・失敗どちらでも発動
.always( (data) => {

});

*/
    


});