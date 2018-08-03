import React, { Component } from 'react';

import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.email
    }
  }

  render() {
    return (
      <div>
        <Logout />
        <span >{this.props.currentUser.email}</span>
      </div>
    )
  };
};

export default Header;