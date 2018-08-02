import React, { Component } from 'react';

import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

class Header extends Component {
  constructor(props) {
    super(props);
    if (this.props.currentUser == null) {
      this.state = {
        page: "login"
      }
    } else {
      this.state = {
        page: "delete"
      }
    }
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({
      page: newPage
    })
  }

  render() {
    switch (this.state.page) {
      case "register":
        return <Register changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser} />
      case "login":
        return <Login changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser} />
      case "delete":
        return <Logout changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser} />
    }
  };
};

export default Header;