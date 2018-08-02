import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Header from "./Header";
import SensorMap from "./Map";
import GroupSensor from "./GroupSensor";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      group: []
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(email) {
    this.setState({
      currentUser: email
    })
  }

  render() {
    return (
      <div>
        <div>
          <Header updateCurrentUser={this.updateCurrentUser} />
        </div>
        <Grid className="top-cont">
          <Row >
            <div >
              <SensorMap />
            </div>
          </Row>
          <Row>
            <div>
              <GroupSensor className="number2" group={this.state.group} />
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Dashboard;