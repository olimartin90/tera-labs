import React, { Component } from 'react';
import { Grid, Row, Modal, Button } from 'react-bootstrap';
import Header from "./Header";
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";
import GroupSensor from "./GroupSensor";

const axios = require('axios');

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.handleHide = this.handleHide.bind(this);
    this.getGroupsFromJSON = this.getGroupsFromJSON.bind(this)
    this.getUserProps = this.getUserProps.bind(this);

    this.state = {
      show: false,
      groups: [],
      sensor: []
    };
  }

  componentDidMount(){
  }

  handleHide() {
    this.setState({ show: false });
  }

  getUserProps(user) {
    this.state.currentUser = user
    this.getGroupsFromJSON(this.state.currentUser.userId)
  }

  getGroupsFromJSON(user) {
    const thisUser = parseInt(user);
    axios
      .get(`http://localhost:3001/api/v1/group_sensors_data/${thisUser}`)
      .then(response => {
        this.state.groups = response.data.group_sensors
        this.getSensor(this.state.groups, 1, 1)
        console.log('GroupSensors: ', response.data.group_sensors)
      })
      .catch(error => console.log(error));
  }

  getSensor(groups, groupId, sensorId){
    groups.forEach(group => {
      console.log('Group: ', group)
      // if(group.id === groupId){
      //   group.single_sensors.forEach(sensor => {
      //     console.log('Sensors: ', sensor)
      //     if(sensor.id === sensorId){
      //       this.state.sensor.push(sensor);
      //       console.log('Sensor: ', sensor)
      //     }
      //   })
      // }
    })
    //     const group = groups.find(group => {
    //   return group.Id = groupId
    // })
    // console.log('Group: ', group)
  }

  render() {
    this.getUserProps(this.props.currentUser);

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
                  {console.log('Render Dahboard: ', this.state.sensor)}
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