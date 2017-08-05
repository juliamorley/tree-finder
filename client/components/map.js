import React, { Component } from "react";
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer } from "react-google-maps";
import _ from 'lodash'
import { connect } from 'react-redux'

//COMPONENT
const InitialMap = withGoogleMap(props => {

    return (
        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={11}
            defaultCenter={{ lat: 40.7829, lng: -73.9654 }}
            onClick={props.onMapClick}
        >
            {props.trees.map((tree, index) => (
            <Marker
                key = {index}
                position = {{lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) }}
                icon = '/tree.png'
                />
            ))}
        </GoogleMap>
    )
});


const FullMap = class myMap extends Component {
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
                markers={[{position:{lat: 40.7829, lng: -73.9654 }}]}
                trees={this.props.trees}
            />
        );
    }
}


//CONTAINER

const mapState = (state) => {
    return {
        // this is where we will take the selected tree objects and save them so we can get their lat & long
        trees: state.trees
    }
}

export default connect(mapState)(FullMap)



