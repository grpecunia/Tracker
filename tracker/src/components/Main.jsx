import React, { Component } from 'react';
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dashboard from "../images/dashboard.jpg"
import Task from "../images/tasks.jpg";
import List from "../images/list.jpg";
import actions from "../services/index";



class Main extends Component {
  
  async componentDidMount() {  
    let user = await actions.isLoggedIn();
      this.setState({ ...user.data });
    
  }


    render() {
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
                <Card as={Link} to="/" style={{ textDecoration: "none" }}>
                  <Card.Img variant="top" src={Task} width="500em" />
                  <Card.Body style={{ color: "black" }}>
                    <Card.Title>Add Entry</Card.Title>
                    <Card.Text>
                      Log your project activities and select the correct
                      allocation specific to your activities and/or other
                      related tasks.
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
        );
    }
}

export default Main;