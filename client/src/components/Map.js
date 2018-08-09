import React, { Component } from 'react';
import ReactWeather from 'react-open-weather';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import GoogleMapIconGreen from '../map-marker-green.png';
import GoogleMapIconRed from '../map-marker-red.png';
import DataBoard from './Databoard';
import AlertDismissable from './AlertDismissable';
import AddSensors from './AddSensors';

const axios = require('axios');

const style = {
  width: '100%',
  height: '100%',
  position: "absolute",

}


class SensorMap extends Component {
  constructor(props) {
    super(props);

    this.onMarkerClick = this.onMarkerClick.bind(this);



    this.state = {
      markers: [],
      nameValue: "",
      latitudeValue: 0,
      longitudeValue: 0,
      hideSensorInfo: true,
      dbButtonShow: false,
      group: {},
      dataBoard: [
        { data_type: "Soil Moisture" },
        { data_type: "Aeration" },
        { data_type: "Soil Temp" },
        { data_type: "Nitrate" },
        { data_type: "Phosphorus" },
        { data_type: "Salinity" },
        { data_type: "Respiration" },
        { data_type: "pH" },
        { data_type: "Potassium" }]
    }
  }

  // *************** marker generator Below *********************
  componentWillReceiveProps(nextProps) {
    const groups = nextProps.groups
    if (!this.state.markers[0] || groups[0].id !== this.state.markers[0].id) {
      for (var marker of groups) {

        const newMarker = {
          id: marker.id,
          name: marker.name,
          latitude: marker.latitude,
          longitude: marker.longitude,
          data: marker.single_sensors,
          alert: 0
        }

        for (var sensor of marker.single_sensors) {
          let data_type = sensor.data_type
          let sensorMin = sensor.set_min
          let data_typeMin = data_type + "Min"

          let sensorMax = sensor.set_max
          let data_typeMax = data_type + "Max"

          const newData = 0;

          for (var data of sensor.data_points) {

            newData = data.data_value;

          }

          const newSensorSetting = {
            data_typeMin: sensorMin,
            data_typeMax: sensorMax,
            data_value: newData
          }
          newMarker[data_type] = newSensorSetting

        }
        let newCenterPoint = { lat: marker.latitude, lng: marker.longitude }
        const addMarker = this.state.markers.concat(newMarker)
        this.state.markers = addMarker
        this.setState({ initialCenterPoint: newCenterPoint })
      }
    }
  }

  // *********** DATABOARD FEATURE BELOW *********************


  onMarkerClick(props, marker, e) {
    console.log("marker was clicked")


    let data = []

    axios
      .get(`http://localhost:3001/api/v1/group_sensors_data/${this.props.currentUser.userId}`)
      .then(res => {
        let group = res.data.group_sensors.filter(x => x.id === marker.id)[0]
        this.setState({ group: group })
        group.single_sensors.map(sensor => {

          let mostRecentValue = 0
          if (sensor.data_points.length > 0) {
            mostRecentValue = sensor.data_points.sort((a, b) => { return ((new Date(b.updated_at)) - (new Date(a.updated_at))) })[0].data_value
          }
          data.push({
            group_sensor_name: marker.name,
            data_type: sensor.data_type,
            data_value: mostRecentValue,
            data_min: sensor.set_min,
            data_max: sensor.set_max
          })
        })
        console.log("our data:", data)
        this.setState({ dataBoard: data })
        if (!this.state.dbButtonShow) {
          this.setState({ dbButtonShow: true })
        }
      })
  }

  render() {

    // *************** return the markers from the state and send it to the final return ****************
    let markers = this.state.markers;
    let types_of_data = ["Aeration", "Nitrate", "Phosphorus", "Potassium", "Respiration", "Salinity", "Soil Moisture", "Soil Temp", "pH"];

    const listOfMarkers = markers.map((item, index) => {
      item.alert = 0;
      for (var dataType of types_of_data) {
        if (item[dataType]) {
          const dataObj = item[dataType]
          if (dataObj.data_value < dataObj.data_typeMin || dataObj.data_value > dataObj.data_typeMax) {

            dataObj.alert = 1;
            item.alert = 1;
          } else {
            dataObj.alert = 0;
          }
        }
      }

      // *************** icon change if alert ********************
      if (item.alert === 0) {
        return (
          <Marker onClick={this.onMarkerClick} key={index} name={item.name} id={item.id} icon={GoogleMapIconGreen} position={{ lat: item.latitude, lng: item.longitude }} />
        )
      } else {
        return (
           <Marker onClick={this.onMarkerClick} key={index} name={item.name} id={item.id} icon={GoogleMapIconRed} position={{ lat: item.latitude, lng: item.longitude }} />
        )
      }
    })

    // ***************** Marker generator ***************************
    return (

      <Grid>

        {/* ***************** NOTIFICATION BAR *************************** */}
        <Row>
          <div>
            <Col md={1}></Col>
            <Col md={3}>
              <h3>{this.props.currentUser.companyName}</h3>
            </Col>
            <Col md={1}></Col>
            <Col md={3}>
              <h3>{this.state.markers.length} Units Sensors</h3>
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
              <div className="weather-div">
                <ReactWeather
                  forecast="today"
                  apikey="ba2b14c881784efb99f150704180608"
                  type="geo"
                  lat={this.props.currentUser.latitude}
                  lon={this.props.currentUser.longitude}
                />
              </div>
            </Col>
          </div>
        </Row>

        {/* ***************** Alert Notification Bar *************************** */}

        <Row>
          <Col md={2}></Col>
          <Col md={8}>
           <AlertDismissable markers={this.state.markers} className="alert" />
          </Col>
        </Row>

        <AddSensors currentUserId={this.props.currentUser.userId} />

        <Row className="test3">

          <Col md={1}>

          </Col>
          <Col md={3}>

            {/* **************** Databoard ****************** */}

            <DataBoard
            groups={this.props.groups}
            currentUser={this.props.currentUser}
            group={this.state.group}
            dataBoard={this.state.dataBoard}
            markers={this.state.markers}
            dbButtonShow={this.state.dbButtonShow} />

            {/* **************** Databoard ****************** */}

          </Col>

          {/* **************** MAP ************** */}

          <Col md={7}>
            <div className="embed-responsive map-wrapper container">
              <div className="col"></div>
              <Map className="embed-responsive-item"
                google={this.props.google}
                style={style}
                initialCenter={{
                  lat: this.props.currentUser.latitude,
                  lng: this.props.currentUser.longitude
                }}
                zoom={15}
                onClick={this.onMapClicked}
              >
                {listOfMarkers}
              </Map>
              <div className="col"></div>
            </div>


          </Col>
          <Col md={1}></Col>

          {/* **************** MAP ************** */}

          {/* ******************************************* */}


          {/* ********************************************* */}
        </Row>

      </Grid >
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDlhr1PA-f7rbAzKfeendNYI8M0cvdVt5M")
})(SensorMap)
