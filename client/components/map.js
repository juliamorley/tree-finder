import React, { Component } from "react";
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer } from "react-google-maps";
import _ from 'lodash'


const InitialMap = withGoogleMap(props => {
    console.log('marker', Marker)

    return (
        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={11}
            defaultCenter={{ lat: 40.7829, lng: -73.9654 }}
            onClick={props.onMapClick}
        >
            <Marker>
            </Marker>
        </GoogleMap>
    )
});

export default class myMap extends Component {

    render() {
        return (
            <InitialMap
                containerElement={
                    <div style={{ height: `100px`, width: '100px' }} />
                }
                mapElement={
                    <div style={{ height: `400px`, width: '800px' }} />
                }
                onMapLoad={_.noop}
                onMapClick={_.noop}
                onMarkerRightClick={_.noop}
            />
        );
    }
}


            // {props.markers.map((marker, index) => (
            //     <Marker
            //         {...marker}
            //         onRightClick={() => props.onMarkerRightClick(index)}
            //     />
            // ))}

            // markers={markers}
