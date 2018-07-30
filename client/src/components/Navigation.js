import React, {Component} from 'react';
// import { NavLink } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

class Navigation extends Component {
    render () {
        return (
            <nav>
                <Login />
                <Register/>
            </nav>
        )
    }
}

export default Navigation;