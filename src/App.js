import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
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
      <div className="container-fluid">
      <Navbar />
      </div>
      <br/>
      <div className="container">
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
        <Route path="/competition" component={CompetitionPicker} />      
      </div>
    </Router>
  );
}

export default App;