import React, { Component } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
// import { Link, Redirect } from "react-router-dom";

// let time = new Date().toLocaleString();

class Clocker extends Component {

    state = {
        timeStamp : null,
        date: null,
        time: null,
        ip: {},
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

  fetchIP = () => {
    fetch("https://aqueous-wave-46255.herokuapp.com/https://geoip-db.com/json/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ ip: json.IPv4 });
      });
    }
  

   determineClockType = (e) => {
     console.log(e.target.value, new Date().toLocaleTimeString(), this.props.user.email, this.state.ip)
    }

  render() {
    // if (this.props.user.email) {
    // console.log(this.state.ip)
    return (
      <React.Fragment>
        <Container style={{ marginTop: "2em" }}>
          <Row>
            <Col lg={6}>
              <h1>Clock In/Out</h1>
            </Col>
            {/* </Row> */}
            {/* <Row style={{ textAlign: "center", marginTop: "2em" }}> */}
            <Col lg={6}>
              <h6 className="time">{this.state.time}</h6>
            </Col>
          </Row>
          <Row
            className="clocker"
            style={{ align: "center", marginTop: "0.5em" }}
          >
            <Button
              size="lg"
              variant="success"
              className="mr-2"
              value="In"
              onClick={(e) => this.determineClockType(e)}
            >
              Clock-In
            </Button>
            <Button
              size="lg"
              variant="info"
              className="mr-2"
              value="Lunch"
              onClick={(e) => this.determineClockType(e)}
            >
              Lunch
            </Button>
            <Button
              size="lg"
              variant="primary"
              className="mr-2"
              value="Break"
              onClick={(e) => this.determineClockType(e)}
            >
              Break
            </Button>
            <Button
              size="lg"
              variant="warning"
              className="mr-2"
              value="Out"
              onClick={(e) => this.determineClockType(e)}
            >
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