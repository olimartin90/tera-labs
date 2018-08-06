import React, { Component } from 'react';
import ReactWeather from 'react-open-weather';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Popup from "reactjs-popup";
import GoogleMapIconGreen from '../map-marker-green.png'
import GoogleMapIconRed from '../map-marker-red.png'
import GoogleMapIconYellow from '../map-marker-yellow.png'
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


    this.state = {
      markers: [],
      nameValue: "",
      latitudeValue: 0,
      longitudeValue: 0,
      hideSensorInfo: true
    }
  }



  onMarkerClick(props, marker, e) {

    console.log(this.state)
    this.setState({isHidden: !this.state.isHidden})
    // console.log(props)
    if (this.state.isHidden) {
      // console.log("is hidden")
    } else {
      // console.log("is shown")
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

componentWillReceiveProps(nextProps) {
  const groups = nextProps.groups
  for (var marker of groups) {
    
    const newMarker = {id: marker.id, name: marker.name, latitude: marker.latitude, longitude: marker.longitude, data: marker.single_sensors, alert: 0}

    for (var sensor of marker.single_sensors){
      let data_type = sensor.data_type
      let sensorMin = sensor.set_min
      let data_typeMin = data_type + "Min"
      
      let sensorMax = sensor.set_max
      let data_typeMax = data_type + "Max"
      
      const newData = 0;
      
      for (var data of sensor.data_points) {
        
        newData = data.data_value;
        
      }
      
      const newSensorSetting = {data_typeMin: sensorMin, data_typeMax: sensorMax, data_value: newData}
      newMarker[data_type] = newSensorSetting
      
    }
    
    const addMarker = this.state.markers.concat(newMarker)
            console.log(this.state.markers)
    this.state.markers = addMarker
    
  }
}
  handleNewMarker = e => {
    console.log(this.state.latitudeValue)
    const newMarker = { id: this.state.id, name: this.state.nameValue, latitude: this.state.latitudeValue, longitude: this.state.longitudeValue, alert: 0 }
    const addMarker = this.state.markers.concat(newMarker)
    this.setState({ markers: addMarker })
    this.state.nameValue = "";
    this.state.latitudeValue = 0;
    this.state.longitudeValue = 0;
    e.preventDefault();
  }


    render() {
// *************** return the markers from the state and send it to the final return ****************
      let markers = this.state.markers;
      let types_of_data =["Aeration", "Nitrate", "Phosphorus", "Potassium", "Respiration", "Salinity", "Soil Moisture", "Soil Temp", "pH"];

      const listOfMarkers = markers.map((item, index) => {
          for (var dataType of types_of_data) {
            if(item[dataType]){
              const dataObj = item[dataType]
              console.log("dataa:", item)
              if (dataObj.data_value < dataObj.data_typeMin || dataObj.data_value > dataObj.data_typeMax ){
                item.alert += 1;
                console.log("you're in deep shit. Alert: ", item.alert)

              } else {
                console.log("everythings alright")
              }
            } else {
              console.log("undefineddddddddddddddd")
            }
        }

        console.log("Item:::::", item.Aeration)

        if (item.alert === 0) {
          return (
            <Marker onClick={this.onMarkerClick} key={index} name={item.name} icon={GoogleMapIconGreen} position={{lat: item.latitude, lng: item.longitude}} /> 
          )
        } else if( item.alert === 1) {
          return (
            <Marker onClick={this.onMarkerClick} key={index} name={item.name} icon={GoogleMapIconYellow} position={{lat: item.latitude, lng: item.longitude}} /> 
          )
        } else {
          return (
            <Marker onClick={this.onMarkerClick} key={index} name={item.name} icon={GoogleMapIconRed} position={{lat: item.latitude, lng: item.longitude}} /> 
          )
        }
      })

      
      
// ***************** final return ***************************
        return (
          <Grid>
            <Row>
              <div>
                <Col md={1}></Col>
                <Col md={3}><p>Overview \n
                 farm lighthouse Labs</p> </Col>
                <Col md={3}>
                  <div>
                    <ReactWeather
                      forecast="today"  
                      apikey="ba2b14c881784efb99f150704180608"
                      type="geo"
                      lat="45.21205"
                      lon="-73.738771"
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <p>holla</p>
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    <p>holla</p>
                  </div>
                </Col>
              </div>
            </Row>
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
                    {/* <Marker onClick={this.onMarkerClick}
                            name={'Current location'} /> */}
                    {listOfMarkers}
                  </Map>
                  <div className="col"></div>
                </div>
              </Col>
              <Col md={1}></Col>
            </Row>
      </Grid>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCRmv6SaTr9BTMU7yeXHarnU3v5zYGaLMk")
})(SensorMap)
