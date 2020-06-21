import React, { Component } from 'react';
import { Card, CardGroup, Container, Row, Col, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

// let time = new Date().toLocaleString();

class Clocker extends Component {

    state = {
        timeStamp : null,
        date: null,
        time: null,
    }
  
  componentDidMount() {
    setInterval(() => {
      this.setState({
        timeStamp: new Date().toLocaleString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  render() {
    // if (this.props.user.email) {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "2em" }}>
          <Row>
            <Col>
              <h1>Clock In/Out</h1>
            </Col>
          </Row>
          <Row style={{ textAlign: "center", marginTop: "2em" }}>
            <Col>
              <h6 className="time"> Current Time: {this.state.time}</h6>
            </Col>
          </Row>
          <Row className="clocker" style={{ align: "center", marginTop: "0.5em" }}>
            <Button variant="success" className="mr-2">
              Clock-In
            </Button>
            <Button variant="info" className="mr-2">
              Lunch
            </Button>
            <Button variant="primary" className="mr-2">
              Break
            </Button>
            <Button variant="warning" className="mr-2">
              Clock-Out
            </Button>
          </Row>
          {/* Current Time: {this.timestamp()} */}
        </Container>
      </React.Fragment>
    );

    //     } else {
    //   return (
    //       <Redirect
    //         to={{ pathname: "/LogIn" }}
    //       />
    //   );
    // }
  }
}

export default Clocker;