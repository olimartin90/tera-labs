import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%',
  position: "absolute",
  border: "1px solid red",
  zIndex: "3",

}

class SensorMap extends Component {

    render() {
        return (
          <div className="embed-responsive map-wrapper">
            <Map className="embed-responsive-item"
            google={this.props.google}
            style={style}
            initialCenter={{
              lat: 39.854885,
              lng: 88.081807
            }}
            zoom={15}
            onClick={this.onMapClicked}
          >
      
              <Marker onClick={this.onMarkerClick}
                      name={'Current location'} />
            </Map>
            </div>
        )
    }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRmv6SaTr9BTMU7yeXHarnU3v5zYGaLMk")
})(SensorMap)