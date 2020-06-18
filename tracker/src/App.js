import React, { Component, Fragment } from "react";
import logo from '../src/images/logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Button, Navbar, NavDropdown, Nav, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home'
import Main from './components/Main';
import Funds from './components/Funds'
import Users from './components/Users'
import LogIn from './components/LogIn'
import Activities from './components/Activities'
import Entries from './components/Entries'
import Gear from './images/settings.png'
import axios from "axios";
import actions from "./services/index";

class App extends Component {
  
  state = {
    email: null,
    createdAt: null,
    updatedAt: null,
    _id: null,
  };

  componentDidMount() {
    let user = actions.isLoggedIn();
    this.setState({ ...user.data });
    // console.log("Current User >> ", user);
    // console.log(this.state);

    axios
      .get(`http://localhost:4000/api/users/`)
      .then((res) => {
        // console.log(res, res.data);
        this.setState({
          users: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUser = (user) => this.setState(user);

  logOut = () => {
    // eslint-disable-next-line
    let res = actions.logOut();
    this.setUser({
      email: null,
      createdAt: null,
      updatedAt: null,
      _id: null,
    });
  };

  render() {
    console.log(this.state);
    return (
      <Router>
        <Navbar className="color-nav" variant="dark" expand="lg">
          <a
            className="navbar-brand"
            href="https://riverapecunia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} width="30" height="30" alt="RiveraPecunia.com" />
          </a>
          <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>
            TimeTracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.state._id !== null ? (
                <Fragment>
                  <Nav.Link as={Link} to="/Main">
                    Main
                  </Nav.Link>
                  <Nav.Link href="/">Reports</Nav.Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Link as={Link} to="/About">
                    About
                  </Nav.Link>
                </Fragment>
              )}
            </Nav>

            {this.state._id !== null ? (
              <Fragment>
                <Form inline>
                  <Button as={Link} to="/Main" variant="primary mr-1">
                    {this.state.email}
                  </Button>
                  <Button
                    as={Link}
                    to="/"
                    onClick={this.logOut}
                    variant="danger mr-1"
                    className="btn"
                  >
                    Log Out
                  </Button>
                </Form>
                <NavDropdown
                  alignRight
                  title={
                    <img
                      className="thumbnail-image"
                      src={Gear}
                      alt="settings"
                      height="25"
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/Users">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/Funds">
                    Funds
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/Activities">
                    Tasks
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider />
              <NavDropdown.Item href="/">Budget</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Clients</NavDropdown.Item> */}
                </NavDropdown>
              </Fragment>
            ) : (
              <Fragment>
                <Form inline>
                  <Button as={Link} to="/LogIn" variant="primary mr-1">
                    Login
                  </Button>
                  <Button
                    //  as={Link}
                    //  to="/sign-up"
                    variant="outline-primary"
                  >
                    Sign Up
                  </Button>
                </Form>
              </Fragment>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/Main"
            render={(props) => (
              <Main {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            path="/Entries"
            exact
            render={(props) => (
              <Entries {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            path="/Users"
            exact
            render={(props) => (
              <Users {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            path="/Funds"
            exact
            render={(props) => (
              <Funds {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            path="/Activities"
            exact
            render={(props) => (
              <Activities {...props} setUser={this.setUser} user={this.state} />
            )}
          />
          <Route
            path="/LogIn"
            exact
            render={(props) => (
              <LogIn {...props} setUser={this.setUser} user={this.state} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
