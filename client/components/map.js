import React, { Component } from "react";
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer} from "react-google-maps";
import { connect } from 'react-redux'
import { updateTreeInfo, addTreeInfo, removeTreeInfo } from '../store'

const InitialMap = withGoogleMap(props => {
    let treeMarkers;
    const {selectAll, trees, selectedTrees, infoBoxTrees } = props

    if (selectAll) {
        treeMarkers = trees
    } else {
        treeMarkers = trees.filter(tree => selectedTrees.includes(tree.spc_common) )
    }
    return (
        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={15}
            defaultCenter={{ lat: 40.7292, lng: -73.9845 }}

        >
            {treeMarkers.map((tree, index) => (
            <Marker
                key = {index}
                position = {{lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) }}
                icon = '/tree.png'
                onClick={() => props.handleMarkerClick(tree)}
            >
            {(infoBoxTrees.includes(tree.tree_id)) && (
                <InfoWindow >
                <div>
                    <div>{tree.spc_common}</div>
                    <div><a href={`https://en.wikipedia.org/wiki/${tree.spc_latin.split(' ').join('_')}`} target="_blank">{tree.spc_latin}</a></div>
                    <div><a href={`https://www.google.com/maps/dir/?api=1&destination=${tree.latitude},${tree.longitude}`} target="_blank">directions</a></div>
                </div>
                </InfoWindow>
            )}
            </Marker>
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
                trees={this.props.trees}
                selectAll={this.props.selectAll}
                selectedTrees={this.props.selectedTrees}
                infoBoxTrees={this.props.infoBoxTrees}
                handleMarkerClick={this.props.handleMarkerClick}
            />
        );
    }
}


const mapState = (state) => {
    return {
        trees: state.trees,
        selectAll: state.selectAll,
        selectedTrees: state.selectedTrees,
        infoBoxTrees: state.infoBoxTrees
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        handleMarkerClick(targetMarker) {
        dispatch(addTreeInfo(targetMarker))
        }
    }
}


export default connect(mapState, mapDispatch)(FullMap)
