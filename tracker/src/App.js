import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, NavDropdown, FormControl, Nav, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './components/Main';


function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <a
          className="navbar-brand"
          href="https://riverapecunia.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} width="30" height="30" alt="RiveraPecunia.com" />
        </a>
        <Navbar.Brand href="/">TimeTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to='/Main'>Main</Nav.Link>

            <Nav.Link href="/">Reports</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Employees</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Funds</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Tasks</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Budget</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Clients</NavDropdown.Item>
            </NavDropdown>
            <br />
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Type your search..."
              className="mr-sm-2"
            />
            <Button variant="success" className="mr-sm-2">
              Search
            </Button>
            <Button variant="danger">LogOut</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {/* {/* <Route path="/" exact component={PlantHome} /> */}
      <Route path="/Main" exact component={Main} />
    </Router>
  );
}

export default App;
