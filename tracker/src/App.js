import React from 'react';
import logo from '../src/images/logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Button, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Main from './components/Main';
import Funds from './components/Funds'
import Users from './components/Users'
import Activities from './components/Activities'
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
        <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>
          TimeTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Main">
              Main
            </Nav.Link>
            <Nav.Link href="/">Reports</Nav.Link>
          </Nav>
          
           
            <Button variant="primary" style={{ marginLeft: "0.2em" }}>
              Login
            </Button>
         
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
            <NavDropdown.Item href="/Users">Users</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Funds">Funds</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/Activities">Tasks</NavDropdown.Item>
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
      <Route path="/Users" exact component={Users} />
      <Route path="/Funds" exact component={Funds} />
      <Route path="/Activities" exact component={Activities} />
    </Router>
  );
}

export default App;
