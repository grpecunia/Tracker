import React, { Component } from 'react';
import { Card, CardGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Dashboard from "../images/dashboard.jpg"
import Task from "../images/tasks.jpg";
import List from "../images/list.jpg";



class Main extends Component {

    render() {
      // console.log(this.props.user)

    if (this.props.user.email) {
      return (
          <React.Fragment>
            <div
              className="container"
              style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}
            >
              <CardGroup>
                <Card
                  as={Link}
                  to="/Entries"
                  style={{ textDecoration: "none" }}
                >
                  <Card.Img variant="top" src={List} width="500em" />
                  <Card.Body style={{ color: "black" }}>
                    <Card.Title>Time Entries</Card.Title>
                    <Card.Text>
                      Browse through individual time entries to view details and
                      make any necessary changes.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card as={Link} to="/Clocker" style={{ textDecoration: "none" }}>
                  <Card.Img variant="top" src={Task} width="500em" />
                  <Card.Body style={{ color: "black" }}>
                    <Card.Title>Clock-In/Out</Card.Title>
                    <Card.Text>
                      Clock In and Out for the day. You can also use this same method to add breaks and food interludes throughout the day.
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Img variant="top" src={Dashboard} width="500em" />
                  <Card.Body>
                    <Card.Title>Reports</Card.Title>
                    <Card.Text>
                      Access the TimeTracker Dashboard where you can interact
                      with your time entry data.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </div>
            <div className="footer-copyright text-center py-3">
              Developed by:{" "}
              <a
                style={{ color: "#fff" }}
                href="https://riverapecunia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gustavo Rivera Pecunia
              </a>{" "}
              |{" "}
              <Link style={{ color: "#fff" }} to="/">
                TimeTracker
              </Link>{" "}
              | All rights reserved © {new Date().getFullYear()}
            </div>
          </React.Fragment>
        )

        } else {
      return (
          <Redirect
            to={{ pathname: "/LogIn" }}
          />
      );
    }
  }
}

export default Main;