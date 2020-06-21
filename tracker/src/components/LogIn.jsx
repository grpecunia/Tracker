import React, { Component } from "react";
import actions from "../services/index";
import logo from "../images/logo.png";
import { Button, Modal, Form, Container, Row, Col, InputGroup } from "react-bootstrap";

class LogIn extends Component {
  
    state = {
    show: false,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    actions
      .logIn(this.state)
      .then((user) => {
        this.props.setUser({ ...user.data });
        this.props.history.push("/Main");
      })
      .catch(( error ) => {
        // this.setState({
        //   show: true,
        // });
        console.error(error);
      });
  };

  showAlert = () => {
    this.setState({ show: true });
  };

  hideAlert = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={() => this.hideAlert()}
          aria-labelledby="modalError"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modalError">
              <strong>Error on Login!</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Something wrong bro!</Modal.Body>
        </Modal>

        <Container style={{ marginTop: "2em" }}>
          <Row style={{ marginBottom: "1em" }}>
            <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
              <h4 className="featurette-heading" style={{ fontSize: "4rem" }}>
                {" "}
                <img src={logo} width="75" className="brand_logo" alt="Logo" />
                TimeTracker
              </h4>
            </Col>
          </Row>

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1"> 👤 </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder="Username..."
                      name="email"
                      type="email"
                      aria-describedby="basic-addon1"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon2"> 🔒</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder="Password..."
                      name="password"
                      type="password"
                      aria-describedby="basic-addon2"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <br />
                <Button
                  block
                  type="submit"
                  value="Log In"
                  style={{ borderColor: "#e5e6e7", color: "#e5e6e7" }}
                >
                  Log In
                </Button>
              </Col>
            </Row>
          </Form>

          <Row
            className="d-flex justify-content-center links"
            style={{ color: "black", opacity: "0.5", marginTop: "2em" }}
          >
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="ml-2"
              style={{ textDecoration: "underline" }}
            >
              Register
            </a>
          </Row>
        </Container>
      </>
    );
  }
}

export default LogIn;
