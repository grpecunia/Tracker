import React, { Component } from 'react';
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";

class Users extends Component {

    state = {
        users: [],
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
    }

  usersList() {
    return this.state.users.map((user, i) => {
      return (
        <tr key={i}>
          <td>{user.firstName}{" "}{user.lastName}</td>
          <td>{user.isActive ? "✅" : "❌"}</td>
          <td>{user.jobTitle}</td>
          <td>{user.location}</td>
          <td>{user.weeklyHours}</td>
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
    console.log(this.state)
    return (
      <Container style={{ marginTop: "2em" }}>
        <Row>
          <Col lg={10} md={6} xs={12}>
            <h1>Users</h1>
          </Col>
          <Col lg={2} md={6} xs={12}>
            <Button variant="success" style={{ marginTop: "8px" }}>
              + Add User
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover responsive size="sm" className="mt20">
          <thead>
            <tr>
              <th>Name</th>
              <th>Active?</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Scheduled Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.usersList()}</tbody>
        </Table>
      </Container>
    );
  }
}

export default Users;