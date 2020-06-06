import React, { Component } from "react";
import { Button, Row, Col, Container, Table, Form, FormGroup, Modal } from "react-bootstrap";
import axios from "axios";

class Activities extends Component {
  state = {
    activities: [],
    show: false,
    checked: true,
    begin: 0,
    end: 10,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/activities`)
      .then((res) => {
        this.setState({ activities: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckBox = (e) => {
    if (this.state.isActive === true) {
      this.setState({ isActive: false, checked: false });
    } else {
      this.setState({ isActive: true, checked: true });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newActivity = {
      activityName: this.state.activityName,
      isActive: this.state.isActive,
      description: this.state.description,
      type: this.state.type,
    };

    axios
      .post(`http://localhost:4000/api/activities`, newActivity)
      .then((res) => console.log(res.data))
      
        this.setState({
          activityName: " ",
          isActive: " ",
          description: " ",
          type: " ",
          show: false,
        })
  };

  activitiesList() {
    return this.state.activities.map((activity, i) => {
      return (
        <tr key={i}>
          <td>{activity.activityName}</td>
          <td>{activity.isActive ? "✅" : "❌"}</td>
          <td>{activity.description}</td>
          <td>{activity.type}</td>
          <td>
            <Button
              variant="warning"
              //   as={Link}
              //   to={"/editEntry/" + log._id}
            >
              {" "}
              View / Edit{" "}
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={() => this.hideModal()}
          aria-labelledby="modalAddFund"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modalAddFund">
              <strong>New Fund</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Row>
                  <Col className="col-lg-10">
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                      name="activityName"
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col className="col-lg-2">
                    <Form.Label>Active?</Form.Label>
                    <Form.Control
                      name="isActive"
                      type="checkbox"
                      checked={this.state.checked}
                      className="form-control"
                      onChange={this.handleCheckBox}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col className="col-lg-4">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      name="type"
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col className="col-lg-12">
                    <Form.Label>Description: </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="description"
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
        <Container style={{ marginTop: "2em", marginBottom: "2em" }}>
          <Row>
            <Col lg={10} md={6} xs={12}>
              <h1>Activities</h1>
            </Col>
            <Col lg={2} md={6} xs={12}>
              <Button variant="success" style={{ marginTop: "8px" }} onClick={this.showModal}>
                + Add Activity
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive size="sm" className="mt20">
            <thead>
              <tr>
                <th>Name</th>
                <th>Active?</th>
                <th>Description</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.activitiesList()}</tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

export default Activities;