import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import ScoreList from "./components/score-list.component";
import InputScore from "./components/input-score.component";
import CreateCompetition from "./components/create-competition.component";
import CreateUser from "./components/create-user.component";
import CreateEvent from "./components/create-event.component";
import MainComponent from "./components/main.component";
import EventPicker from "./components/event-picker.component";
import CompetitionPicker from "./components/competition-picker.component";

// TODO: Hide the navbar on screen it's not needed.

function App() {
  return (
    <Router>
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
      <br />
        <Route path="/" exact component={CompetitionPicker} />
        <Route path="/c/:id" component={MainComponent} />
        <Route path="/current" component={MainComponent} />        
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