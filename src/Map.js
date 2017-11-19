import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

class Map extends Component {

  constructor ( ){
    super()
    this.state = {
      map: null
    }
  }
  
  mapMoved(){
    console.log('mapmoved', JSON.stringify(this.state.map.getCenter()))
  }
  zoomChanged(){
    console.log('zoommoved', this.state.map.getZoom())
  }
  mapLoaded(map){
    if (this.state.map !== null)
      return;
    this.setState({
      map: map
    })
  }


  render() {
    const markers = this.props.markers.map((venue, i) => {
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
      }
      return <Marker key={i} {...marker}/>
    })
  
    return (
          <GoogleMap 
            defaultZoom={this.props.zoom}
            defaultCenter={this.props.center}
            ref={this.mapLoaded.bind(this)}
            onZoomChanged={this.zoomChanged.bind(this)}
            onDragEnd={this.mapMoved.bind(this)}>
            {markers}
          </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
