import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Header from "./Header";
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";
import GroupSensor from "./GroupSensor";

const Modal = require("react-bootstrap/lib/Modal")
const Button = require("react-bootstrap/lib/Button")

const axios = require('axios');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      show: false,
      groups: [],
      sensor: {}
    };
  }
  componentDidMount(){
    this.getGroupsFromJSON()
    this.getSensor(this.state.groups, 1, 1)
  }
  handleHide() {
    this.setState({ show: false });
  }
  getGroupsFromJSON() {
    axios
      .get(`http://localhost:3001/api/v1/group_sensors_data/1`)
      .then(response => {
        this.setState({
          groups: response.data.group_sensors
        })
      })
      .catch(error => console.log(error));
  }
  getSensor(groups, groupId, sensorId){
    groups.forEach(group => {
      if(group.id === groupId){
        group.single_sensors.forEach(sensor => {
          if(sensor.id === sensorId){
            this.setState({ sensor: sensor });
            console.log('from getSensors: ', sensor)
          }
        })
      }
    })
  }
  render() {
    return (
      <div>
        <div>
          <Header currentUser={this.props.currentUser} />
        </div>
        <Grid className="top-cont">
          <Row>
            <div>
              <SensorMap />
              <div className="modal-container" style={{ height: 200 }}>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => {
                    this.setState({
                      show: true
                    })
                  }}
                >
                  sensors
                </Button>
                <Modal
                  show={this.state.show}
                  onHide={this.handleHide}
                  container={this}
                  aria-labelledby="contained-modal-title"
                  bsSize="large"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                      Teralabs
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SingleSensor sensor={this.state.sensor} />
                  {console.log('SensorDahboard: ', this.state.sensor)}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Dashboard;