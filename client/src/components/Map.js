import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Popup from "reactjs-popup";
import GoogleMapIconGreen from '../map-marker-green.png'
import GoogleMapIconRed from '../map-marker-red.png'
const axios = require('axios');


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
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.getGroupFromJSON = this.getGroupFromJSON.bind(this);
    this.getSensorsFromJSON = this.getSensorsFromJSON.bind(this);
    this.getDataPointsFromJSON = this.getDataPointsFromJSON.bind(this);
    this.getGroupFromJSON()
    this.getSensorsFromJSON()
<<<<<<< HEAD
=======
    this.getDataPointsFromJSON()
>>>>>>> 600b9d634fcd0bfbc44fb11fdcfe807f66de8d52

    this.state = {
      markers: [],
      nameValue: "",
      latitudeValue: 0,
      longitudeValue: 0,
      hideSensorInfo: true
    }
  }

  getGroupFromJSON(){
    axios
      .get("http://localhost:3001/api/v1/users/1/group_sensors")
      .then(response => {
        // console.log(response)
        for (var marker of response.data){
          // console.log(marker)
          const newMarker = {id: marker.id, name: marker.name, latitude: marker.latitude, longitude: marker.longitude}
          const addMarker = this.state.markers.concat(newMarker)
          this.setState({markers: addMarker})

        }
        console.log(this.state.markers)
      })
      .catch(error => console.log(error));
  }

  getSensorsFromJSON(){
    axios
      .get("http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors")
      .then(response => {

        for (var groupSensor of this.state.markers) {
          for (var sensor of response.data){
            if (groupSensor.id === sensor.group_sensor_id){

              let data_type = sensor.data_type

              let sensorMin = sensor.set_min
              let data_typeMin = data_type + "Min"
              groupSensor[data_typeMin] = sensorMin

              let sensorMax = sensor.set_max
              let data_typeMax = data_type + "Max"
              groupSensor[data_typeMax] = sensorMax


            }
          }
          console.log(groupSensor)
        }
      })
      .catch(error => console.log(error));
  }

  getDataPointsFromJSON(){
    for (var i = 0; i < 10; i++){
    axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors/${i}/datapoints`)
      .then(response => {

        for (var dataPoints of response.data ) {
          const marker = this.state.markers
          // groupSensor[data_type] = dataPoints.data_value

        }
        // console.log(this.state.markers)

        // let data_type = sensor.data_type
        // groupSensor[data_type] = sensor.data_value

      })
      .catch(error => console.log(error));
  }
}


  onMarkerClick(props, marker, e) {
    this.setState({isHidden: !this.state.isHidden})
     console.log(marker.name)
    console.log(props)
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
<<<<<<< HEAD
          <Marker onClick={this.onMarkerClick} key={index} name={item.name} position={{lat: item.latitude, lng: item.longitude}} />
=======
          <Marker onClick={this.onMarkerClick} key={index} name={item.name} icon={GoogleMapIconRed} position={{lat: item.latitude, lng: item.longitude}} />
>>>>>>> 600b9d634fcd0bfbc44fb11fdcfe807f66de8d52
        )
      })



// ***************** final return ***************************
        return (
<<<<<<< HEAD
          <div>
            <div className="embed-responsive map-wrapper">
              <Row>
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
=======
          <Grid>
                    <Row>
                    <Col md={9}></Col>
                    <Col md={2}>
                      <Popup trigger={<button> Add sensor</button>} position="right center" modal closeOnDocumentClick>
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
                    </Col>
                    <Col md={1}></Col>
                  </Row>

            <Row>
              <Col md={1}></Col>
              <Col md={3}>
                <div className="databoard">
                  <p>
                    Thierry's databoard
                  </p>
                </div>
              </Col>
              <Col md={7}>
                <div className="embed-responsive map-wrapper container">
                  <div className="col"></div>
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
                  <div className="col"></div>
                </div>
              </Col>
              <Col md={1}></Col>
            </Row>


      </Grid>
>>>>>>> 600b9d634fcd0bfbc44fb11fdcfe807f66de8d52
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRmv6SaTr9BTMU7yeXHarnU3v5zYGaLMk")
})(SensorMap)
