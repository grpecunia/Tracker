import React, { Component } from 'react';
import { Button, Table, Row, Col, Container, Modal, Form, FormGroup, Badge } from "react-bootstrap";
import axios from "axios";

class Funds extends Component {
  state = {
    funds: [],
    show: false,
    checked: true,
    begin: 0,
    end: 10,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/funds`)
      .then((res) => {
        this.setState({ funds: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fundsList() {
    return this.state.funds.slice(this.state.begin, this.state.end).map((fund, i) => {
      return (
        <tr key={i}>
          <td>{fund.fundName}</td>
          <td>{fund.isActive ? "✅" : "❌"}</td>
          <td>{fund.source}</td>
          <td>
            $
            {fund.amount.toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            })}
          </td>
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

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
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
    let newFund = {
      fundName: this.state.fundName,
      isActive: this.state.isActive,
      description: this.state.description,
      source: this.state.source,
      amount: this.state.amount,
    };

    axios
      .post(`http://localhost:4000/api/funds`, newFund)
      .then((res) => console.log(res.data));

      this.setState({
        fundName: " ",
        isActive: " ",
        description: " ",
        source: " ",
        amount: " ",
        show: false,
      });

    axios.get(`http://localhost:4000/api/funds`)
    .then((res, err) => { 
            console.log("pushing new updated funds")
            this.setState(prevState => ({ items: res.data, isLoading: false })); 
            this.fundsList()
        })
            .catch(err => { console.log('Something bad is happened:', err) })
  };

  totalFunding = () => {
    let total = this.state.funds.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
    return total;
  };

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

  render() {
    const { funds, isLoading } = this.state;
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
            <Form onSubmit={this.handleSubmit} funds={funds} isLoading={isLoading}>
              <FormGroup>
                <Row>
                  <Col className="col-lg-10">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="fundName"
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
                    <Form.Label>Source</Form.Label>
                    <Form.Control
                      name="source"
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col className="col-lg-4">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      name="amount"
                      type="number"
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
              <h1>
                Funds{" "}
                <Button variant="info">
                  Total
                  <Badge variant="light" className="ml-sm-2">
                    ${" "}
                    {this.totalFunding().toLocaleString(navigator.language, {
                      minimumFractionDigits: 2,
                    })}
                  </Badge>
                  <span className="sr-only">Active Total Funds</span>
                </Button>
              </h1>
            </Col>
            <Col lg={2} md={6} xs={12}>
              <Button
                variant="success"
                style={{ marginTop: "8px" }}
                onClick={this.showModal}
              >
                + Add Fund
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive size="sm" className="mt20">
            <thead>
              <tr>
                <th>Name</th>
                <th>Active?</th>
                <th>Source</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{this.fundsList()}</tbody>
          </Table>
          <hr />
          {this.state.begin >= 10 ? (
            <Button variant="info mr-2" onClick={this.previousPage}>
              {"<< "}
              Previous{" "}
            </Button>
          ) : (
            ""
          )}
          {this.state.end <= this.state.funds.length ? (
            <Button variant="info mr-2" onClick={this.nextPage}>
              {" "}
              Next {" >>"}
            </Button>
          ) : (
            ""
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Funds;