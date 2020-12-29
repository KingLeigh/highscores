import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import HighScoreNavbar from "./components/navbar.component"
import ScoreList from "./components/score-list.component";
import InputScore from "./components/input-score.component";
import CreateCompetition from "./components/create-competition.component";
import CreateUser from "./components/create-user.component";
import CreateEvent from "./components/create-event.component";
import EventPicker from "./components/event-picker.component";
import CompetitionPicker from "./components/competition-picker.component";

// TODO: Hide the navbar on screen it's not needed.

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">HighScores</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="hide-on-home" />
        <Navbar.Collapse className="ml-auto hide-on-home" id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/events">Leaderboard</Nav.Link>
            <Nav.Link as={Link} to="/record">Add A Score</Nav.Link>
            <Nav.Link as={Link} to="/recent">Recent Scores</Nav.Link>
            <NavDropdown title="Admin" id="nav-admin-dropdown">
              <NavDropdown.Item as={Link} to="/user">Add Player</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/event">Add Event</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/recent">Edit Scores</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
        <Route path="/" exact component={CompetitionPicker} />
        <Route path="/events" exact component={EventPicker} />
        <Route path="/leaderboard/:id"  render={(props) => (
          <ScoreList {...props} listTitle="Leaderboard"/>
        )} />      
        <Route path="/recent" exact  render={(props) => (
          <ScoreList {...props} listTitle="Recent Scores" byDate={true} />
        )} />
        <Route path="/record" component={InputScore} />
        <Route path="/user" component={CreateUser} />
        <Route path="/event" component={CreateEvent} />
        <Route path="/new-competition" component={CreateCompetition} />    
    </Router>
  );
}

export default App;