import React, { Component } from 'react';

import Map from "./Map";
import GroupSensor from "./GroupSensor";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: []
    };
  }
  render() {
    return (
      <div>
        <Map />
        <GroupSensor group={this.state.group} />
      </div>
    )
  }
}

export default Dashboard;