import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


const axios = require('axios');

class AddSensors extends Component {
  constructor(props) {
    super(props);

    // Functions for the Add Sensors Modal
    this.handleAddSensors = this.handleAddSensors.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    }
  }


  handleAddSensors(e) {
    e.preventDefault();
    const user_id = this.props.currentUserId
    const name = this.name.value
    const latitude = this.latitude.value
    const longitude = this.longitude.value
    const set_min_sm = this.set_min_sm.value
    const set_max_sm = this.set_max_sm.value
    const set_min_ae = this.set_min_ae.value
    const set_max_ae = this.set_max_ae.value
    const set_min_st = this.set_min_st.value
    const set_max_st = this.set_max_st.value
    const set_min_ni = this.set_min_ni.value
    const set_max_ni = this.set_max_ni.value
    const set_min_phos = this.set_min_phos.value
    const set_max_phos = this.set_max_phos.value
    const set_min_sa = this.set_min_sa.value
    const set_max_sa = this.set_max_sa.value
    const set_min_re = this.set_min_re.value
    const set_max_re = this.set_max_re.value
    const set_min_pH = this.set_min_pH.value
    const set_max_pH = this.set_max_pH.value
    const set_min_pota = this.set_min_pota.value
    const set_max_pota = this.set_max_pota.value

    axios
      .post(`http://localhost:3001/api/v1/users/${user_id}/group_sensors`, {
        user_id: user_id,
        name: name,
        latitude: latitude,
        longitude: longitude,
        single_sensors: [
          {
            data_type: "Soil Moisture",
            set_min: set_min_sm,
            set_max: set_max_sm,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Aeration",
            set_min: set_min_ae,
            set_max: set_max_ae,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Soil Temp",
            set_min: set_min_st,
            set_max: set_max_st,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Nitrate",
            set_min: set_min_ni,
            set_max: set_max_ni,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Phosphorus",
            set_min: set_min_phos,
            set_max: set_max_phos,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Salinity",
            set_min: set_min_sa,
            set_max: set_max_sa,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Respiration",
            set_min: set_min_re,
            set_max: set_max_re,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "pH",
            set_min: set_min_pH,
            set_max: set_max_pH,
            data_points: [
              {
                data_value: 0
              }
            ]
          },
          {
            data_type: "Potassium",
            set_min: set_min_pota,
            set_max: set_max_pota,
            data_points: [
              {
                data_value: 0
              }
            ]
          }
        ]
      })
      .then(response => {
        this.handleClose();
        window.location.reload();
      })
      .catch(error => console.log(error));
  }

  // Functions for showing and closing the Add Sensors Modal
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  render() {

    return (

      <Grid>

        <Row className="add-sensors-row">
          <div className="fixed-bottom">
            <Col md={10}></Col>
            <Col className="add-sensors-col">
              <div className="modal-container">
                <Button
                  className="modal-container-button"
                  bsStyle="primary"
                  bsSize="medium"
                  onClick={() => this.setState({ show: true })}
                >
                  Add Sensors
              </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Sensors</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <Form horizontal>
                      <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                          Name
                            </Col>
                        <Col sm={10}>
                          <FormControl inputRef={(ref) => { this.name = ref }} name="name" type="text" placeholder="Name" />
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalLocation">
                        <Col componentClass={ControlLabel} sm={2}>
                          Location
                            </Col>
                        <Col sm={5}>
                          <FormControl inputRef={(ref) => { this.latitude = ref }} name="latitude" type="text" placeholder="Latitude" />
                        </Col>
                        <Col sm={5}>
                          <FormControl inputRef={(ref) => { this.longitude = ref }} name="longitude" type="text" placeholder="Longitude" />
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalLocation">
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col componentClass={ControlLabel} sm={3}>
                          Minimum
                            </Col>
                        <Col componentClass={ControlLabel} sm={5}>
                          Maximum
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalMoisture">
                        <Col componentClass={ControlLabel} sm={2}>
                          Moisture
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_sm = ref }} name="min" type="text" defaultValue="0.2" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          awc
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_sm = ref }} name="max" type="text" defaultValue="0.8" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          awc
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalAeration">
                        <Col componentClass={ControlLabel} sm={2}>
                          Aeration
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_ae = ref }} name="min" type="text" defaultValue="15" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          %
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_ae = ref }} name="max" type="text" defaultValue="23" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          %
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalSoilTemp">
                        <Col componentClass={ControlLabel} sm={2}>
                          Temperature
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_st = ref }} name="min" type="text" defaultValue="44" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          °F
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_st = ref }} name="max" type="text" defaultValue="58" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          °F
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalNitrate">
                        <Col componentClass={ControlLabel} sm={2}>
                          Nitrate
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_ni = ref }} name="min" type="text" defaultValue="74" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_ni = ref }} name="max" type="text" defaultValue="89" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalPhosphorus">
                        <Col componentClass={ControlLabel} sm={2}>
                          Phosphorus
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_phos = ref }} name="min" type="text" defaultValue="74" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_phos = ref }} name="max" type="text" defaultValue="89" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalSalinity">
                        <Col componentClass={ControlLabel} sm={2}>
                          Salinity
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_sa = ref }} name="min" type="text" defaultValue="0.4" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          dS/m
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_sa = ref }} name="max" type="text" defaultValue="1" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          dS/m
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalRespiration">
                        <Col componentClass={ControlLabel} sm={2}>
                          Respiration
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_re = ref }} name="min" type="text" defaultValue="0.02" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          %
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_re = ref }} name="max" type="text" defaultValue="0.08" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          %
                            </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalpH">
                        <Col componentClass={ControlLabel} sm={2}>
                          pH
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_pH = ref }} name="min" type="text" defaultValue="6" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={3}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_pH = ref }} name="max" type="text" defaultValue="7" />
                        </Col>
                      </FormGroup>

                      <FormGroup controlId="formHorizontalPotassium">
                        <Col componentClass={ControlLabel} sm={2}>
                          Potassium
                            </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_min_pota = ref }} name="min" type="text" defaultValue="80" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                        </Col>
                        <Col sm={2}>
                          <FormControl inputRef={(ref) => { this.set_max_pota = ref }} name="max" type="text" defaultValue="90" />
                        </Col>
                        <Col componentClass={ControlLabel} sm={1}>
                          ppm
                            </Col>
                      </FormGroup>
                    </Form>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      bsStyle="primary"
                      bsSize="large"
                      onClick={this.handleAddSensors}>Submit</Button>
                  </Modal.Footer>
                </Modal>
              </div>

            </Col>
            <Col md={1}></Col>
          </div>
        </Row>

      </Grid >
    )
  }
}

export default AddSensors;