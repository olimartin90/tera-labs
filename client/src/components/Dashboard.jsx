import React, { Component } from 'react';
import Map from "./Map";
import GroupSensor from "./GroupSensor";

const Modal = require("react-bootstrap/lib/Modal")
const Button = require("react-bootstrap/lib/Button")

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      show: false,
      group: []
    };
  }
  handleHide() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div>
        <Map />
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
              <GroupSensor group={this.state.group} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Dashboard;