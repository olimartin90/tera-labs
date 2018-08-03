import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Header from "./Header";
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";

const Modal = require("react-bootstrap/lib/Modal")
const Button = require("react-bootstrap/lib/Button")

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.state = {
      currentUser: null,
      show: false,
      sensor: []
    };
  }
  handleHide() {
    this.setState({ show: false });
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
          <span >{this.currentUser}</span>
        </div>
        <Grid className="top-cont">
          <Row>
            <div>
              <SensorMap />
              <div className="modal-container" style={{ height: 200 }}>
                <Button
                  bsStyle="primary"
                  bsSize="large"
                  onClick={() => this.setState({ show: true })}
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