import React, { Component } from 'react';
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

// let time = new Date().toLocaleString();

class Clocker extends Component {
  state = {
    timeStamp: null,
    date: null,
    time: null,
    ip: "Not Set",
    city: "City",
    state: "State",
    country: "Country",
    clockers: [],
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/clocker`)
      .then((res) => {
        this.setState({ clockers: res.data });
      })
      .catch((error) => {
        console.log(error);
      });

    setInterval(() => {
      this.setState({
        timeStamp: new Date().toLocaleString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
  }

  getLocation = () => {
    axios.get("https://geoip-db.com/json/").then((res) => {
      this.setState({
        ip: res.data.IPv4,
        city: res.data.city,
        state: res.data.state,
        postal: res.data.postal,
        country: res.data.country_code,
      });
    });
  };

  determineClockType = (e) => {
    console.log(
      e.target.value,
      new Date().toLocaleTimeString(),
      this.props.user.email,
      this.state
    );
  };

  clockersList() {
    return this.state.clockers.map((clock, i) => {
      return (
        <tr key={i}>
          <td>{clock.date}</td>
          <td>{clock.time}</td>
          <td>{clock.type}</td>
          <td>{clock.ip}</td>
          <td>{clock.zip}</td>
          <td>{clock.country}</td>
          <td>
            <Button
              variant="danger"
              //   as={Link}
              //   to={"/editEntry/" + log._id}
            >
              {" "}
              View{" "}
            </Button>
          </td>
        </tr>
      );
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value,
                    show: true });

    console.log(this.state)
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newPunch = {
      datestamp: this.state.timeStamp,
      time: this.state.time,
      date: this.state.date,
      type: this.state.type,
      user_id: this.props.user._id,
      ip: this.state.ip,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zip: this.state.postal,
    };

    axios
      .post(`http://localhost:4000/api/clocker`, newPunch)
      .then((res) => console.log(res.data));

    this.setState({
      timeStamp: " ",
      time: " ",
      date: " ",
      type: " ",
      ip: " ",
      city: " ",
      state: " ",
      country: " ",
      postal: " ",
      show: false,
    });
  };

  render() {
    if (this.props.user.email) {
    // console.log(this.state.ip)
    return (
      <React.Fragment>
        <Modal
          size="sm"
          show={this.state.show}
          onHide={() => this.hideModal()}
          aria-labelledby="modalConfirm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modalConfirm">
              <strong>Confirmation of Clocker</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Information:</h5>
            <ul>
              <li>User - {this.props.user.email}</li>
              <li>Type - {this.state.type}</li>
              <li>IP - {this.state.ip}</li>
              <li>City - {this.state.city}</li>
              <li>State - {this.state.state}</li>
            </ul>
            <br />
            <Button onClick={(e) => this.handleSubmit(e)}>Submit</Button>
          </Modal.Body>
        </Modal>
        <Container style={{ marginTop: "2em" }}>
          <Row>
            <Col lg={6}>
              <h1>Clock In/Out</h1>
              <br />
              <Button className="mb-3" block onClick={this.getLocation}>
                Set Location
              </Button>
              <p>
                <strong>Current Location:</strong>{" "}
                {this.state.city +
                  ", " +
                  this.state.state +
                  " " +
                  this.state.country}
                <br />
                <strong>IP Address:</strong> {this.state.ip}
              </p>
            </Col>
            <Col lg={6}>
              <h6 className="time">{this.state.time}</h6>
              <br />
              <Row
                className="clocker"
                style={{
                  marginTop: "0.5em",
                }}
              >
                <Col>
                  <Button
                    lg={3}
                    md={6}
                    block
                    variant="success"
                    className="mr-2"
                    name="type"
                    value="In"
                    onClick={(e) => this.handleChange(e)}
                  >
                    Clock-In
                  </Button>
                </Col>
                <Col>
                  <Button
                    lg={3}
                    md={6}
                    block
                    variant="info"
                    className="mr-2"
                    name="type"
                    value="Lunch"
                    onClick={(e) => this.handleChange(e)}
                  >
                    Lunch
                  </Button>
                </Col>

                <Col>
                  <Button
                    lg={3}
                    md={6}
                    block
                    variant="primary"
                    className="mr-2"
                    name="type"
                    value="Break"
                    onClick={(e) => this.handleChange(e)}
                  >
                    Break
                  </Button>
                </Col>

                <Col>
                  <Button
                    lg={3}
                    md={6}
                    block
                    variant="warning"
                    className="mr-2"
                    name="type"
                    value="Out"
                    onClick={(e) => this.handleChange(e)}
                  >
                    Clock-Out
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Table striped bordered hover responsive size="sm" className="mt20">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                {/* <th>User</th> */}
                <th>Type</th>
                <th>IP</th>
                <th>ZipCode</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.clockersList()}</tbody>
          </Table>
        </Container>
      </React.Fragment>
    );

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