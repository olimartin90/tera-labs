import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Login from "./Login";
// import { Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
// import Register from "./Register";
// import Logout from "./Logout";

class Home extends Component {

  render() {
    return (
      <div>
        <Grid>

          <Row className="row1">
            <div className="col-md-1">
            </div>
            <Col xs={12} sm={12} md={4} col-md-offset-1>
              <div className="section0">
                <h1 className="teralabs"> Tera Labs </h1>
                <p className="teralabsdescription"> TeraLabs is a precision agriculture company dedicated to helping farmers around the world monitor and manage soil health to increase crop productivity </p>
              </div>
            </Col>
            <Col className="col2" xs={12} sm={12} md={6}>

              <div className="loginregisterform">
                <Login />
                {/* <Form horizontal>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      Email
                  </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Email" />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                      Password
                  </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Password" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">Sign in</Button>
                    </Col>
                  </FormGroup>
                </Form>; */}
              </div>

            </Col>
          </Row>

          <Row className="row2">
            <Col className="collast" xs={12} sm={10} md={8} lg={6}>

              <img className="graphimage img-responsive" src={process.env.PUBLIC_URL + '/graphexample2.jpg'} alt="" />

            </Col>
            <Col xs={12} sm={10} md={8} lg={6}>
              <div className="section1">
                <h4 className="h41"> A DETAILED VIEW OF YOUR FARMS SOIL QUALITY </h4>
                <p className="p1"> Our sensors report every minute, 24 hours a day, 7 days a week, giving you the best opportunity to track how input affects your soil quality </p>
                <p className="p1"> Gets alerts when sensors detect poor soil conditions for your crops, so you can take proactice measures before problems occur. </p>
                <p className="p1"> View historic averages reported for each sensor </p>
              </div>
            </Col>
          </Row>

          <Row className="row3">
            <Col className="collast2" xs={12} sm={12} md={6} lg={6}>
              <img className="mapimage img-responsive" src={process.env.PUBLIC_URL + '/map.JPG'} alt="" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="section2">
                <h4 className="h42"> LOCATE YOUR SENSORS </h4>
                <p className="p2"> Our color-coded system makes it easy to get a sense of whats happening without needing to dig deep. </p>
                <p className="p2"> Pinpoint problem areas and compare soil between zones. </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home;
