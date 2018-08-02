import React, { Component } from 'react';

const axios = require('axios');

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    axios.post('/api/v1/users', { // Verify if the /users is the right url with the back end
      user: {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        password_confirmation: document.getElementById("password_confirmation").value,
        company_name: document.getElementById("company_name").value,
        phone_number: document.getElementById("phone").value,
        avatar: document.getElementById("avatar").value
      }
    })
      .then(response => {
        this.props.changePage("delete");
        this.props.updateCurrentUser(response.data.user.email);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <p>Register</p>
        <form>
          <input id="first_name" placeholder="first name" />
          <input id="last_name" placeholder="last name" />
          <input id="email" placeholder="email" />
          <input id="password" placeholder="password" />
          <input id="password_confirmation" placeholder="confirm password" />
          <input id="company_name" placeholder="company name" />
          <input id="phone" placeholder="phone number" />
          <input id="avatar" placeholder="avatar" />
          <button onClick={this.handleRegister}>Submit</button>
        </form>
        <button onClick={() => this.props.changePage("login")}>Go to Login</button>
      </div>
    )
  };
};

export default Register;
