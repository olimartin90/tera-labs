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
    // this.updateCurrentUser = this.updateCurrentUser.bind(this)
    this.state = {
      currentUser: {},
      show: false,
      groups: [],
      group: {},
      sensor: {}
    };
    this.getGroupsFromJSON()
  }
  handleHide() {
    this.setState({ show: false });
  }
  // updateCurrentUser(email, userId) {
  //   this.setState({
  //     currentUser: {
  //       email: email,
  //       userId: userId
  //     }
  //   })
  // }
  getGroupsFromJSON() {
    const userId = this.props.currentUser.email
    console.log("The userID:", userId)
    axios
      .get(`http://localhost:3001/api/v1/group_sensors_data/${this.state.currentUser.userId}`)
      .then(response => {
        this.setState({
          groups: response.data.group_sensors
        })
        console.log('Response Data: ', response.data.group_sensors)
      })
      .catch(error => console.log(error));
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
                    <SingleSensor group={this.state.groups[0]}  />
                  {console.log('SensorDahboard: ', this.state.groups[0])}
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
