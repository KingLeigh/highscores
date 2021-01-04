import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class HighScoreNavbar extends Component {

  render() {
    const compId = this.props.compId;
    console.log("XYZ navbar compId: " + compId);
    if (compId != "") {
      return this.getCompNav(compId);
    } else {
      return this.getRootNav();
    }
  }

  getCompNav(compId) {
    return (
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Navbar.Brand as={Link} to={"/c/" + compId}>HighScores.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="ml-auto" id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to={"/c/" + compId}>Competition Home</Nav.Link>            
            <Nav.Link as={Link} to={"/c/" + compId + "/recent"}>All Recent Scores</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Change Competition</Nav.Link>
          </Nav>          
        </Navbar.Collapse>
      </Navbar>
    );
  }

  getRootNav() {
    return (
      <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
        <Navbar.Brand as={Link} to={"/"}>HighScores.app</Navbar.Brand>
      </Navbar>
    );
  }  
}