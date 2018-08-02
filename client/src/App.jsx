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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentUser: null
  //   }
  //   this.updateCurrentUser = this.updateCurrentUser.bind(this);
  // }

  // updateCurrentUser(email) {
  //   this.setState({
  //     currentUser: email
  //   })
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Header updateCurrentUser={this.updateCurrentUser} /> */}
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
