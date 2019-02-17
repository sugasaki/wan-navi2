
    // Setup leaflet map
    var map = new L.Map('map');
    var basemapLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/github.map-xgq2svrz/{z}/{x}/{y}.png');
    //var basemapLayer = new L.TileLayer('{a|b|c}.tile.opentopomap.org/{z}/{x}/{y}.png');

    
    // Adds the background layer to the map
    map.addLayer(basemapLayer);



    var el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme", //default: lime-theme
        width: 1200,
        //height: 125,
        margins: {
            top: 10,
            right: 20,
            bottom: 30,
            left: 50
        },
        useHeightIndicator: true, //if false a marker is drawn at map position
        interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
        hoverNumber: {
            decimalsX: 3, //decimals on distance (always in km)
            decimalsY: 0, //deciamls on height (always in m)
            formatter: undefined //custom formatter function may be injected
        },
        xTicks: undefined, //number of ticks in x axis, calculated by default according to width
        yTicks: undefined, //number of ticks on y axis, calculated by default according to height
        collapsed: false    //collapsed mode, show chart on click or mouseover
    });

    
    el.addTo(map);
    //var g=new L.GPX("./20180420222613.gpx", {
    var g=new L.GPX("./20180414035801.gpx", {
            async: true,
            marker_options: {
            startIconUrl: './lib/leaflet-gpx/pin-icon-start.png',
            endIconUrl: './lib/leaflet-gpx/pin-icon-end.png',
            shadowUrl: './lib/leaflet-gpx/pin-shadow.png'
            }
    });
    g.on('loaded', function(e) {
            map.fitBounds(e.target.getBounds());
    });
    g.on("addline",function(e){
        el.addData(e.line);
    });
    g.addTo(map);


