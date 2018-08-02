import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Grid, Row } from 'react-bootstrap';
import Popup from "reactjs-popup";



const style = {
  width: '100%',
  height: '100%',
  position: "absolute",
  zIndex: "3",
}


class SensorMap extends Component {
  constructor(props) {
    super(props);

    this.handleValueName = this.handleValueName.bind(this);
    this.handleValueLatitude = this.handleValueLatitude.bind(this);
    this.handleValueNLongitude = this.handleValueLongitude.bind(this);

    this.state = {
      markers: [
        {
        name: "sensor1",
        latitude: 38.844885,
        longitude: -87.181807
      },
      {
        name: "sensor2",
        latitude: 40.64885,
        longitude: -89.191807
      },
      {
        name: "sensor3",
        latitude: 41.64885,
        longitude: -89.191807
      }
    ],
    nameValue: "",
    latitudeValue: 0,
    longitudeValue: 0
    }
  }

  onMarkerClick(props, marker, e) {
    // for (var item of this.state.markers){
      console.log(props)
    // }
  }

  handleValueName = e => {
    console.log(e.target.value)
    this.setState({nameValue: e.target.value});
  }
  handleValueLatitude = e => {
    console.log(e.target.value)
    this.setState({latitudeValue: e.target.value});
  }
  handleValueLongitude = e => {
    console.log(e.target.value)
    this.setState({longitudeValue: e.target.value});
  }

  handleNewMarker = e => {
    console.log(this.state.latitudeValue)
    const newMarker = {name: this.state.nameValue, latitude: this.state.latitudeValue, longitude: this.state.longitudeValue}
    const addMarker = this.state.markers.concat(newMarker)
    this.setState({markers: addMarker})
    this.state.nameValue = "";
    this.state.latitudeValue = 0;
    this.state.longitudeValue = 0;
    e.preventDefault();
  }


    render() {

// *************** return the markers from the state and send it to the final return ****************
      let markers = this.state.markers

      const listOfMarkers = markers.map((item) => {
        return (
          <Marker onClick={this.onMarkerClick} name={item.name} position={{lat: item.latitude, lng: item.longitude}} /> 
        )
      })
      
// ***************** final return ***************************
        return (
          <div>
            <div className="embed-responsive map-wrapper">
            <Row>
              <Map className="embed-responsive-item"
                google={this.props.google}
                style={style}
                initialCenter={{
                  lat: 39.854885,
                  lng: -88.081807
                }}
                zoom={7}
                onClick={this.onMapClicked}
            >
        
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                {listOfMarkers}
              </Map>
            </Row>
            </div>
          <Row className="top-cont" >
            <Popup trigger={<button> Add new sensor</button>} position="right center" modal closeOnDocumentClick>
            {close => (
            <div>
              <form onSubmit={this.handleNewMarker}>
                <label>
                  Name:
                  <input type="text" value={this.state.nameValue} onChange={this.handleValueName} />
                </label>
                <label>
                  Latitude:
                  <input type="number" value={this.state.latitudeValue} onChange={this.handleValueLatitude} />
                </label>
                <label>
                  Longitude:
                  <input type="number" value={this.state.longitudeValue} onChange={this.handleValueLongitude} />
                </label>
                <input type="submit" value="Submit" />
                <input type="button" value="close" onClick={() => {
              console.log('modal closed ')
              close()
            }}/>
              </form>
            </div>
            )}
            </Popup>
            </Row>
          </div>
        )
    }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRmv6SaTr9BTMU7yeXHarnU3v5zYGaLMk")
})(SensorMap)
