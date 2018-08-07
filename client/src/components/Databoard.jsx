import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Label } from 'react-bootstrap';
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";

const axios = require('axios');

class DataBoard extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      groups: [],
      group: {},
      sensor: {},
      dataBoard: []
    }
  }

  // Handles the display of line chart modal
  handleHide() {
    this.setState({ show: false });
  }

  componentWillReceiveProps(nextProps) {
    this.state.currentUser = nextProps.currentUser
    this.getGroupsFromJSON(this.state.currentUser.userId)
    console.log('dashboard state: ', this.state)
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
  getSensor(groups, groupId, sensorIndex) {
    this.getGroupsFromJSON(localStorage.getItem("user_id"))
    groups.forEach(group => {
      if (group.id === groupId) {
        this.setState({ group: group, show: true });
        group.single_sensors.forEach(sensor => {
          if (group.single_sensors.indexOf(sensor) === sensorIndex) {
            this.setState({ sensor: sensor, show: true });
          }
        })
      }
    })
  }

  getLastDayDataPoints() {
    console.log('Last day datapoints... coming soon')
  }

  getLastWeekDataPoints() {
    console.log('Last week datapoints... coming soon')
  }

  getLastMonthDataPoints() {
    console.log('Last month datapoints... coming soon')
  }


  render() {
    return (
      <div>
        <Grid className="top-cont">
          <Row>
            <div>
              <div className="modal-container" style={{ height: 200 }}>
                <div className="databoard">
                  {
                    this.props.dataBoard.map((data, index) =>
                      <div key={index}>
                        <Grid>
                          <Row className="show-grid">
                            <Col xs={12} md={8}>
                              <Button
                                className="databoardbutton"
                                bsStyle="success"
                                block
                                onClick={() => { this.getSensor(this.state.groups, 1, index) }}
                              >
                                <h4>
                                  {data.data_type}
                                </h4>
                              </Button>
                            </Col>
                            <Col xs={6} md={4}>
                              <h4>
                                <p>{data.data_value}</p>
                              </h4>
                            </Col>
                          </Row>
                        </Grid>
                      </div>
                    )
                  }
                </div>
                <Modal
                  show={this.state.show}
                  onHide={this.handleHide}
                  container={this}
                  aria-labelledby="contained-modal-title"
                  bsSize="large"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                      <ButtonGroup bStyle="primary" bSize="xsmall">
                        <ButtonToolbar>
                          <Button
                            onClick={() => { this.getLastDayDataPoints() }}
                          >
                            Last day
                          </Button>
                          <Button
                            onClick={() => { this.getLastWeekDataPoints() }}
                          >
                            Last week
                          </Button>
                          <Button
                            onClick={() => { this.getLastMonthDataPoints() }}
                          >
                            Last month
                          </Button>
                        </ButtonToolbar>
                      </ButtonGroup>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <SingleSensor sensor={this.state.sensor} group={this.state.group} />
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

export default DataBoard;
