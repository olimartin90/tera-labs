import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Login from "./Login";
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class Home extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function () {
      console.log("end", arguments);
    });

  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      }));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    return (
      <div>
        <Grid>

          <Row className="row1">
            <div className="col-md-1">
            </div>
            <Col xs={12} sm={12} md={4}>
              <div className="section0">
                <h1 className="teralabs" > Tera Labs </h1>
                <p className="teralabsdescription"> A precision agriculture company dedicated to helping farmers around the world monitor soil health  </p>
                <Link className="scrollDown "activeClass="active" to="row2" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                 <i class="fas fa-arrow-circle-down"></i>
                  More Info
                </Link>
              </div>
            </Col>

            <div className="col-md-2">
            </div>
            <Col xs={12} sm={12} md={6}>
              <div className="loginregisterform">
                <Login updateCurrentUser={this.props.updateCurrentUser} />
              </div>
            </Col>
          </Row>

          <Row id="row2">
            <Col className="collast" xs={12} sm={10} md={8} lg={6}>

              <img className="graphimage img-responsive" src={process.env.PUBLIC_URL + '/graph-pH.png'} alt="" />

            </Col>
            <Col xs={12} sm={10} md={8} lg={6}>
              <div className="section1">
                <h4 className="h41"> A DETAILED VIEW OF YOUR FARMS SOIL QUALITY </h4>
                <p className="p1"> Our sensors report every minute, 24 hours a day, 7 days a week, giving you the best opportunity to track how input affects your soil quality </p>
                <p className="p1"> Gets alerts when sensors detect poor soil conditions for your crops, so you can take proactice measures before problems occur. </p>
                <p className="p1"> View historic averages reported for each sensor </p>
                <Link className="scrollDown2" activeClass="active" to="row3" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive}>
                 <i class="fas fa-arrow-circle-down"></i>
                  More Info
                </Link>
              </div>
            </Col>
          </Row>

          <Row className="row3">
            <Col className="collast2" xs={12} sm={12} md={8} lg={6}>
              <img className="mapimage img-responsive" src={process.env.PUBLIC_URL + '/map-sensors.png'} alt="" />
            </Col>
            <Col xs={12} sm={12} md={8} lg={6}>
              <div className="section2">
                <h4 className="h42"> LOCATE YOUR SENSORS </h4>
                <p className="p2"> Our color-coded system makes it easy to get a sense of whats happening without needing to dig deep. </p>
                <p className="p2"> Pinpoint problem areas and compare soil between zones. </p>

                 <a className="scrollUp"onClick={this.scrollToTop}>
                 <i class="far fa-arrow-alt-circle-up"></i>
                 Scroll Up
                 </a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div >
    )
  }
}

export default Home;
