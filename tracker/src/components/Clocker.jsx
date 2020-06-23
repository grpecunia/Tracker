import React, { Component } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

// import { Link, Redirect } from "react-router-dom";

// let time = new Date().toLocaleString();

class Clocker extends Component {

    state = {
        timeStamp : null,
        date: null,
        time: null,
        ip: "Not Set",
        city: "City",
        state: "State",
        country: "Country"
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

  getLocation = () => {
    axios.get("https://geoip-db.com/json/")
            .then((res) => {
             this.setState({ ip: res.data.IPv4,
                            city: res.data.city,
                            state: res.data.state,
                            postal: res.data.postal, 
                            country: res.data.country_code
                        });
                });
            }
  

   determineClockType = (e) => {
     console.log(e.target.value, new Date().toLocaleTimeString(), this.props.user.email, this.state)
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
              <br />
              <Button className="mb-3" block onClick={this.getLocation}>
                Set Location
              </Button>
              <p>
                <strong>Location:</strong>{" "}
                {this.state.city +
                  ", " +
                  this.state.state +
                  " " +
                  this.state.country}
                <br />
                <strong>IP:</strong> {this.state.ip}
              </p>
            </Col>
            <Col lg={6}>
              <h6 className="time">{this.state.time}</h6>
              <br />
              <Row
                className="clocker"
                style={{ align: "center", marginTop: "0.5em" }}
              >
                <Button
                    block
                  variant="success"
                  className="mb-3"
                  value="In"
                  onClick={(e) => this.determineClockType(e)}
                >
                  Clock-In
                </Button>
                <Button
                  variant="info"
                  className="mr-2"
                  value="Lunch"
                  onClick={(e) => this.determineClockType(e)}
                >
                  Lunch
                </Button>
                <Button
                  variant="primary"
                  className="mr-2"
                  value="Break"
                  onClick={(e) => this.determineClockType(e)}
                >
                  Break
                </Button>
                <Button
                  variant="warning"
                  className="mr-2"
                  value="Out"
                  onClick={(e) => this.determineClockType(e)}
                >
                  Clock-Out
                </Button>
              </Row>
            </Col>
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