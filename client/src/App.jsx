import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
// import Header from "./components/Header";
// import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(email, userId) {
    this.setState({
      currentUser: {
        email: email,
        userId: userId
      },
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Header updateCurrentUser={this.updateCurrentUser} /> */}
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
