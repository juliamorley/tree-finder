import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";


const InitialMap = withGoogleMap(props => {
    console.log('props', props)

    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 40.7829, lng: -73.9654 }}
        />
    )
});

export default class SimpleMapExample extends Component {

    render() {
        return (
            <div style = {{height:"600px"}}>
            <InitialMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
            />
            </div>
        );
    }
}
