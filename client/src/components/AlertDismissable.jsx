import React, { Component } from 'react';
import { Button, Alert, Col } from 'react-bootstrap';

class AlertDismissable extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show && this.props.markers.find(item => item.alert > 0)) {
      return (
        <div>
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>Warning Data Out of Range!</h4>
            <h5>
              Data is out of range on at least one of the sensors.
              For more details, please click on the red probe on the map.
              </h5>
            <p>
              <Button pull-right onClick={this.handleDismiss}>Close</Button>
            </p>
          </Alert>
        </div>
      )
    }
    return this.handleShow;
  }
}

export default AlertDismissable;
