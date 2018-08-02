import React from 'react';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';




const Home = () => {
    return (
      <div>
        <Grid>

          <Row className="row1">
            <Col xs={12} sm={12} md={6}>
            <Row>
            <Col xs={12} sm={12} md={12}>
              <div className="section0">
                <h1 className="teralabs"> Tera Labs </h1>
                <p className="teralabsdescription"> TeraLabs is a precision agriculture company dedicated to helping farmers around the world monitor and manage soil health to increase crop productivity </p>
              </div>
              </Col>
              </Row>
            </Col>
            <Col className="col2" xs={12} sm={12} md={6}>

              <div className="loginregisterform">
              </div>

            </Col>
          </Row>

          <Row className="row2">
            <Col xs={12} sm={12} md={6}>
                <img className="graphimage img-responsive"src={process.env.PUBLIC_URL + '/graphexample2.jpg'} alt= "" />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <div className="section1">
                <h4 className="h41"> A DETAILED VIEW OF YOUR FARMS SOIL QUALITY </h4>
                <p className="p1"> Our sensors report every minute, 24 hours a day, 7 days a week, giving you the best opportunity to track how input affects your soil quality </p>
                <p className="p1"> Gets alerts when sensors detect poor soil conditions for your crops, so you can take proactice measures before problems occur. </p>
                <p className="p1"> View historic averages reported for each sensor </p>
              </div>
            </Col>
          </Row>

          <Row className="row3">
            <Col xs={12} sm={12} md={6}>
                <img className="mapimage img-responsive"src={process.env.PUBLIC_URL + '/map.JPG'} alt= "" />
            </Col>
            <Col  xs={12} sm={12} md={6}>
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

export default Home;
