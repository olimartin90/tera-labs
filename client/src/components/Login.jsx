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
    this.handleRegister = this.handleRegister.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      toDashboard: false,
      show: false
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
        this.props.updateCurrentUser(response.data.user.email);
        localStorage.setItem("auth_token", response.data.auth_token);
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleRegister(e) {
    e.preventDefault();
    const first_name = e.target.elements["first_name"].value
    const last_name = e.target.elements["last_name"].value
    const email = e.target.elements["email"].value
    const password = e.target.elements["password"].value
    const password_confirmation = e.target.elements["password_confirmation"].value
    const company_name = e.target.elements["company_name"].value
    const phone = e.target.elements["phone"].value
    const avatar = e.target.elements["avatar"].value
    axios.post('/api/v1/users', {
      user: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        company_name: company_name,
        phone: phone,
        avatar: avatar
      }
    })
      .then(response => {
        // this.props.changePage("delete");
        this.props.updateCurrentUser(response.data.user.email);
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  // displayRegister(e) => {

  // }

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
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
          <div>
            <a hef="#" onClick={this.handleShow}>Register Here</a>


          </div>
        </Form>;
      </div>
      // </div>
    )
  };
};

export default Login;
