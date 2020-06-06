import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Button, Table, Form, FormControl, Container, Row, Col, Modal, FormGroup } from "react-bootstrap";
import axios from "axios";

class Entries extends Component {
  state = {
    entries: [],
    users: [],
    activities: [],
    funds: [],
    show: false,
    begin: 0,
    end: 10,
    hours: 0,
    minutes: 0,
    duration: "Please validate your time!"
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/users`)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:4000/api/funds`)
      .then((res) => {
        this.setState({ funds: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:4000/api/activities`)
      .then((res) => {
        this.setState({ activities: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:4000/api/entries`)
      .then((res) => {
        this.setState({ entries: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  entryList() {
    return this.state.entries.map((entries, i) => {
      let fund = entries.fund_id;
      let activity = entries.activity_id;
      return (
        <tr key={i}>
          <td>{entries.datestamp.slice(0, 10)}</td>
          <td>{fund.fundName}</td>
          <td>{activity.activityName}</td>
          <td>{entries.duration} hrs</td>
          <td><Button variant="warning">{" "}View / Edit{" "}</Button>
          </td>
        </tr>
      );
    });
  }

  nextPage = () => {
    let newBegin = this.state.begin + 10;
    let newEnd = this.state.end + 10;
    this.setState({
      begin: newBegin,
      end: newEnd,
    });
  };

  previousPage = () => {
    let newBegin = this.state.begin - 10;
    let newEnd = this.state.end - 10;
    this.setState({
      begin: newBegin,
      end: newEnd,
    });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newEntry = {
      datestamp: this.state.datestamp,
      user_id: this.state.user_id,
      fund_id: this.state.fund_id,
      activity_id: this.state.activity_id,
      duration: this.state.duration,
      notes: this.state.notes,
    };

    axios
      .post(`http://localhost:4000/api/${this.state.user_id}/entries`, newEntry)
      .then((res) => console.log(res.data));

    this.setState({
      datestamp: " ",
      user_id: " ",
      fund_id: " ",
      activity_id: " ",
      duration: "Please validate your time!",
      show: false,
    });

    // axios.get(`http://localhost:4000/api/entries`)
    //   .then((res) => 
    //     this.setState({ entries: res.data }))
    
    // this.entryList()
     
  };

  userOptions = () => {
    return this.state.users.map((users, i) => {
      return (
        <option key={i} value={users._id}>
          {users.firstName} {users.lastName}
        </option>
      );
    });
  };

  fundsOptions = () => {
    return this.state.funds.map((fund, i) => {
      return (
        <option key={i} value={fund._id}>
          {fund.fundName}
        </option>
      );
    });
  };

  activitiesOptions = () => {
    return this.state.activities.map((activity, i) => {
      return (
        <option key={i} value={activity._id}>
          {activity.activityName}
        </option>
      );
    });
  };

  calculateDuration = () => {
    // this.setState({ [e.target.name]: Number(e.target.value) });
    if (this.state.minutes === 0){
      let duration = Number(this.state.hours)
      this.setState({ duration })
    }
    else {
      let minutes = Number(this.state.minutes) / 60;
      let duration = Number(this.state.hours) + minutes
      this.setState({ duration });
    }
  }

  render() {
    console.log(this.state);
    if (this.state.entries !== []) {
      return (
        <React.Fragment>
          <Modal
            size="lg"
            show={this.state.show}
            onHide={() => this.hideModal()}
            aria-labelledby="modalAddEntry"
          >
            <Modal.Header closeButton>
              <Modal.Title id="modalAddEntry">
                <strong>New Time Entry</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Row>
                    <Col xs={12} lg={6}>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        name="datestamp"
                        type="date"
                        required
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={12} lg={6}>
                      <Form.Label>User</Form.Label>
                      <Form.Control
                        name="user_id"
                        as="select"
                        placeholder="Select User"
                        onChange={this.handleChange}
                      >
                        {this.userOptions()}
                      </Form.Control>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col xs={12} lg={6}>
                      <Form.Label>Funding Source</Form.Label>
                      <Form.Control
                        name="fund_id"
                        as="select"
                        onChange={this.handleChange}
                      >
                        {this.fundsOptions()}
                      </Form.Control>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Form.Label>Activity</Form.Label>
                      <Form.Control
                        name="activity_id"
                        as="select"
                        onChange={this.handleChange}
                      >
                        {this.activitiesOptions()}
                      </Form.Control>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col xs={6} lg={2} style={{ textAlign: "center" }}>
                      <Form.Label>Hours</Form.Label>
                      <Form.Control
                        name="hours"
                        type="number"
                        defaultValue="0"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={6} lg={2} style={{ textAlign: "center" }}>
                      <Form.Label>Minutes</Form.Label>
                      <Form.Control
                        name="minutes"
                        type="number"
                        defaultValue="0"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={2} md={6} xs={12} style={{ textAlign: "center" }}>
                      <Form.Label>Calculate</Form.Label>
                      <Form.Control
                        as={Button}
                        variant="outline-warning"
                        onClick={this.calculateDuration}
                      >
                        Validate
                      </Form.Control>
                    </Col>
                    <Col xs={12} md={6} lg={6} style={{ textAlign: "center" }}>
                      <Form.Label style={{ textAlign: "center" }}>
                        Total Duration
                      </Form.Label>
                      <br />
                      <div>
                        {this.state.duration ===
                        "Please validate your time!" ? (
                          <h5>{this.state.duration}</h5>
                        ) : (
                          <h3>{this.state.duration + " hrs"}</h3>
                        )}
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col xs={12} lg={12}>
                      <Form.Label>Notes: </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        name="notes"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <Row>
                  <Col>
                    <Form.Control
                      type="submit"
                      value="Submit"
                      className="btn btn-success"
                    />
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
          <Container style={{ marginTop: "2em" }}>
            <Row>
              <Col xs={12}>
                <h1>Time-Entries</h1>
              </Col>
            </Row>
            <Row style={{ marginBottom: "1em", marginTop: "0.5em" }}>
              <Col lg={8} md={6} xs={12} style={{ marginBottom: "0.5em" }}>
                <Button variant="success" onClick={this.showModal}>
                  + New Entry
                </Button>
              </Col>
              <Col lg={4} md={6} xs={12}>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Type your search..."
                    className="mr-sm-2"
                  />
                  <Button variant="info">Search</Button>
                </Form>
              </Col>
            </Row>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Funding Source</th>
                  <th>Activity</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.entryList()}</tbody>
            </Table>
          </Container>
        </React.Fragment>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Entries;