import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Component } from 'react-bootstrap';
import { Col, Form, FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
// import Register from "./Register";

const axios = require('axios');

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      toDashboard: false
    };
  }

  handleLogin(e) {
    e.preventDefault();
    const email = e.target.elements["email"].value
    const password = e.target.elements["password"].value
    axios.post('/api/v1/authentication', {
      user: {
        email: email,
        password: password
      }
    })
      .then(response => {
        // this.props.changePage("delete");
        this.setState({
          toDashboard: true
        })
        this.props.updateCurrentUser(response.data.user.email, response.data.user.id);
        localStorage.setItem("auth_token", response.data.auth_token);
      })
      .catch(error => {
        console.log(error)
      })
  }

  // displayRegister(e) => {

  // }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
      // return <h1>Helloo</h1>
    }
    return (
      // <div>

      //   <p>Login</p>
      //   <form>
      //     <input id="email" placeholder="email" />
      //     <input id="password" placeholder="password" />
      //     <button onClick={this.handleLogin}>Submit</button>
      //   </form>

      <div className="loginregisterform">
        <Form onSubmit={this.handleLogin} horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
                  </Col>
            <Col sm={10}>
              <FormControl name="email" type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
                  </Col>
            <Col sm={10}>
              <FormControl name="password" type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
          {/* <a hef="#" onClick={}>Register Here /> */}
        </Form>;
      </div>
      // </div>
    )
  };
};

export default Login;
