import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Logout from "./Logout";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <Navbar className="navbar-full" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={process.env.PUBLIC_URL + '/agriculture-tech.png'} />
            <span>Tera Labs</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              My Account
            </NavItem>
            <NavDropdown eventKey={3} title="Quick Links" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Whats New</MenuItem>
              <MenuItem eventKey={3.2}>Support</MenuItem>
              <MenuItem eventKey={3.3}>About Us</MenuItem>
              <MenuItem eventKey={3.4}>Contact</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              {this.props.currentUser.email}
            </NavItem>
            <NavItem eventKey={2} href="#">
              <Logout />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };
};


export default Header;
