import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Button, Table, Form, FormControl, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class Entries extends Component {
  
    state = {
        entries: [],
    };

   componentDidMount() {      
       axios
         .get(`http://localhost:4000/api/entries`)
         .then((res) => {
           this.setState({ entries: [res.data] });
         })
         .catch(function (error) {
           console.log(error);
         });
    }


  entryList() {
    return this.state.entries.map((entries, i) => {
        let fund = entries[i].fund_id
        let activity = entries[i].activity_id
      return (
        <tr key={i}>
          <td>{entries[i].datestamp.slice(0, 10)}</td>
          <td>{fund.fundName}</td>
          <td>{activity.activityName}</td>
          <td>{entries[i].duration} hrs</td>
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
      <Container style={{ marginTop: "2em" }}>
        <Row>
          <Col xs={12}>
            <h1>Time-Entries</h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1em", marginTop: "0.5em" }}>
          <Col lg={8} md={6} xs={12} style={{ marginBottom: "0.5em" }}>
            <Button variant="success">+ New Entry</Button>
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
    );
  }
}

export default Entries;