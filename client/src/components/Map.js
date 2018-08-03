import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Row } from 'react-bootstrap';
import Popup from "reactjs-popup";
const axios = require('axios');



const style = { // Styling the map.
  width: '50%',
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
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.getGroupFromJSON = this.getGroupFromJSON.bind(this);
    this.getSensorsFromJSON = this.getSensorsFromJSON.bind(this);
    this.getGroupFromJSON()
    this.getSensorsFromJSON()

    this.state = {
      markers: [
        {
          id: 4,
          name: "",
          latitude: 40.64885,
          longitude: -88.191807,
          moisture: 0,
          aeration: 0,
          temp: 0,
          nitrate: 0,
          phosphorus: 0,
          salinity: 0,
          respiration: 0,
          ph: 0,
          potassium: 0

        }
      ],
      nameValue: "",
      latitudeValue: 0,
      longitudeValue: 0,
      hideSensorInfo: true
    }
  }

  getGroupFromJSON(){
    axios
      .get("http://localhost:3001/api/v1/users/1/group_sensors") // getting the group sensor data
      .then(response => {
        // console.log(response)
        for (var marker of response.data){ // looping through the group sensor data.
          const newMarker = {id: marker.id, name: marker.name, latitude: marker.latitude, longitude: marker.longitude} // assigning each groupSensor object to the newMarker var
          const addMarker = this.state.markers.concat(newMarker) // adding the newMarker to the state
          this.setState({markers: addMarker}) // set the new state, adding the NewMarker object to the state.
        }
      })
      .catch(error => console.log(error));
  }

  getSensorsFromJSON(){
    axios
    //each groupSensor has 9 sensors. Each sensor represents an element(object)
      .get("http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors") //getting all the sensors
      .then(response => {

        for (var groupSensor of this.state.markers) { //looping through the groupSensors in our state
          for (var sensor of response.data){ //looping through the sensor data
            if (groupSensor.id === sensor.group_sensor_id){ //if sensor has groupsensor foreign key

              let data_type = sensor.data_type
              groupSensor[data_type] = sensor.data_value //passing data_type as a key and its value becomes data_value

              let sensorMin = sensor.set_min // assigning min to a variable
              let data_typeMin = data_type + "Min" // assigning a data_type + a string called min to a variable
              groupSensor[data_typeMin] = sensorMin // passing data_typeMin as a key in the groupSensor object, setting its value to sensorMin

              let sensorMax = sensor.set_max // same concept as line 84 to 86
              let data_typeMax = data_type + "Max"
              groupSensor[data_typeMax] = sensorMax


            }
          }
          console.log(groupSensor)
        }
      })
      .catch(error => console.log(error));
  }


  onMarkerClick(props, marker, e) {
    this.setState({isHidden: !this.state.isHidden})
      console.log(marker);
    if (this.state.isHidden) {
      console.log("is hidden")
    } else {
      console.log("is shown")
    }
  }

  handleValueName = e => {
    console.log(e.target.value)
    this.setState({ nameValue: e.target.value });
  }
  handleValueLatitude = e => {
    console.log(e.target.value)
    this.setState({ latitudeValue: e.target.value });
  }
  handleValueLongitude = e => {
    console.log(e.target.value)
    this.setState({ longitudeValue: e.target.value });
  }

  handleNewMarker = e => {
    console.log(this.state.latitudeValue)
    const newMarker = { name: this.state.nameValue, latitude: this.state.latitudeValue, longitude: this.state.longitudeValue }
    const addMarker = this.state.markers.concat(newMarker)
    this.setState({ markers: addMarker })
    this.state.nameValue = "";
    this.state.latitudeValue = 0;
    this.state.longitudeValue = 0;
    e.preventDefault();
  }


    render() {


      // let iconMarker = new window.google.maps.MarkerImage(
      //   url,
      //   null, /* size is determined at runtime */
      //   null, /* origin is 0,0 */
      //   null, /* anchor is bottom center of the scaled image */
      //   new window.google.maps.Size(32, 32)
      // );


// *************** return the markers from the state and send it to the final return ****************
      let markers = this.state.markers

      const listOfMarkers = markers.map((item, index) => {
        return (
          <Marker onClick={this.onMarkerClick} key={index} name={item.name} position={{lat: item.latitude, lng: item.longitude}} />
        )
      })



// ***************** final return ***************************
        return (
          <div>
            <div className="embed-responsive map-wrapper">
              <Row>
              //Calling the map
                <Map className="embed-responsive-item"
                  google={this.props.google}
                  style={style}
                  initialCenter={{
                    lat: 45.212059,
                    lng: -73.738771
                  }}
                  zoom={15}
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
              <form onSubmit={this.handleNewMarker.bind(this)}>
                <label>
                  Name:
                  <input type="text" value={this.state.nameValue} onChange={this.handleValueName} />
                  </label>
                  <label>
                    Latitude:
                  <input type="number" value={this.state.latitudeValue} onChange={this.handleValueLatitude} />
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
                  }} />
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
