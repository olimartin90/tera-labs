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
    this.getGroupsFromJSON()
    this.handleHide = this.handleHide.bind(this);
    // this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.state = {
      currentUser: "",
      currentUserId: null,
      show: false,
      groups: [],
      group: {},
      sensors: [],
      sensor: {}
    };
  }
  componentDidMount() {
    this.updateCurrentUser(this.props.email, this.props.id)
  }
  handleHide() {
    this.setState({ show: false });
  }
  updateCurrentUser(email, id) {
    this.setState({
      currentUser: email,
      currentUserId: id
    })
  }
  getGroupsFromJSON(){
    axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors`)
      .then(response => {
        this.setState({
          groups: response.data
        }),
        this.getSensorsFromJSON(response.data)
      })
      .catch(error => console.log(error));
  }
  getSensorsFromJSON(groups){
    let object = {}
    groups.forEach(group => {
      axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors/${group.id}/single_sensors`)
      .then(response => {
        object[group.id] = response.data
      })
      .catch(error => console.log(error));
    })
    this.state.sensors.push(object)
  }
  render() {
    return (
      <div>
        <div>
          <Header updateCurrentUser={this.updateCurrentUser} />
          <span >{this.currentUser}</span>
        </div>
        <Grid className="top-cont">
          <Row>
            <div>
              <SensorMap />
              <div className="modal-container" style={{height: 200}}>
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
                    <SingleSensor sensor={this.state.sensors} />
                  {console.log('SensorDahboard: ', this.state.sensors)}
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