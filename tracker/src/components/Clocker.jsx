import React, { Component } from 'react';
import { Card, CardGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class Clocker extends Component {
    render() {
        if (this.props.user.email) {
      return (
          <React.Fragment>
            <h2>Clocker</h2>
            </React.Fragment>
        )

        } else {
      return (
          <Redirect
            to={{ pathname: "/LogIn" }}
          />
      );
    }
  }
}

export default Clocker;