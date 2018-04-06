import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import * as PropTypes from 'prop-types';
import { LatLngLiteral } from 'leaflet';


const position = [51.505, -0.09]



interface ReactLeafletState {
    center: LatLngLiteral;
    marker: LatLngLiteral;
    zoom: number;
    draggable: boolean;
}



export class MapMarker extends React.Component<RouteComponentProps<{}>, ReactLeafletState> {
    constructor() {
        super();

        var lat_lng: LatLngLiteral = { lat: 51.505, lng: -0.09 };
        var marker: LatLngLiteral = { lat: 51.515, lng: -0.099 };

        this.state = {
            center: lat_lng,
            marker: marker,
            zoom: 13,
            draggable: true
        };

    }

    toggleDraggable = () => {
        this.setState({ draggable: !this.state.draggable })
    }

    updatePosition = () => {
        this.setState({ draggable: !this.state.draggable })


        //const { lat, lng } = this.refs.marker.leafletElement.getLatLng()
        //this.setState({
        //    //marker: { lat, lng },
        //})
    }


    render() {

        let position = this.state.center;
        let markerPosition = this.state.marker;

        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable={this.state.draggable}
                    //onDragend={this.updatePosition}
                    position={markerPosition}
                    ref="marker">
                    <Popup minWidth={90}>
                        <span onClick={this.toggleDraggable}>
                            {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                        </span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}