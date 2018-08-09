import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button, ButtonGroup, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Label, Collapse, Well, Fade } from 'react-bootstrap';
import SensorMap from "./Map";
import SingleSensor from "./SingleSensor";

const axios = require('axios');

class DataBoard extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false,
      open: false,
      groups: [],
      group: {},
      sensor: {},
      dataBoard: [],
    }
    this.getGroupsFromJSON(localStorage.getItem("user_id"))
  }



  // Handles the display of line chart modal
  handleHide() {
    this.setState({ show: false });
  }


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

  // Gets a specific sensor in groups props by groupId and button that was pressed
  getSensor(groups, grp, sensorIndex) {
    this.getGroupsFromJSON(localStorage.getItem("user_id"))
    groups.forEach(group => {
      if (group.id === grp.id) {
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

  drawEmptyBoard() {
    return (this.props.dataBoard.map((data, index) =>
        <div key={index}>
          <Grid>
            <Row className="show-grid">

                {
                    <Button bsClass="custom-class3" bsSize="xsmall" className="databoardbutton" block active
                            onClick={() => { this.getSensor(this.state.groups, this.props.group, index) }} >
                      <div className="data_type_value">
                        <h4> {data.data_type} </h4>
                      </div>
                    </Button>
                }
          </Row>
        </Grid>
      </div>
     )
   )
  }

  drawDataBoard()  {
 return (this.props.dataBoard.map((data, index) =>

  <div key={index}>

    <Grid>
      <Row className="show-grid">

        {
          data.data_value < data.data_min || data.data_value > data.data_max

            ? (<Button bsClass="custom-class2" bsSize="xsmall" className="databoardbutton" block active
                      onClick={() => { this.getSensor(this.state.groups, this.props.group, index) }} >
                <div className="data_type_value">
                  <h4> {data.data_type} </h4>
                  <p> {data.data_value} </p>
                </div>
              </Button>)

            : (<Button bsClass="custom-class" bsSize="xsmall" className="databoardbutton" block active
                        onClick={() => { this.getSensor(this.state.groups, this.props.group, index) }} >
                 <div className="data_type_value">
                   <h4> {data.data_type} </h4>
                   <p> {data.data_value} </p>
                 </div>
               </Button>)
        }
    </Row>
  </Grid>
</div>
))
  }


  render() {
    const showDataboard = (!this.props.dbButtonShow) ? this.drawEmptyBoard() : this.drawDataBoard()

    return (
      <div>
        <Grid >
          <Row>
          <div>
           <div>
            <div >

                  {
                    showDataboard
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
                      <ButtonGroup bsStyle="primary" bsSize="xsmall">
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
