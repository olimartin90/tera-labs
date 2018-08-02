import React, { Component } from 'react';
import { Component } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Register from "./Register";

const axios = require('axios');

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    axios.post('/api/v1/authentication', { // Verify if the /users is the right url with the back end
      user: {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }
    })
      .then(response => {
        this.props.changePage("delete");
        this.props.updateCurrentUser(response.data.user.email);
        localStorage.setItem("auth_token", response.data.auth_token);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form>
          <input id="email" placeholder="email" />
          <input id="password" placeholder="password" />
          <button onClick={this.handleLogin}>Submit</button>
        </form>
        <button onClick={() => this.props.changePage("dashboard")}>Go to Dashboard</button>

      </div>
    )
  };
};

export default Login;
