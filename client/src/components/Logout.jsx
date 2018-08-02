import React, { Component } from 'react';

class Logout extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("auth_token");
  }

  render() {
    return (
      <button onClick={this.handleLogout}>Sign Out</button>
    )
  };
};

export default Logout;