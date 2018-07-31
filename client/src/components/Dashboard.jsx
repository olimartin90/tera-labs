import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import SensorMap from "./Map";
import GroupSensor from "./GroupSensor";
const axios = require('axios');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: []
    };
  }
  render() {
    return (
      <Grid className="top-cont">
        <Row >
          <div >
            <SensorMap />
          </div>
        </Row>
        <Row>
          <div>
            <GroupSensor className="number2" group = {this.state.group}/>
            <GroupSensor className="number2" group = {this.state.group}/>
          </div>
        </Row>
      </Grid>
    )
  }
}

export default Dashboard;