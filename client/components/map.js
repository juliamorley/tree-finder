import React, { Component } from "react";
import { withGoogleMap, GoogleMap, InfoWindow, Marker, DirectionRenderer, places} from "react-google-maps";
import SearchBox from "../../node_modules/react-google-maps/lib/places/SearchBox.js"
import { connect } from 'react-redux'
import { updateTreeInfo, addTreeInfo, removeTreeInfo } from '../store'

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  font: 'Nunito'
};

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
            ref={props.onMapMounted}
            zoom= {props.zoom}
            center= {props.center}

        >
            <SearchBox
                ref={props.onSearchBoxMounted}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                inputPlaceholder="Zoom to Location"
                inputStyle={INPUT_STYLE}
                onPlacesChanged={props.onPlacesChanged}
            />
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

    constructor (){
        super()

        this.state= {
            center: { lat: 40.7292, lng: -73.9845 },
            zoom: 12,
            searchPlace: {},
            bounds: null,
        }


        this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
        this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    }

    handleMapMounted(map) {
        this._map = map;
    }

    handleBoundsChanged() {
        this.setState({
        bounds: this._map.getBounds(),
        center: this._map.getCenter(),
        });
    }

    handleSearchBoxMounted(searchBox) {
        this.searchBox = searchBox;
    }

    handlePlacesChanged(event) {

        const places = this.searchBox.getPlaces();

        // Add a marker for each place returned from search bar
        const markers = places.map(place => ({
        position: place.geometry.location,
        }));

        // Set markers; set map center to first search result
        const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

        this.setState({
        center: mapCenter,
        markers,
        zoom: 17
        });
    }

    render() {

        return (
            <InitialMap
                containerElement={
                    <div style={{ height: `100%`, width: '100%' }} />
                }
                mapElement={
                    <div id="map" style={{ height: `100vh`, width: '70%' }} />
                }
                trees={this.props.trees}
                selectAll={this.props.selectAll}
                selectedTrees={this.props.selectedTrees}
                infoBoxTrees={this.props.infoBoxTrees}
                handleMarkerClick={this.props.handleMarkerClick}
                center={this.state.center}
                onMapMounted={this.handleMapMounted}
                onBoundsChanged={this.handleBoundsChanged}
                onSearchBoxMounted={this.handleSearchBoxMounted}
                bounds={this.state.bounds}
                onPlacesChanged={this.handlePlacesChanged}
                markers={this.state.markers}
                zoom = {this.state.zoom}
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
