import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";


import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";


const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/v1/users")
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data
        });
        console.log(this.state.users)
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <BrowserRouter> 
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact/>
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
