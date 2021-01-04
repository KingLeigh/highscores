import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class HighScoreNavbar extends Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand as={Link} to="/current">HighScores.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="hide-on-home" />
        <Navbar.Collapse className="ml-auto hide-on-home" id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/current">Competition Home</Nav.Link>            
            <Nav.Link as={Link} to="/recent">All Recent Scores</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Change Competition</Nav.Link>
          </Nav>          
        </Navbar.Collapse>
      </Navbar>
    );
  }
}