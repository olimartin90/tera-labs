import React, { Component } from 'react';
import { Grid, Row, Modal, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Header from "./Header";
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";

const axios = require('axios');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getGroupsFromJSON = this.getGroupsFromJSON.bind(this)
    this.state = {
      show: false,
      groups: [],
      group: {},
      sensor: {}
    };
  }

  // Gets groups based on user props from App.jsx
  componentWillReceiveProps(nextProps) {
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

  render() {
    return (
      <div>
        <div>
          <Header currentUser={this.props.currentUser} />
        </div>
        <Grid className="top-cont">
          <Row>
            <div>
              <SensorMap groups={this.state.groups} currentUser={this.props.currentUser}  />
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Dashboard;
