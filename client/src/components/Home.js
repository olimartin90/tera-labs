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
            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                 <div class="icon">
                    <i class="fas fa-sitemap"></i>
                  </div>
                  <h4 className="h4"> Collect </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>
            </Col>


            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-chart-bar"></i>
                  </div>
                  <h4 className="h4"> Display </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                  </div>
                  <h4 className="h4"> Monitor </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>
         </Row>

         <div className="backgroundimage2">
         </div>

         <Row>
         <Col xs={8} sm={8} md={8}>
          <img className="graphimage img-responsive"src={process.env.PUBLIC_URL + '/graphexample2.jpg'} alt= "" />
         </Col>

            <Col xs={12} sm={12} md={4}>


              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="far fa-plus-square"></i>
                  </div>
                  <h4 className="h4"> Create your account </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis</p>
              </div>



              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-cogs"></i>
                  </div>
                  <h4 className="h4"> Connect your sensors </h4>
                </div>
                <p className="pcontent">Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>



              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-eye"></i>
                  </div>
                  <h4 className="h4"> Visualize your data </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>


            </Col>
         </Row>

         <div class="backgroundimage3">
         </div>

         <Row>
          <h2 className="advancedfeatures">  Advanced Features </h2>
            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <h4 className="h4"> Locate </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>


            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-search"></i>
                  </div>
                  <h4 className="h4"> Analyse </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="sectiondisplay">
                <div className="iconh4">
                  <div class="icon">
                    <i class="fas fa-balance-scale"></i>
                  </div>
                  <h4 className="h4"> Compare </h4>
                </div>
                <p className="pcontent"> Spicy jalapeno bacon ipsum dolor amet sirloin prosciutto ham hock ham frankfurter Swine andouille pastrami strip steak Andouille sirloin doner flank pastrami tongue ground round short loin venis </p>
              </div>
            </Col>
         </Row>
        </Grid>
      </div>
    )
}

export default Home;
