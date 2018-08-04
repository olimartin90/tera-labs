import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      toHome: false
    };
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("auth_token");
    this.setState({
      toHome: true
    })
  }

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <Button className="logoutButton" onClick={this.handleLogout}>Sign Out</Button>
    )
  };
};

export default Logout;