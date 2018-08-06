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
    this.state = {
      show: false,
      groups: [],
      group: {},
      sensor: {}
    };
  }

  // Handles the display of line chart modal
  handleHide() {
    this.setState({ show: false });
  }

  // Gets groups based on user props from App.jsx
  componentWillReceiveProps(nextProps){
    this.state.currentUser = nextProps.currentUser
    this.getGroupsFromJSON(this.state.currentUser.userId)
  }

  // Gets the whole groups object based on the user
  getGroupsFromJSON(userId) {
    const thisUser = parseInt(userId);
    axios
      .get(`http://localhost:3001/api/v1/group_sensors_data/${thisUser}`)
      .then(response => {
        this.setState({ groups: response.data.group_sensors })
      })
      .catch(error => console.log(error));
  }

  // Gets a specific sensor in groups props by groupId and button that was pressed
  getSensor(groups, groupId, sensorIndex){
    this.getGroupsFromJSON(this.state.currentUser.userId)

    groups.forEach(group => {
      if(group.id === groupId){
        this.setState({ group: group, show: true });
        group.single_sensors.forEach(sensor => {
          if(group.single_sensors.indexOf(sensor) === sensorIndex){
            this.setState({ sensor: sensor, show: true });
          }
        })
      }
    })
  }

  render() {
    return (
      <div>
        {console.log('UserId: ', this.props.currentUser.email)}
        <div>
          <Header currentUser={this.props.currentUser} />
        </div>
        <Grid className="top-cont">
          <Row>
            <div>
              <SensorMap currentUser={this.props.currentUser} />
              <div className="modal-container" style={{ height: 200 }}>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 0) }}
                >
                  Moisture
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 1) }}
                >
                  Aeration
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 2) }}
                >
                  Temp
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 3) }}
                >
                  Nitrate
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 4) }}
                >
                  Phosphorus
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 5) }}
                >
                  Salinity
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 6) }}
                >
                  Respiration
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 7) }}
                >
                  pH
                </Button>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={()=>{ this.getSensor(this.state.groups, 1, 8) }}
                >
                  Potassium
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
                    <SingleSensor sensor={this.state.sensor} group={ this.state.group } />
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
