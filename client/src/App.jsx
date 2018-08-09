import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Footer from "./components/Footer";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("auth_token")) {
      this.setState({
        currentUser: {
          email: localStorage.getItem("email"),
          userId: localStorage.getItem("user_id"),
          companyName: localStorage.getItem("company_name"),
          latitude: localStorage.getItem("latitude"),
          longitude: localStorage.getItem("longitude")
        }
      })
    }
  }

  updateCurrentUser(email, userId, companyName, latitude, longitude) {
    this.setState({
      currentUser: {
        email: email,
        userId: userId,
        companyName: companyName,
        latitude: latitude,
        longitude: longitude
      }
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" render={() => <Home updateCurrentUser={this.updateCurrentUser} />} exact />
            <Route path="/dashboard" render={() => <Dashboard currentUser={this.state.currentUser} />} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
