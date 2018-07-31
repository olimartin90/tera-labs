import React from 'react';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';




const Home = () => {
    return (
      <div>
      <Grid>
         <Row className="bg">
          <Col xs={12} md={12}>
            <div className="sectionone">
              <h1 class= "teralabs"> TeraLabs </h1>
              <p class= "subteralabs"> Give your land a voice </p>
            </div>
          </Col>
         </Row>

         <Row class="container1">
            <Col xs={6} md={4}>
              <div class="collect">
                <div class="collecticon">
                  <i className="fas fa-heart"/>
                  <h4> Collect </h4>
                </div>
                <p class="codismoncontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>
            </Col>


            <Col xs={6} md={4}>
              <div class="display">
                <div class="displayicon">
                  <i className="fa fa-spinner" />
                  <h4> Display </h4>
                </div>
                <p class="codismoncontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div class="monitor">
                <div class="monitoricon">
                  <i className="fa fa-spinner" />
                  <h4> Monitor </h4>
                </div>
                <p class="codismoncontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>
         </Row>

         <Row>
          <img src={process.env.PUBLIC_URL + '/graphexample2.jpg'} alt= "" />
          <div className="sectiontwo">
            <Col xsHidden md={4}>
              <div>
                <h4> Create your account </h4>
                <i className="fas fa-chart-line" />
                <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>
            </Col>
            <Col xsHidden md={4}>
              <div>
                <h4> Connect your sensors </h4>
                <i className="fa fa-spinner" />
                <p>Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>
            <Col xsHidden md={4}>
              <div>
                <h4> Visualize your data </h4>
                <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>
          </div>
         </Row>

         <Row>
          <h2 className="advancedfeatures"> Advanced Features </h2>
          <div>
            <Col xs={6} md={4}>
              <h4> Locate </h4>
              <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
            </Col>
          </div>
          <div>
            <Col xs={6} md={4}>
              <h4> Analyse </h4>
              <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
            </Col>
          </div>
          <div>
            <Col xs={6} md={4}>
              <h4> Compare </h4>
              <p> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
            </Col>
          </div>
         </Row>
        </Grid>
      </div>
    )
}

export default Home;
