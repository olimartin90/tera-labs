import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      <button onClick={this.handleLogout}>Sign Out</button>
    )
  };
};

export default Logout;