import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (

			<footer className="page-footer">
				<div id="footer" className="container-fluid">
					<Row>
          <Col md={1}></Col>
					<Col md={10}>
						<div className="col-12 col-sm-6 col-lg-3">
							<h6>Quick Links</h6>
							<ul className="list-unstyled">
								<li><a href="#">Home</a></li>
								<li><a href="#">Whats new</a></li>
								<li><a href="#">Support</a></li>
								<li><a href="#">My account</a></li>
								<li><a href="#">Cancel subscription</a></li>
							</ul>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<h6>Information</h6>
							<ul className="list-unstyled">
								<li><a href="#">About us</a></li>
								<li><a href="#">Jobs</a></li>
								<li><a href="#">Press info</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">Partnership</a></li>
							</ul>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<h6>Our location</h6>
							<ul className="list-unstyled">
								<li>Wework l'Avenue</li>
								<li>1275 Avenue Des Canadiens-De-Montréal</li>
								<li>Montréal, QC H3B 5E8</li>
								<li>418-932-9966</li>
							</ul>
						</div>
						<div className="col-12 col-sm-6 col-lg-3">
							<h6>Follow us</h6>
							<ul className="list-unstyled">
								<Image className="footer-social-media-icone" src={process.env.PUBLIC_URL + '/Facebook.svg'} alt="171x180" />
								<Image className="footer-social-media-icone" src={process.env.PUBLIC_URL + '/Instagram.svg'} alt="171x180" />
								<Image className="footer-social-media-icone" src={process.env.PUBLIC_URL + '/LinkedIn.svg'} alt="171x180" />
							</ul>
						</div>
					</Col>
					</Row>
					<Row className="copy-right">
					<Col mdOffset={1}>
						<span>&copy; 2018 Terra-labs, Inc. All rights reserved. Terms of use and privacy policy.</span>
					}
					</Col>
					</Row>

				</div>
			</footer>
		)
	}
}

export default Footer;
