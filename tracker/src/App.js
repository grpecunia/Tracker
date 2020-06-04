import React from 'react';
import logo from '../src/images/logo.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, NavDropdown, FormControl, Nav, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Main from './components/Main';
import Entries from './components/Entries'
import Gear from './images/settings.png'


function App() {
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
        <Navbar.Brand href="/" style={{fontSize : "1.5rem"}}>TimeTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Main">
              Main
            </Nav.Link>

            <Nav.Link href="/">Reports</Nav.Link>
            {/* <NavDropdown
              title={
                  <img className="thumbnail-image" src={Gear} alt="settings" height="25" />
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/">Employees</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Funds</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Tasks</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="/">Budget</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Clients</NavDropdown.Item> */}
            {/* </NavDropdown> */}
            <br />
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Type your search..."
              className="mr-sm-2"
              style={{ marginBottom: "1em", marginTop: "1em" }}
            />
            <Button variant="info" className="mr-sm-2">
              Search
            </Button>
            <Button variant="primary">Login</Button>
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
            <NavDropdown.Item href="/">Employees</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Funds</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Tasks</NavDropdown.Item>
            {/* <NavDropdown.Divider />
              <NavDropdown.Item href="/">Budget</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Clients</NavDropdown.Item> */}
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/" exact component={Home} />
      <Route path="/Main" exact component={Main} />
      <Route path="/Entries" exact component={Entries} />
    </Router>
  );
}

export default App;
