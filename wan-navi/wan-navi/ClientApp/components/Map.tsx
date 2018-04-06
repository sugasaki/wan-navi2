import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';


interface ReactLeafletState {
    lat: number;
    lng: number;
    zoom: number;
}


export class MapWanNavi extends React.Component<RouteComponentProps<{}>, ReactLeafletState> {
    constructor() {
        super();

        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        }
    }


    render() {
        var position: LatLngLiteral = { lat: this.state.lat, lng: this.state.lng};

        return (
            <Map center={ position }  zoom={this.state.zoom}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={ position }>
                    <Popup>
                        <span>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}